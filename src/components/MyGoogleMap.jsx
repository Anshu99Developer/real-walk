import React, { useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import * as THREE from "three";

const cityConfig = {
  Ahmedabad: {
    center: { lat: 23.0225, lng: 72.5714 },
    bounds: {
      north: 23.1,
      south: 22.9,
      east: 72.7,
      west: 72.4,
    },
  },
  Mumbai: {
    center: { lat: 19.076, lng: 72.8777 },
    bounds: {
      north: 19.2,
      south: 18.9,
      east: 73.0,
      west: 72.75,
    },
  },
  Delhi: {
    center: { lat: 28.6139, lng: 77.209 },
    bounds: {
      north: 28.75,
      south: 28.45,
      east: 77.35,
      west: 77.05,
    },
  },
  Hyderabad: {
    center: { lat: 17.385, lng: 78.4867 },
    bounds: {
      north: 17.5,
      south: 17.25,
      east: 78.6,
      west: 78.3,
    },
  },
};

const WebGLOverlayMap = () => {
  const mapRef = useRef(null);
  const { city: cityParam } = useParams();

  const city = cityConfig[cityParam] ? cityParam : "Ahmedabad";

  useEffect(() => {
    const interval = setInterval(() => {
      const cityData = cityConfig[city];
      if (
        window.google &&
        window.google.maps &&
        window.google.maps.WebGLOverlayView &&
        cityData
      ) {
        const map = new window.google.maps.Map(mapRef.current, {
          center: cityData.center,
          zoom: 17,
          heading: 45,
          tilt: 67.5,
          mapId: "912811642489b079",
          restriction: {
            latLngBounds: cityData.bounds,
            strictBounds: true,
          },
          gestureHandling: "greedy",
        });

        let scene, camera, renderer, cube;

        const overlay = new window.google.maps.WebGLOverlayView();

        overlay.onAdd = () => {
          scene = new THREE.Scene();
          camera = new THREE.PerspectiveCamera();

          const geometry = new THREE.BoxGeometry(10, 10, 10);
          const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
          cube = new THREE.Mesh(geometry, material);
          scene.add(cube);
        };

        overlay.onContextRestored = ({ gl }) => {
          renderer = new THREE.WebGLRenderer({
            canvas: gl.canvas,
            context: gl,
            ...gl.getContextAttributes(),
          });
          renderer.autoClear = false;
        };

        overlay.onDraw = ({ gl, transformer }) => {
          const matrix = transformer.fromLatLngAltitude({
            lat: cityData.center.lat,
            lng: cityData.center.lng,
            altitude: 50,
          });

          camera.projectionMatrix = new THREE.Matrix4().fromArray(matrix);
          cube.rotation.x += 0.01;
          cube.rotation.y += 0.01;

          renderer.render(scene, camera);
          renderer.resetState();
        };

        overlay.setMap(map);
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [city]);

  return (
    <>
      <div ref={mapRef} style={{ width: "100%", height: "100vh" }} />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <Link
          className="bg-golden text-raisinBlack border border-transparent px-4 py-2 rounded-lg font-semibold transition-all hover:scale-105"
          to="/"
        >
          Back to world
        </Link>
      </div>
    </>
  );
};

export default WebGLOverlayMap;
