import { useEffect, useRef, useState } from "react";
import "../assets/css/inventory.css";
import amenitiesImg from "../assets/images/37thFloorAmenitiesPic.PNG";
import backIcon from "../assets/images/back_icon.png";
import buildingV2 from "../assets/images/buildingV2.jpg";
import typicalPlan from "../assets/images/floor_plan/floor_plan_Typical_Plan.PNG";

const allPaths = [
  {
    opacity: 0.5,
    fill: "#FFCC24",
    d: "m1531.11 843.71-408.02-480.82L771 687.44l.14-77.34 351.26-325.09 408.6 489.9z",
    image: "https://cdn.shopify.com/s/files/1/0749/3573/0392/files/floor_plan_Typical_Plan.png"
  },
  {
    opacity: 0.5,
    fill: "#FFCC24",
    d: "m1532.09 912.35-406.53-463.07-2-2.28L771 764.5l.12-68.79 351.93-324.41L1532 853.25z",
    image: "https://cdn.shopify.com/s/files/1/0749/3573/0392/files/floor_plan_amenitiesImg.png?v=1746106258"
  },
  {
    opacity: 0.5,
    fill: "#FFCC24",
    d: "m1531.1 987.07-406.54-450.28-1.99-2.2L770 845.42v-.01l.13-72.87 351.95-316.98L1531 921.36z",
    image: "https://cdn.shopify.com/s/files/1/0749/3573/0392/files/floor_plan_Typical_Plan.png"
  },
  {
    opacity: 0.5,
    fill: "#FFCC24",
    d: "m1531.09 1057.44-406.54-439.62-1.95-2.1L770 913.91l.11-60.51 352-310.33L1531 995.97z",
    image: "https://cdn.shopify.com/s/files/1/0749/3573/0392/files/floor_plan_Typical_Plan.png"
  },
  {
    opacity: 0.5,
    fill: "#FFCC24",
    d: "m1532.09 1127.26-407.07-430.83-1.96-2.09L770 997.23l1-75.43v-.03l352.06-297.74L1532 1066.27z",
    image: "https://cdn.shopify.com/s/files/1/0749/3573/0392/files/floor_plan_Typical_Plan.png"
  },
  {
    opacity: 0.5,
    fill: "#FFCC24",
    d: "M1532.1 1205.01 1125 789.36l-1.9-1.94L770 1070.9v-.01l.11-65.79 352.53-302.43L1532 1135.91z",
    image: "https://cdn.shopify.com/s/files/1/0749/3573/0392/files/floor_plan_Typical_Plan.png"
  },
  {
    opacity: 0.5,
    fill: "#FFCC24",
    d: "M1532 1274.24v.04l-408.95-402.5L770 1148.68l.12-70.22 352.05-282.65L1531 1213.23z",
    image: "https://cdn.shopify.com/s/files/1/0749/3573/0392/files/floor_plan_Typical_Plan.png"
  },
  {
    opacity: 0.5,
    fill: "#FFCC24",
    d: "m1532.1 1350.42-407.12-391.46-1.85-1.78L770 1224.01l.12-67.71 352.56-276.51L1532 1282.68z",
    image: "https://cdn.shopify.com/s/files/1/0749/3573/0392/files/floor_plan_Typical_Plan.png"
  },
  {
    opacity: 0.5,
    fill: "#FFCC24",
    d: "m1532.1 1422.57-408.95-379.95L770 1297.58v-.01l.12-66.04 352.56-266.39L1532 1358.71z",
    image: "https://cdn.shopify.com/s/files/1/0749/3573/0392/files/floor_plan_Typical_Plan.png"
  },
  {
    opacity: 0.5,
    fill: "#FFCC24",
    d: "m1532.09 1492.93-407.15-366.55-1.78-1.6L770 1374.29v-.01l.12-69.28 352.57-254.55 409.31 380.3z",
    image: "https://cdn.shopify.com/s/files/1/0749/3573/0392/files/floor_plan_Typical_Plan.png"
  },
  {
    opacity: 0.5,
    fill: "#FFCC24",
    d: "m1532.1 1567.9-407.71-353.14-1.74-1.51L769 1454.07l.13-72.34 353.06-249.46L1532 1501.21z",
    image: "https://cdn.shopify.com/s/files/1/0749/3573/0392/files/floor_plan_Typical_Plan.png"
  },
  {
    opacity: 0.5,
    fill: "#FFCC24",
    d: "m1532.1 1641.03-409.43-342.36L769 1526.93v-.01l.11-65.62 353.11-240.45L1532 1575.78z",
    image: "https://cdn.shopify.com/s/files/1/0749/3573/0392/files/floor_plan_Typical_Plan.png"
  },
  {
    opacity: 0.5,
    fill: "#FFCC24",
    d: "m1532.1 1710.73-409.44-329.9L769 1607.68v-.01l.13-73.6 353.1-227.89L1532 1648.81z",
    image: "https://cdn.shopify.com/s/files/1/0749/3573/0392/files/floor_plan_Typical_Plan.png"
  },
  {
    opacity: 0.5,
    fill: "#FFCC24",
    d: "m1532.09 1781.15-407.8-309.35-1.62-1.23L769 1685.59l.12-70.77 353.16-226.53L1532 1718.43z",
    image: "https://cdn.shopify.com/s/files/1/0749/3573/0392/files/floor_plan_Typical_Plan.png"
  },
  {
    opacity: 0.5,
    fill: "#FFCC24",
    d: "M1533 1853.96v.05L1123.13 1558 769 1758.65v-.14l.12-65.88 353.2-214.75L1532 1788.67z",
    image: "https://cdn.shopify.com/s/files/1/0749/3573/0392/files/floor_plan_Typical_Plan.png"
  },
  {
    opacity: 0.5,
    fill: "#FFCC24",
    d: "M1533 1928.47v.01l-408.33-285.1-1.52-1.06L769 1833.69l.12-68.22 353.21-200.13L1532 1861.2z",
    image: "https://cdn.shopify.com/s/files/1/0749/3573/0392/files/floor_plan_Typical_Plan.png"
  },
  {
    opacity: 0.5,
    fill: "#FFCC24",
    d: "M1533 1997.74v-.03l-408.39-269.02-1.47-.96L769 1910.66l.12-70.21 353.23-190.87L1532 1935.59z",
    image: "https://cdn.shopify.com/s/files/1/0749/3573/0392/files/floor_plan_Typical_Plan.png"
  },
  {
    opacity: 0.5,
    fill: "#FFCC24",
    d: "m1533.09 2072.12-408.47-255.98-1.41-.88L769 1988.05l.12-70.62 353.73-182.71L1533 2004.89z",
    image: "https://cdn.shopify.com/s/files/1/0749/3573/0392/files/floor_plan_Typical_Plan.png"
  },
  {
    opacity: 0.5,
    fill: "#FFCC24",
    d: "m1533.1 2140.62-409.05-242.52-1.38-.82L768 2066.64l.12-71.85 354.22-172.8L1533 2079.35z",
    image: "https://cdn.shopify.com/s/files/1/0749/3573/0392/files/floor_plan_Typical_Plan.png"
  },
  {
    opacity: 0.5,
    fill: "#FFCC24",
    d: "M1534 2215.61v.17l-409.58-230.36-1.31-.73L768 2142.4l.12-69.14 354.26-169.16L1533 2147.54z",
    image: "https://cdn.shopify.com/s/files/1/0749/3573/0392/files/floor_plan_Typical_Plan.png"
  },
  {
    opacity: 0.5,
    fill: "#FFCC24",
    d: "m1533.1 2289.26-410.4-213.64L768 2222.38l.13-73.47 354.27-157.34L1533 2222.5",
    image: "https://cdn.shopify.com/s/files/1/0749/3573/0392/files/floor_plan_Typical_Plan.png"
  },
  {
    opacity: 0.5,
    fill: "#FFCC24",
    d: "M1533 2359.63v-.05l-409.14-201.21-1.19-.59L768 2297.26l.12-68.39 354.32-146.59L1533 2296z",
    image: "https://cdn.shopify.com/s/files/1/0749/3573/0392/files/floor_plan_Typical_Plan.png"
  },
  {
    opacity: 0.5,
    fill: "#FFCC24",
    d: "M1534 2432.13v.05l-409.74-186.47-1.12-.51L768 2376.34l1-72.6v-.08l353.94-139.19L1533 2366.14z",
    image: "https://cdn.shopify.com/s/files/1/0749/3573/0392/files/floor_plan_Typical_Plan.png"
  },
  {
    opacity: 0.5,
    fill: "#FFCC24",
    d: "m1534.1 2510.7-409.83-177.5-1.05-.46L768 2451.82l.12-69.1 354.84-131.03L1534 2438.74z",
    image: "https://cdn.shopify.com/s/files/1/0749/3573/0392/files/floor_plan_Typical_Plan.png"
  },
  {
    opacity: 0.5,
    fill: "#FFCC24",
    d: "M1534 2578.24v-.01l-409.82-162.96-1.02-.4L768 2532.84v-.14l.13-74.6 354.37-118.79L1533 2517.1z",
    image: "https://cdn.shopify.com/s/files/1/0749/3573/0392/files/floor_plan_Typical_Plan.png"
  },
  {
    opacity: 0.5,
    fill: "#FFCC24",
    d: "M1534 2648.24v-.03l-409.93-142.24-.89-.32L768 2607.36l.12-68.24 354.46-117.75 410.42 163.2z",
    image: "https://cdn.shopify.com/s/files/1/0749/3573/0392/files/floor_plan_Typical_Plan.png"
  },
  {
    opacity: 0.5,
    fill: "#FFCC24",
    d: "m1534.11 2726.82-410.56-133.45-.84-.28L767 2687.06l.13-73.44 355.4-101.77L1534 2654.63z",
    image: "https://cdn.shopify.com/s/files/1/0749/3573/0392/files/floor_plan_Typical_Plan.png"
  },
  {
    opacity: 0.5,
    fill: "#FFCC24",
    d: "m1534.09 2797.91-410.62-118.16-.77-.23-355.7 88.64v-.01l.12-74.92 355.43-93.89L1534 2733.08z",
    image: "https://cdn.shopify.com/s/files/1/0749/3573/0392/files/floor_plan_Typical_Plan.png"
  },
  {
    opacity: 0.5,
    fill: "#FFCC24",
    d: "m1534.1 2871.04-410.71-102.75-.66-.17L767 2839.89l.12-65.56 355.48-88.58 411.4 118.38z",
    image: "https://cdn.shopify.com/s/files/1/0749/3573/0392/files/floor_plan_Typical_Plan.png"
  },
  {
    opacity: 0.5,
    fill: "#FFCC24",
    d: "m1534.11 2950.31-410.74-96.71-.61-.14L767 2918.61l.12-72.58 68.9-13.91 286.59-57.82L1534 2877.21z",
    image: "https://cdn.shopify.com/s/files/1/0749/3573/0392/files/floor_plan_Typical_Plan.png"
  },
  {
    opacity: 0.5,
    fill: "#FFCC24",
    d: "m1534.09 3020.22-410.82-81.32-.49-.1L767 2986.87l.11-62.13 355.5-65.11L1534 2956.5z",
    image: "https://cdn.shopify.com/s/files/1/0749/3573/0392/files/floor_plan_Typical_Plan.png"
  },
  {
    opacity: 0.5,
    fill: "#FFCC24",
    d: "m1535.08 3079.74-411.43-65.26-.44-.07L767 3063.6l.12-70.66 355.97-48.08 411.91 81.53z",
    image: "https://cdn.shopify.com/s/files/1/0749/3573/0392/files/floor_plan_Typical_Plan.png"
  },
  {
    opacity: 0.5,
    fill: "#FFCC24",
    d: "m1535.13 3167.4-411.53-54.65-.34-.05L767 3149.12l.14-79.49 356.04-49.16 411.82 65.32z",
    image: "https://cdn.shopify.com/s/files/1/0749/3573/0392/files/floor_plan_Typical_Plan.png"
  },
  {
    opacity: 0.5,
    fill: "#FFCC24",
    d: "m1535.1 3240.04-411.6-38.76-.25-.02L767 3226.98l.12-71.82 356.05-36.4 411.83 54.7z",
    image: "https://cdn.shopify.com/s/files/1/0749/3573/0392/files/floor_plan_Typical_Plan.png"
  },
  {
    opacity: 0.5,
    fill: "#FFCC24",
    d: "m1535.11 3314.45-411.67-25.7-.17-.02L767 3306.92l.13-73.9 356.09-25.7L1535 3246.1z",
    image: "https://cdn.shopify.com/s/files/1/0749/3573/0392/files/floor_plan_Typical_Plan.png"
  },
  {
    opacity: 0.5,
    fill: "#FFCC24",
    d: "m1535.1 3388.04-412.36-13.95-356.74 8.59.11-69.73 356.6-18.21 412.29 25.74z",
    image: "https://cdn.shopify.com/s/files/1/0749/3573/0392/files/floor_plan_Typical_Plan.png"
  },
  {
    opacity: 0.5,
    fill: "#FFCC24",
    d: "M1535.09 3453 766 3449.42l.11-60.67 356.62-8.58 412.27 13.94z",
    image: "https://cdn.shopify.com/s/files/1/0749/3573/0392/files/floor_plan_Typical_Plan.png"
  },
];


const Inventory = () => {
  const [isTypicalPlan, setIsTypicalPlan] = useState({
    image: "",
    status: false,
  });
  const [showIframe, setShowIframe] = useState(false);
  const [activePathIndex, setActivePathIndex] = useState(0);
  const scrollRef = useRef(null);
  const maxIndex = allPaths.length - 1;

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

    window.addEventListener("wheel", handleScroll, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, []);

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
        <div className="relative inline-block" ref={scrollRef}>
          <img
            src={buildingV2}
            alt="building"
            className="building_image block max-w-full h-auto"
          />
          <div className="absolute left-0 top-0 w-full h-full z-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 2086.5 3750"
              xmlSpace="preserve"
            >
              {allPaths.map((path, index) => (
                <path
                  key={index}
                  d={path?.d}
                  opacity={0.5}
                  onClick={() => {
                    setIsTypicalPlan({ image: path?.image, status: true });
                  }}
                  fill={index === activePathIndex ? "green" : path?.fill}
                  style={index === activePathIndex ? { cursor: "pointer" } : {}}
                />
              ))}
            </svg>
          </div>
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
    </div>
  );
};

export default Inventory;
