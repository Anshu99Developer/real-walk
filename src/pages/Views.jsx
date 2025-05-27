import { Viewer, ImagePanorama } from "panolens";
import { useEffect, useRef, useState } from "react";
import "../assets/css/views.css";

const Views = ({data}) => {
  const panoramaRef = useRef(null);
  const viewerRef = useRef(null);
  const [currentImage, setCurrentImage] = useState(0);

  // Get droneViews from data prop, fallback to empty array
  const droneViews = data || [];

  useEffect(() => {
    if (!panoramaRef.current || !droneViews.length) return;

    // Use first drone view as initial panorama
    const initialPanorama = new ImagePanorama(droneViews[0].image);

    const viewer = new Viewer({
      container: panoramaRef.current,
      autoRotate: true,
      controlBar: false,
      autoRotateSpeed: "1",
    });

    viewer.add(initialPanorama);
    viewerRef.current = viewer;

    return () => {
      viewer.dispose();
    };
    // Only run when droneViews changes
  }, [droneViews]);

  const handleSetHdri = (path, index) => {
    setCurrentImage(index);
    if (!viewerRef.current) return;

    const newPanorama = new ImagePanorama(path);
    viewerRef.current.setPanorama(newPanorama);
    viewerRef.current.add(newPanorama);
  };

  return (
    <div className="developer-container relative">
      <div className="view-points" ref={panoramaRef} />
      <div className="floor_buttons max-md:flex-col">
        <label className="lg:text-base text-sm font-semibold block pb-2 text-center mb-3 border-b border-raisinBlack">Drone View</label>
        <ul className="flex gap-2 flex-wrap w-full">
          {droneViews.map((view, idx) => (
            <li key={view?.title}>
              <button
                onClick={() => handleSetHdri(view.image, idx)}
                className={`text-xs !w-full ${currentImage === idx ? "active" : ""}`}
              >
                {view?.title}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Views;
