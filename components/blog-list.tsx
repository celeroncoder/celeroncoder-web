"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState, type RefObject } from "react";
import { useRouter } from "next/navigation";
import { motion, useSpring, useTransform, type MotionValue } from "framer-motion";
import { DitheringShader } from "@/components/ui/dithering-shader";

export type BlogListItem = {
  id: string | number;
  title: string;
  slug: string;
  excerpt?: string | null;
  publishedAt: string;
  readTime?: string | null;
  heroImage?: {
    url: string;
    alt: string;
    width?: number | null;
    height?: number | null;
  } | null;
};

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

const ACCENT = { r: 34, g: 197, b: 94 }; // #22c55e
const SPREAD = 2.6; // how many rows the tint band reaches
const MAX_ALPHA = 0.95;

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

function Row({
  post,
  index,
  pos,
  strength,
  spread,
  dirRef,
  onActivate,
}: {
  post: BlogListItem;
  index: number;
  pos: MotionValue<number>;
  strength: MotionValue<number>;
  spread: MotionValue<number>;
  dirRef: RefObject<number>;
  onActivate: (i: number) => void;
}) {
  // signed = index - pos: negative means this row is above current, positive means below.
  // Going down (dir=+1): tail trails upward → tint rows where signed < 0.
  // Going up  (dir=-1): tail trails downward → tint rows where signed > 0.
  const tailActive = (signed: number, dir: number) =>
    dir === 0 ? false : dir > 0 ? signed < 0 : signed > 0;

  const background = useTransform([pos, strength, spread], ([p, st, sp]: number[]) => {
    const signed = index - p;
    const dist = Math.abs(signed);
    const isHovered = dist < 0.5;
    const isTail = !isHovered && tailActive(signed, dirRef.current ?? 0);
    const s = isHovered ? st : isTail ? sp : 0;
    const tint = clamp01(1 - dist / SPREAD);
    const a = tint * tint * s * MAX_ALPHA;
    return `rgba(${ACCENT.r}, ${ACCENT.g}, ${ACCENT.b}, ${a})`;
  });

  const ink = useTransform([pos, strength, spread], ([p, st, sp]: number[]) => {
    const signed = index - p;
    const dist = Math.abs(signed);
    const isHovered = dist < 0.5;
    const isTail = !isHovered && tailActive(signed, dirRef.current ?? 0);
    const s = isHovered ? st : isTail ? sp : 0;
    const k = clamp01(1 - dist / 1.15) * s;
    const v = Math.round(255 * (1 - k));
    return `rgb(${v}, ${v}, ${v})`;
  });

  const mutedInk = useTransform([pos, strength, spread], ([p, st, sp]: number[]) => {
    const signed = index - p;
    const dist = Math.abs(signed);
    const isHovered = dist < 0.5;
    const isTail = !isHovered && tailActive(signed, dirRef.current ?? 0);
    const s = isHovered ? st : isTail ? sp : 0;
    const k = clamp01(1 - dist / 1.15) * s;
    const v = Math.round(115 * (1 - k));
    return `rgb(${v}, ${v}, ${v})`;
  });

  return (
    <li>
      <Link
        href={`/blog/${post.slug}`}
        prefetch
        className="block outline-none"
        onMouseEnter={() => onActivate(index)}
        onFocus={() => onActivate(index)}
      >
        <motion.div
          style={{ background }}
          className="flex items-baseline gap-4 px-4 py-1"
        >
          <motion.span
            style={{ color: mutedInk }}
            className="font-pixel text-xs"
          >
            {String(index + 1).padStart(2, "0")}
          </motion.span>
          <motion.h2
            style={{ color: ink }}
            className="min-w-0 flex-1 truncate font-pixel text-sm font-medium"
          >
            {post.title}
          </motion.h2>
          <motion.span
            suppressHydrationWarning
            style={{ color: mutedInk }}
            className="shrink-0 font-pixel text-xs"
          >
            {formatDate(post.publishedAt)}
          </motion.span>
        </motion.div>
      </Link>
    </li>
  );
}

export function BlogList({ posts }: { posts: BlogListItem[] }) {
  const router = useRouter();
  const [active, setActive] = useState<number>(0);
  const [hovering, setHovering] = useState(false);
  const [shaderSize, setShaderSize] = useState({ width: 600, height: 750 });
  const panelRef = useRef<HTMLDivElement>(null);

  // Spring-damped band: pos glides through in-between rows (the trailing
  // sweep), strength fades the whole tint in/out on enter/leave.
  const pos = useSpring(0, { stiffness: 220, damping: 26, mass: 0.9 });
  const strength = useSpring(0, { stiffness: 260, damping: 30 });

  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const spread = useSpring(0, { stiffness: 260, damping: 30 });
  const prevRef = useRef<number | null>(null);
  const dirRef = useRef<number>(0);

  const activate = (i: number) => {
    if (prevRef.current !== null && i !== prevRef.current) {
      dirRef.current = i > prevRef.current ? 1 : -1;
    }
    prevRef.current = i;
    pos.set(i);
    strength.set(1);
    spread.set(1);
    setActive(i);
    setHovering(true);
    if (idleTimer.current) clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => spread.set(0), 400);
  };

  // Crazy prefetching: warm every route payload and hero image up front.
  useEffect(() => {
    posts.forEach((post) => {
      router.prefetch(`/blog/${post.slug}`);
      if (post.heroImage?.url) {
        const img = new window.Image();
        img.src = post.heroImage.url;
      }
    });
  }, [posts, router]);

  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    const update = () =>
      setShaderSize({ width: el.clientWidth, height: el.clientHeight });
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-12">
      {/* Sticky preview panel — green dithering backdrop + hovered hero image */}
      <div className="hidden lg:block">
        <div
          ref={panelRef}
          className="sticky top-16 aspect-[4/5] w-full overflow-hidden rounded-lg border border-neutral-800 bg-black"
        >
          <div className="absolute inset-0 opacity-60">
            <DitheringShader
              shape="wave"
              type="8x8"
              colorBack="#000000"
              colorFront="#22c55e"
              pxSize={3}
              speed={0.4}
              width={shaderSize.width}
              height={shaderSize.height}
              className="!h-full !w-full"
              style={{ width: "100%", height: "100%" }}
            />
          </div>

          {posts.map((post, i) => {
            const url = post.heroImage?.url;
            if (!url) return null;
            const show = hovering && i === active;
            return (
              <div
                key={post.id}
                className="absolute inset-0 transition-opacity duration-500 ease-out"
                style={{ opacity: show ? 1 : 0 }}
                aria-hidden={!show}
              >
                <Image
                  src={url}
                  alt={post.heroImage?.alt ?? post.title}
                  fill
                  sizes="(max-width: 1024px) 0px, 40vw"
                  className="object-cover mix-blend-luminosity"
                  priority={i < 3}
                />
                <div className="absolute inset-0 bg-[#22c55e] mix-blend-color opacity-50" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              </div>
            );
          })}

          <div className="pointer-events-none absolute bottom-0 left-0 right-0 p-5">
            <p className="font-pixel text-xs uppercase tracking-wide text-[#22c55e]">
              {String(active + 1).padStart(2, "0")} /{" "}
              {String(posts.length).padStart(2, "0")}
            </p>
            <p className="mt-1 font-pixel text-sm text-white">
              {posts[active]?.title}
            </p>
          </div>
        </div>
      </div>

      {/* The list */}
      <ul
        className="divide-y divide-neutral-800 border-y border-neutral-800"
        onMouseLeave={() => {
          if (idleTimer.current) clearTimeout(idleTimer.current);
          strength.set(0);
          spread.set(0);
          prevRef.current = null;
          dirRef.current = 0;
          setHovering(false);
        }}
      >
        {posts.map((post, i) => (
          <Row
            key={post.id}
            post={post}
            index={i}
            pos={pos}
            strength={strength}
            spread={spread}
            dirRef={dirRef}
            onActivate={activate}
          />
        ))}
      </ul>
    </div>
  );
}
