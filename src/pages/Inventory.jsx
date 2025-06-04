import { useEffect, useRef, useState } from "react";
import "../assets/css/inventory.css";
import backIcon from "../assets/images/back_icon.png";

const Inventory = ({ data }) => {
  const [selectedWing, setSelectedWing] = useState(data[0]);
  const [wingMedia, setWingMedia] = useState(data[0].buildingImage);
  const [openFlat, setOpenFlat] = useState("");
  const [overlaySVG, setOverlaySVG] = useState("");
  const [isTypicalPlan, setIsTypicalPlan] = useState({
    data: {
      image: "",
      overlay: "",
      links: {
        left1: "",
        left2: "",
        center1: "",
        right1: "",
        right2: "",
      },
    },
    status: false,
  });
  const [showIframe, setShowIframe] = useState(false);
  const [activePathIndex, setActivePathIndex] = useState(0);
  const scrollRef = useRef(null);
  const floorScrollRef = useRef();
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-70">
      <div className="relative bg-white rounded-xl shadow-lg w-full max-h-[90vh] overflow-auto p-4  max-w-[90%] mx-auto">
        <button
          className="absolute top-2 left-2 bg-dustyGray z-10"
          onClick={onClose}
        >
          <img src={backIcon} alt="back icon" className="w-6 h-6" />
        </button>
        {children}
      </div>
    </div>
  );

  const handleFloorClick = (path) => {
    setIsTypicalPlan({
      data: { image: path?.image, overlay: path?.overlay, links: path?.links },
      status: true,
    });
    fetch(path?.overlay)
      .then((res) => res.text())
      .then((svg) => {
        setOverlaySVG(svg);
      });
  };

  const handleOpenIframe = (link) => {
    setOpenFlat(link);
    setShowIframe(true);
  };

  useEffect(() => {
    if (!isTypicalPlan?.status || showIframe === true) return;

    const svgContainer = document.getElementById("svg-container");
    if (!svgContainer) return;

    const pathIds = Object.keys(isTypicalPlan?.data?.links || {});
    const eventHandlers = {};

    pathIds.forEach((id) => {
      const pathElement = svgContainer.querySelector(`#${id}`);
      if (pathElement && !eventHandlers[id]) {
        const handleClick = () =>
          handleOpenIframe(isTypicalPlan?.data?.links?.[id]);
        pathElement.style.cursor = "pointer";
        pathElement.addEventListener("click", handleClick);
        eventHandlers[id] = handleClick;
      }
    });

    return () => {
      // Cleanup on component unmount or rerender
      pathIds.forEach((id) => {
        const el = svgContainer.querySelector(`#${id}`);
        if (el && eventHandlers[id]) {
          el.removeEventListener("click", eventHandlers[id]);
        }
      });
    };
  }, [overlaySVG, showIframe]);

  const scrollTimeout = useRef(null);

  const handleScrollPicker = () => {
    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);

    scrollTimeout.current = setTimeout(() => {
      const container = floorScrollRef.current;
      const itemHeight = floorLabelRefs.current[0]?.offsetHeight || 0;

      const containerCenter = container.scrollTop + container.offsetHeight / 2;

      let closestIndex = 0;
      let minDiff = Infinity;

      floorLabelRefs.current.forEach((el, index) => {
        const elCenter = el.offsetTop + itemHeight / 2;
        const diff = Math.abs(containerCenter - elCenter);
        if (diff < minDiff) {
          minDiff = diff;
          closestIndex = index;
        }
      });

      // Scroll smoothly to snap
      floorLabelRefs.current[closestIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      setActivePathIndex(closestIndex);
    }, 100); // debounce to detect scroll stop
  };

  return (
    <div className="full-container developer-container bg-white max-md:flex-col">
      <div className="relative w-screen !h-full overflow-hidden home_page_image_container">
        <div className="relative">
          <div
            className="relative inline-block w-full md:max-w-[calc(100%-45px)]"
            ref={scrollRef}
          >
            <img
              src={wingMedia}
              alt="building"
              className="building_image block"
            />
            <div className="absolute left-0 top-0 w-full md:h-full z-10">
              {selectedWing?.floorList?.length > 0 && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 2086.5 3750"
                  xmlSpace="preserve"
                  className="h-full w-full"
                >
                  {selectedWing?.floorList.map((path, index) => (
                    <path
                      key={index}
                      id={`path-${index}`} // Add unique id to each path
                      onClick={() => handleFloorClick(path)}
                      d={path?.d}
                      opacity={0.5}
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
          <div
            className="floor-label-picker"
            ref={floorScrollRef}
            onScroll={handleScrollPicker}
          >
            <div className="floor-label-list">
              {selectedWing?.floorList?.map((path, index) => (
                <div
                  ref={(el) => (floorLabelRefs.current[index] = el)}
                  className={`floor-label-item ${index === activePathIndex ? "active" : ""
                    }`}
                  onClick={() => setActivePathIndex(index)}
                  key={index}
                >
                  {path?.floor}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {console.log("isTypicalPlan", isTypicalPlan)}
      {isTypicalPlan?.status && (
        <CustomModal
          onClose={() => {
            if (showIframe) {
              setShowIframe(false);
            } else {
              setIsTypicalPlan({ data: {}, status: false });
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
            <div className="flex justify-center relative">
              <img
                src={isTypicalPlan?.data?.image}
                alt="Floor Plan"
                className="max-w-full max-h-[80dvh]"
              />
              <div
                id="svg-container"
                className="inventory_floor_plan_svg max-h-[80dvh]"
                dangerouslySetInnerHTML={{ __html: overlaySVG }}
              ></div>
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
                className={`text-xs h-full whitespace-nowrap line-clamp-1 ${data?.length > 0 ? "w-full" : ""
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
