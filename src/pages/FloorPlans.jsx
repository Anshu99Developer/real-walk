import "../assets/css/floorplan.css";
import { useState, useEffect } from "react";

const FloorPlans = ({ data }) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [activeFilterIndex, setActiveFilterIndex] = useState(0);
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    if (data?.length > 0) {
      setImageSrc(data[0].image);
    }
  }, [data]);

  const changeFloorPlan = (floorPlanImage, index) => {
    setActiveFilterIndex(index);
    setImageSrc(floorPlanImage);
  };

  return (
    <div className="floorplan_container developer-container">
      <div className="flex w-full h-full justify-between bg-white">
        <div className="left_side_container">
          <img
            alt="floor_plan_image"
            src={imageSrc}
            style={{ maxWidth: "100%" }}
            className={`zoomable-image md:h-[100dvh] max-md:h-[calc(100%-72px)] object-contain ${isZoomed ? "zoomed" : ""}`}
            onClick={() => setIsZoomed(!isZoomed)}
          />
        </div>

        <div className="right_side_container">
          <div className="floor_plan_button-conainer">
            <label className="floor_plan_label">Floor Plans</label>
            {data?.map((item, index) => (
              <button
                key={index}
                onClick={() => changeFloorPlan(item.image, index)}
                className={`${activeFilterIndex === index ? "active" : ""}`}
              >
                {item.title}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloorPlans;
