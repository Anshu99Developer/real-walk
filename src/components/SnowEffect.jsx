import React, { useEffect, useRef } from "react";

const FLAKE_COUNT = 100;
const MAX_SIZE_PX = 2;
const FALL_SPEED = 0.4;
const WIND_VARIANCE = 0.5;

export default function SnowEffect() {
  const canvasRef = useRef(null);
  const flakesRef = useRef([]);

  const initFlakes = (w, h) => {
    flakesRef.current = Array.from({ length: FLAKE_COUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * MAX_SIZE_PX + 1,
      vy: Math.random() * FALL_SPEED + 0.5,
      vx: (Math.random() - 0.5) * WIND_VARIANCE,
    }));
  };

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const { innerWidth: w, innerHeight: h } = window;
    canvas.width = w;
    canvas.height = h;
    initFlakes(w, h);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let animationFrame;
    const render = () => {
      const { width: w, height: h } = canvas;
      ctx.clearRect(0, 0, w, h);

      flakesRef.current.forEach(f => {
        f.y += f.vy;
        f.x += f.vx;

        if (f.y > h + f.r) {
          f.y = -f.r;
          f.x = Math.random() * w;
        }
        if (f.x > w + f.r) f.x = -f.r;
        if (f.x < -f.r) f.x = w + f.r;

        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
        ctx.shadowBlur = 6;                      // soft blur
        ctx.shadowColor = "rgba(255, 255, 255, 0.9)";
        ctx.fill();
        ctx.shadowBlur = 0;                      // reset for next frame
      });

      animationFrame = requestAnimationFrame(render);
    };

    render();
    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        pointerEvents: "none",
        mixBlendMode: "screen",
        filter: "blur(1px)",       // optional global blur
      }}
    />
  );
}
