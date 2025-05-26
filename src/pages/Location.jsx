import { useEffect, useRef } from "react";

const Location = ({ data }) => {
  const mapRef = useRef(null);
  const googleMap = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (
        window.google &&
        window.google.maps &&
        window.google.maps.WebGLOverlayView
      ) {
        const map = new window.google.maps.Map(mapRef.current, {
          center: {
            lat: data?.lat,
            lng: data?.lng,
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
          position: { lat: data?.lat, lng: data?.lng },
          map: map,
          title: data?.name,
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
    const building = data;

    if (map && overlay && marker) {
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
  }, [data]);
  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="developer-container fixed top-0 left-0 w-full h-full">
      <div ref={mapRef} style={{ width: "100%", height: "100dvh" }} />
    </div>
  );
};
export default Location;
