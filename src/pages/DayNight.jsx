import React, { useState, useEffect, useRef } from "react";
import "../assets/css/home.css";

const DayNight = ({ data }) => {
  const images = data?.images || [];
  const frameCount = 60;
  const [frameIndex, setFrameIndex] = useState(0);
  const [showTutorial, setShowTutorial] = useState(true);
  const isDragging = useRef(false);
  const lastX = useRef(0);

  useEffect(() => {
    // Preload all frames
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    // Auto-hide tutorial after 5 seconds
    const timer = setTimeout(() => setShowTutorial(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const hideTutorial = () => {
    if (showTutorial) setShowTutorial(false);
  };

  const handleStart = (x) => {
    isDragging.current = true;
    lastX.current = x;
    hideTutorial();
  };

  const handleMove = (x) => {
    if (!isDragging.current) return;

    const dx = x - lastX.current;
    const sensitivity = 2;

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
      {showTutorial && (
        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-60 text-white text-base px-5 py-3 rounded-xl z-50 pointer-events-none animate-fadeInOut">
          <p>Swipe or drag left/right to explore day & night</p>
        </div>
      )}
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
