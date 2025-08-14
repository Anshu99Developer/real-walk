import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import * as THREE from "three";
import { MuteAudioIcon, UnMuteAudioIcon } from "../assets/Icons";
import ambientSound from "/ambient.mp3";
import clickSound from "/click-sound.mp3";
import { baseUrlAWS } from "../utils/helper";

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
    lat: 23.06329379150407,
    lng: 72.55172493497427,
    altitude: 50,
  });

  const { city: cityParam } = useParams();
  const [locationsData, setLocationsData] = useState(null);
  const [city, setCity] = useState(null);
  const [residentialLocations, setResidentialLocations] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewWebVr, setViewWebVr] = useState(false);
  const [viewWebVrIframe, setViewWebVrIframe] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  // Fetch locations.json and set city/residentialLocations
  useEffect(() => {
    console.log("dsssssssssssssssssss", baseUrlAWS)
    fetch(`${baseUrlAWS}/JSON/locations.json`)
      .then((res) => res.json())
      .then((data) => {
        setLocationsData(data);
        let foundCity = null;
        let foundLocations = [];
        // Find the city in all countries
        for (const country in data) {
          const cityArr = data[country];
          const match = cityArr.find(
            (c) => c.name.toLowerCase() === (cityParam || "").toLowerCase()
          );
          console.log("sjskjklsd match", match, data);

          if (match) {
            foundCity = match;
            foundLocations = match.residentialLocations || [];
            break;
          }
        }
        // Default to Ahmedabad if not found
        if (!foundCity) {
          const indiaCities = data["India"] || [];
          foundCity = indiaCities.find((c) => c.name === "Ahmedabad");
          foundLocations = foundCity ? foundCity.residentialLocations : [];
        }

        setCity(foundCity);
        setResidentialLocations(foundLocations);
        setCurrentIndex(0);
      });
  }, [cityParam]);
  console.log("sjskjklsd city", city);
  const markersRef = useRef([]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (
        window.google &&
        window.google.maps &&
        window.google.maps.WebGLOverlayView
      ) {
        const map = new window.google.maps.Map(mapRef.current, {
          center: {
            lat: cubePositionRef.current.lat,
            lng: cubePositionRef.current.lng,
          },
          zoom: 19,
          minZoom: 11,
          maxZoom: 20,
          heading: 0,
          tilt: 45,
          mapId: "93282db3a162e6da",
          disableDefaultUI: true,
        });

        googleMap.current = map;

        // Create a marker
        // Clear existing markers if any
        markersRef.current.forEach((marker) => marker.setMap(null));
        markersRef.current = [];
        // Create a marker for each residential location
        residentialLocations.forEach((building, index) => {
          console.log()
          const marker = new window.google.maps.Marker({
            position: { lat: building.lat, lng: building.lng },
            map: map,
            title: building.name,
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

          marker.addListener("click", () => {
            setCurrentIndex(index); // This allows the info box to update when clicking a pin
          });

          markersRef.current.push(marker);
        });

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

        // --- Sync tilt with zoom for desktop only ---
        if (!/Mobi|Android/i.test(navigator.userAgent)) {
          map.addListener("zoom_changed", () => {
            const zoom = map.getZoom();
            let tilt = Math.round(((zoom - 15) / 2) * 45);
            tilt = Math.max(0, Math.min(tilt, 45));
            if (map.getTilt() !== tilt) {
              map.moveCamera({ tilt });
            }
          });
        }
        // --- End of desktop block ---

        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [residentialLocations]);

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
        .catch(() => { });
    };

    document.addEventListener("onload", playAudio, { once: true });

    return () => {
      audio.pause();
      document.removeEventListener("onload", playAudio);
      clickAudio.pause();
    };
  }, []);

  // Update cubePositionRef and marker when residentialLocations or currentIndex changes
  useEffect(() => {
    if (!city || residentialLocations.length === 0) return;
    // Use residentialLocations[currentIndex] instead of hardcoded array
    const building = residentialLocations[currentIndex];
    if (!building) return;
    cubePositionRef.current = {
      lat: building.lat,
      lng: building.lng,
      altitude: 50,
    };

    if (googleMap.current && markerRef.current) {
      googleMap.current.panTo({ lat: building.lat, lng: building.lng });
      markerRef.current.setPosition({ lat: building.lat, lng: building.lng });
      markerRef.current.setTitle(building.name);
      googleMap.current.moveCamera({
        zoom: 19,
        heading: 0,
        tilt: 45,
      });
      setTimeout(() => {
        googleMap.current.moveCamera({ tilt: 45, zoom: 19 });
        overlayRef.current && overlayRef.current.requestRedraw();
      }, 1000);
    }
  }, [currentIndex, city, residentialLocations]);

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

  // Add zoom controls for mobile
  const isMobile = /Mobi|Android/i.test(navigator.userAgent);
  const [zoomLevel, setZoomLevel] = useState(19);

  useEffect(() => {
    if (isMobile && googleMap.current) {
      setZoomLevel(googleMap.current.getZoom());
      const listener = googleMap.current.addListener("zoom_changed", () => {
        setZoomLevel(googleMap.current.getZoom());
      });
      return () => listener && listener.remove();
    }
  }, [isMobile, isLoading]);

  const handleZoomIn = () => {
    if (googleMap.current) {
      let newZoom = Math.min(googleMap.current.getZoom() + 1, 20);
      googleMap.current.setZoom(newZoom);
      // Set tilt based on new zoom
      let tilt = Math.round(((newZoom - 15) / 2) * 45);
      tilt = Math.max(0, Math.min(tilt, 45));
      googleMap.current.moveCamera({ tilt });
    }
  };

  const handleZoomOut = () => {
    if (googleMap.current) {
      let newZoom = Math.max(googleMap.current.getZoom() - 1, 15);
      googleMap.current.setZoom(newZoom);
      // Set tilt based on new zoom
      let tilt = Math.round(((newZoom - 15) / 2) * 45);
      tilt = Math.max(0, Math.min(tilt, 45));
      googleMap.current.moveCamera({ tilt });
    }
  };

  const handleZoomSlider = (e) => {
    const value = Number(e.target.value);
    setZoomLevel(value);
    if (googleMap.current) {
      googleMap.current.setZoom(value);
      // Set tilt based on slider zoom
      let tilt = Math.round(((value - 15) / 2) * 45);
      tilt = Math.max(0, Math.min(tilt, 45));
      googleMap.current.moveCamera({ tilt });
    }
  };

  // Only render if city and residentialLocations are loaded
  if (!city || residentialLocations.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="text-lg text-raisinBlack">Loading...</span>
      </div>
    );
  }

  const currentBuilding = residentialLocations[currentIndex];
  return (
    <>
      <div className="relative z-50">
        {
          viewWebVr ?
            <div className="">
              <iframe
                src={viewWebVrIframe}
                height={"100vh"}
                width={"100vW"}
                className="fixed top-0 left-0 w-full h-full border-0 z-[9999]"
                title="Flat WebVR"
              />
            </div> :
            <div className="fixed top-0 left-0 w-full h-full">
              <div ref={mapRef} style={{ width: "100%", height: "100dvh" }} />

              {/* Audio Button */}
              {/* <div className="bg-raisinBlack absolute top-0 right-0 border-2 border-raisinBlack">
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
        </div> */}

              {/* Info Dialog Box */}
              <div className="-translate-x-1/2 absolute bg-raisinBlack bottom-10 items-center left-1/2 lg:w-72 p-4 rounded-lg shadow-lg w-[250px]">
                <h2 className="lg:text-lg text-base font-bold pb-2 border-b border-borderColor text-white flex justify-between">
                  <span>{currentBuilding.name}</span>
                  <span><img src={`https://surbhi-infotech.s3.ap-south-1.amazonaws.com/Real_Walk_Files` + currentBuilding.logo} style={{ width: "100px" }} /></span>
                </h2>
                <p className="lg:text-sm text-xs text-white pt-2">
                  {currentBuilding.project_name && (
                    <>
                      <strong>Project Name:</strong> {currentBuilding.project_name} <br />
                    </>
                  )}
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
                <button onClick={() => { setViewWebVr(true); currentBuilding?.link && setViewWebVrIframe(currentBuilding.link) }}
                  className="w-full bg-golden block border border-transparent font-semibold hover:bg-raisinBlack hover:border-golden hover:text-golden lg:text-sm mt-4 px-4 py-2 rounded-lg text-center text-raisinBlack text-xs transition-all">
                  Checkout view
                </button>
                {/* <Link
            className="lg:text-sm text-xs bg-golden text-raisinBlack border border-transparent px-4 py-2 rounded-lg font-semibold transition-all hover:bg-raisinBlack hover:border-golden hover:text-golden block mt-4 text-center"
            to={`/developers/${currentBuilding?.id}`}
          >
            Checkout view
          </Link> */}
              </div>

              <div className="absolute flex flex-row items-center left-2 top-2">
                <Link
                  className="lg:text-base text-sm bg-golden text-raisinBlack border border-transparent px-4 py-2 rounded-lg font-semibold transition-all hover:scale-105"
                  to="/"
                >
                  Back to world
                </Link>
              </div>
              {/* <div className="absolute bottom-10 right-5 flex flex-row items-center">
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
        </div> */}

              {/* Mobile Zoom Controls */}
              {/* {isMobile && (
                <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center z-50">
                  <input
                    type="range"
                    min={15}
                    max={20}
                    step={0.01}
                    value={zoomLevel}
                    onChange={handleZoomSlider}
                    className="w-32 accent-golden"
                    aria-label="Zoom Slider"
                  />
                </div>
              )} */}
            </div>
        }
      </div>
    </>
  );
};

export default WebGLOverlayMap;
