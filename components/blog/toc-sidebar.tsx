"use client";

import Link from "next/link";
import { ArcadeUTurnLeft } from "@/components/icons/arcade-icons";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import type { TocHeading } from "@/lib/blog-toc";

interface TocSidebarProps {
  headings: TocHeading[];
}

export function TocSidebar({ headings }: TocSidebarProps) {
  const showList = headings.length >= 2;
  const [activeId, setActiveId] = useState<string>(headings[0]?.id ?? "");

  useEffect(() => {
    if (!showList) return;

    const elements = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    // Track which headings are currently within the "reading zone" (the band
    // just below the top of the viewport) and mark the topmost one active.
    const visible = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }

        // Pick the first heading (in document order) that is in view.
        const firstVisible = headings.find((h) => visible.has(h.id));
        if (firstVisible) {
          setActiveId(firstVisible.id);
        }
      },
      {
        // Activate a heading once it crosses into the top ~25% of the viewport,
        // and keep it active until the next one arrives.
        rootMargin: "-10% 0px -75% 0px",
        threshold: 0,
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings, showList]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    setActiveId(id);
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);
  };

  return (
    <nav
      aria-label="Table of contents"
      className="hidden xl:block fixed left-[max(1.5rem,calc(50%_-_31rem))] top-32 w-44 z-10"
    >
      <Link
        href="/blog"
        className="inline-flex items-center gap-[0.3em] text-[11px] tracking-wide text-neutral-600 hover:text-neutral-300 transition-colors duration-300"
      >
        <ArcadeUTurnLeft />
        <span className="font-pixel">see all</span>
      </Link>

      {showList && (
        <ul className="mt-4 space-y-2">
          {headings.map((h) => {
            const isActive = activeId === h.id;
            const isSub = h.level >= 3;
            return (
              <li
                key={h.id}
                style={{ paddingLeft: `${Math.max(0, h.level - 2) * 1.1}rem` }}
              >
                <a
                  href={`#${h.id}`}
                  onClick={(e) => handleClick(e, h.id)}
                  className={cn(
                    "block leading-snug transition-colors duration-300",
                    // Deeper headings are smaller and dimmer to show hierarchy.
                    isSub ? "text-[11px]" : "text-xs",
                    isActive
                      ? isSub
                        ? "text-neutral-300"
                        : "text-neutral-100"
                      : isSub
                        ? "text-neutral-600 hover:text-neutral-400"
                        : "text-neutral-500 hover:text-neutral-200",
                  )}
                >
                  {h.text}
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </nav>
  );
}
