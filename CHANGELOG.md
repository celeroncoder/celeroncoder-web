# Changelog

All notable changes to this project are documented here. The format is based on
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Changed

- **Early-web redesign**: every page is a plain white document in Times New
  Roman with classic blue/purple underlined links, a `[ GitHub | Twitter ]`
  link bar, encyclopedia-style titles, text straight on the page (no card), a
  numbered "Contents" box and a "Categories" box on posts, and light code
  blocks. Behind it runs an animated, dithered ASCII noise background (black on
  white, frozen for reduced motion) that fades almost out behind the text
  column. (`components/retro-page.tsx`, `components/ascii-background.tsx`)
- **Home page goes straight to the posts**: the intro paragraph, skills, about,
  and projects sections are gone; the page is the name and the full post
  list. The link bar only has GitHub and Twitter.

### Removed

- The dithering shader backgrounds, the green hover-band blog lists, and the
  scroll-spy table-of-contents sidebar.
- Geist fonts and `scripts/subset-fonts.py` (no web fonts are loaded now), and
  the unused dark card components.

### Added

- **Markdown page mirrors**: public pages now expose `text/markdown` versions
  at `/.md`, `/index.md`, `/blog.md`, and `/blog/<slug>.md`. Blog posts are
  converted directly from Payload Lexical content, and HTML pages advertise
  their Markdown alternate for discovery.
- **Blog reading sidebar** — a sticky table of contents that scroll-spies the
  current section as you read, with smooth-scroll anchor links to every heading.
  Hierarchy is conveyed through indentation and dimming: `h2` headings are
  prominent, `h3`+ are smaller and muted. A minimal "see all" back link sits at
  the top. The sidebar is shown on `xl`+ screens; below that the back link falls
  back to the top of the article.
  (`components/blog/toc-sidebar.tsx`, `lib/blog-toc.ts`)
- **Heading anchors** — post headings render stable, de-duplicated `id`s, so the
  table of contents and `#fragment` deep links resolve to the correct section.
- **Markdown paste in the post editor** — pasting raw Markdown into the Lexical
  editor now converts to rich text (headings, lists, bold, links, code, …)
  instead of being dropped to plain text. Conversion runs through the editor's
  own Markdown transformers in a detached editor, then inserts the result at the
  cursor as serialized nodes — preserving existing content and custom nodes such
  as code blocks. (`features/markdown-paste/`)
- **Fenced code blocks** — enabled Payload's `CodeBlock`, so ` ``` ` fences work
  via the toolbar, Markdown typing, and Markdown paste. The language field
  accepts any token (e.g. ` ```tree `), not just the preset list.
  (`features/code-block.ts`)
- **Code syntax highlighting** — code blocks render on the public blog with
  highlight.js (github-dark theme), falling back to language auto-detection when
  a fence has no language tag.

### Changed

- **Faster web fonts**: font bytes per page drop from 201,800 to 26,308. Geist Sans
  and Geist Pixel Square are subset into a preloaded core file and a lazy extended
  file (behind `unicode-range`), and Pixel's hinting is dropped; the four unused
  Pixel variants are no longer preloaded. Rendering is unchanged. Regenerate with `uv run scripts/subset-fonts.py`.
  (`lib/fonts/`, `scripts/subset-fonts.py`)
- Typography is now lowercase site-wide (`text-transform: lowercase`).

### Dependencies

- Added `lexical`, `@lexical/markdown`, `@lexical/react`, `@lexical/clipboard`,
  and `@lexical/html` (all `0.35.0`, matching the Payload-bundled version), plus
  `highlight.js`.
