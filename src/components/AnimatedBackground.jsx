import React, { useEffect } from "react";

export default function AnimatedBackground() {
  useEffect(() => {
    const mousePositions = [];
    let isAnimating = false;

    const getElementOffset = (el) => {
      const rect = el.getBoundingClientRect();
      return {
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX,
      };
    };

    const handleMouseMove = (e) => {
      const timestamp = Date.now();
      mousePositions.push({ x: e.pageX, y: e.pageY, timestamp });

      if (!isAnimating) {
        isAnimating = true;
        updateGradient();
      }
    };

    const updateGradient = () => {
      const latest = mousePositions[mousePositions.length - 1];

      if (latest) {
        const elements = document.querySelectorAll(".radial-gradient");
        elements.forEach((el) => {
          const offset = getElementOffset(el);
          const width = el.offsetWidth;
          const height = el.offsetHeight;

          const relX = latest.x - offset.left;
          const relY = latest.y - offset.top;

          const xPercent = Math.max(0, Math.min(100, (relX / width) * 100));
          const yPercent = Math.max(0, Math.min(100, (relY / height) * 100));

          el.style.background = `radial-gradient(circle 1000px at ${xPercent}% ${yPercent}%, rgba(255, 200, 100, 0.35), rgba(255, 200, 100, 0.1))`;
        });
      }

      if (mousePositions.length > 0) {
        requestAnimationFrame(updateGradient);
      } else {
        isAnimating = false;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="background-gradient">
      {/* {[...Array(6)].map((_, i) => (
        <div className="radial-gradient" key={i}></div>
      ))} */}
    </div>
  );
}
