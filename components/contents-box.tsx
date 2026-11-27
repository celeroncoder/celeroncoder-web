import type { TocHeading } from "@/lib/blog-toc";

/** Numbered "Contents" box at the top of a post, encyclopedia style. */
export function ContentsBox({ headings }: { headings: TocHeading[] }) {
  if (headings.length < 2) return null;

  const top = Math.min(...headings.map((h) => h.level));
  const counters: number[] = [];

  return (
    <nav
      aria-label="Contents"
      className="my-6 inline-block border border-[#a2a9b1] bg-[#f8f9fa] px-4 py-3 text-sm"
    >
      <p className="mb-1 text-center font-bold">Contents</p>
      <ol className="space-y-0.5">
        {headings.map((h) => {
          const depth = h.level - top;
          counters.length = depth + 1;
          counters[depth] = (counters[depth] ?? 0) + 1;
          const number = counters.map((n) => n ?? 1).join(".");
          return (
            <li key={h.id} style={{ paddingLeft: `${depth * 1.25}rem` }}>
              <span className="mr-1.5 text-[#54595d]">{number}</span>
              <a href={`#${h.id}`}>{h.text}</a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
