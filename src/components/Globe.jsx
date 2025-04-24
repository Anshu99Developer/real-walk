import React, { useEffect, useState } from "react";
import * as THREE from "three";
import { useNavigate } from "react-router-dom";
import Popup from "./Popup";

const listedCities = {
  India: ["Ahmedabad", "Mumbai", "Delhi", "Hyderabad"],
  Dubai: ["Jumeirah", "Hatta"],
};

const Globe = () => {
  const [showPopup, setShowPopup] = useState({ status: false, data: {} });
  const navigate = useNavigate();

  useEffect(() => {
    // Space snow animation using canvas
    const canvas = document.getElementById("particle-canvas");
    const ctx = canvas.getContext("2d");
    const particles = Array(100)
      .fill()
      .map(() => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        radius: Math.random() * 2,
        speedX: Math.random() * 0.5 - 0.25,
        speedY: Math.random() * 1 + 0.5,
      }));

    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Reset particle position if it goes out of bounds
        if (particle.y > window.innerHeight) particle.y = 0;
        if (particle.x > window.innerWidth) particle.x = 0;
        if (particle.x < 0) particle.x = window.innerWidth;
      });
      requestAnimationFrame(animateParticles);
    };

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    animateParticles();

    // Resize canvas on window resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    // Make THREE globally available
    window.THREE = THREE;

    // Load globe.js
    const script = document.createElement("script");
    script.src = "/globe/globe.js";
    script.onload = () => {
      const container = document.getElementById("globe-container");
      const globe = new window.DAT.Globe(container);

      fetch("/globe/population909500.json")
        .then((response) => response.json())
        .then((data) => {
          data.forEach((series) => {
            globe.addData(series[1], {
              format: "magnitude",
              name: series[0],
            });
          });
          globe.createPoints();
          globe.animate();

          // Add animated sprites for Dubai and India with unique keys
          globe.addAnimatedSprite(
            24, // Adjusted latitude for Dubai
            45, // Adjusted longitude for Dubai
            "/swirl.png",
            25,
            "dubai" // Unique key for Dubai
          );
          globe.addAnimatedSprite(
            21.5, // Adjusted latitude for India
            69, // Adjusted longitude for India
            "/swirl.png",
            35,
            "india" // Unique key for India
          );
          globe.animate();
        });
      // Handle click event
      container.addEventListener("click", (event) => {
        const intersected = globe.getIntersectedObject(
          event.clientX,
          event.clientY
        );

        if (intersected) {
          const clickedObject = intersected.object;
          if (clickedObject.userData && clickedObject.userData.key) {
            // Handle click based on unique key
            const key = clickedObject.userData.key;
            if (key === "dubai") {
              setShowPopup((prev) => ({
                ...prev,
                status: true,
                data: { title: "Dubai" },
              }));
              globe.zoomToLocation(25.276987, 55.296249);
            } else if (key === "india") {
              setShowPopup((prev) => ({
                ...prev,
                status: true,
                data: { title: "India" },
              }));
              globe.zoomToLocation(20.593684, 78.96288);
            }
          } else {
            const point = intersected.point;
            const lat = 90 - (Math.acos(point.y / 200) * 180) / Math.PI;
            const lng =
              ((Math.atan2(point.z, point.x) * 180) / Math.PI + 180) % 360;
          }
        }
      });
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const canvas = document.getElementById("particle-canvas");
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }

      const popup = document.getElementById("location-popup");
      if (popup) {
        popup.style.maxWidth = `${window.innerWidth * 0.8}px`;
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      // Adjust canvas size
      const canvas = document.getElementById("particle-canvas");
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }

      // Adjust globe container for mobile
      const container = document.getElementById("globe-container");
      if (container) {
        container.style.height = window.innerWidth < 768 ? "80vh" : "100vh";
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getLocationsByRegion = (region) => {
    if (region) {
      return (
        <ul className="border border-offWhite">
          {listedCities[region]?.map((city) => {
            return (
              <li
                key={city}
                className="py-2.5 px-5 uppercase transition-all duration-200 ease--out text-white text-center first:border-t-0 border-t border-offWhite cursor-pointer hover:text-raisinBlack hover:bg-golden"
                onClick={() => {
                  navigate(`/city/${city}`);
                }}
              >
                {city}
              </li>
            );
          })}
        </ul>
      );
    }
  };

  return (
    <>
      <header className="flex justify-between items-center p-4 bg-transparent fixed w-full top-0 left-0 z-10">
        <img src="/main-logo.png" alt="Logo" className="h-10" />
        <button className="px-4 py-2 bg-transparent hover:bg-golden border border-golden text-white rounded-lg">
          Contact Us
        </button>
      </header>
      <div id="globe-container" className="w-full h-screen z-10">
        <canvas
          id="particle-canvas"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 1,
            pointerEvents: "none",
          }}
        />
      </div>
      <Popup
        isOpen={showPopup?.status}
        onClose={() =>
          setShowPopup((prev) => ({ ...prev, status: false, data: {} }))
        }
        title={`Cities from ${showPopup?.data?.title}`}
      >
        {getLocationsByRegion(showPopup?.data?.title)}
      </Popup>
    </>
  );
};

export default Globe;
