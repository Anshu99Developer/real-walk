import buildingV2 from "../assets/images/buildingV2.jpg";
import backIcon from "../assets/images/back_icon.png";
import "../assets/css/inventory.css";
import { useState } from "react";
import typicalPlan from "../assets/images/floor_plan/floor_plan_Typical_Plan.PNG";
import amenitiesImg from "../assets/images/37thFloorAmenitiesPic.PNG";

const Inventory = () => {
  const [showPlan, setShowPlan] = useState(false);
  const [isTypicalPlan, setIsTypicalPlan] = useState(false);
  const [openFlat, setOpenFlat] = useState("");
  const [showIframe, setShowIframe] = useState(false);
  const [svgOffsetY, setSvgOffsetY] = useState(0);

  const CustomModal = ({ children, onClose }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="relative bg-white rounded-xl shadow-lg max-w-4xl w-full max-h-[90vh] overflow-auto p-4">
        <button
          className="absolute top-2 left-2 bg-dustyGray"
          onClick={onClose}
        >
          <img src={backIcon} alt="back icon" className="w-6 h-6" />
        </button>
        {children}
      </div>
    </div>
  );

  const handleWheel = (e) => {
    const step = 14;
    const maxOffset = 37 * step;

    setSvgOffsetY((prev) => {
      if (e.deltaY > 0 && prev + step <= maxOffset) {
        return prev + step;
      } else if (e.deltaY < 0 && prev - step >= 0) {
        return prev - step;
      }
      return prev;
    });
  };

  return (
    <div className="full-container developer-container bg-white">
      <div className="relative w-screen h-screen overflow-hidden home_page_image_container">
        <div className="relative" onWheel={handleWheel}>
          <img src={buildingV2} alt="building" className="building_image" />
          <div>
            <svg
              width="300"
              height={37 * 180}
              viewBox="0 -420 300 1500"
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              className="building_svg"
              style={{ transform: `translate(-50%, ${svgOffsetY}px)` }}
            >
              <g>
                {Array.from({ length: 32 }).map((_, index) => {
                  const yOffset = index * 40; // Stack directly under previous
                  return (
                    <path
                      key={index}
                      onClick={() => {
                        setShowPlan(true);
                        setIsTypicalPlan(false);
                      }}
                      style={{
                        opacity: 0.5,
                        fill: "rgb(255 204 36)",
                        strokeWidth: 1,
                      }}
                      // transform={`translate(0, ${yOffset})`}
                      // d="M 264.03883,-258.48769 132.86966,-413.99331 7.7411631,-298.18362 v 28.82299 L 132.86966,-380.62572 262.88824,-233.7292 Z"
                      d={`M 264.03883,${-258.48769 + yOffset} 132.86966,${-413.99331 + yOffset} 7.7411631,${-298.18362 + yOffset} v 28.82299 L 132.86966,${-380.62572 + yOffset} 262.88824,${-233.7292 + yOffset} Z`}
                      // d={'M 264.03883,125.42876 132.86966,30.17553 7.7411631,102.41663 v 27.38473 L 132.86966,57.50243 262.88824,148.46134 Z'}
                    />
                  );
                })}
                {/* <path
                  key={0}
                  onClick={() => {
                    setShowPlan(true);
                    setIsTypicalPlan(false);
                  }}
                  style={{
                    opacity: 0.5,
                    fill: "rgb(255 204 36)",
                    strokeWidth: 1,
                  }}
                  d="M 264.03883,-258.48769 132.86966,-413.99331 7.7411631,-298.18362 v 28.82299 L 132.86966,-380.62572 262.88824,-233.7292 Z"
                />
                <path
                  key={0}
                  onClick={() => {
                    setShowPlan(true);
                    setIsTypicalPlan(false);
                  }}
                  style={{
                    opacity: 0.5,
                    fill: "rgb(255 204 36)",
                    strokeWidth: 1,
                  }}
                  d="M 264.03883,-228.48769 132.86966,-383.99331 7.7411631,-278.18362 v 28.82299 L 132.86966,-360.62572 262.88824,-213.7292 Z"
                />
                <path
                  key={1}
                  onClick={() => {
                    setShowPlan(true);
                    setIsTypicalPlan(false);
                  }}
                  style={{
                    opacity: 0.5,
                    fill: "rgb(255 204 36)",
                    strokeWidth: 1,
                  }}
                  d="M 264.03883,125.42876 132.86966,30.17553 7.7411631,102.41663 v 27.38473 L 132.86966,57.50243 262.88824,148.46134 Z"
                />
                <path
                  key={1}
                  onClick={() => {
                    setShowPlan(true);
                    setIsTypicalPlan(false);
                  }}
                  style={{
                    opacity: 0.5,
                    fill: "rgb(255 204 36)",
                    strokeWidth: 1,
                  }}
                  d="M 264.03883,125.42876 132.86966,30.17553 7.7411631,102.41663 v 27.38473 L 132.86966,57.50243 262.88824,148.46134 Z"
                /> */}
              </g>
            </svg>
          </div>
        </div>
      </div>

      {showPlan && (
        <CustomModal
          onClose={() => {
            if (showIframe) {
              setShowIframe(false);
            } else {
              setShowPlan(false);
            }
          }}
        >
          {showIframe ? (
            <iframe
              src={openFlat}
              height="100%"
              width="100%"
              className="flats_iframe"
              title="Flat Plan"
            />
          ) : (
            <div className="flex justify-center">
              <img
                src={isTypicalPlan ? typicalPlan : amenitiesImg}
                alt="Floor Plan"
                className="max-w-full max-h-[80vh]"
              />
            </div>
          )}
        </CustomModal>
      )}
    </div>
  );
};

export default Inventory;
