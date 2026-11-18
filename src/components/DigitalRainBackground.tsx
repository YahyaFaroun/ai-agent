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

    // Erweiterter Pool für authentischen Coding- / Terminal-Look (Binär, Hex, Syntax)
    const pool = "01010101ABCDEF01<>/{}[];:=+*~#$_0123456789";
    const fontSize = window.innerWidth < 640 ? 15 : 18;
    const lineStep = window.innerWidth < 640 ? 20 : 24;

    const randomDigit = () => pool[Math.floor(Math.random() * pool.length)];

    const initStreams = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Größere Zeichen benötigen angepassten Spaltenabstand
      const colSpacing = width < 640 ? 32 : 42;
      const count = Math.floor(width / colSpacing);
      streams = [];

      for (let i = 0; i < count; i++) {
        // Gezielte Freiräume für saubere HUD-Optik
        if (i % 6 === 2) continue;
        const length = 8 + Math.floor(Math.random() * 12);
        const digits = Array.from({ length }, randomDigit);
        streams.push({
          x: Math.round(i * colSpacing + colSpacing * 0.5),
          y: Math.random() * (height + 300) - 150,
          speed: 0.55 + Math.random() * 0.75,
          length,
          digits,
          tickCounter: 0,
          mutateEvery: 6 + Math.floor(Math.random() * 14),
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
      ctx.font = `600 ${fontSize}px "JetBrains Mono", "Fira Code", var(--font-geist-mono), ui-monospace, monospace`;
      ctx.textAlign = "center";

      for (let i = 0; i < streams.length; i++) {
        const s = streams[i];

        for (let j = 0; j < s.length; j++) {
          const dy = s.y - j * lineStep;
          if (dy < -lineStep || dy > height + lineStep) continue;

          if (j === 0) {
            // Leuchtender Gold-Kopf des Datenstroms
            ctx.fillStyle = "rgba(255, 238, 185, 0.95)";
          } else if (j <= 2) {
            // Intensives Terminal-Bernstein
            ctx.fillStyle = `rgba(255, 140, 66, ${(0.75 - j * 0.15).toFixed(2)})`;
          } else {
            // Matrix-Phosphor Auslauf
            const fade = Math.max(0.06, (1 - j / s.length) * 0.45);
            ctx.fillStyle = `rgba(215, 95, 30, ${fade.toFixed(2)})`;
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
