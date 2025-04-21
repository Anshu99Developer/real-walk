import React, { useEffect, useState } from "react";
import * as THREE from "three";
import Popup from "./Popup";

const Globe = () => {
  const [showPopup, setShowPopup] = useState({ status: false, data: {} });

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
            "/globe/cloud0.jpg",
            35,
            "dubai" // Unique key for Dubai
          );
          globe.addAnimatedSprite(
            20.593684,
            78.96288,
            "/globe/cloud0.jpg",
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
              console.log("Dubai image clicked!");
              setShowPopup((prev) => ({
                ...prev,
                status: true,
                data: { title: "Dubai" },
              }));
            } else if (key === "india") {
              console.log("India image clicked!");
              setShowPopup((prev) => ({
                ...prev,
                status: true,
                data: { title: "India" },
              }));
            }
          } else {
            const point = intersected.point;
            const lat = 90 - (Math.acos(point.y / 200) * 180) / Math.PI;
            const lng =
              ((Math.atan2(point.z, point.x) * 180) / Math.PI + 180) % 360;

            if (lat > 5 && lat < 35 && lng > 65 && lng < 90) {
              alert("India clicked!");
            } else if (lat > 24.5 && lat < 25.5 && lng > 54.5 && lng < 55.5) {
              alert("Dubai clicked!");
            }
          }
        }
      });
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <div id="globe-container" className="w-full h-screen" />
      <Popup
        isOpen={showPopup?.status}
        onClose={() =>
          setShowPopup((prev) => ({ ...prev, status: false, data: {} }))
        }
        title="Custom Popup Title"
      >
        <p>This is a fully customizable popup component.</p>
        <button
          onClick={() =>
            setShowPopup((prev) => ({ ...prev, status: false, data: {} }))
          }
          className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Close
        </button>
      </Popup>
    </>
  );
};

export default Globe;
