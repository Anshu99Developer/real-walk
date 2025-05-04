import { useEffect, useRef, useState } from "react";

const residentialLocations = [
  {
    name: "Antilia Anant",
    id: "antilia-anant",
    lat: 23.06329379150407,
    lng: 72.55172493497427,
  },
];
const Location = () => {
  const mapRef = useRef(null);
  const googleMap = useRef(null);
  const markerRef = useRef(null);

  const cubePositionRef = useRef({
    lat: residentialLocations[0].lat,
    lng: residentialLocations[0].lng,
    altitude: 50,
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const currentBuilding = residentialLocations[currentIndex];

  useEffect(() => {
    const interval = setInterval(() => {
      if (
        window.google &&
        window.google.maps &&
        window.google.maps.WebGLOverlayView
      ) {
        const map = new window.google.maps.Map(mapRef.current, {
          center: {
            lat: currentBuilding.lat,
            lng: currentBuilding.lng,
          },
          zoom: 19,
          heading: 0,
          tilt: 55,
          mapId: "7c8c7702d4d75ac4",
          disableDefaultUI: true,
        });

        googleMap.current = map;

        // Create a marker
        const marker = new window.google.maps.Marker({
          position: { lat: currentBuilding.lat, lng: currentBuilding.lng },
          map: map,
          title: currentBuilding.name,
        });
        markerRef.current = marker;

        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const map = googleMap.current;
    const marker = markerRef.current;
    const building = residentialLocations[currentIndex];

    if (map && overlay && marker) {
      cubePositionRef.current = {
        lat: building.lat,
        lng: building.lng,
        altitude: 50,
      };

      map.panTo({ lat: building.lat, lng: building.lng });

      marker.setPosition({ lat: building.lat, lng: building.lng });
      marker.setTitle(building.name);

      map.moveCamera({
        zoom: 19,
        heading: 0,
        tilt: 55,
      });

      setTimeout(() => {
        map.moveCamera({ tilt: 55, zoom: 19 });
        overlay.requestRedraw();
      }, 1000);
    }
  }, [currentIndex]);
  return (
    <div className="developer-container fixed top-0 left-0 w-full h-full">
      <div ref={mapRef} style={{ width: "100%", height: "100dvh" }} />
    </div>
  );
};
export default Location;
