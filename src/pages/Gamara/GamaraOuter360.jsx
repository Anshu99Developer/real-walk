import React, { useState, useEffect, useRef } from "react";
import Form from 'react-bootstrap/Form';
import '../../assets/Projects/css/home.css';

const GamaraOuter360 = () => {
    const [value, setValue] = useState(0);
    const [currentImage, setCurrentImage] = useState("/gamara/00.webp");
    const requestRef = useRef(null);
    const targetValue = useRef(value);

    const imageCount = 61;
    const images = Array.from({ length: imageCount }, (_, i) =>
        `/gamara/${String(i).padStart(2, "0")}.webp`
    );

    // Preload images around the current value
    useEffect(() => {
        const preloadRange = 5;
        for (let i = Math.max(0, value - preloadRange); i <= Math.min(imageCount - 1, value + preloadRange); i++) {
            const img = new Image();
            img.src = images[i];
        }
    }, [value]);

    // Smooth image update using requestAnimationFrame
    useEffect(() => {
        const animate = () => {
            if (value !== targetValue.current) {
                const direction = Math.sign(targetValue.current - value);
                setValue(prev => prev + direction);
            }
            setCurrentImage(`/gamara/${String(value).padStart(2, "0")}.webp`);
            requestRef.current = requestAnimationFrame(animate);
        };

        requestRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestRef.current);
    }, [value]);

    const handleSliderChange = (e) => {
        targetValue.current = parseInt(e.target.value, 10);
    };

    return (
        <div className="full-container gamara">
            <img
                src={currentImage}
                alt={`Gamara view ${value}`}
                className="home_page_images rotate_view gamara"
                draggable="false"
                loading="eager"
            />
            <div className="home-slider-container">
                <Form.Range
                    min={0}
                    max={imageCount - 1}
                    defaultValue={value}
                    onChange={handleSliderChange}
                    className="home_range_slider"
                />
            </div>
        </div>
    );
};

export default GamaraOuter360;
