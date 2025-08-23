import { useLocation, useNavigate, useParams } from 'react-router-dom';
import homeImg from '../assets/Projects/images/home.png';
import hightlightsImg from '../assets/Projects/images/hightlights.png';
import viewsImg from '../assets/Projects/images/views.png';
import locationImg from '../assets/Projects/images/location.png';
import amenitiesImg from '../assets/Projects/images/amenities.png';
import floorplanImg from '../assets/Projects/images/floor_plan.png';
import apartmentImg from '../assets/Projects/images/inventory.png';
import day_nightImg from '../assets/Projects/images/day_night.png';
import '../assets/css/leftSideBarNav.css';
import locationIcon from '../assets/Projects/images/icons/location.png';
import DayNightModeIcon from '../assets/Projects/images/icons/DayNightMode.png';
import FloorPlanIcon from '../assets/Projects/images/icons/FloorPlan.png';
import AmenitiesIcon from '../assets/Projects/images/icons/Amenities.png';
import DroneViewIcon from '../assets/Projects/images/icons/DroneView.png';
import HighlightIcon from '../assets/Projects/images/icons/Highlight.png';
import HomeIcon from '../assets/Projects/images/icons/Home.png';
import InventoryIcon from '../assets/Projects/images/icons/Inventory.png';
import VirtualTourBlack from '../assets/Projects/images/icons/VirtualTourBlack.png';
import locationIconWhite from '../assets/Projects/images/icons/locationWhite.png';
import DayNightModeIconWhite from '../assets/Projects/images/icons/DayNightModeWhite.png';
import FloorPlanIconWhite from '../assets/Projects/images/icons/FloorPlanWhite.png';
import AmenitiesIconWhite from '../assets/Projects/images/icons/AmenitiesWhite.png';
import DroneViewIconWhite from '../assets/Projects/images/icons/DroneViewWhite.png';
import HighlightIconWhite from '../assets/Projects/images/icons/HighlightWhite.png';
import HomeIconWhite from '../assets/Projects/images/icons/HomeWhite.png';
import InventoryIconWhite from '../assets/Projects/images/icons/InventoryWhite.png';
import VirtualTourWhite from '../assets/Projects/images/icons/VirtualTourWhite.png';
import { useEffect, useRef, useState } from 'react';



const SeaBeeezeLeftSideBarNav = () => {
    const navigate = useNavigate();
    const location = useLocation(); // Get current path
    const { developer } = useParams();
    const [activePath, setActivePath] = useState(localStorage.getItem('activePath') || location.pathname);
    const menuRef = useRef(null);

    useEffect(() => {
        localStorage.setItem('activePath', location.pathname);
        setActivePath(location.pathname);
    }, [location.pathname]);

    useEffect(() => {
        setTimeout(() => {
            const activeElement = document.querySelector(".btn_container.active");
            if (activeElement && menuRef.current) {
                const container = menuRef.current;
                const elementOffset = activeElement.offsetLeft + activeElement.offsetWidth / 2;
                const scrollPosition = elementOffset - container.offsetWidth / 2;
                container.scrollTo({ left: scrollPosition, behavior: "smooth" });
            }
        }, 100);
    }, [activePath]);

    const menuItems = [
        { path: `/sea-breeze/`, img: homeImg, alt: "home", icon: HomeIconWhite, iconHover: HomeIcon, text: "Home", id: "home" },
        // { path: `/sea-breeze/day-night`, img: day_nightImg, alt: "Day/Night", icon: DayNightModeIconWhite, iconHover: DayNightModeIcon, text: "Day/Evening", id: "day_evening" },
        { path: `/sea-breeze/360-tour`, img: apartmentImg, alt: "360 tour", icon: VirtualTourWhite, iconHover: VirtualTourBlack, text: "360° Tour", id: "360_tour" },
        { path: `/sea-breeze/highlights`, img: hightlightsImg, alt: "highlights", icon: HighlightIconWhite, iconHover: HighlightIcon, text: "Hightlights", id: "hightlights" },
        // { path: `/sea-breeze/views`, img: viewsImg, alt: "views", icon: DroneViewIconWhite, iconHover: DroneViewIcon, text: "Drone", id: "drone" },
        { path: `/sea-breeze/location`, img: locationImg, alt: "location", icon: locationIconWhite, iconHover: locationIcon, text: "Location", id: "location" },
        { path: `/sea-breeze/amenities`, img: amenitiesImg, alt: "amenities", icon: AmenitiesIconWhite, iconHover: AmenitiesIcon, text: "Amenities", id: "amenities" },
        { path: `/sea-breeze/floorplans`, img: floorplanImg, alt: "floor_plan", icon: FloorPlanIconWhite, iconHover: FloorPlanIcon, text: "Floor Plan", id: "floor_plan" },
        { path: `/sea-breeze/inventory`, img: apartmentImg, alt: "inventory", icon: InventoryIconWhite, iconHover: InventoryIcon, text: "Inventory", id: "inventory" },
    ];

    const handleMenuClick = (id, path) => {
        navigate(path);
        setTimeout(() => {
            const element = document.getElementById(id);
            if (element && menuRef.current) {
                const container = menuRef.current;
                const elementOffset = element.offsetLeft + element.offsetWidth / 2;
                const scrollPosition = elementOffset - container.offsetWidth / 2;
                container.scrollTo({ left: scrollPosition, behavior: "smooth" });
            }
        }, 100);
    };

    return (
        <div className='sidebar_container bg-raisinBlack z-[99] md:h-[100dvh]'>
            <div className='sideBar_container_grid' ref={menuRef}>
                {menuItems.map((item) => (
                    <div className={`btn_container ${activePath === item.path ? 'active' : ''}`} key={item.path} id={item?.id}>
                        <button key={item.path}
                            type='button'
                            className={`sidebar_btn outline-none focus:outline-none ${activePath === item.path ? 'active' : ''}`}
                            onClick={(e) => { handleMenuClick(item?.id, item.path); }}
                        >
                            <span>
                                <img src={item.icon} alt={item.alt} className='btn_icon' />
                                <img src={item.iconHover} alt={item.alt} className='btn_icon hover_icon' />
                            </span>
                            <p className='btn_text'>{item.text}</p>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SeaBeeezeLeftSideBarNav;
