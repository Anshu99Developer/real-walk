import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import '../../assets/Projects/css/home.css';
import backIcon from "../../assets/Projects/images/back_icon.png";

const TheAugustaExplore360Campus = ({ selectedHouseBHK, view, setView, panoramaName }) => {


    const handleClickBack = () => {
        setView("house_plan")
    }
    const preventIframeRedirect = (event) => {
        event.preventDefault();
        event.stopPropagation();
    };
    console.log("panoramaName", panoramaName)

    return (
        <div>
            {
                view === "explore_campus_3d_360" &&
                <div>
                    <iframe src={`https://surbhi-infotech-360.s3.ap-south-1.amazonaws.com/The_Augusta/index.htm?media-name=${panoramaName}`}
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

export default TheAugustaExplore360Campus;