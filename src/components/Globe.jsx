import React, { useEffect, useState } from "react";
import * as THREE from "three";
import { useNavigate } from "react-router-dom";
import Popup from "./Popup";

const listedCities = {
  India: ["Ahmedabad", "Mumbai", "Delhi", "Hyderabad"],
  Dubai: ["Ahmedabad", "Mumbai", "Hyderabad"],
};

const Globe = () => {
  const [showPopup, setShowPopup] = useState({ status: false, data: {} });
  const navigate = useNavigate();

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
            25.276987,
            55.296249,
            "/spin-swirl.gif",
            35,
            "dubai" // Unique key for Dubai
          );
          globe.addAnimatedSprite(
            20.593684,
            78.96288,
            "/spin-swirl.gif",
            35,
            "india" // Unique key for India
          );
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
                data: { title: "dubai" },
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

  const getLocationsByRegion = (region) => {
    if (region == "India") {
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
      <div id="globe-container" className="w-full h-screen" />
      <Popup
        isOpen={showPopup?.status}
        onClose={() =>
          setShowPopup((prev) => ({ ...prev, status: false, data: {} }))
        }
        title="Cities"
      >
        {getLocationsByRegion(showPopup?.data?.title)}
      </Popup>
    </>
  );
};

export default Globe;
