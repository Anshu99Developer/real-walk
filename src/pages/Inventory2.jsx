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

  return (
    <div className="full-container developer-container bg-white">
      <div className="relative w-screen h-screen overflow-hidden home_page_image_container">
        <img src={buildingV2} alt="building" className="building_image" />

        <svg
          width="736.07086mm"
          height="1322.9169mm"
          viewBox="0 0 736.07086 1322.9168"
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          className="building_svg"
        >
          <g transform="translate(263.1904,512.95831)">
            <path
              onClick={() => {
                setShowPlan(true);
                setIsTypicalPlan(false);
              }}
              style={{
                opacity: 0.5,
                fill: "rgb(255 204 36)",
                strokeWidth: 3,
              }}
              d="M 264,-258 L 132,-413 L 7,-298 v 28 L 132,-380 L 262,-233 Z"
            />
          </g>
        </svg>
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
