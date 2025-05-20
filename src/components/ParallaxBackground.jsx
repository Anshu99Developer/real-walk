import React, { useEffect, useRef } from "react";

const ParallaxBackground = () => {
  const backgroundRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      const x = (mouseX - innerWidth / 2) / 40;
      const y = (mouseY - innerHeight / 2) / 40;

      if (backgroundRef.current) {
        backgroundRef.current.style.transform = `translate(${x}px, ${y}px) scale(1.05)`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="parallax-container">
      <div ref={backgroundRef} className="parallax-background"></div>
    </div>
  );
};

export default ParallaxBackground;
