"use client";

import { useEffect, useRef } from "react";

interface ColumnStream {
  x: number;
  y: number;
  speed: number;
  length: number;
  digits: string[];
  tickCounter: number;
  mutateEvery: number;
}

export default function DigitalRainBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let animationFrameId = 0;
    let width = 0;
    let height = 0;
    let streams: ColumnStream[] = [];

    const pool = "010123478901893201";
    const fontSize = 13;
    const lineStep = 18;

    const randomDigit = () => pool[Math.floor(Math.random() * pool.length)];

    const initStreams = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Sparse column spacing like Saifullah 2050 HUD
      const colSpacing = width < 640 ? 38 : 48;
      const count = Math.floor(width / colSpacing);
      streams = [];

      for (let i = 0; i < count; i++) {
        // Leave occasional breathing gaps for authentic sparse look
        if (i % 5 === 2) continue;
        const length = 7 + Math.floor(Math.random() * 9);
        const digits = Array.from({ length }, randomDigit);
        streams.push({
          x: Math.round(i * colSpacing + colSpacing * 0.5),
          y: Math.random() * (height + 300) - 150,
          speed: 0.45 + Math.random() * 0.65,
          length,
          digits,
          tickCounter: 0,
          mutateEvery: 8 + Math.floor(Math.random() * 16),
        });
      }
    };

    initStreams();
    window.addEventListener("resize", initStreams);

    let lastTime = 0;
    const frameInterval = 1000 / 30;

    const drawFrame = (now: number) => {
      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(drawFrame);
      }

      if (now - lastTime < frameInterval && !prefersReducedMotion) return;
      lastTime = now;

      ctx.clearRect(0, 0, width, height);
      ctx.font = `500 ${fontSize}px var(--font-geist-mono), ui-monospace, SFMono-Regular, Menlo, monospace`;
      ctx.textAlign = "center";

      for (let i = 0; i < streams.length; i++) {
        const s = streams[i];

        for (let j = 0; j < s.length; j++) {
          const dy = s.y - j * lineStep;
          if (dy < -lineStep || dy > height + lineStep) continue;

          if (j === 0) {
            // Crisp bright silver-warm lead digit at the bottom of the stream
            ctx.fillStyle = "rgba(244, 236, 228, 0.72)";
          } else if (j <= 2) {
            ctx.fillStyle = `rgba(255, 122, 56, ${(0.52 - j * 0.1).toFixed(2)})`;
          } else {
            const fade = Math.max(0.04, (1 - j / s.length) * 0.34);
            ctx.fillStyle = `rgba(185, 72, 32, ${fade.toFixed(2)})`;
          }

          ctx.fillText(s.digits[j], s.x, dy);
        }

        if (!prefersReducedMotion) {
          s.y += s.speed * 2.1;
          s.tickCounter += 1;
          if (s.tickCounter >= s.mutateEvery) {
            s.tickCounter = 0;
            const idx = Math.floor(Math.random() * s.length);
            s.digits[idx] = randomDigit();
          }

          if (s.y - s.length * lineStep > height + 40) {
            s.y = -Math.random() * 180;
          }
        }
      }
    };

    drawFrame(performance.now());

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", initStreams);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-80"
    />
  );
}
