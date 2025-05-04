import React, { useState, useEffect, useRef } from "react";
import "../assets/css/home.css";

const Home = ({ data }) => {
  const images = data?.images || [];
  const frameCount = images.length;
  const [frameIndex, setFrameIndex] = useState(0);

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

    return () => {
      cancelAnimationFrame(animationFrame.current);
    };
  }, [images]);

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
