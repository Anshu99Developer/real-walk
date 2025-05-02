import React from "react";
import "../assets/css/slider.css";
// import backgroundVideo from "../assets/videos/Tirupati_BG.mp4";

const Highlights = ({ data }) => {
  return (
    <div className="slider-container developer-container">
      <video
        className="home_video"
        src={data?.video}
        type="video/mp4"
        poster={""}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      />
    </div>
  );
};

export default Highlights;
