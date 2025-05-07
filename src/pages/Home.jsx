import React, { useState, useEffect, useRef } from "react";
import "../assets/css/home.css";

const Home = ({ data }) => {
  const images = data?.images || [];
  const frameCount = images.length;
  const [frameIndex, setFrameIndex] = useState(0);
  const [showTutorial, setShowTutorial] = useState(true);

  const isDragging = useRef(false);
  const lastX = useRef(0);
  const deltaX = useRef(0);
  const animationFrame = useRef(null);

  useEffect(() => {
    // Preload all images
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
  }, [images]);

  const hideTutorial = () => {
    if (showTutorial) setShowTutorial(false);
  };

  const updateFrame = () => {
    const sensitivity = 10; // Increase for smoother motion
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
    cancelAnimationFrame(animationFrame.current);
    deltaX.current = 0;
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
        <div className="absolute w-max max-w-[90%] bottom-12 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-60 text-white text-base px-5 py-3 rounded-xl z-50 pointer-events-none animate-fadeInOut">
          <p className="text-sm">Swipe or drag left/right to explore 360 view</p>
        </div>
      )}
      {images.length > 0 && (
        <img
          src={images[frameIndex]}
          alt={`Frame ${frameIndex}`}
          className="home_page_images rotate_view"
          draggable={false}
        />
      )}
    </div>
  );
};

export default Home;
