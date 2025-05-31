import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import '../../assets/Projects/css/home.css';
import backIcon from "../../assets/Projects/images/back_icon.png";

const TheAugusta2BHK = ({ selectedHouseBHK, view, setView }) => {
    const [value, setValue] = useState(0);

    const images = [
        "/The_Augusta_2BHK/00.jpg",
        "/The_Augusta_2BHK/01.jpg",
        "/The_Augusta_2BHK/02.jpg",
        "/The_Augusta_2BHK/03.jpg",
        "/The_Augusta_2BHK/04.jpg",
        "/The_Augusta_2BHK/05.jpg",
        "/The_Augusta_2BHK/06.jpg",
        "/The_Augusta_2BHK/07.jpg",
        "/The_Augusta_2BHK/08.jpg",
        "/The_Augusta_2BHK/09.jpg",
        "/The_Augusta_2BHK/10.jpg",
        "/The_Augusta_2BHK/11.jpg",
        "/The_Augusta_2BHK/12.jpg",
        "/The_Augusta_2BHK/13.jpg",
        "/The_Augusta_2BHK/14.jpg",
        "/The_Augusta_2BHK/15.jpg",
        "/The_Augusta_2BHK/16.jpg",
        "/The_Augusta_2BHK/17.jpg",
        "/The_Augusta_2BHK/18.jpg",
        "/The_Augusta_2BHK/19.jpg",
        "/The_Augusta_2BHK/20.jpg",
        "/The_Augusta_2BHK/21.jpg",
        "/The_Augusta_2BHK/22.jpg",
        "/The_Augusta_2BHK/23.jpg",
        "/The_Augusta_2BHK/24.jpg",
        "/The_Augusta_2BHK/25.jpg",
        "/The_Augusta_2BHK/26.jpg",
        "/The_Augusta_2BHK/27.jpg",
        "/The_Augusta_2BHK/28.jpg",
        "/The_Augusta_2BHK/29.jpg",
        "/The_Augusta_2BHK/30.jpg",
        "/The_Augusta_2BHK/31.jpg",
        "/The_Augusta_2BHK/32.jpg",
        "/The_Augusta_2BHK/33.jpg",
        "/The_Augusta_2BHK/34.jpg",
        "/The_Augusta_2BHK/35.jpg",
        "/The_Augusta_2BHK/36.jpg",
        "/The_Augusta_2BHK/37.jpg",
        "/The_Augusta_2BHK/38.jpg",
        "/The_Augusta_2BHK/39.jpg",
        "/The_Augusta_2BHK/40.jpg",
        "/The_Augusta_2BHK/41.jpg",
        "/The_Augusta_2BHK/42.jpg",
        "/The_Augusta_2BHK/43.jpg",
        "/The_Augusta_2BHK/44.jpg",
        "/The_Augusta_2BHK/45.jpg",
        "/The_Augusta_2BHK/46.jpg",
        "/The_Augusta_2BHK/47.jpg",
        "/The_Augusta_2BHK/48.jpg",
        "/The_Augusta_2BHK/49.jpg",
        "/The_Augusta_2BHK/50.jpg",
        "/The_Augusta_2BHK/51.jpg",
        "/The_Augusta_2BHK/52.jpg",
        "/The_Augusta_2BHK/53.jpg",
        "/The_Augusta_2BHK/54.jpg",
        "/The_Augusta_2BHK/55.jpg",
        "/The_Augusta_2BHK/56.jpg",
        "/The_Augusta_2BHK/57.jpg",
        "/The_Augusta_2BHK/58.jpg",
        "/The_Augusta_2BHK/59.jpg",
        "/The_Augusta_2BHK/60.jpg",
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
                    <img src={`/The_Augusta_2BHK/${String(value).padStart(2, "0")}.jpg`} alt="" className="home_page_images rotate_view" />
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
                    <iframe src="https://surbhi-infotech-360.s3.ap-south-1.amazonaws.com/The_Augusta/index.htm?media-name=Street%20View%2009"
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

export default TheAugusta2BHK;