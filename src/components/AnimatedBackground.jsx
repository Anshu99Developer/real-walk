import React, { useEffect, useState } from "react";

export default function AnimatedBackground() {
  const [pos, setPos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = 100 - (e.clientX / window.innerWidth) * 100;
      const y = 100 - (e.clientY / window.innerHeight) * 100;
      setPos({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const style = {
    backgroundPosition: `${pos.x}% ${pos.y}%`,
  };

  return (
    <>
      <div className="animated-bg"></div>
      <div className="animated-follow-bg" style={style}></div>
    </>
  );
}
