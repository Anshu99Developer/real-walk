import React, { useState, useEffect, useRef } from "react";
import Form from 'react-bootstrap/Form';
import '../../assets/Projects/css/home.css';
import backIcon from "../../assets/Projects/images/back_icon.png";
import floorPlan from "../../assets/Projects/images/Tilal/floor_plan.png";
import entryLevel from "../../assets/Projects/images/Tilal/EntryLevel.jpg";
import firstLevel from "../../assets/Projects/images/Tilal/FirstLevel.jpg";
import icon360 from "../../assets/Projects/images/Tilal/icon360.png";

const TilalHomeV2 = ({ view, setView }) => {
    const [value, setValue] = useState(0);
    const [showFloorPlan, setShowFloorPlan] = useState(false);
    const [mediaIndex, setShowMediaIndex] = useState(0);
    const iframeRef = useRef();

    const images = [
        "/tilal_home_square/00.jpg",
        "/tilal_home_square/01.jpg",
        "/tilal_home_square/02.jpg",
        "/tilal_home_square/03.jpg",
        "/tilal_home_square/04.jpg",
        "/tilal_home_square/05.jpg",
        "/tilal_home_square/06.jpg",
        "/tilal_home_square/07.jpg",
        "/tilal_home_square/08.jpg",
        "/tilal_home_square/09.jpg",
        "/tilal_home_square/10.jpg",
        "/tilal_home_square/11.jpg",
        "/tilal_home_square/12.jpg",
        "/tilal_home_square/13.jpg",
        "/tilal_home_square/14.jpg",
        "/tilal_home_square/15.jpg",
        "/tilal_home_square/16.jpg",
        "/tilal_home_square/17.jpg",
        "/tilal_home_square/18.jpg",
        "/tilal_home_square/19.jpg",
        "/tilal_home_square/20.jpg",
        "/tilal_home_square/21.jpg",
        "/tilal_home_square/22.jpg",
        "/tilal_home_square/23.jpg",
        "/tilal_home_square/24.jpg",
        "/tilal_home_square/25.jpg",
        "/tilal_home_square/26.jpg",
        "/tilal_home_square/27.jpg",
        "/tilal_home_square/28.jpg",
        "/tilal_home_square/29.jpg",
        "/tilal_home_square/30.jpg",
        "/tilal_home_square/31.jpg",
        "/tilal_home_square/32.jpg",
        "/tilal_home_square/33.jpg",
        "/tilal_home_square/34.jpg",
        "/tilal_home_square/35.jpg",
        "/tilal_home_square/36.jpg",
        "/tilal_home_square/37.jpg",
        "/tilal_home_square/38.jpg",
        "/tilal_home_square/39.jpg",
        "/tilal_home_square/40.jpg",
        "/tilal_home_square/41.jpg",
        "/tilal_home_square/42.jpg",
        "/tilal_home_square/43.jpg",
        "/tilal_home_square/44.jpg",
        "/tilal_home_square/45.jpg",
        "/tilal_home_square/46.jpg",
        "/tilal_home_square/47.jpg",
        "/tilal_home_square/48.jpg",
        "/tilal_home_square/49.jpg",
        "/tilal_home_square/50.jpg",
        "/tilal_home_square/51.jpg",
        "/tilal_home_square/52.jpg",
        "/tilal_home_square/53.jpg",
        "/tilal_home_square/54.jpg",
        "/tilal_home_square/55.jpg",
        "/tilal_home_square/56.jpg",
        "/tilal_home_square/57.jpg",
        "/tilal_home_square/58.jpg",
        "/tilal_home_square/59.jpg",
        "/tilal_home_square/60.jpg",
    ];
    useEffect(() => {
        images.forEach((src) => {
            const img = new Image();
            img.src = src;
        });
    }, []);
    const preventIframeRedirect = (event) => {
        event.preventDefault();
        event.stopPropagation();
    };
    const handleClickBack = () => {
        setView("explore_360")
    }

    const handleChange360 = (index) => {
        setShowMediaIndex(index);
        iframeRef.current.src = "https://surbhi-infotech.s3.ap-south-1.amazonaws.com/3D_Vista/Tilal/index.htm?media-index=" + index;
    }
    return (
        <div>
            {
                view !== "explore_interior" &&
                <div className="full-container tilal">
                    <img src={`/tilal_home_square/${String(value).padStart(2, "0")}.jpg`} alt="" className="home_page_images rotate_view tilal" />
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
                <div className="explore_interior_container">
                    <iframe ref={iframeRef} src={`https://surbhi-infotech.s3.ap-south-1.amazonaws.com/3D_Vista/Tilal/index.htm`}
                        widh={"100%"} height={"100%"} className="explore_interior_iframe" onDoubleClick={preventIframeRedirect} allow="xr-spatial-tracking fullscreen"
                    />
                    <div className='nav_button_container'>
                        <button className="back_btn" onClick={() => { handleClickBack(); }}>
                            <img src={backIcon} alt="back icon" className="backIcon" />
                        </button>
                        {/* <button className="back_btn floor_plan_btn" onClick={() => { setShowFloorPlan(!showFloorPlan) }} >
                            <img src={floorPlan} className="floorPlan_icon" />
                        </button>
                        {
                            showFloorPlan &&
                            <div className="floor_Plan_container text-align-end">
                                <div className="floor_Plan_container_div">
                                    <div className="text-align-center">
                                        <span className="floor_plan_text"> Entry Level</span>
                                        <div className="floor_plan_360_points_div">
                                            <img src={entryLevel} alt="entry_level" className="floor_plan_image" />
                                            <div className="floor_plan_360_points_360">
                                                <img src={icon360} alt="entry_level" className="floor_plan_image_360 entry_living_room" onClick={() => { handleChange360(0); }} />
                                                <img src={icon360} alt="entry_living_room_1" className="floor_plan_image_360 entry_living_room_1" onClick={() => { handleChange360(3); }} />
                                                <img src={icon360} alt="entry_dinning_area" className="floor_plan_image_360 entry_dinning_area" onClick={() => { handleChange360(5); }} />
                                                <img src={icon360} alt="entry_kitchen_area" className="floor_plan_image_360 entry_kitchen_area" onClick={() => { handleChange360(16); }} />
                                                <img src={icon360} alt="entry_deck_area" className="floor_plan_image_360 entry_deck_area" onClick={() => { handleChange360(8); }} />
                                                <img src={icon360} alt="entry_garden_1" className="floor_plan_image_360 entry_garden_1" onClick={() => { handleChange360(10); }} />
                                                <img src={icon360} alt="entry_garden_2" className="floor_plan_image_360 entry_garden_2" onClick={() => { handleChange360(11); }} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-align-center">
                                        <span className="floor_plan_text"> First Level</span>
                                        <div className="floor_plan_360_points_div">
                                            <img src={firstLevel} alt="entry_level" className="floor_plan_image" />
                                            <div className="floor_plan_360_points_360">
                                                <img src={icon360} alt="entry_study_area" className="floor_plan_image_360 entry_study_area" onClick={() => { handleChange360(23); }} />
                                                <img src={icon360} alt="entry_bedroom_3" className="floor_plan_image_360 entry_bedroom_3" onClick={() => { handleChange360(25); }} />
                                                <img src={icon360} alt="entry_bedroom_2" className="floor_plan_image_360 entry_bedroom_2" onClick={() => { handleChange360(27); }} />
                                                <img src={icon360} alt="entry_bedroom_1" className="floor_plan_image_360 entry_bedroom_1" onClick={() => { handleChange360(34); }} />
                                                <img src={icon360} alt="entry_sitting_area" className="floor_plan_image_360 entry_sitting_area" onClick={() => { handleChange360(30); }} />
                                                <img src={icon360} alt="entry_bedroom_1_wash_room" className="floor_plan_image_360 entry_bedroom_1_wash_room" onClick={() => { handleChange360(36); }} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        } */}
                    </div>
                </div >
            }
        </div >
    )
}

export default TilalHomeV2;