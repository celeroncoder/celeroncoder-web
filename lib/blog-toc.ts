// Utilities for building a table of contents from Payload Lexical rich text.
// Shared between the server page (heading extraction + anchor ids) and the
// client TOC sidebar (scroll-spy navigation).

export interface TocHeading {
  id: string;
  text: string;
  /** Heading level, 2-6 (matches h2..h6). */
  level: number;
}

/** Turn heading text into a URL-safe anchor slug. */
export function slugify(text: string): string {
  return (
    text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "") || "section"
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function nodeToText(node: any): string {
  if (!node) return "";
  if (typeof node.text === "string") return node.text;
  if (Array.isArray(node.children)) return node.children.map(nodeToText).join("");
  return "";
}

/**
 * Extract every heading node from Lexical editor state in document order,
 * assigning each a unique anchor id (duplicate slugs get a numeric suffix).
 *
 * The same ordered list is used to render anchor ids on the headings, so the
 * TOC links always resolve to a real element.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function extractHeadings(data: any): TocHeading[] {
  const children = data?.root?.children;
  if (!Array.isArray(children)) return [];

  const seen = new Map<string, number>();
  const headings: TocHeading[] = [];

  for (const node of children) {
    if (node?.type !== "heading") continue;
    const tag: string = typeof node.tag === "string" ? node.tag : "h2";
    const level = Number(tag.replace("h", "")) || 2;
    const text = nodeToText(node).trim();
    if (!text) continue;

    const base = slugify(text);
    const count = seen.get(base) ?? 0;
    seen.set(base, count + 1);
    const id = count === 0 ? base : `${base}-${count}`;

    headings.push({ id, text, level });
  }

  return headings;
}
