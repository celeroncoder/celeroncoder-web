"use client";

import { useEffect, useRef } from "react";

// Density ramp, light to dark. Mid tones get swapped for random "gibberish"
// glyphs so the field reads as noise rather than a clean gradient.
const RAMP = " .·:-~=+*x#%@";
const GIBBERISH = "abcdefghijklmnopqrstuvwxyz0123456789{}[]<>/\\|?!;$&^";

// 4x4 Bayer matrix, normalised to [0, 1). Ordered dithering between ramp steps.
const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => v / 16);

const CELL_W = 8;
const CELL_H = 13;
const FPS = 12;

function hash(x: number, y: number, t: number) {
  let h = (x * 374761393 + y * 668265263 + t * 2147483647) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

/** Abstract, slowly drifting field in [0, 1]: a few domain-warped sine layers. */
function field(x: number, y: number, t: number) {
  const wx = x + 0.9 * Math.sin(y * 0.7 + t * 0.21);
  const wy = y + 0.9 * Math.cos(x * 0.6 - t * 0.17);
  const v =
    Math.sin(wx * 1.3 + t * 0.3) * 0.45 +
    Math.sin(wy * 1.7 - t * 0.23) * 0.35 +
    Math.sin((wx + wy) * 0.9 + t * 0.11) * 0.35 +
    Math.sin(Math.hypot(wx - 3, wy - 2) * 1.6 - t * 0.4) * 0.3;
  return Math.min(1, Math.max(0, v * 0.42 + 0.42));
}

// Fades the field almost out behind the centered text column (max-w-3xl,
// 768px) so the content stays readable, and back to full strength outside it.
const COLUMN_MASK =
  "linear-gradient(to right, #000 calc(50% - 470px), rgb(0 0 0 / 0.06) calc(50% - 400px), rgb(0 0 0 / 0.06) calc(50% + 400px), #000 calc(50% + 470px))";

/**
 * Full-page canvas of dithered ASCII noise, black on white. Purely decorative:
 * hidden from assistive tech, frozen on one frame for reduced motion, and
 * paused while the tab is hidden.
 */
export function AsciiBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let cols = 0;
    let rows = 0;
    let raf = 0;
    let last = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = `11px ui-monospace, "Courier New", monospace`;
      ctx.textBaseline = "top";
      ctx.fillStyle = "#000";
      cols = Math.ceil(w / CELL_W);
      rows = Math.ceil(h / CELL_H);
    };

    const draw = (ms: number) => {
      const t = ms / 1000;
      // Glyph choices reshuffle a couple of times a second, not every frame.
      const tick = Math.floor(t * 2);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const steps = RAMP.length - 1;
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const v = field(x * 0.045, y * 0.07, t);
          const level = Math.min(steps, Math.floor(v * steps + BAYER[(y & 3) * 4 + (x & 3)]));
          if (level === 0) continue;
          const ch =
            level > 3 && level < steps - 1 && hash(x, y, tick) < 0.35
              ? GIBBERISH[Math.floor(hash(y, x, tick) * GIBBERISH.length)]
              : RAMP[level];
          ctx.fillText(ch, x * CELL_W, y * CELL_H);
        }
      }
    };

    const loop = (ms: number) => {
      raf = requestAnimationFrame(loop);
      if (document.hidden || ms - last < 1000 / FPS) return;
      last = ms;
      draw(ms);
    };

    resize();
    draw(0);
    if (!reduce) raf = requestAnimationFrame(loop);

    const onResize = () => {
      resize();
      draw(performance.now());
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full opacity-40"
      style={{ maskImage: COLUMN_MASK, WebkitMaskImage: COLUMN_MASK }}
    />
  );
}
