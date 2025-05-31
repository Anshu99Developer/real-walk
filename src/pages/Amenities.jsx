import React, { useState, useEffect } from "react";
import "../assets/css/amenities.css"; // Custom styles

const isVideo = (url) => {
  return /\.(mp4|webm|ogg)$/i.test(url);
};

const Amenities = ({ data }) => {
  const [selectedFloor, setSelectedFloor] = useState("");
  const [floorMedia, setFloorMedia] = useState("");

  useEffect(() => {
    if (data?.length) {
      setSelectedFloor(data[0].title);
      setFloorMedia(data[0].media);
    }
  }, [data]);

  const changeFloor = (floorTitle) => {
    setSelectedFloor(floorTitle);
    const selectedData = data.find((item) => item.title === floorTitle);
    if (selectedData) {
      setFloorMedia(selectedData.media);
    }
  };

  return (
    <div className="amenities-container developer-container">
      <div className="scrollable-wrapper">
        <div className={`image-wrapper`}>
          {isVideo(floorMedia) ? (
            <video
              className="responsive-video"
              src={floorMedia}
              type="video/mp4"
              poster={""}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
            />
          ) : (
            <img
              src={floorMedia}
              alt={selectedFloor}
              className="responsive-image"
            />
          )}
        </div>
      </div>

      <div className="floor_buttons amenities_buttons max-md:flex-col">
        <label className="lg:text-base text-sm font-semibold block pb-2 text-center mb-3 border-b border-raisinBlack">
          Amenities
        </label>
        <ul className="flex flex-wrap gap-2 flex-row">
          {data?.map((item, index) => (
            <li key={index} className="w-[calc(50%-4px)]">
              <button
                onClick={() => changeFloor(item.title)}
                className={`text-xs h-full ${data?.length > 0 ? "!w-full" : ""
                  } ${selectedFloor === item.title ? "active" : ""}`}
              >
                {item.title}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Amenities;
