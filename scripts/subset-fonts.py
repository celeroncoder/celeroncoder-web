# /// script
# requires-python = ">=3.10"
# dependencies = [
#   "fonttools[woff]==4.68.0",
#   "uharfbuzz==0.57.0",
# ]
# ///
"""Subset the site's web fonts into a preloaded core file and a lazy extended file.

Run by hand (not part of `pnpm build`) and commit everything it writes to lib/fonts/.
It reads the source fonts from node_modules/geist and crawls a running copy of
the site for the characters it renders, so start one first:

    pnpm install && pnpm build && pnpm start          # serves the content in .env's database
    uv run scripts/subset-fonts.py                    # crawls http://localhost:3000
    uv run scripts/subset-fonts.py --base https://...  # or crawl a deployment
    uv run scripts/subset-fonts.py --check            # only report characters the committed fonts miss

Rerun it when:
  - a post (or any page) starts using a character outside the committed files
    (`--check` exits 1 and lists them); until then those characters draw in the
    fallback font,
  - the `geist` package is upgraded,
  - the site starts using a Geist Sans weight below 400 (the file keeps
    400-900), a real italic face, an OpenType feature (font-feature-settings /
    font-variant-*), or a Pixel variant other than Square.

What it does, per font:
  1. Collects the characters the site renders by crawling the home page, /blog
     and every post, and folds in upper/lowercase forms (the body is
     `text-transform: lowercase`, some labels are `uppercase`).
  2. Core file  = ASCII + NBSP + common punctuation + anything on the home page
     or on at least half of the crawled pages (+ all of Latin-1 and Latin
     Extended-A for fonts with `core_latin`). It is preloaded.
     Extended file = the rest of Latin-1 + Latin Extended-A + every other used
     character the font has. It sits behind `unicode-range`, so only pages that use one
     of its characters download it. It also maps a few Latin reference
     letters (AUTOHINT_REFERENCE) that its unicode-range leaves to core.
  3. Drops the part of the weight axis below the lightest weight used (exactly,
     without re-rounding any deltas), drops OpenType features the browser
     never applies here and unneeded tables, and writes deterministic WOFF2.
     Hinting is set per font; see the notes in JOBS.
  4. Verifies the output (cmap, axes, features, hinting, fallback metrics) and
     shapes every core/extended character and character pair with HarfBuzz
     against the original font at every used weight; any outline or advance
     difference fails the run.
  5. Writes lib/fonts/index.ts (the next/font declarations, including
     unicode-range lists generated from each file's real cmap) and
     lib/fonts/manifest.json.
"""

from __future__ import annotations

import argparse
import hashlib
import html
import io
import json
import re
import sys
import urllib.request
from collections import Counter
from dataclasses import dataclass, field
from pathlib import Path

import uharfbuzz as hb
from fontTools import subset
from fontTools.pens.recordingPen import RecordingPen
from fontTools.ttLib import TTFont

ROOT = Path(__file__).resolve().parent.parent
OUT_DIR = ROOT / "lib" / "fonts"
GEIST_DIR = ROOT / "node_modules" / "geist"
DEFAULT_BASE = "http://localhost:3000"

ASCII = set(range(0x20, 0x7F))
LATIN_1 = set(range(0xA0, 0x100))
LATIN_EXT_A = set(range(0x100, 0x180))
# Punctuation most pages use; always in the preloaded core when the font has it.
# U+2022 is the list bullet glyph some browsers draw for `list-style: disc`.
CORE_PUNCTUATION = {0x00A0, 0x2013, 0x2014, 0x2018, 0x2019, 0x201C, 0x201D, 0x2022, 0x2026}
# FreeType's autohinter (Chrome on Linux/Android uses it instead of TrueType
# bytecode) measures blue zones and stem widths from these Latin letters, found
# through the cmap. Extended files map them too, but leave them out of their
# unicode-range (core still draws them); without them accented glyphs from the
# extended file rasterize visibly softer than they do today.
AUTOHINT_REFERENCE = {ord(c) for c in "THEZOCQSLUfijkdbhxzroescpqgjyO0"}
# The autohinter also hints each glyph with the blue zones of the script it
# belongs to. A glyph shared with another script's code point (Geist draws
# U+00B5 MICRO SIGN with its Greek mu) counts as that script, so subsets map
# that script's code points as well, again without listing them in unicode-range.
SCRIPT_BLOCKS = [(0x0370, 0x0400), (0x0400, 0x0530)]  # Greek, Cyrillic


def shared_script_codepoints(source_cmap: dict[int, str], cps: set[int]) -> set[int]:
    glyphs = {source_cmap[c] for c in cps if c in source_cmap}
    out = set()
    for lo, hi in SCRIPT_BLOCKS:
        block = {c for c in source_cmap if lo <= c < hi}
        if any(source_cmap[c] in glyphs for c in block):
            out |= block
    return out


# Geist draws these two CJK punctuation marks today (CJK text otherwise falls
# through to system fonts). Keeping them preserves how CJK text renders.
EXTRA_EXT = {0x3003, 0x301C}

# Features Chromium/Firefox/Safari apply by default to Latin text. The site sets
# no font-feature-settings or font-variant-*, so nothing else is reachable.
DEFAULT_FEATURES = ["ccmp", "locl", "rlig", "liga", "clig", "calt", "rclt", "kern", "mark", "mkmk", "rvrn"]
# Tables the browser never reads for rendering.
DROP_TABLES = ["meta"]
# Copyright, names, version, license description + URL (OFL requires the notice).
NAME_IDS = [0, 1, 2, 3, 4, 5, 6, 13, 14, 16, 17]

PIXEL_FALLBACK = [
    "Geist Mono", "ui-monospace", "SFMono-Regular", "Roboto Mono", "Menlo", "Monaco",
    "Liberation Mono", "DejaVu Sans Mono", "Courier New", "monospace",
]


@dataclass
class FontJob:
    name: str  # output file stem, e.g. geist-sans
    ident: str  # TS identifier stem, e.g. geistSans
    css_var: str
    source: Path
    weight: str  # @font-face font-weight descriptor
    axes: dict[str, tuple[float, float]] = field(default_factory=dict)
    # Weights the CSS renders this font at; verification shapes at each of them.
    used_weights: list[int] = field(default_factory=list)
    hinting: bool = False
    adjust_font_fallback: bool = True
    # Put all of Latin-1 + Latin Extended-A in core. Browsers shape each file
    # separately, so a core/ext split inside Latin text loses kerning between
    # e.g. `f` and `é`; set this for fonts that kern across that boundary.
    core_latin: bool = False
    fallback: list[str] | None = None


JOBS = [
    FontJob(
        name="geist-sans",
        ident="geistSans",
        css_var="--font-geist-sans",
        source=GEIST_DIR / "dist/fonts/geist-sans/Geist-Variable.woff2",
        # The site renders 400 (body), 500 (font-medium, prose headings),
        # 600 (prose strong, font-semibold, bold inside italics) and 700 (<b>).
        # Clamping at 400 drops the whole Thin master exactly. The top stays at
        # 900: 900 is a master, so clamping to 700 would only rescale (and
        # round) its deltas, saving almost nothing and moving outlines by up to
        # half a unit at 500-700.
        weight="400 900",
        axes={"wght": (400, 900)},
        used_weights=[400, 500, 600, 700],
        # No glyph programs, just a 7-byte `prep` (dropout control). Kept so
        # hinting rasterizers (Windows) see exactly what they see today.
        hinting=True,
        # Geist Sans kerns 16,551 pairs of ASCII x Latin-1/Ext-A characters.
        core_latin=True,
    ),
    FontJob(
        name="geist-pixel-square",
        ident="geistPixelSquare",
        css_var="--font-geist-pixel-square",
        source=GEIST_DIR / "dist/fonts/geist-pixel/GeistPixel-Square.woff2",
        weight="500",
        used_weights=[500],
        # ttfautohint bytecode, ~8.5 KB per file. Dropped (approved): Linux
        # Chrome (FreeType autohinter) and macOS ignore it, so they render
        # identically; Windows DirectWrite grid-fits with it, so the pixel font
        # can rasterize slightly differently there.
        hinting=False,
        # No kerning between ASCII and Latin-1/Ext-A, so the split is lossless.
        adjust_font_fallback=False,
        fallback=PIXEL_FALLBACK,
    ),
]


# ---------------------------------------------------------------- crawl

def fetch(url: str) -> str:
    req = urllib.request.Request(url, headers={"User-Agent": "subset-fonts"})
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.read().decode("utf-8")


def visible_text(page: str) -> str:
    page = re.sub(r"(?is)<head\b.*?</head>", " ", page)
    page = re.sub(r"(?is)<(script|style|noscript|template)\b.*?</\1>", " ", page)
    page = re.sub(r"(?s)<[^>]+>", " ", page)
    return html.unescape(page)


def crawl(base: str) -> dict[str, str]:
    pages = {"/": fetch(base + "/"), "/blog": fetch(base + "/blog")}
    posts = sorted(set(re.findall(r'href="(/blog/[^"#?]+)"', pages["/"] + pages["/blog"])))
    for p in posts:
        pages[p] = fetch(base + p)
    return {path: visible_text(body) for path, body in pages.items()}


def with_case_forms(cps: set[int]) -> set[int]:
    out = set(cps)
    for cp in cps:
        ch = chr(cp)
        out |= {ord(c) for c in ch.lower() + ch.upper()}
    return out


def page_codepoints(text: str) -> set[int]:
    return {ord(c) for c in text if c not in "\n\r\t"}


# ---------------------------------------------------------------- build

def ranges(cps: set[int]) -> str:
    parts, sorted_cps, i = [], sorted(cps), 0
    while i < len(sorted_cps):
        j = i
        while j + 1 < len(sorted_cps) and sorted_cps[j + 1] == sorted_cps[j] + 1:
            j += 1
        a, b = sorted_cps[i], sorted_cps[j]
        parts.append(f"U+{a:04X}" if a == b else f"U+{a:04X}-{b:04X}")
        i = j + 1
    return ", ".join(parts)


def check_reserved_font_name(font: TTFont, job: FontJob) -> None:
    license_files = [GEIST_DIR / "LICENSE.txt"]
    texts = [str(n) for n in font["name"].names if n.nameID in (0, 13)]
    texts += [p.read_text() for p in license_files if p.exists()]
    # The OFL text itself mentions "Reserved Font Name" in its definitions; a
    # real reservation looks like `with Reserved Font Name "X"`.
    if any(re.search(r'Reserved Font Names?\s+["“]', t) for t in texts):
        sys.exit(f"{job.name}: the OFL declares a Reserved Font Name. Subsets are Modified Versions "
                 "and must be renamed (name IDs 1, 3, 4, 6, 16) before shipping.")


def drop_axis_below_default(font: TTFont, tag: str, lo: float, hi: float) -> None:
    """Remove everything that only applies below an axis' default value.

    fontTools' instancer would do this too, but it densifies the IUP-optimized
    gvar deltas, rounds them, and re-optimizes, which moves points by up to
    half a unit at every weight. Deleting the negative-side regions leaves
    every remaining delta untouched, so the font renders exactly as before at
    the default and above.
    """
    axis = next(a for a in font["fvar"].axes if a.axisTag == tag)
    if lo != axis.defaultValue or hi != axis.maxValue:
        sys.exit(f"{tag}: only clamping the minimum to the default ({axis.defaultValue}) with the maximum kept "
                 f"at {axis.maxValue} is lossless; asked for {lo}-{hi}")
    axis.minValue = lo
    font["fvar"].instances = [i for i in font["fvar"].instances if i.coordinates[tag] >= lo]
    for glyph, tvs in font["gvar"].variations.items():
        font["gvar"].variations[glyph] = [tv for tv in tvs if tv.axes.get(tag, (0, 0, 0))[1] >= 0]
    index = [a.axisTag for a in font["fvar"].axes].index(tag)
    stores = [font[t].table.VarStore for t in ("HVAR", "MVAR", "GDEF") if t in font and getattr(font[t].table, "VarStore", None)]
    for store in stores:
        negative = {i for i, r in enumerate(store.VarRegionList.Region) if r.VarRegionAxis[index].PeakCoord < 0}
        for data in store.VarData:
            keep = [k for k, ri in enumerate(data.VarRegionIndex) if ri not in negative]
            data.VarRegionIndex = [data.VarRegionIndex[k] for k in keep]
            data.VarRegionCount = len(keep)
            data.Item = [[row[k] for k in keep] for row in data.Item]
            data.calculateNumShorts()


def make_subset(job: FontJob, cps: set[int]) -> bytes:
    font = TTFont(job.source, recalcTimestamp=False)
    for tag, (lo, hi) in job.axes.items():
        drop_axis_below_default(font, tag, lo, hi)
    opts = subset.Options()
    opts.layout_features = DEFAULT_FEATURES
    opts.layout_scripts = ["*"]
    opts.hinting = job.hinting
    opts.name_IDs = NAME_IDS
    opts.drop_tables += DROP_TABLES
    opts.flavor = "woff2"
    sub = subset.Subsetter(opts)
    sub.populate(unicodes=sorted(cps))
    sub.subset(font)
    buf = io.BytesIO()
    font.recalcTimestamp = False
    font.save(buf)
    return buf.getvalue()


def ttf_bytes(data: bytes | Path) -> bytes:
    font = TTFont(io.BytesIO(data) if isinstance(data, bytes) else data, recalcTimestamp=False)
    font.flavor = None
    buf = io.BytesIO()
    font.save(buf)
    return buf.getvalue()


class Shaper:
    def __init__(self, data: bytes):
        self.face = hb.Face(data)
        self.font = hb.Font(self.face)
        self.cache: dict = {}

    def set_weight(self, weight: int | None) -> None:
        if weight is not None and "fvar" in TTFont(io.BytesIO(self.face.blob.data)):
            self.font.set_variations({"wght": weight})
        self.cache.clear()

    def outline(self, gid: int):
        if gid not in self.cache:
            pen = RecordingPen()
            self.font.draw_glyph_with_pen(gid, pen)
            self.cache[gid] = pen.value
        return self.cache[gid]

    def shape(self, text: str):
        buf = hb.Buffer()
        buf.add_str(text)
        buf.guess_segment_properties()
        hb.shape(self.font, buf, {})
        glyphs = [
            (pos.x_advance, pos.y_advance, pos.x_offset, pos.y_offset, self.outline(info.codepoint))
            for info, pos in zip(buf.glyph_infos, buf.glyph_positions)
        ]
        # HarfBuzz drops default-ignorables (soft hyphen) when the font has no
        # space glyph, as extended files don't; either way nothing is drawn.
        return [g for g in glyphs if g != (0, 0, 0, 0, [])]


def verify(job: FontJob, part: str, data: bytes, expected: set[int], source: TTFont, samples: list[str]) -> list[str]:
    errors = []
    font = TTFont(io.BytesIO(data))
    cmap = set(font.getBestCmap())
    if cmap != expected:
        errors.append(f"cmap mismatch: missing {ranges(expected - cmap) or '-'}, extra {ranges(cmap - expected) or '-'}")
    if job.axes:
        axes = {a.axisTag: (a.minValue, a.defaultValue, a.maxValue) for a in font["fvar"].axes}
        for tag, (lo, hi) in job.axes.items():
            src_default = next(a.defaultValue for a in source["fvar"].axes if a.axisTag == tag)
            if axes.get(tag) != (lo, src_default, hi):
                errors.append(f"axis {tag} is {axes.get(tag)}, expected ({lo}, {src_default}, {hi})")
    for t in ("GSUB", "GPOS"):
        if t in font and font[t].table.FeatureList:
            extra = {r.FeatureTag for r in font[t].table.FeatureList.FeatureRecord} - set(DEFAULT_FEATURES)
            if extra:
                errors.append(f"{t} kept non-default features {sorted(extra)}")
    if not job.hinting:
        left = [t for t in ("fpgm", "prep", "cvt ", "cvar", "hdmx", "VDMX") if t in font]
        instructed = sum(1 for g in font["glyf"].glyphs.values() if getattr(g, "program", None) and g.program.getBytecode())
        if left or instructed:
            errors.append(f"hinting left behind: tables {left}, {instructed} instructed glyphs")
    for tag in ("head", "hhea", "OS/2"):
        for attr in ("unitsPerEm", "ascent", "descent", "lineGap", "sTypoAscender", "sTypoDescender", "sTypoLineGap", "usWinAscent", "usWinDescent"):
            if hasattr(source[tag], attr) and getattr(source[tag], attr) != getattr(font[tag], attr):
                errors.append(f"{tag}.{attr} changed")
    # next/font derives the metric-adjusted fallback from these advances.
    if part == "core":
        src_cmap, out_cmap = source.getBestCmap(), font.getBestCmap()
        for ch in "abcdefghijklmnopqrstuvwxyz ":
            if source["hmtx"][src_cmap[ord(ch)]][0] != font["hmtx"][out_cmap[ord(ch)]][0]:
                errors.append(f"default advance of {ch!r} changed (would change the generated fallback face)")

    # Shape every character, every adjacent pair, and every same-file run of
    # crawled text in both fonts; outlines and positions must match exactly.
    original, subsetted = Shaper(ttf_bytes(job.source)), Shaper(ttf_bytes(data))
    chars = [chr(c) for c in sorted(expected)]
    texts = chars + [a + b for a in chars for b in chars] + samples
    for weight in job.used_weights or [None]:
        original.set_weight(weight)
        subsetted.set_weight(weight)
        bad = [t for t in texts if original.shape(t) != subsetted.shape(t)]
        if bad:
            errors.append(f"wght {weight}: {len(bad)} of {len(texts)} strings shape differently, e.g. {bad[:5]!r}")
    return errors


def runs_within(text: str, cps: set[int]) -> list[str]:
    """Maximal runs of `text` whose characters all belong to `cps`."""
    out, cur = [], []
    for ch in text:
        if ord(ch) in cps:
            cur.append(ch)
        else:
            if len(cur) > 1:
                out.append("".join(cur))
            cur = []
    if len(cur) > 1:
        out.append("".join(cur))
    return out


def boundary_kerning(job: FontJob, core: set[int], ext: set[int]) -> int:
    """Count core/extended character pairs the original font kerns or joins.

    Browsers shape each file separately, so those pairs lose kerning when one
    side comes from the extended file. Reported, not fixed: it is inherent to
    splitting a font.
    """
    shaper = Shaper(ttf_bytes(job.source))
    shaper.set_weight(400 if job.axes else None)
    width = {c: sum(g[0] for g in shaper.shape(chr(c))) for c in core | ext}
    n = 0
    for a in sorted(core):
        for b in sorted(ext):
            for s, (x, y) in ((chr(a) + chr(b), (a, b)), (chr(b) + chr(a), (b, a))):
                if sum(g[0] for g in shaper.shape(s)) != width[x] + width[y]:
                    n += 1
    return n


# ---------------------------------------------------------------- output

TS_HEADER = """// Generated by scripts/subset-fonts.py. Do not edit by hand: rerun the script
// (see its docstring for when) and commit the output.
//
// Each font is split in two. The core file (ASCII + common punctuation) is
// preloaded; the extended file sits behind unicode-range and only downloads on
// pages that use one of its characters.
import type { CSSProperties } from "react";
import localFont from "next/font/local";
"""

TS_FOOTER = """
// The extended face has to come straight after the core face. Anything in
// between (like next/font's metric-adjusted fallback) would draw extended
// characters before the real font gets a chance to.
function stack(core: string, extended: string) {
  const [primary, ...rest] = core.split(", ");
  return [primary, extended, ...rest].join(", ");
}

export const fontVariables = {
{vars}
} as CSSProperties;
"""


def ts_font(ident: str, file: str, job: FontJob, unicode_range: str, preload: bool) -> str:
    lines = [f"const {ident} = localFont({{", f'  src: "./{file}",', f'  weight: "{job.weight}",']
    if not preload:
        lines.append("  preload: false,")
    if not preload or not job.adjust_font_fallback:
        lines.append("  adjustFontFallback: false,")
    if preload and job.fallback:
        lines.append("  fallback: [")
        lines += [f'    "{f}",' for f in job.fallback]
        lines.append("  ],")
    lines.append(f'  declarations: [{{ prop: "unicode-range", value: "{unicode_range}" }}],')
    lines.append("});")
    return "\n".join(lines)


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--base", default=DEFAULT_BASE, help=f"site to crawl for used characters (default {DEFAULT_BASE})")
    ap.add_argument("--check", action="store_true", help="only report used characters the committed fonts miss")
    args = ap.parse_args()

    base = args.base.rstrip("/")
    print(f"crawling {base} ...")
    try:
        pages = crawl(base)
    except OSError as e:
        sys.exit(f"could not crawl {base}: {e}\nStart the site (pnpm build && pnpm start) or pass --base.")
    per_page = {p: page_codepoints(t) for p, t in pages.items()}
    used = with_case_forms(set().union(*per_page.values()))
    seen_on = Counter(cp for cps in per_page.values() for cp in cps)
    common = {cp for cp, n in seen_on.items() if n * 2 >= len(per_page)} | per_page["/"]
    print(f"  {len(pages)} pages, {len(used)} distinct characters (with case forms)")

    if args.check:
        manifest = json.loads((OUT_DIR / "manifest.json").read_text())
        missing = False
        for job in JOBS:
            source_cmap = set(TTFont(job.source).getBestCmap())
            have = {int(c, 16) for part in manifest["fonts"][job.name]["files"].values() for c in part["codepoints"]}
            lacking = (used & source_cmap) - have
            if lacking:
                missing = True
                print(f"  {job.name}: rerun needed, not in committed files: "
                      + " ".join(f"{chr(c)}(U+{c:04X})" for c in sorted(lacking)))
        sys.exit(1 if missing else 0)

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    geist_version = json.loads((GEIST_DIR / "package.json").read_text())["version"]
    manifest: dict = {"generator": "scripts/subset-fonts.py", "crawled": base, "geist": geist_version, "fonts": {}}
    decls, var_lines, failed = [], [], False
    texts = list(pages.values())

    for job in JOBS:
        source = TTFont(job.source)
        check_reserved_font_name(source, job)
        cmap = set(source.getBestCmap())
        core = ASCII | CORE_PUNCTUATION | common
        if job.core_latin:
            core |= with_case_forms((LATIN_1 | LATIN_EXT_A) & cmap)
        core &= cmap
        ext = (with_case_forms((LATIN_1 | LATIN_EXT_A) & cmap) | used | EXTRA_EXT) & cmap - core
        entry = {
            "source": str(job.source.relative_to(GEIST_DIR)),
            "sourceBytes": job.source.stat().st_size,
            "sourceSha256": hashlib.sha256(job.source.read_bytes()).hexdigest(),
            "axes": {k: list(v) for k, v in job.axes.items()},
            "hinting": job.hinting,
            "files": {},
        }
        for part, cps, preload in (("core", core, True), ("ext", ext, False)):
            mapped = cps | shared_script_codepoints(source.getBestCmap(), cps)
            if not preload:
                mapped |= AUTOHINT_REFERENCE & cmap
            data = make_subset(job, mapped)
            samples = [r for t in texts for r in runs_within(t, cps)]
            errors = verify(job, part, data, mapped, source, samples)
            file = f"{job.name}-{part}.woff2"
            (OUT_DIR / file).write_bytes(data)
            font = TTFont(io.BytesIO(data))
            print(f"  {file}: {len(data):>6} bytes, {len(font.getGlyphOrder())} glyphs, {len(cps)} codepoints"
                  + ("" if not errors else "\n    FAIL " + "\n    FAIL ".join(errors)))
            failed |= bool(errors)
            ident = job.ident + ("Core" if part == "core" else "Ext")
            decls.append(ts_font(ident, file, job, ranges(cps), preload))
            entry["files"][part] = {
                "file": file,
                "bytes": len(data),
                "glyphs": len(font.getGlyphOrder()),
                "unicodeRange": ranges(cps),
                "codepoints": [f"{c:04X}" for c in sorted(cps)],
            }
        entry["boundaryKernedPairs"] = boundary_kerning(job, core, ext)
        manifest["fonts"][job.name] = entry
        var_lines.append(f'  "{job.css_var}": stack({job.ident}Core.style.fontFamily, {job.ident}Ext.style.fontFamily),')

    (OUT_DIR / "index.ts").write_text(TS_HEADER + "\n" + "\n\n".join(decls) + "\n" + TS_FOOTER.replace("{vars}", "\n".join(var_lines)))
    (OUT_DIR / "manifest.json").write_text(json.dumps(manifest, indent=2, ensure_ascii=False) + "\n")
    if failed:
        sys.exit("verification failed; see FAIL lines above")
    print(f"wrote {OUT_DIR.relative_to(ROOT)}/")


if __name__ == "__main__":
    main()
