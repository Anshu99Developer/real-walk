import { useState, useRef, useEffect } from 'react';
import '../../assets/Projects/css/Tilal/TilalHousePlan.css';
import TilalHouseMainPlan from '../../assets/Projects/images/Tilal/Tilal_House_Main_Plan.jpg';
import HouseV1 from '../../assets/Projects/images/Tilal/HouseV1.jpg';
import backIcon from "../../assets/Projects/images/back_icon.png";
import TilalHomeV2 from './TilalHomeV2';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import fullscreen from "../../assets/Projects/images/fullscreen.png";

const TilalHome = () => {
    const scrollContainerRef = useRef();
    const modalRef = useRef();

    const [view, setView] = useState("house_plan");
    const [selectedHouseNo, setSelectedHouseNo] = useState(null);

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (container) {
            const scrollX = (container.scrollWidth - container.clientWidth) / 2 + 100;
            const scrollY = (container.scrollHeight - container.clientHeight) / 2;
            container.scrollTo({
                left: scrollX,
                top: scrollY,
                behavior: 'smooth',
            });
        }
    }, [view]);

    console.log("efidshoidf", view)

    const handleVillaExpore360 = () => {
        setView("explore_360");
    }

    const handleClickBack = () => {
        setView("house_plan");
        setSelectedHouseNo(null);
    }
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                selectedHouseNo !== null &&
                modalRef.current &&
                !modalRef.current.contains(e.target)
            ) {
                setSelectedHouseNo(null);
            }
        };

        // Add listener only when the modal is shown
        if (selectedHouseNo !== null && view === "house_plan") {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [selectedHouseNo, view]);
    const handleFullScreen = () => {
        const elem = document.documentElement;

        if (!document.fullscreenElement) {
            if (elem.requestFullscreen) {
                elem.requestFullscreen();
            } else if (elem.mozRequestFullScreen) { // Firefox
                elem.mozRequestFullScreen();
            } else if (elem.webkitRequestFullscreen) { // Chrome, Safari and Opera
                elem.webkitRequestFullscreen();
            } else if (elem.msRequestFullscreen) { // IE/Edge
                elem.msRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }
    }
    return (
        <div>
            {
                view === "house_plan" &&
                <div className="house_plan_wrapper" ref={scrollContainerRef}>
                    <div className="house_plan_scrollable" ref={scrollContainerRef}>
                        <TransformWrapper
                            initialScale={window.innerWidth >= 991 ? window.innerWidth >= 1440 ? 1.25 : 1.5 : 3.5}
                            disablePadding={true}
                            centerOnInit={true}
                        >
                            <TransformComponent
                                wrapperStyle={{ height: window.innerWidth >= 991 ? "100vh" : "100vh" }}
                            >
                                <div className="house_plan_container">
                                    <img src={TilalHouseMainPlan} className='tilal_house_plan_image' />
                                    <svg
                                        width="2032mm"
                                        height="1143mm"
                                        viewBox="0 0 2032 1143"
                                        id="svg1"
                                        xmlSpace="preserve"
                                        className="tilal_house_plan_svg"
                                    >
                                        <defs id="defs1" />
                                        <g id="layer1" transform="translate(911.17645,423)">
                                            <path
                                                d="m -624.80755,133.89014 32.33726,-23.86234 -0.45518,-1.12476 2.3173,-2.03919 -4.63102,-13.935881 -1.62941,-1.286405 -0.42881,-2.05822 -10.46263,-7.632567 -1.0291,0.943345 -1.02912,-0.943345 -6.43194,4.888282 -5.31709,-3.944937 -22.81198,16.894598 2.74431,8.74744 3.34462,2.14397 1.58189,1.28757 -8.35984,6.15061 z"
                                                id="path1"
                                                onClick={() => { setSelectedHouseNo(1) }}
                                                className={`house_path_tilal ${selectedHouseNo === 1 && 'house_selected'}`}
                                            />
                                            <path
                                                d="m -702.60983,84.523558 5.9174,-3.944937 -3.77341,-10.46263 24.09836,-15.608194 2.48702,2.401252 3.94493,-2.744285 -2.83006,-9.433533 -9.43352,-8.147129 -1.62943,1.029123 -1.54366,-1.114875 -6.68923,4.545224 -4.45949,-4.030662 -24.0126,15.436665 3.17309,8.40441 5.66012,5.317066 -6.77499,4.116467"
                                                id="path2"
                                                onClick={() => { setSelectedHouseNo(2) }}
                                                className={`house_path_tilal ${selectedHouseNo === 2 && 'house_selected'}`}
                                            />
                                            <path
                                                d="m -479.8282,45.810708 40.5212,-16.192637 -10.18626,-15.78566 -0.98495,-3.233006 -4.54641,-7.4507908 -0.47613,0.2661555 -1.87105,-2.99062353 -4.15513,-6.24974557 0.37825,-0.1641207 -4.31654,-6.5920849 -11.52178,5.0938381 0.97025,3.6384441 -4.0023,1.6979635 -2.06179,-3.3959005 -10.18768,4.4874391 1.09154,3.1533306 -10.91538,4.4874126 2.21752,7.5344335 z"
                                                id="path3"
                                                onClick={() => { setSelectedHouseNo(3) }}
                                                className={`house_path_tilal ${selectedHouseNo === 3 && 'house_selected'}`}
                                            />
                                            <path
                                                d="m -465.5865,309.30054 31.53541,-22.24989 4.30343,-3.27996 -0.66707,-3.82041 -3.15333,-14.43254 -3.27461,-2.78948 -1.21283,-4.60872 -13.58357,-12.37075 -4.97256,3.51716 -3.3959,-3.03205 -4.40584,3.20479 -2.40125,-2.18686 -26.07083,18.35248 2.74429,8.70458 2.70142,2.65853 1.59915,1.58813 -7.33754,5.21511 z"
                                                id="path4"
                                                onClick={() => { setSelectedHouseNo(4) }}
                                                className={`house_path_tilal ${selectedHouseNo === 4 && 'house_selected'}`}
                                            />
                                            <path
                                                d="m -476.20527,188.46382 4.28797,-2.91581 -1.97246,-2.3155 5.87451,-4.15933 -0.42881,-1.6723 3.55902,-2.48703 1.6723,1.37215 -1.8438,1.28641 3.68763,3.08732 19.29585,-13.2927 -1.92958,-7.28953 -5.4886,-4.50236 -0.94334,-4.33084 -4.6739,-3.94493 -0.8147,-3.13021 -19.29585,-16.20851 -11.96343,8.66167 1.54366,5.2742 -6.86072,5.01693 -3.25888,-2.87293 -10.67702,7.58968 2.22975,7.8041 -3.00159,2.1011 0.12864,0.60032 11.83478,10.1196 0.47168,-0.25728 z"
                                                id="path5"
                                                onClick={() => { setSelectedHouseNo(5) }}
                                                className={`house_path_tilal ${selectedHouseNo === 5 && 'house_selected'}`}
                                            />
                                            <path
                                                d="m -596.43982,46.7037 3.1731,-2.487031 4.88828,3.430376 2.91582,-2.572782 -1.80094,-1.800939 3.43037,-3.001566 -0.42881,-1.457907 2.40128,-1.972468 1.37213,1.029123 -1.20063,1.286378 4.03069,2.401252 12.52085,-10.891414 -1.88669,-6.860752 -5.74587,-3.344624 -1.0291,-4.11644 -4.80253,-2.744285 -0.68607,-3.430376 -20.15344,-11.8347857 -7.97563,6.6892222 1.54369,4.9740343 -3.1731,3.1730952 -3.5035,-2.346219 -7.12531,6.064117 2.06179,6.67049 -4.79065,3.759756 1.81925,4.91191 z"
                                                id="path6"
                                                onClick={() => { setSelectedHouseNo(6) }}
                                                className={`house_path_tilal ${selectedHouseNo === 6 && 'house_selected'}`}
                                            />
                                            <path
                                                d="m -546.52789,-40.170464 -1.97247,-3.258873 30.01576,-15.951226 1.20063,0.771842 4.11644,-2.401252 14.15029,15.522416 0.60031,3.087343 3.17309,3.773409 1.45791,4.459472 4.03069,4.116467 1.61031,6.735604 -13.21975,7.094987 -1.69794,1.334108 -2.7895,-3.335258 1.75861,-1.091538 -1.51604,-1.334109 -2.9714,1.637321 0.4245,2.00115 -0.72771,0.303186 -0.36383,-0.485114 -6.67052,3.699087 -4.73001,-3.941657 -0.78832,-4.184226 -3.94166,-3.335258 -0.97025,-3.274616 -16.13051,-14.432544 z"
                                                id="path7"
                                                onClick={() => { setSelectedHouseNo(7) }}
                                                className={`house_path_tilal ${selectedHouseNo === 7 && 'house_selected'}`}
                                            />
                                            <path
                                                d="m -378.69694,316.75975 1.20062,-0.94334 -0.60031,-3.1731 -1.80094,0.0858 -6.08891,-4.20222 -1.71519,-7.80409 11.49176,-8.40441 -0.42881,-1.62941 9.262,-6.68923 3.43038,3.1731 2.83006,-2.144 -1.02912,-4.8025 10.63416,-6.775 17.23763,15.35091 0.42878,-0.34303 7.46107,6.77497 1.62943,7.20378 11.49173,10.29113 -38.50592,28.90089 z"
                                                id="path8"
                                                onClick={() => { setSelectedHouseNo(8) }}
                                                className={`house_path_tilal ${selectedHouseNo === 8 && 'house_selected'}`}
                                            />
                                            <path
                                                d="m -352.19731,182.97523 7.8041,21.78288 41.42174,-13.12119 -0.8576,-3.60188 3.68766,-1.20063 -2.65853,-11.74903 4.37372,-1.37216 -1.02913,-1.97247 -1.11487,-6.86072 -6.43194,-15.52244 -13.46422,4.54525 -3.25885,-7.46107 -30.18727,9.34776 2.40126,9.94809 2.48703,6.08891 -6.51772,1.97247 z"
                                                id="path9"
                                                onClick={() => { setSelectedHouseNo(9) }}
                                                className={`house_path_tilal ${selectedHouseNo === 9 && 'house_selected'}`}
                                            />
                                            <path
                                                d="m -284.53322,101.33238 -2.48703,-5.488597 -4.631,1.457907 -11.40597,-28.815136 4.71675,-1.286377 -1.37216,-8.747443 12.52088,-4.116467 1.71516,3.859186 9.9481,-3.430375 -0.94335,-4.888283 13.97876,-4.631002 9.34775,20.582228 0.60032,3.773408 2.22975,4.545251 0.60031,4.202191 2.87295,5.874518 1.07199,7.375313 -22.59759,6.774974 -1.92958,-4.116441 2.10111,-0.771842 -0.72895,-1.586548 -4.97406,1.758077 0.25728,1.372156 -7.28954,2.358363 0.68609,2.35839 z"
                                                id="path10"
                                                onClick={() => { setSelectedHouseNo(10) }}
                                                className={`house_path_tilal ${selectedHouseNo === 10 && 'house_selected'}`}
                                            />
                                            <path
                                                d="m -353.2794,-48.84512 -18.07102,2.546906 -0.48511,-4.972553 1.09154,-0.24257 -0.36386,-1.091538 -3.27461,0.606425 0.12128,1.455367 -9.82384,0.72771 -3.03205,-14.553856 -0.84897,-25.590473 9.82385,-0.848995 0.72768,3.63847 8.24717,-0.727683 v -4.972579 l 11.27924,-1.455367 2.30434,12.249467 1.09154,-0.121285 z"
                                                id="path11"
                                                onClick={() => { setSelectedHouseNo(11) }}
                                                className={`house_path_tilal ${selectedHouseNo === 11 && 'house_selected'}`}
                                            />
                                            <path
                                                d="m -275.05253,-26.165407 -0.72769,-6.91306 10.7941,-3.274615 -0.48514,-3.153331 9.94513,-3.15333 1.69794,3.517185 4.8513,-1.576678 -0.97026,-1.940507 v -1.940507 l 11.4005,-3.395901 3.45654,6.91306 -0.42449,0.181927 4.66936,9.702562 0.48512,-0.181928 3.51718,7.216273 2.42565,14.614498 3.82037,6.7311322 -35.65689,11.3398828 -2.30436,0.6063986 z"
                                                id="path12"
                                                onClick={() => { setSelectedHouseNo(12) }}
                                                className={`house_path_tilal ${selectedHouseNo === 12 && 'house_selected'}`}
                                            />
                                            <path
                                                d="m -171.11388,113.18759 1.94053,15.4028 -8.00462,0.97025 3.27461,33.10999 48.51278,-5.94281 -1.81922,-15.16025 6.67052,-0.72769 -1.09154,-9.09616 -1.81925,-16.25177 -16.00922,2.18308 -0.72769,-7.88334 z"
                                                id="path13"
                                                onClick={() => { setSelectedHouseNo(13) }}
                                                className={`house_path_tilal ${selectedHouseNo === 13 && 'house_selected'}`}
                                            />
                                            <path
                                                d="m -224.99546,-107.10775 9.92727,20.713017 -2.57278,0.600313 0.77184,5.660126 3.85916,-1.629437 2.05822,4.545251 9.86232,-3.859186 -0.25728,-1.286378 1.11488,-0.257281 -0.25729,-1.286404 4.88829,-1.62941 2.40128,5.574348 18.95279,-5.91738 -0.77184,-7.375313 -2.65854,-5.145564 -0.34303,-4.716752 -2.40125,-4.03069 -0.42881,-3.43038 -9.51929,-18.524 -13.12116,4.03068 0.77184,5.05982 -8.91897,2.83003 -1.71519,-3.34459 -11.5775,3.34459 1.02909,9.77657 z"
                                                id="path14"
                                                onClick={() => { setSelectedHouseNo(14) }}
                                                className={`house_path_tilal ${selectedHouseNo === 14 && 'house_selected'}`}
                                            />
                                            <path
                                                d="m -86.095216,25.985846 0.848968,7.3982 -3.879697,0.469606 2.909447,27.061409 -7.155624,0.970254 0.848959,4.48743 11.157956,-1.212823 0.563518,4.515611 4.894148,-0.513312 -0.242544,-1.697937 7.726503,-0.970254 -0.207018,-1.334108 6.121679,-0.513286 0.0637,1.847394 -2.425647,0.485114 0.727684,4.244869 6.064117,-0.848969 15.645368,-1.455367 1.819222,0.727684 -0.970253,-9.096137 -0.848969,-5.578978 -0.24257,-4.608724 -0.606398,-5.093837 -0.363855,-3.517186 -3.274616,-21.466889 -14.796399,1.576652 0.48514,5.578978 -10.915386,0.970253 -0.970253,-4.002299 z"
                                                id="path15"
                                                onClick={() => { setSelectedHouseNo(15) }}
                                                className={`house_path_tilal ${selectedHouseNo === 15 && 'house_selected'}`}
                                            />
                                            <path
                                                d="m 25.829697,158.27656 37.305297,9.77656 3.516127,1.11488 1.543659,-2.91584 3.859186,0.77184 2.315501,0.51456 1.372129,-3.34462 -3.516127,-1.20063 3.173095,-5.83163 -0.171503,-4.631 2.05822,0.60031 0.08575,0.77185 -0.514561,1.02909 5.660125,1.20063 8.061378,-17.58064 -0.257281,-6.9465 -8.061378,-2.144 -0.171529,-4.20219 -6.946503,-1.80096 0.08578,-3.25885 -29.329697,-7.28954 -5.059786,10.89144 v 2.91582 z"
                                                id="path16"
                                                onClick={() => { setSelectedHouseNo(16) }}
                                                className={`house_path_tilal ${selectedHouseNo === 16 && 'house_selected'}`}
                                            />
                                            <path
                                                d="m -58.214431,-13.242046 16.465788,-29.844232 -3.087343,-1.886717 -1.372129,-15.093633 -10.900701,-2.847207 -2.183077,3.63847 -0.363855,-1.334108 -2.546906,-0.970254 -0.48514,-2.668217 -9.459992,-2.546905 -1.576678,2.546905 -4.608698,-1.212823 -1.091538,1.697963 -2.425647,-0.848968 -1.091539,1.819222 -1.819222,-0.606399 -11.157955,20.132807 0.909637,9.338707 1.697937,0.606398 0.970254,0.24257 0.181927,1.940507 2.910761,0.667042 -6.003449,8.429095 z"
                                                id="path17"
                                                onClick={() => { setSelectedHouseNo(17) }}
                                                className={`house_path_tilal ${selectedHouseNo === 17 && 'house_selected'}`}
                                            />
                                            <path
                                                d="m -221.56717,212.0324 10.18767,49.84687 46.20845,-8.12589 -8.00463,-34.08023 -0.36382,-5.21513 -3.88104,0.72771 -2.91077,-13.46231 -13.21972,2.91076 0.72769,4.00232 -5.82155,0.97026 -0.84897,-4.12359 -11.4005,2.06179 0.48512,2.54691 z"
                                                id="path18"
                                                onClick={() => { setSelectedHouseNo(18) }}
                                                className={`house_path_tilal ${selectedHouseNo === 18 && 'house_selected'}`}
                                            />
                                            <path
                                                d="m 0.25755935,191.41446 -12.61334835,-1.69794 -1.455368,4.24487 -3.63847,-0.72771 0.848968,-2.06179 -1.819222,-0.48512 -0.121285,-2.18307 -10.915358,-1.57668 -0.848995,2.06179 -7.276915,-1.45537 -1.091539,2.66819 -1.697937,-0.48511 -0.727683,2.91076 -1.334109,-0.48514 -8.004624,24.37768 0.848995,9.09616 1.537387,0.28178 1.071986,0.12864 0.128641,1.6723 -3.344625,10.1196 43.9042702,6.47509 10.5515303,-33.47381 1.3341085,-4.73001 -4.3661541,-0.72768 z"
                                                id="path19"
                                                onClick={() => { setSelectedHouseNo(19) }}
                                                className={`house_path_tilal ${selectedHouseNo === 19 && 'house_selected'}`}
                                            />
                                            <path
                                                d="m 21.799008,-105.51905 -13.893006,23.926822 1.0290968,14.321816 -1.2863777,2.830063 4.6310019,1.029097 1.029123,-2.229723 6.689223,1.800939 0.771816,-1.286404 1.886717,0.514562 0.08575,5.059812 -0.08575,1.457907 18.952792,5.145564 8.83322,-15.35094 v -2.143972 l 8.232881,-12.94966 2.058247,-3.087317 -0.943372,-1.372156 -1.972469,-0.600313 -0.514535,-8.918972 -13.035412,-3.430375 -2.65856,4.631002 -7.9756,-2.401253 v -3.773409 z"
                                                id="path20"
                                                onClick={() => { setSelectedHouseNo(20) }}
                                                className={`house_path_tilal ${selectedHouseNo === 20 && 'house_selected'}`}
                                            />
                                            <path
                                                d="m 137.83134,-44.372682 4.28797,-6.946503 0.51456,0.171529 5.40282,-9.176253 -0.0857,-0.771842 4.37372,-7.032255 11.5775,3.430376 v 4.202192 l 8.40441,2.48703 2.83007,-4.631002 13.20694,4.202219 v 9.090474 l 1.71519,0.17153 v 3.430349 l -13.03542,22.040162 -2.14399,-0.42881 -0.42879,0.686091 -0.17153,4.802505 -3.08734,4.716753 -15.69395,-4.974034 -9.17623,-3.430359 1.8867,-3.687647 -5.78876,-2.144003 -1.58655,2.744316 -4.67387,-1.886714 1.80096,-2.744309 z"
                                                id="path21"
                                                onClick={() => { setSelectedHouseNo(21) }}
                                                className={`house_path_tilal ${selectedHouseNo === 21 && 'house_selected'}`}
                                            />
                                            <path
                                                d="m 172.8418,126.04348 -22.80102,-5.3364 2.42564,-5.82155 -3.27461,-1.09154 -0.48514,1.81925 -7.27692,-1.81925 -1.09154,2.42565 -5.3364,-1.4554 1.3341,-3.27461 V 97.784766 l 11.52179,-28.566202 38.53215,8.297402 0.39935,14.083424 z"
                                                id="path22"
                                                onClick={() => { setSelectedHouseNo(22) }}
                                                className={`house_path_tilal ${selectedHouseNo === 22 && 'house_selected'}`}
                                            />
                                            <path
                                                d="m 266.9566,84.565045 42.08484,10.30896 12.00692,-29.835368 -3.51718,-1.091539 1.33411,-3.274616 0.72768,-15.160227 -11.88564,-2.789503 -1.69794,3.881041 -4.48744,-1.455393 0.24257,-3.638471 -10.18767,-3.032046 -2.18308,4.851294 -8.85359,-2.668217 -0.48514,2.061792 -1.33408,-0.485113 -9.09617,21.830744 -0.36382,9.217422 1.33408,0.121285 -4.36616,11.03667 z"
                                                id="path23"
                                                onClick={() => { setSelectedHouseNo(54) }}
                                                className={`house_path_tilal ${selectedHouseNo === 54 && 'house_selected'}`}
                                            />
                                            <path
                                                d="m 368.71218,169.58371 -5.21513,30.44177 -1.69796,17.10076 4.8513,0.6064 0.72768,-2.91076 8.0046,1.09154 0.24257,-1.57668 5.82154,0.48514 v 2.5469 l -3.03204,-0.36382 -0.36386,4.85126 24.74154,3.3959 7.39819,-51.30228 -15.40282,-1.81922 -0.97025,5.09384 -11.64307,-1.57666 0.24257,-4.24487 z"
                                                id="path24"
                                                onClick={() => { setSelectedHouseNo(24) }}
                                                className={`house_path_tilal ${selectedHouseNo === 24 && 'house_selected'}`}
                                            />
                                            <path
                                                d="m 424.86573,1.9720249 -5.45769,27.4097221 -1.4554,13.46229 -0.48511,3.395901 4.6087,0.848969 0.84899,-2.425621 6.18538,0.970254 4.85127,0.606398 -0.6064,4.608724 23.40742,3.395874 7.15563,-47.785072 -14.67511,-2.1830771 -0.60643,5.2151227 -10.7941,-1.4553936 -0.12126,-4.0022991 z"
                                                id="path25"
                                                onClick={() => { setSelectedHouseNo(25) }}
                                                className={`house_path_tilal ${selectedHouseNo === 25 && 'house_selected'}`}
                                            />
                                            <path
                                                d="m 159.13694,281.28439 45.11688,9.21742 11.27921,-38.08253 -3.51715,-0.59043 0.36382,-15.54006 -12.7346,-2.54693 -1.21283,4.24487 -3.75973,-0.72768 0.24257,-2.18308 -1.57667,-0.48514 0.12128,-1.94051 -11.35089,-2.38276 -0.62721,2.17572 -8.41199,-1.7549 -0.83426,2.56834 -1.25806,-0.3267 -0.8576,2.74431 -1.07198,-0.25728 -7.71835,24.74155 -0.25728,9.26201 1.37216,0.25728 z"
                                                id="path26"
                                                onClick={() => { setSelectedHouseNo(26) }}
                                                className={`house_path_tilal ${selectedHouseNo === 26 && 'house_selected'}`}
                                            />
                                            <path
                                                d="m 472.52954,272.06697 1.21283,-6.91309 13.82614,-3.15333 v -1.33408 l 11.27922,-2.42565 2.06179,3.88102 4.48744,-1.21283 -0.97026,-1.9405 0.6064,-2.18308 12.37075,-2.66819 14.43258,31.04817 -1.4554,7.3982 6.54923,13.82614 -43.54023,9.94513 -1.57665,0.36386 z"
                                                id="path27"
                                                onClick={() => { setSelectedHouseNo(27) }}
                                                className={`house_path_tilal ${selectedHouseNo === 27 && 'house_selected'}`}
                                            />
                                            <path
                                                d="m 575.54684,213.33402 1.4579,-6.86075 -0.34306,-6.17466 0.94338,-4.97404 v -5.66012 l 0.85759,-3.25885 -0.17153,-24.44138 -15.69395,-0.94338 -0.85759,5.40285 -11.14872,-0.94335 -0.0858,-4.11644 -13.89301,-0.94337 -2.65853,15.52244 -0.34303,28.72936 -0.17153,3.25887 5.74587,0.60032 0.0858,-3.0016 7.88984,0.51457 0.17153,-1.28638 5.57435,0.34303 0.0858,1.97247 -2.3155,-0.25728 -0.17153,4.88828 z"
                                                id="path28"
                                                onClick={() => { setSelectedHouseNo(28) }}
                                                className={`house_path_tilal ${selectedHouseNo === 28 && 'house_selected'}`}
                                            />
                                            <path
                                                d="m 629.58967,78.015814 -1.69793,7.519485 4.73001,41.114581 45.23816,0.24257 -2.66821,-18.31358 0.48514,-3.75973 -3.63848,-28.743833 -12.7346,-0.24257 -0.6064,4.123584 h -4.97255 l -0.36386,-4.244869 -11.15793,0.121285 -0.60642,2.668217 z"
                                                id="path29"
                                                onClick={() => { setSelectedHouseNo(29) }}
                                                className={`house_path_tilal ${selectedHouseNo === 29 && 'house_selected'}`}
                                            />
                                            <path
                                                d="m 777.33846,53.221419 -18.86704,2.915814 -1.80094,-3.859186 -8.57594,0.943372 0.94334,2.401252 -3.25884,0.428784 -1.62941,-4.11644 -1.71519,0.08575 -3.60191,-9.262004 -1.28638,-4.373721 0.51454,-2.830036 -3.17307,-9.00475 2.14397,-7.546816 10.80567,-1.715188 1.37215,3.087344 6.26044,-0.943346 1.11487,-4.631002 11.83476,-1.800939 8.23291,18.266727 -0.85759,2.658533 1.97247,4.116441 -1.11488,4.373721 2.3155,4.631002 z"
                                                id="path30"
                                                onClick={() => { setSelectedHouseNo(30) }}
                                                className={`house_path_tilal ${selectedHouseNo === 30 && 'house_selected'}`}
                                            />
                                            <path
                                                d="m 656.27171,284.55901 46.81485,2.30436 -1.69794,-20.37538 0.12129,-3.15333 -0.60643,-9.21742 -0.36385,-0.12129 -1.09152,-12.37075 0.24255,-0.60642 -0.72769,-8.73231 -13.46229,-0.48511 -0.84899,3.88101 -5.09384,-0.36383 -0.36383,-4.00232 -11.76435,-0.6064 -0.48514,2.18307 -12.8559,-0.60642 -1.52995,7.2899 2.91582,45.53818 z"
                                                id="path31"
                                                onClick={() => { setSelectedHouseNo(31) }}
                                                className={`house_path_tilal ${selectedHouseNo === 31 && 'house_selected'}`}
                                            />
                                            <path
                                                d="m 805.6911,216.88367 -3.03205,-31.89716 5.09384,-15.64537 13.94743,0.72769 0.36386,4.48743 10.55153,0.6064 1.45536,-5.70023 15.52411,1.33408 2.42562,24.74153 -0.97025,3.15333 0.4245,5.45769 -1.57665,4.60873 0.6064,6.9737 -2.18308,7.21627 -25.34793,-2.18307 -0.18193,-4.79063 2.54693,0.18193 -0.24257,-2.12244 -5.63962,-0.36385 -0.36383,1.69794 -8.42909,-0.84897 0.54575,2.7895 z"
                                                id="path32"
                                                onClick={() => { setSelectedHouseNo(32) }}
                                                className={`house_path_tilal ${selectedHouseNo === 32 && 'house_selected'}`}
                                            />
                                            <path
                                                d="m 934.25,36.658661 1.81922,-6.064091 -3.03205,-5.336408 1.4554,-3.759755 -2.48629,-3.820372 0.90961,-2.850118 -10.67282,-17.8890873 -11.4005,2.6681906 -1.57667,4.6693666 -4.72999,0.9702535 -2.00115,-2.8501445 -10.30896,2.183077 -1.69796,6.1854031 5.03319,10.672788 -0.72768,2.850145 2.00115,4.002299 -1.27347,3.941657 2.60758,5.093837 1.75858,-0.424471 2.30436,4.244869 3.41107,-1.030896 -0.92479,-2.349843 6.3673,-1.409912 -0.12127,-0.727684 4.06294,-0.606398 0.54578,1.758579 -1.7586,0.485114 1.57668,3.577828 z"
                                                id="path33"
                                                onClick={() => { setSelectedHouseNo(33) }}
                                                className={`house_path_tilal ${selectedHouseNo === 33 && 'house_selected'}`}
                                            />
                                            <path
                                                d="m 992.07976,324.6496 -6.17468,-35.76164 -3.00157,0.17153 -1.88669,-11.57751 -41.07871,-1.54365 -5.14556,13.97875 -4.11647,-0.25728 0.77185,4.63101 3.6019,0.17152 0.94335,4.71676 -3.25885,-0.25728 -1.97247,5.05981 h -1.11487 l 3.3446,20.49648 10.89144,0.60031 1.62943,-4.20222 41.59327,1.80094 0.51453,2.22975 z"
                                                id="path34"
                                                onClick={() => { setSelectedHouseNo(34) }}
                                                className={`house_path_tilal ${selectedHouseNo === 34 && 'house_selected'}`}
                                            />
                                            <path
                                                d="m 962.75007,150.90125 -2.31551,0.17152 -0.77181,-3.25884 -39.19202,0.77181 -1.97246,6.00316 -1.0291,-1.62943 -9.77657,0.0858 -4.88828,-18.09522 0.94335,0.17153 1.80096,-5.05981 2.65853,-0.0858 -0.94334,-3.68765 h -3.85919 l -1.02909,-3.85916 4.03069,-0.34303 4.631,-14.32182 38.50592,-0.60031 2.91582,10.29112 -0.51457,1.28638 h 2.14398 l 2.05824,7.71835 0.60031,-0.0858 3.25885,11.5775 -0.34303,1.80094 z"
                                                id="path35"
                                                onClick={() => { setSelectedHouseNo(35) }}
                                                className={`house_path_tilal ${selectedHouseNo === 35 && 'house_selected'}`}
                                            />
                                            <path
                                                d="m 560.45897,15.313031 -1.33411,8.611023 -2.30436,0.363855 0.48514,27.045867 0.12129,4.487439 h 3.75972 l 0.12129,2.304362 h 12.49204 l 0.48514,-1.819222 5.82152,0.121258 0.12128,1.697964 -2.78947,0.121285 0.6064,4.729983 h 24.01382 l 1.33411,-7.034345 -1.09154,-6.549231 0.94583,-4.490509 -0.77182,-5.145563 0.68607,-3.387487 -3.1731,-22.083024 h -14.92213 l -0.94334,5.059785 -10.1196,0.08578 -0.25728,-3.859186 z"
                                                id="path36"
                                                onClick={() => { setSelectedHouseNo(36) }}
                                                className={`house_path_tilal ${selectedHouseNo === 36 && 'house_selected'}`}
                                            />
                                            <path
                                                d="m 805.44853,122.5263 43.66151,-0.72769 -3.63844,-15.03897 2.18308,-7.034341 -7.03437,-28.622545 -12.61333,0.242544 -1.21282,3.88104 -4.0023,-0.121285 -0.97025,-3.88104 -11.15793,0.363855 -0.72771,2.668217 -12.97718,0.121258 -1.94051,6.549231 z"
                                                id="path37"
                                                onClick={() => { setSelectedHouseNo(37) }}
                                                className={`house_path_tilal ${selectedHouseNo === 37 && 'house_selected'}`}
                                            />
                                        </g>
                                    </svg>
                                </div>
                            </TransformComponent>
                        </TransformWrapper>
                    </div>
                </div>
            }
            <div className='fullScreen_icon'>
                <img src={fullscreen} alt="fullscreen" onClick={handleFullScreen} />
            </div>
            {
                (view === "explore_360" || view === "explore_interior") &&
                <TilalHomeV2 setView={setView} view={view} />
            }
            {
                selectedHouseNo !== null && view === "explore_360" &&
                <div className='nav_button_container'>
                    <button className="back_btn" onClick={() => { handleClickBack(); }}>
                        <img src={backIcon} alt="back icon" className="backIcon" />
                    </button>
                </div>
            }
            {
                selectedHouseNo !== null && view === "house_plan" &&
                <div className='nav_button_container' ref={modalRef}>
                    <div>
                        <div className='explore_button_container'>
                            <img src={HouseV1} alt="house_preview" className='villa_preview_image' />
                            <span className='villa_number_text'>Vila: {selectedHouseNo}</span>
                            <div className='d-flex justify-content-between'>
                                <span className='villa_number_text'>3 Bedroom</span>
                                <span className='villa_number_text'>Type 1</span>
                            </div>
                            <div className='d-flex justify-content-between'>
                                <span className='villa_number_text'>Plot Area</span>
                                <span className='villa_number_text'>5300 Sq. M.</span>
                            </div>
                            <button className="explore_btn"
                                onClick={(e) => {
                                    e.stopPropagation(); // prevent bubbling just in case
                                    handleVillaExpore360();
                                }}>Explore</button>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default TilalHome;