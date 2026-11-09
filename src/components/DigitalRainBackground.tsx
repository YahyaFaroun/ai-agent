"use client";

import { useEffect, useRef } from "react";

export default function DigitalRainBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    const fontSize = 14;
    const columns = Math.floor(width / 32);
    // Array of drops - y position for each column
    const drops: number[] = [];
    const speeds: number[] = [];
    const chars = "018932470123456789";

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
      speeds[i] = 0.5 + Math.random() * 0.8;
    }

    let lastDraw = 0;
    const fps = 30;
    const interval = 1000 / fps;

    const render = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(render);

      const delta = currentTime - lastDraw;
      if (delta < interval) return;
      lastDraw = currentTime - (delta % interval);

      // Semi-transparent background fade for subtle trail
      ctx.fillStyle = "rgba(6, 7, 9, 0.18)";
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px "Geist Mono", monospace`;

      for (let i = 0; i < columns; i++) {
        // Skip some columns randomly for sparse, elegant look
        if (i % 2 !== 0 && i % 3 !== 0) continue;

        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * 32;
        const y = drops[i] * fontSize;

        // Alternate colors: mostly very dim amber/ruby, occasionally bright orange or zinc
        const rand = Math.random();
        if (rand > 0.96) {
          ctx.fillStyle = "rgba(255, 120, 50, 0.75)"; // glowing amber highlight
        } else if (rand > 0.75) {
          ctx.fillStyle = "rgba(180, 50, 25, 0.4)"; // dark ruby
        } else if (rand > 0.5) {
          ctx.fillStyle = "rgba(160, 160, 175, 0.25)"; // zinc/silver
        } else {
          ctx.fillStyle = "rgba(120, 30, 15, 0.2)"; // faint ambient
        }

        ctx.fillText(char, x, y);

        if (y > height && Math.random() > 0.985) {
          drops[i] = 0;
        }

        drops[i] += speeds[i];
      }
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-40 mix-blend-screen"
    />
  );
}
