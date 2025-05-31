import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import '../../assets/Projects/css/home.css';

const LotusHome = () => {
    const [value, setValue] = useState(13);

    const images = [
        "/lotus_images/00.jpg",
        "/lotus_images/01.jpg",
        "/lotus_images/02.jpg",
        "/lotus_images/03.jpg",
        "/lotus_images/04.jpg",
        "/lotus_images/05.jpg",
        "/lotus_images/06.jpg",
        "/lotus_images/07.jpg",
        "/lotus_images/08.jpg",
        "/lotus_images/09.jpg",
        "/lotus_images/10.jpg",
        "/lotus_images/11.jpg",
        "/lotus_images/12.jpg",
        "/lotus_images/13.jpg",
        "/lotus_images/14.jpg",
        "/lotus_images/15.jpg",
        "/lotus_images/16.jpg",
        "/lotus_images/17.jpg",
        "/lotus_images/18.jpg",
        "/lotus_images/19.jpg",
        "/lotus_images/20.jpg",
        "/lotus_images/21.jpg",
        "/lotus_images/22.jpg",
        "/lotus_images/23.jpg",
        "/lotus_images/24.jpg",
        "/lotus_images/25.jpg",
        "/lotus_images/26.jpg",
        "/lotus_images/27.jpg",
        "/lotus_images/28.jpg",
        "/lotus_images/29.jpg",
        "/lotus_images/30.jpg",
        "/lotus_images/31.jpg",
        "/lotus_images/32.jpg",
        "/lotus_images/33.jpg",
        "/lotus_images/34.jpg",
        "/lotus_images/35.jpg",
        "/lotus_images/36.jpg",
        "/lotus_images/37.jpg",
        "/lotus_images/38.jpg",
        "/lotus_images/39.jpg",
        "/lotus_images/40.jpg",
        "/lotus_images/41.jpg",
        "/lotus_images/42.jpg",
        "/lotus_images/43.jpg",
        "/lotus_images/44.jpg",
        "/lotus_images/45.jpg",
        "/lotus_images/46.jpg",
        "/lotus_images/47.jpg",
        "/lotus_images/48.jpg",
        "/lotus_images/49.jpg",
        "/lotus_images/50.jpg",
        "/lotus_images/51.jpg",
        "/lotus_images/52.jpg",
        "/lotus_images/53.jpg",
        "/lotus_images/54.jpg",
        "/lotus_images/55.jpg",
        "/lotus_images/56.jpg",
        "/lotus_images/57.jpg",
        "/lotus_images/58.jpg",
        "/lotus_images/59.jpg",
        // "/lotus_images/60.jpg",
    ];
    useEffect(() => {
        images.forEach((src) => {
            const img = new Image();
            img.src = src;
        });
    }, []);

    return (
        <div className="full-container lotus">
            <img src={`/lotus_images/${String(value).padStart(2, "0")}.jpg`} alt="" className="home_page_images rotate_view" />
            <div className="home-slider-container">
                <Form.Range min={0} max={59} value={value}
                    onChange={(e) => setValue(e.target.value)} className="home_range_slider" />
            </div>
        </div>
    )
}

export default LotusHome;