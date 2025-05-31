import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import '../../assets/Projects/css/home.css';
import backIcon from "../../assets/Projects/images/back_icon.png";

const TheAugusta3BHK = ({ selectedHouseBHK, view, setView }) => {
    const [value, setValue] = useState(0);

    const images = [
        "/The_Augusta_3BHK/00.webp",
        "/The_Augusta_3BHK/01.webp",
        "/The_Augusta_3BHK/02.webp",
        "/The_Augusta_3BHK/03.webp",
        "/The_Augusta_3BHK/04.webp",
        "/The_Augusta_3BHK/05.webp",
        "/The_Augusta_3BHK/06.webp",
        "/The_Augusta_3BHK/07.webp",
        "/The_Augusta_3BHK/08.webp",
        "/The_Augusta_3BHK/09.webp",
        "/The_Augusta_3BHK/10.webp",
        "/The_Augusta_3BHK/11.webp",
        "/The_Augusta_3BHK/12.webp",
        "/The_Augusta_3BHK/13.webp",
        "/The_Augusta_3BHK/14.webp",
        "/The_Augusta_3BHK/15.webp",
        "/The_Augusta_3BHK/16.webp",
        "/The_Augusta_3BHK/17.webp",
        "/The_Augusta_3BHK/18.webp",
        "/The_Augusta_3BHK/19.webp",
        "/The_Augusta_3BHK/20.webp",
        "/The_Augusta_3BHK/21.webp",
        "/The_Augusta_3BHK/22.webp",
        "/The_Augusta_3BHK/23.webp",
        "/The_Augusta_3BHK/24.webp",
        "/The_Augusta_3BHK/25.webp",
        "/The_Augusta_3BHK/26.webp",
        "/The_Augusta_3BHK/27.webp",
        "/The_Augusta_3BHK/28.webp",
        "/The_Augusta_3BHK/29.webp",
        "/The_Augusta_3BHK/30.webp",
        "/The_Augusta_3BHK/31.webp",
        "/The_Augusta_3BHK/32.webp",
        "/The_Augusta_3BHK/33.webp",
        "/The_Augusta_3BHK/34.webp",
        "/The_Augusta_3BHK/35.webp",
        "/The_Augusta_3BHK/36.webp",
        "/The_Augusta_3BHK/37.webp",
        "/The_Augusta_3BHK/38.webp",
        "/The_Augusta_3BHK/39.webp",
        "/The_Augusta_3BHK/40.webp",
        "/The_Augusta_3BHK/41.webp",
        "/The_Augusta_3BHK/42.webp",
        "/The_Augusta_3BHK/43.webp",
        "/The_Augusta_3BHK/44.webp",
        "/The_Augusta_3BHK/45.webp",
        "/The_Augusta_3BHK/46.webp",
        "/The_Augusta_3BHK/47.webp",
        "/The_Augusta_3BHK/48.webp",
        "/The_Augusta_3BHK/49.webp",
        "/The_Augusta_3BHK/50.webp",
        "/The_Augusta_3BHK/51.webp",
        "/The_Augusta_3BHK/52.webp",
        "/The_Augusta_3BHK/53.webp",
        "/The_Augusta_3BHK/54.webp",
        "/The_Augusta_3BHK/55.webp",
        "/The_Augusta_3BHK/56.webp",
        "/The_Augusta_3BHK/57.webp",
        "/The_Augusta_3BHK/58.webp",
        "/The_Augusta_3BHK/59.webp",
        "/The_Augusta_3BHK/60.webp",
    ];
    useEffect(() => {
        images.forEach((src) => {
            const img = new Image();
            img.src = src;
        });
    }, []);
    const handleClickBack = () => {
        setView("explore_360")
    }
    const preventIframeRedirect = (event) => {
        event.preventDefault();
        event.stopPropagation();
    };

    return (
        <div>
            {
                view !== "explore_interior" &&
                <div className="full-container the_augusta">
                    <img src={`/The_Augusta_3BHK/${String(value).padStart(2, "0")}.webp`} alt="" className="home_page_images rotate_view" />
                    <div className="home-slider-container">
                        <Form.Range min={0} max={60} value={value}
                            onChange={(e) => setValue(e.target.value)} className="home_range_slider" />
                    </div>
                    {
                        view === "explore_360" &&
                        <div className="home-explore-vista">
                            <button className="explore-vista-btn" onClick={() => { setView("explore_interior"); }}>Explore Interior</button>
                        </div>
                    }
                </div>
            }
            {
                view === "explore_interior" &&
                <div>
                    <iframe src="https://surbhi-infotech-360.s3.ap-south-1.amazonaws.com/The_Augusta/index.htm?media-index=70"
                        widh={"100%"} height={"100%"} className="explore_interior_iframe" onDoubleClick={preventIframeRedirect} allow="xr-spatial-tracking fullscreen"
                    />
                    <div className='nav_button_container'>
                        <button className="back_btn" onClick={() => { handleClickBack(); }}>
                            <img src={backIcon} alt="back icon" className="backIcon" />
                        </button>
                    </div>
                </div>
            }
        </div>
    )
}

export default TheAugusta3BHK;