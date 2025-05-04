import React, { useState, useEffect, useRef } from "react";
import "../assets/css/home.css";

const DayNight = ({ data }) => {
  const images = data?.images || [];
  const frameCount = 60;
  const [frameIndex, setFrameIndex] = useState(0);
  const [showTutorial, setShowTutorial] = useState(true);

  const isDragging = useRef(false);
  const lastX = useRef(0);
  const deltaX = useRef(0);
  const animationFrame = useRef(null);

  useEffect(() => {
    // Preload images
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    // Hide tutorial after 5s
    const timer = setTimeout(() => setShowTutorial(false), 5000);
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(animationFrame.current);
    };
  }, []);

  const hideTutorial = () => {
    if (showTutorial) setShowTutorial(false);
  };

  const updateFrame = () => {
    const sensitivity = 8; // Higher = smoother
    const dx = deltaX.current;

    if (Math.abs(dx) >= sensitivity) {
      const direction = dx > 0 ? -1 : 1;
      setFrameIndex((prev) => (prev + direction + frameCount) % frameCount);
      deltaX.current = 0;
    }

    animationFrame.current = requestAnimationFrame(updateFrame);
  };

  const handleStart = (x) => {
    isDragging.current = true;
    lastX.current = x;
    hideTutorial();
    animationFrame.current = requestAnimationFrame(updateFrame);
  };

  const handleMove = (x) => {
    if (!isDragging.current) return;
    deltaX.current += x - lastX.current;
    lastX.current = x;
  };

  const handleEnd = () => {
    isDragging.current = false;
    deltaX.current = 0;
    cancelAnimationFrame(animationFrame.current);
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
        <div className="absolute w-max max-w-[90%] top-10 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-60 text-white text-base px-5 py-3 rounded-xl z-50 pointer-events-none animate-fadeInOut">
          <p className="text-sm">Swipe or drag left/right to explore day & night</p>
        </div>
      )}
      {images.length > 0 && (
        <img
          src={images[frameIndex]}
          alt={`Frame ${frameIndex}`}
          className="day_night_images rotate_view"
          draggable={false}
        />
      )}
    </div>
  );
};

export default DayNight;
