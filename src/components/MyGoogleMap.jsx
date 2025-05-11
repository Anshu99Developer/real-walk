import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import * as THREE from "three";
import { MuteAudioIcon, UnMuteAudioIcon } from "../assets/Icons";
import ambientSound from "/ambient.mp3";
import clickSound from "/click-sound.mp3";

const cityConfig = {
  Ahmedabad: { center: { lat: 23.0225, lng: 72.5714 } },
  Mumbai: { center: { lat: 19.076, lng: 72.8777 } },
  Delhi: { center: { lat: 28.6139, lng: 77.209 } },
  Hyderabad: { center: { lat: 17.385, lng: 78.4867 } },
  Jumeirah: { center: { lat: 25.215, lng: 55.253 } },
  Hatta: { center: { lat: 24.795, lng: 56.116 } },
};

const residentialLocations = [
  {
    name: "Antilia Anant",
    id: "antilia-anant",
    lat: 23.06329379150407,
    lng: 72.55172493497427,
    address: "123 Main Street, Ahmedabad",
    description: "Luxury residential tower with modern amenities.",
    area: "5000 sq.ft",
    nearby: ["Riverfront", "Metro Station"],
  },
  {
    name: "The Nest",
    id: "the-nest",
    lat: 23.136313400493155,
    lng: 72.54445180020085,
    address: "456 Park Avenue, Ahmedabad",
    description: "Affordable housing project surrounded by greenery.",
    area: "1200 sq.ft",
    nearby: ["Shopping Mall", "City Park"],
  },
];

const blackMapStyle = [
  { elementType: "geometry", stylers: [{ color: "#212121" }] },
  { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#212121" }] },
  { featureType: "administrative", elementType: "geometry", stylers: [{ color: "#757575" }] },
  { featureType: "administrative.country", elementType: "labels.text.fill", stylers: [{ color: "#9e9e9e" }] },
  { featureType: "administrative.land_parcel", stylers: [{ visibility: "off" }] },
  { featureType: "administrative.locality", elementType: "labels.text.fill", stylers: [{ color: "#bdbdbd" }] },
  { featureType: "poi", elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
  { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#181818" }] },
  { featureType: "poi.park", elementType: "labels.text.fill", stylers: [{ color: "#616161" }] },
  { featureType: "poi.park", elementType: "labels.text.stroke", stylers: [{ color: "#1b1b1b" }] },
  { featureType: "road", elementType: "geometry.fill", stylers: [{ color: "#2c2c2c" }] },
  { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#8a8a8a" }] },
  { featureType: "road.arterial", elementType: "geometry", stylers: [{ color: "#373737" }] },
  { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#3c3c3c" }] },
  { featureType: "road.highway.controlled_access", elementType: "geometry", stylers: [{ color: "#4e4e4e" }] },
  { featureType: "road.local", elementType: "labels.text.fill", stylers: [{ color: "#616161" }] },
  { featureType: "transit", elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#000000" }] },
  { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#3d3d3d" }] },
];

const WebGLOverlayMap = () => {
  const mapRef = useRef(null);
  const googleMap = useRef(null);
  const markerRef = useRef(null);
  const overlayRef = useRef(null);
  const cameraRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const ringRef = useRef(null);
  const raycasterRef = useRef(null);
  const mouseRef = useRef(null);
  const audioRef = useRef(null);
  const clickAudioRef = useRef(null);

  const cubePositionRef = useRef({
    lat: residentialLocations[0].lat,
    lng: residentialLocations[0].lng,
    altitude: 50,
  });

  const { city: cityParam } = useParams();
  const city = cityConfig[cityParam] ? cityParam : "Ahmedabad";
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentBuilding = residentialLocations[currentIndex];
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

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
          tilt: 45,
          mapId: "93282db3a162e6da",
          disableDefaultUI: true,
          styles: blackMapStyle, // Apply the black map style here
        });

        googleMap.current = map;

        // Create a marker
        const marker = new window.google.maps.Marker({
          position: { lat: currentBuilding.lat, lng: currentBuilding.lng },
          map: map,
          title: currentBuilding.name,
          icon: {
            path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z",
            fillColor: "#ffc864",
            fillOpacity: 1,
            scale: 1.3,
            strokeWeight: 10,
            strokeColor: "#222222",
            anchor: new google.maps.Point(12, 24),
          },
        });
        markerRef.current = marker;

        const overlay = new window.google.maps.WebGLOverlayView();
        overlayRef.current = overlay;

        overlay.onAdd = () => {
          const scene = new THREE.Scene();
          const camera = new THREE.PerspectiveCamera();

          const pinGroup = new THREE.Group();

          // Create hover ring
          const ringGeometry = new THREE.RingGeometry(8, 10, 64);
          const ringMaterial = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            opacity: 0.3,
            transparent: true,
            side: THREE.DoubleSide,
          });
          const ring = new THREE.Mesh(ringGeometry, ringMaterial);
          ring.rotation.x = -Math.PI / 2;
          ring.visible = false;
          pinGroup.add(ring);

          scene.add(pinGroup);

          sceneRef.current = scene;
          cameraRef.current = camera;
          ringRef.current = ring;
        };

        overlay.onContextRestored = ({ gl }) => {
          const renderer = new THREE.WebGLRenderer({
            canvas: gl.canvas,
            context: gl,
            ...gl.getContextAttributes(),
          });
          renderer.autoClear = false;
          rendererRef.current = renderer;

          raycasterRef.current = new THREE.Raycaster();
          mouseRef.current = new THREE.Vector2();
        };

        overlay.onDraw = ({ gl, transformer }) => {
          const position = cubePositionRef.current;
          const matrix = transformer.fromLatLngAltitude(position);

          cameraRef.current.projectionMatrix = new THREE.Matrix4().fromArray(
            matrix
          );

          // Hover detection
          const raycaster = raycasterRef.current;
          const mouse = mouseRef.current;
          raycaster.setFromCamera(mouse, cameraRef.current);
          const intersects = raycaster.intersectObject(sceneRef.current, true);

          if (ringRef.current) {
            ringRef.current.visible = intersects.length > 0;
          }

          if (sceneRef.current && cameraRef.current) {
            rendererRef.current.render(sceneRef.current, cameraRef.current);
            rendererRef.current.resetState();
          }
        };

        overlay.setMap(map);
        setIsLoading(false);
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const audio = new Audio(ambientSound);
    const clickAudio = new Audio(clickSound);
    audio.loop = true;
    audio.preload = "auto";
    audio.autoplay = true;
    audio.volume = 0.5;
    audioRef.current = audio;

    clickAudio.volume = 0.3;
    clickAudioRef.current = clickAudio;

    audio.load();
    const playAudio = () => {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {});
    };

    document.addEventListener("onload", playAudio, { once: true });

    return () => {
      audio.pause();
      document.removeEventListener("onload", playAudio);
      clickAudio.pause();
    };
  }, []);

  useEffect(() => {
    const map = googleMap.current;
    const overlay = overlayRef.current;
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
        tilt: 45,
      });

      setTimeout(() => {
        map.moveCamera({ tilt: 45, zoom: 19 });
        overlay.requestRedraw();
      }, 1000);
    }
  }, [currentIndex]);

  useEffect(() => {
    const onMouseMove = (event) => {
      if (mouseRef.current) {
        mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  useEffect(() => {
    const map = googleMap.current;

    if (map) {
      const handleZoomChanged = () => {
        const zoom = map.getZoom();
        const tilt = zoom > 15 ? 45 : Math.max(0, (zoom - 10) * 11); // Reduce tilt as zoom decreases
        map.moveCamera({ tilt });
      };

      map.addListener("zoom_changed", handleZoomChanged);

      return () => {
        map.removeListener("zoom_changed", handleZoomChanged);
      };
    }
  }, [googleMap]);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play();
        setIsPlaying(true);
      } else {
        audioRef.current.pause();
        clickAudioRef.current.play();
        setIsPlaying(false);
      }
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full">
        <div ref={mapRef} style={{ width: "100%", height: "100dvh" }} />

        {/* Audio Button */}
        <div className="bg-raisinBlack absolute top-0 right-0 border-2 border-raisinBlack">
          <button
            onClick={toggleAudio}
            className="p-3 focus:outline-none outline-none transition-all rounded-none lg:hover:bg-white text-text-raisinBlack lg:hover:text-raisinBlack"
          >
            {isPlaying ? (
              <MuteAudioIcon width={25} height={25} />
            ) : (
              <UnMuteAudioIcon width={25} height={25} />
            )}
          </button>
        </div>

        {/* Info Dialog Box */}
        <div className="absolute top-4 left-4 bg-raisinBlack p-4 rounded-lg shadow-lg lg:w-72 w-[250px]">
          <h2 className="lg:text-lg text-base font-bold pb-2 border-b border-borderColor text-white">
            {currentBuilding.name}
          </h2>
          <p className="lg:text-sm text-xs text-white pt-2">
            {currentBuilding.address && (
              <>
                <strong>Address:</strong> {currentBuilding.address} <br />
              </>
            )}
            {currentBuilding.area && (
              <>
                <strong>Area:</strong> {currentBuilding.area} <br />
              </>
            )}
            {currentBuilding.description && (
              <>
                <strong>Description:</strong> {currentBuilding.description}{" "}
                <br />
              </>
            )}
            {currentBuilding.nearby && (
              <>
                <strong>Nearby:</strong> {currentBuilding.nearby.join(", ")}{" "}
                <br />
              </>
            )}
          </p>
          <Link
            className="lg:text-sm text-xs bg-golden text-raisinBlack border border-transparent px-4 py-2 rounded-lg font-semibold transition-all hover:bg-raisinBlack hover:border-golden hover:text-golden block mt-4 text-center"
            to={`/${currentBuilding?.id}`}
          >
            Checkout view
          </Link>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-row items-center">
          <Link
            className="lg:text-base text-sm bg-golden text-raisinBlack border border-transparent px-4 py-2 rounded-lg font-semibold transition-all hover:scale-105"
            to="/"
          >
            Back to world
          </Link>
        </div>
        <div className="absolute bottom-10 right-5 flex flex-row items-center">
          <button
            onClick={() =>
              setCurrentIndex(
                (prev) => (prev + 1) % residentialLocations.length
              )
            }
            className="lg:text-base text-sm bg-raisinBlack text-white border-2 border-transparent px-4 py-2 rounded-lg font-semibold shadow-md transition-all hover:bg-white hover:text-raisinBlack hover:border-raisinBlack hover:scale-105 outline-none focus:outline-none"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default WebGLOverlayMap;
