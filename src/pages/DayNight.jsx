import React, { useState, useEffect, useRef } from "react";
import "../assets/css/home.css";
const DayNight = ({ data }) => {
  const images = data?.images || [];
  const frameCount = 60;
  const [frameIndex, setFrameIndex] = useState(0);
  const isDragging = useRef(false);
  const lastX = useRef(0);

  useEffect(() => {
    // Preload all frames
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  const handleStart = (x) => {
    isDragging.current = true;
    lastX.current = x;
  };

  const handleMove = (x) => {
    if (!isDragging.current) return;

    const dx = x - lastX.current;
    const sensitivity = 2; // Smaller = faster rotation

    if (Math.abs(dx) >= sensitivity) {
      const direction = dx > 0 ? -1 : 1;
      setFrameIndex((prev) => (prev + direction + frameCount) % frameCount);
      lastX.current = x;
    }
  };

  const handleEnd = () => {
    isDragging.current = false;
  };
  return (
    <div
      className="full-container developer-container"
      onMouseDown={(e) => handleStart(e.clientX)}
      onMouseMove={(e) => handleMove(e.clientX)}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchStart={(e) => handleStart(e.touches[0].clientX)}
      onTouchMove={(e) => handleMove(e.touches[0].clientX)}
      onTouchEnd={handleEnd}
    >
      <img
        src={images[frameIndex]}
        alt={`Frame ${frameIndex}`}
        className="day_night_images rotate_view"
        draggable={false}
      />
    </div>
  );
};

export default DayNight;
