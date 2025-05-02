import { Viewer, ImagePanorama } from "panolens";
import { useEffect, useRef, useState } from 'react';
import '../assets/css/views.css';

const Views = () => {
    const panoramaRef = useRef(null);
    const viewerRef = useRef(null);
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        if (!panoramaRef.current) return;

        // Create initial panorama
        const initialPanorama = new ImagePanorama("/hdri/tirupati/15.jpg");

        const viewer = new Viewer({
            container: panoramaRef.current,
            autoRotate: true, // Enable auto-rotation,
            controlBar: false,
            autoRotateSpeed: "1"
        });

        viewer.add(initialPanorama);
        viewerRef.current = viewer;

        return () => {
            viewer.dispose(); // Cleanup on unmount
        };
    }, []);

    const handleSetHdri = (path, index) => {
        setCurrentImage(index);
        if (!viewerRef.current) return;

        const newPanorama = new ImagePanorama(path);
        viewerRef.current.setPanorama(newPanorama); // Switch panorama
        viewerRef.current.add(newPanorama);
    };

    return (
        <div className="developer-container relative">
            <div
            className="view-points"
                ref={panoramaRef}
            />
            <div className="floor_buttons">
                <ul className="flex gap-2 flex-wrap">
                    <li>
                        <button onClick={() => handleSetHdri('/hdri/tirupati/15.jpg', 0)} className={`text-xs ${currentImage === 0 ? 'active' : ''}`}>
                            15th Floor
                        </button>
                    </li>
                    <li>
                        <button onClick={() => handleSetHdri('/hdri/tirupati/25.jpg', 1)} className={`text-xs ${currentImage === 1 ? 'active' : ''}`}>
                            25th Floor
                        </button>
                    </li>
                    <li>
                        <button onClick={() => handleSetHdri('/hdri/tirupati/35.jpg', 2)} className={`text-xs ${currentImage === 2 ? 'active' : ''}`}>
                            35th Floor
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Views;
