import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import '../../assets/Projects/css/home.css';

const TheAugusta3BHKCOP = () => {
    const [value, setValue] = useState(0);

    const images = [
        "/The_Augusta_COP/00.jpg",
        "/The_Augusta_COP/01.jpg",
        "/The_Augusta_COP/02.jpg",
        "/The_Augusta_COP/03.jpg",
        "/The_Augusta_COP/04.jpg",
        "/The_Augusta_COP/05.jpg",
        "/The_Augusta_COP/06.jpg",
        "/The_Augusta_COP/07.jpg",
        "/The_Augusta_COP/08.jpg",
        "/The_Augusta_COP/09.jpg",
        "/The_Augusta_COP/10.jpg",
        "/The_Augusta_COP/11.jpg",
        "/The_Augusta_COP/12.jpg",
        "/The_Augusta_COP/13.jpg",
        "/The_Augusta_COP/14.jpg",
        "/The_Augusta_COP/15.jpg",
        "/The_Augusta_COP/16.jpg",
        "/The_Augusta_COP/17.jpg",
        "/The_Augusta_COP/18.jpg",
        "/The_Augusta_COP/19.jpg",
        "/The_Augusta_COP/20.jpg",
        "/The_Augusta_COP/21.jpg",
        "/The_Augusta_COP/22.jpg",
        "/The_Augusta_COP/23.jpg",
        "/The_Augusta_COP/24.jpg",
        "/The_Augusta_COP/25.jpg",
        "/The_Augusta_COP/26.jpg",
        "/The_Augusta_COP/27.jpg",
        "/The_Augusta_COP/28.jpg",
        "/The_Augusta_COP/29.jpg",
        "/The_Augusta_COP/30.jpg",
        "/The_Augusta_COP/31.jpg",
        "/The_Augusta_COP/32.jpg",
        "/The_Augusta_COP/33.jpg",
        "/The_Augusta_COP/34.jpg",
        "/The_Augusta_COP/35.jpg",
        "/The_Augusta_COP/36.jpg",
        "/The_Augusta_COP/37.jpg",
        "/The_Augusta_COP/38.jpg",
        "/The_Augusta_COP/39.jpg",
        "/The_Augusta_COP/40.jpg",
        "/The_Augusta_COP/41.jpg",
        "/The_Augusta_COP/42.jpg",
        "/The_Augusta_COP/43.jpg",
        "/The_Augusta_COP/44.jpg",
        "/The_Augusta_COP/45.jpg",
        "/The_Augusta_COP/46.jpg",
        "/The_Augusta_COP/47.jpg",
        "/The_Augusta_COP/48.jpg",
        "/The_Augusta_COP/49.jpg",
        "/The_Augusta_COP/50.jpg",
        "/The_Augusta_COP/51.jpg",
        "/The_Augusta_COP/52.jpg",
        "/The_Augusta_COP/53.jpg",
        "/The_Augusta_COP/54.jpg",
        "/The_Augusta_COP/55.jpg",
        "/The_Augusta_COP/56.jpg",
        "/The_Augusta_COP/57.jpg",
        "/The_Augusta_COP/58.jpg",
        "/The_Augusta_COP/59.jpg",
        "/The_Augusta_COP/60.jpg",
    ];
    useEffect(() => {
        images.forEach((src) => {
            const img = new Image();
            img.src = src;
        });
    }, []);

    return (
        <div className="full-container the_augusta">
            <img src={`/The_Augusta_COP/${String(value).padStart(2, "0")}.jpg`} alt="" className="home_page_images rotate_view" />
            <div className="home-slider-container">
                <Form.Range min={0} max={60} value={value}
                    onChange={(e) => setValue(e.target.value)} className="home_range_slider" />
            </div>
        </div>
    )
}

export default TheAugusta3BHKCOP;