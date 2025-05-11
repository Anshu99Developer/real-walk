import { useEffect, useRef, useState } from "react";
import "../assets/css/inventory.css";
import backIcon from "../assets/images/back_icon.png";

const Inventory = ({ data }) => {
  const [selectedWing, setSelectedWing] = useState(data[0]);
  const [wingMedia, setWingMedia] = useState(data[0].buildingImage);
  const [isTypicalPlan, setIsTypicalPlan] = useState({
    image: "",
    status: false,
  });
  const [showIframe, setShowIframe] = useState(false);
  const [activePathIndex, setActivePathIndex] = useState(0);
  const scrollRef = useRef(null);
  const floorLabelRefs = useRef([]); // Add refs for floor labels

  useEffect(() => {
    if (data?.length) {
    }
  }, [data]);

  const changeWing = (wing) => {
    setSelectedWing(wing);
    const selectedData = data.find((item) => item.title === wing?.title);
    if (selectedData) {
      setWingMedia(selectedData.buildingImage);
    }
  };
  const maxIndex = selectedWing?.floorList?.length - 1;

  useEffect(() => {
    const handleScroll = (e) => {
      e.preventDefault(); // prevent whole-page scroll

      const delta = e.deltaY;

      setActivePathIndex((prevIndex) => {
        if (delta > 0 && prevIndex < maxIndex) {
          return prevIndex + 1;
        } else if (delta < 0 && prevIndex > 0) {
          return prevIndex - 1;
        }
        return prevIndex;
      });
    };

    const currentRef = scrollRef.current;

    if (currentRef) {
      currentRef.addEventListener("wheel", handleScroll, { passive: false });
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener("wheel", handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    if (floorLabelRefs.current[activePathIndex]) {
      floorLabelRefs.current[activePathIndex].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [activePathIndex]); // Trigger on activePathIndex change

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
      <div className="relative w-screen !h-full overflow-hidden home_page_image_container">
        <div className="relative inline-block md:max-w-[650px] max-w-[calc(100%-45px)]" ref={scrollRef}>
          <img
            src={wingMedia}
            alt="building"
            className="building_image block h-auto"
          />
          <div className="absolute left-0 top-0 w-full md:h-full z-10">
            {selectedWing?.floorList?.length > 0 && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 2086.5 3750"
                xmlSpace="preserve"
                className="max-lg:h-full max-lg:w-full"
              >
                {selectedWing?.floorList.map((path, index) => (
                  <path
                    key={index}
                    d={path?.d}
                    opacity={0.5}
                    onClick={() => {
                      setIsTypicalPlan({ image: path?.image, status: true });
                    }}
                    fill={index === activePathIndex ? "green" : "transparent"}
                    style={
                      index === activePathIndex ? { cursor: "pointer" } : {}
                    }
                  />
                ))}
              </svg>
            )}
          </div>
        </div>
        <div className="floor-label h-full overflow-y-auto md:max-h-[100dvh] max-h-[100dvh-78px]">
          {selectedWing?.floorList?.length > 0 &&
            selectedWing?.floorList.map((path, index) => {
              return (
                <div
                  ref={(el) => (floorLabelRefs.current[index] = el)} // Assign ref to each floor label
                  className={`w-10 h-10 flex justify-center items-center ${
                    index === activePathIndex
                      ? "bg-[#ffc86480] text-raisinBlack"
                      : "bg-raisinBlack text-white"
                  }`}
                  key={index}
                  onClick={() => setActivePathIndex(index)} // Synchronize with activePathIndex
                  style={{ cursor: "pointer" }} // Add pointer cursor for better UX
                >
                  {path?.floor}
                </div>
              );
            })}
        </div>
      </div>

      {isTypicalPlan?.status && (
        <CustomModal
          onClose={() => {
            if (showIframe) {
              setShowIframe(false);
            } else {
              setIsTypicalPlan({ image: "", status: false });
            }
          }}
        >
          {showIframe ? (
            <iframe
              // src={openFlat}
              height="100%"
              width="100%"
              className="flats_iframe"
              title="Flat Plan"
            />
          ) : (
            <div className="flex justify-center">
              <img
                src={isTypicalPlan?.image}
                alt="Floor Plan"
                className="max-w-full max-h-[80vh]"
              />
            </div>
          )}
        </CustomModal>
      )}

      <div className="floor_buttons inventory_buttons max-md:flex-col">
        <label className="lg:text-base text-sm font-semibold block pb-2 text-center mb-3 border-b border-raisinBlack">
          Wings
        </label>
        <ul className="flex md:flex-wrap gap-2 md:flex-col !flex-row overflow-x-auto">
          {data?.map((item, index) => (
            <li key={index} className="md:!w-full !w-fit">
              <button
                onClick={() => changeWing(item)}
                className={`text-xs h-full whitespace-nowrap line-clamp-1 ${
                  data?.length > 0 ? "w-full" : ""
                } ${selectedWing?.title === item.title ? "active" : ""}`}
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

export default Inventory;
