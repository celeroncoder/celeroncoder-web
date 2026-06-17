"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { ArcadeArrowUpRight } from "@/components/icons/arcade-icons";
import { motion, useSpring, useTransform, type MotionValue } from "framer-motion";

export type BlogsListItem = {
  id: string | number;
  title: string;
  slug: string;
  publishedAt: string;
};

const ACCENT = { r: 34, g: 197, b: 94 };
const SPREAD = 2.6;
const MAX_ALPHA = 0.95;
const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

function Row({
  item,
  index,
  pos,
  strength,
  spread,
  onActivate,
}: {
  item: BlogsListItem;
  index: number;
  pos: MotionValue<number>;
  strength: MotionValue<number>;
  spread: MotionValue<number>;
  onActivate: (i: number) => void;
}) {
  const background = useTransform([pos, strength, spread], ([p, st, sp]: number[]) => {
    const dist = Math.abs(index - p);
    const s = dist < 0.5 ? st : sp;
    const tint = clamp01(1 - dist / SPREAD);
    const a = tint * tint * s * MAX_ALPHA;
    return `rgba(${ACCENT.r}, ${ACCENT.g}, ${ACCENT.b}, ${a})`;
  });

  const ink = useTransform([pos, strength, spread], ([p, st, sp]: number[]) => {
    const dist = Math.abs(index - p);
    const s = dist < 0.5 ? st : sp;
    const k = clamp01(1 - dist / 1.15) * s;
    return `rgb(${Math.round(255 * (1 - k))}, ${Math.round(255 * (1 - k))}, ${Math.round(255 * (1 - k))})`;
  });

  const mutedInk = useTransform([pos, strength, spread], ([p, st, sp]: number[]) => {
    const dist = Math.abs(index - p);
    const s = dist < 0.5 ? st : sp;
    const k = clamp01(1 - dist / 1.15) * s;
    return `rgb(${Math.round(115 * (1 - k))}, ${Math.round(115 * (1 - k))}, ${Math.round(115 * (1 - k))})`;
  });

  return (
    <li>
      <Link
        href={`/blog/${item.slug}`}
        className="block outline-none"
        onMouseEnter={() => onActivate(index)}
        onFocus={() => onActivate(index)}
      >
        <motion.div
          style={{ background }}
          className="flex items-baseline gap-4 px-1 py-3.5"
        >
          <motion.span style={{ color: mutedInk }} className="font-pixel text-xs">
            {String(index + 1).padStart(2, "0")}
          </motion.span>
          <motion.h3
            style={{ color: ink }}
            className="min-w-0 flex-1 truncate font-pixel text-sm font-medium"
          >
            {item.title}
          </motion.h3>
          <motion.span
            suppressHydrationWarning
            style={{ color: mutedInk }}
            className="shrink-0 font-pixel text-xs"
          >
            {new Date(item.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </motion.span>
        </motion.div>
      </Link>
    </li>
  );
}

export function BlogsList({ posts }: { posts: BlogsListItem[] }) {
  const [, setActive] = useState(0);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const pos = useSpring(0, { stiffness: 220, damping: 26, mass: 0.9 });
  const strength = useSpring(0, { stiffness: 260, damping: 30 });
  const spread = useSpring(0, { stiffness: 260, damping: 30 });

  const activate = (i: number) => {
    pos.set(i);
    strength.set(1);
    spread.set(1);
    setActive(i);
    if (idleTimer.current) clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => spread.set(0), 400);
  };

  return (
    <ul
      className="divide-y divide-neutral-800 border-y border-neutral-800"
      onMouseLeave={() => {
        if (idleTimer.current) clearTimeout(idleTimer.current);
        strength.set(0);
        spread.set(0);
      }}
    >
      {posts.map((item, i) => (
        <Row
          key={item.id}
          item={item}
          index={i}
          pos={pos}
          strength={strength}
          spread={spread}
          onActivate={activate}
        />
      ))}
    </ul>
  );
}
