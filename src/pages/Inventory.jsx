import buildingV2 from "../assets/images/buildingV2.jpg";
import backIcon from "../assets/images/back_icon.png";
import typicalPlan from "../assets/images/floor_plan/floor_plan_Typical_Plan.PNG";
import amenitiesImg from "../assets/images/37thFloorAmenitiesPic.PNG";
import { useState } from "react";

const Inventory = () => {
  const [showPlan, setShowPlan] = useState(false);
  const [isTypicalPlan, setIsTypicalPlan] = useState(false);

  const CustomModal = ({ children, onClose }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="relative bg-white rounded-xl shadow-lg max-w-4xl w-full max-h-[90vh] overflow-auto p-4">
        <button className="absolute top-2 left-2 bg-gray-300 p-1 rounded" onClick={onClose}>
          <img src={backIcon} alt="back icon" className="w-6 h-6" />
        </button>
        {children}
      </div>
    </div>
  );

  return (
    <div className="relative w-full h-screen bg-white overflow-hidden">
      {/* Scaled image as background */}
      <img
        src={buildingV2}
        alt="Building"
        className="w-auto h-screen object-contain mx-auto"
      />

      {/* Scrollable SVG overlay container */}
      <div className="absolute top-0 left-0 w-full h-screen overflow-y-scroll z-10">
        <svg
          viewBox="0 0 736.07086 2000"
          xmlns="http://www.w3.org/2000/svg"
          className="w-auto h-[1000px] mx-auto"
        >
          <g transform="translate(263.1904,512.95831)">
            <path
              onClick={() => {
                setIsTypicalPlan(true);
                setShowPlan(true);
              }}
              style={{
                opacity: 0.5,
                fill: "rgb(255 204 36)",
                strokeWidth: 3,
                cursor: "pointer",
              }}
              d="M 264,-258 L 132,-413 L 7,-298 v 28 L 132,-380 L 262,-233 Z"
            />
          </g>
        </svg>
      </div>

      {/* Floor Plan Modal */}
      {showPlan && (
        <CustomModal onClose={() => setShowPlan(false)}>
          <div className="flex justify-center">
            <img
              src={isTypicalPlan ? typicalPlan : amenitiesImg}
              alt="Floor Plan"
              className="max-w-full max-h-[80vh]"
            />
          </div>
        </CustomModal>
      )}
    </div>
  );
};

export default Inventory;
