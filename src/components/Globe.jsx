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

      fetch("/globe/coordinates.json")
        .then((response) => response.json())
        .then((data) => {
          data.forEach((series) => {
            const flattened = series.coordinates.flat(); // Flatten to [lat, lon, mag, ...]
            globe.addData(flattened, {
              format: "magnitude",
              name: series.country,
              animated: true,
              countryName: series.country, // Pass country name
            });
          });
          globe.createPoints();
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
          if (clickedObject.userData && clickedObject.userData.country) {
            const country = clickedObject.userData.country;
            setShowPopup((prev) => ({
              ...prev,
              status: true,
              data: { title: country },
            }));
            if (country === "Dubai") {
              globe.zoomToLocation(25.276987, 55.296249);
            } else if (country === "India") {
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
        container.style.height = "100dvh";
      }
    };
  }, []);

  const getLocationsByRegion = (region) => {
    if (region) {
      return (
        <ul className="border border-raisinBlack">
          {listedCities[region]?.map((city) => {
            return (
              <li
                key={city}
                className="py-2.5 px-5 uppercase transition-all duration-200 ease--out text-raisinBlack text-center first:border-t-0 border-t border-raisinBlack cursor-pointer hover:text-golden hover:bg-raisinBlack"
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
      <header className="p-4 bg-transparent fixed w-full top-0 left-0 z-10 animate-fadeIn">
        <div className="flex justify-between items-center max-w-5xl mx-auto">
          <img src="/main-logo.png" alt="Logo" className="h-10" />
          <button className="px-4 py-2 bg-transparent hover:bg-golden border border-golden text-white rounded-lg transition-all">
            Contact Us
          </button>
        </div>
      </header>
      <div
        id="globe-container"
        className="w-full h-screen z-10 animate-fadeIn relative"
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
