import React, { useEffect, useState } from "react";
import * as THREE from "three";
import { useNavigate } from "react-router-dom";
import Popup from "./Popup";
import Loader from "./ui/Loader";

const listedCities = {
  India: ["Ahmedabad", "Mumbai", "Delhi", "Hyderabad"],
  Dubai: ["Jumeirah", "Hatta"],
};

const Globe = () => {
  const [showPopup, setShowPopup] = useState({ status: false, data: {} });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (loading) return;

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
      container.addEventListener("pointerdown", (event) => {
        const intersected = globe.getIntersectedObject(
          event.clientX,
          event.clientY
        );

        if (intersected) {
          const clickedObject = intersected.object;
          if (clickedObject.userData && clickedObject.userData.key) {
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
          }
        }
      });
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [loading]);

  useEffect(() => {
    const handleResize = () => {
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
      // Adjust globe container for mobile
      const container = document.getElementById("globe-container");
      if (container) {
        container.style.height = window.innerWidth < 768 ? "100dvh" : "100dvh";
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

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <header className="flex justify-between items-center p-4 bg-transparent fixed w-full top-0 left-0 z-10 animate-fadeIn">
        <img src="/main-logo.png" alt="Logo" className="h-10" />
        <button className="px-4 py-2 bg-transparent hover:bg-golden border border-golden text-white rounded-lg transition-all">
          Contact Us
        </button>
      </header>
      <div
        id="globe-container"
        className="w-full h-screen z-10 animate-fadeIn"
      ></div>
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
