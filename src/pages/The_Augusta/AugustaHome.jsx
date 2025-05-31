import { useState, useRef, useEffect } from 'react';
import '../../assets/Projects/css/TheAugusta/TheAugusta.css';
import AugustaHouseMainPlan from '../../assets/Projects/images/The_Augusta/The_Augusta_Floor_Plan.png';
import HouseRender from '../../assets/Projects/images/The_Augusta/HouseRender.png';
import backIcon from "../../assets/Projects/images/back_icon.png";
import fullscreen from "../../assets/Projects/images/fullscreen.png";
import TilalHomeV2 from '../Tilal/TilalHomeV2';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import TheAugusta2BHK from './TheAugusta2BHK';
import TheAugusta3BHK from './TheAugusta3BHK';
import TheAugustaExplore360Campus from './TheAugustaExplore360Campus';

const AugustaHome = () => {
    const scrollContainerRef = useRef();
    const modalRef = useRef();

    const [view, setView] = useState("house_plan");
    const [panoramaName, setPanoramaName] = useState("");
    const [selectedHouseNo, setSelectedHouseNo] = useState(null);
    const [selectedHouseBHK, setSelectedHouseBHK] = useState(null);

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


    const handleVillaExpore360 = () => {
        setView("explore_360");
    }

    const handleClickBack = () => {
        setView("house_plan");
        setSelectedHouseNo(null);
        setSelectedHouseBHK(null);

    }
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                selectedHouseNo !== null &&
                modalRef.current &&
                !modalRef.current.contains(e.target)
            ) {
                setSelectedHouseNo(null);
                setSelectedHouseBHK(null);

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
                                    <img src={AugustaHouseMainPlan} className='the_augusta_house_plan_image' />
                                    {/* <svg
                                        width="2032mm"
                                        height="1143mm"
                                        viewBox="0 0 2032 1143"
                                        id="svg1"
                                        xmlSpace="preserve"
                                        className="the_augusta_house_plan_svg"
                                    >
                                        <defs id="defs1" />
                                        <g id="layer1" transform="translate(911.17645,423)">
                                            <path
                                                // d="m 319.33591,45.667085 -37.39377,-9.463013 -12.1221,28.140572 38.93802,8.18591 z"
                                                d="m 281.77037,36.289795 -11.95017,28.054618 -0.339,8.984982 1.35961,0.306441 -13.64,32.247644 0.12041,2.4558 76.14005,18.92185 9.10901,-35.760752 0.31678,-9.918257 4.98896,-13.855744 -29.17664,-7.640619 0.63666,-14.418758 z"
                                                id="villa_56"
                                                onClick={() => { setSelectedHouseNo(54) }}
                                                className={`house_path ${selectedHouseNo === 54 && 'house_selected'}`}
                                            />
                                        </g>
                                    </svg> */}
                                    <svg
                                        width="1719.7917mm"
                                        height="1031.875mm"
                                        viewBox="0 0 1719.7917 1031.875"
                                        id="svg1"
                                        xmlSpace="preserve"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="the_augusta_house_plan_svg"
                                    >
                                        <defs id="defs1" />
                                        <defs id="defs1">
                                            <linearGradient id="linearGradient100" >
                                                <stop
                                                    style={{
                                                        stopColor: "#ffffff",
                                                        stopOpacity: 1,
                                                    }}
                                                    offset={0}
                                                    id="stop98"
                                                />
                                                <stop
                                                    style={{
                                                        stopColor: "#ffffff",
                                                        stopOpacity: 1,
                                                    }}
                                                    offset={0.49719104}
                                                    id="stop99"
                                                />
                                                <stop
                                                    style={{
                                                        stopColor: "#ffa52e",
                                                        stopOpacity: 1,
                                                    }}
                                                    offset={1}
                                                    id="stop100"
                                                />
                                            </linearGradient>
                                            <radialGradient

                                                xlinkHref="#linearGradient100"
                                                id="radialGradient61"
                                                cx={658.69373}
                                                cy={624.27698}
                                                fx={658.69373}
                                                fy={624.27698}
                                                r={62.573227}
                                                gradientUnits="userSpaceOnUse"
                                                gradientTransform="matrix(0,-0.2322406,0.21968301,-1.9784514e-8,822.22213,481.44965)"
                                            />
                                            <radialGradient

                                                xlinkHref="#linearGradient100"
                                                id="radialGradient100"
                                                gradientUnits="userSpaceOnUse"
                                                gradientTransform="matrix(0,-0.2322406,0.21968301,-1.9784514e-8,822.22213,481.44965)"
                                                cx={658.69373}
                                                cy={624.27698}
                                                fx={658.69373}
                                                fy={624.27698}
                                                r={62.573227}
                                            />
                                            <radialGradient

                                                xlinkHref="#linearGradient100"
                                                id="radialGradient101"
                                                gradientUnits="userSpaceOnUse"
                                                gradientTransform="matrix(0,-0.2322406,0.21968301,-1.9784514e-8,822.22213,481.44965)"
                                                cx={658.69373}
                                                cy={624.27698}
                                                fx={658.69373}
                                                fy={624.27698}
                                                r={62.573227}
                                            />
                                            <radialGradient

                                                xlinkHref="#linearGradient100"
                                                id="radialGradient102"
                                                gradientUnits="userSpaceOnUse"
                                                gradientTransform="matrix(0,-0.2322406,0.21968301,-1.9784514e-8,822.22213,481.44965)"
                                                cx={658.69373}
                                                cy={624.27698}
                                                fx={658.69373}
                                                fy={624.27698}
                                                r={62.573227}
                                            />
                                            <radialGradient

                                                xlinkHref="#linearGradient100"
                                                id="radialGradient103"
                                                gradientUnits="userSpaceOnUse"
                                                gradientTransform="matrix(0,-0.2322406,0.21968301,-1.9784514e-8,822.22213,481.44965)"
                                                cx={658.69373}
                                                cy={624.27698}
                                                fx={658.69373}
                                                fy={624.27698}
                                                r={62.573227}
                                            />
                                            <radialGradient

                                                xlinkHref="#linearGradient100"
                                                id="radialGradient104"
                                                gradientUnits="userSpaceOnUse"
                                                gradientTransform="matrix(0,-0.2322406,0.21968301,-1.9784514e-8,822.22213,481.44965)"
                                                cx={658.69373}
                                                cy={624.27698}
                                                fx={658.69373}
                                                fy={624.27698}
                                                r={62.573227}
                                            />
                                            <radialGradient

                                                xlinkHref="#linearGradient100"
                                                id="radialGradient105"
                                                gradientUnits="userSpaceOnUse"
                                                gradientTransform="matrix(0,-0.2322406,0.21968301,-1.9784514e-8,822.22213,481.44965)"
                                                cx={658.69373}
                                                cy={624.27698}
                                                fx={658.69373}
                                                fy={624.27698}
                                                r={62.573227}
                                            />
                                            <radialGradient

                                                xlinkHref="#linearGradient100"
                                                id="radialGradient106"
                                                gradientUnits="userSpaceOnUse"
                                                gradientTransform="matrix(0,-0.2322406,0.21968301,-1.9784514e-8,822.22213,481.44965)"
                                                cx={658.69373}
                                                cy={624.27698}
                                                fx={658.69373}
                                                fy={624.27698}
                                                r={62.573227}
                                            />
                                            <radialGradient

                                                xlinkHref="#linearGradient100"
                                                id="radialGradient107"
                                                gradientUnits="userSpaceOnUse"
                                                gradientTransform="matrix(0,-0.2322406,0.21968301,-1.9784514e-8,822.22213,481.44965)"
                                                cx={658.69373}
                                                cy={624.27698}
                                                fx={658.69373}
                                                fy={624.27698}
                                                r={62.573227}
                                            />
                                            <radialGradient

                                                xlinkHref="#linearGradient100"
                                                id="radialGradient108"
                                                gradientUnits="userSpaceOnUse"
                                                gradientTransform="matrix(0,-0.2322406,0.21968301,-1.9784514e-8,822.22213,481.44965)"
                                                cx={658.69373}
                                                cy={624.27698}
                                                fx={658.69373}
                                                fy={624.27698}
                                                r={62.573227}
                                            />
                                            <radialGradient

                                                xlinkHref="#linearGradient100"
                                                id="radialGradient109"
                                                gradientUnits="userSpaceOnUse"
                                                gradientTransform="matrix(0,-0.2322406,0.21968301,-1.9784514e-8,822.22213,481.44965)"
                                                cx={658.69373}
                                                cy={624.27698}
                                                fx={658.69373}
                                                fy={624.27698}
                                                r={62.573227}
                                            />
                                            <radialGradient

                                                xlinkHref="#linearGradient100"
                                                id="radialGradient110"
                                                gradientUnits="userSpaceOnUse"
                                                gradientTransform="matrix(0,-0.2322406,0.21968301,-1.9784514e-8,822.22213,481.44965)"
                                                cx={658.69373}
                                                cy={624.27698}
                                                fx={658.69373}
                                                fy={624.27698}
                                                r={62.573227}
                                            />
                                            <radialGradient

                                                xlinkHref="#linearGradient100"
                                                id="radialGradient111"
                                                gradientUnits="userSpaceOnUse"
                                                gradientTransform="matrix(0,-0.2322406,0.21968301,-1.9784514e-8,822.22213,481.44965)"
                                                cx={658.69373}
                                                cy={624.27698}
                                                fx={658.69373}
                                                fy={624.27698}
                                                r={62.573227}
                                            />
                                            <radialGradient

                                                xlinkHref="#linearGradient100"
                                                id="radialGradient112"
                                                gradientUnits="userSpaceOnUse"
                                                gradientTransform="matrix(0,-0.2322406,0.21968301,-1.9784514e-8,822.22213,481.44965)"
                                                cx={658.69373}
                                                cy={624.27698}
                                                fx={658.69373}
                                                fy={624.27698}
                                                r={62.573227}
                                            />
                                            <radialGradient

                                                xlinkHref="#linearGradient100"
                                                id="radialGradient113"
                                                gradientUnits="userSpaceOnUse"
                                                gradientTransform="matrix(0,-0.2322406,0.21968301,-1.9784514e-8,822.22213,481.44965)"
                                                cx={658.69373}
                                                cy={624.27698}
                                                fx={658.69373}
                                                fy={624.27698}
                                                r={62.573227}
                                            />
                                        </defs>
                                        <g id="layer1" transform="translate(755.07227,283.38989)">
                                            <g id="g74">
                                                <path
                                                    d="m 623.27869,444.05427 -79.5488,-29.35021 -5.36809,-1.4666 -2.46377,7.06415 -13.17037,-4.70552 -14.14914,38.96483 3.32257,1.81234 -4.22874,11.78006 -1.20817,4.83285 83.97072,36.85046 28.25953,2.53428 12.32347,-42.97961 -13.12213,-6.26818 z"
                                                    id="path1"
                                                    onClick={() => { setSelectedHouseNo("1"); setSelectedHouseBHK(3); }}
                                                    className={`house_path bhk3 ${selectedHouseNo == "1" && 'house_selected'}`}
                                                />
                                                <path
                                                    id="path2"
                                                    onClick={() => { setSelectedHouseNo("2"); setSelectedHouseBHK(3); }}
                                                    className={`house_path bhk3 ${selectedHouseNo == "2" && 'house_selected'}`}
                                                    d="m 572.60237,314.29917 -2.36387,6.03415 -11.87002,-3.92067 -10.28899,28.10923 15.80847,5.37114 0.73828,-3.23472 78.69763,26.36528 10.93998,3.94518 5.49877,-19.45449 -10.64794,-3.4413 3.79236,-14.21765 z"
                                                />
                                                <path
                                                    onClick={() => { setSelectedHouseNo("4"); setSelectedHouseBHK(3); }}
                                                    className={`house_path bhk3 ${selectedHouseNo == "4" && 'house_selected'}`}
                                                    d="m 689.80292,199.03152 6.77991,-24.80833 -21.31847,-5.96108 2.46383,-9.41102 -13.5924,-4.22875 -3.32258,9.36363 -31.4683,-8.93424 -1.07345,2.98055 -12.12206,-3.23523 -9.24377,24.90306 14.43336,3.71199 1.3356,-3.42472 z"
                                                    id="path4"
                                                />
                                                <path
                                                    id="path5"
                                                    onClick={() => { setSelectedHouseNo("5"); setSelectedHouseBHK(3); }}
                                                    className={`house_path bhk3 ${selectedHouseNo == "5" && 'house_selected'}`}
                                                    d="m 693.36711,63.038616 -3.19839,9.301639 -29.6633,-7.346252 -1.73541,4.991448 -11.51934,-2.815982 -6.35034,17.966205 12.26061,2.931879 1.73716,-3.651984 29.3689,7.81889 2.96804,-9.619896 12.22595,2.993692 -2.70888,9.769049 19.75026,4.881386 5.33326,-19.913912 -19.21334,-4.779046 2.72542,-9.596957 z"
                                                />
                                                <path
                                                    id="path7"
                                                    onClick={() => { setSelectedHouseNo("7"); setSelectedHouseBHK(3); }}
                                                    className={`house_path bhk3 ${selectedHouseNo == "7" && 'house_selected'}`}
                                                    d="m 724.09311,-38.331458 -2.3304,8.419826 -26.66687,-6.123895 -1.05615,3.287854 -10.25587,-2.427726 -5.76104,16.712158 11.14889,2.243898 1.27393,-3.85324 26.32548,6.248315 3.02296,-9.166441 10.82244,2.421203 -2.65578,9.305224 17.42891,3.7433636 4.15686,-15.9248226 -16.37523,-3.747851 2.05207,-8.917858 z"
                                                />
                                                <path
                                                    d="m 356.46544,347.62777 -67.62786,-24.1995 -3.44624,-1.33556 -3.51205,5.88484 -11.47329,-4.26067 -20.08524,33.60218 9.54194,3.39536 -8.0484,13.28772 94.35673,40.27303 16.88301,-33.41059 -10.39793,-4.01183 z"
                                                    id="path8"
                                                    onClick={() => { setSelectedHouseNo("8"); setSelectedHouseBHK(3); }}
                                                    className={`house_path bhk3 ${selectedHouseNo == "8" && 'house_selected'}`}
                                                />
                                                <path
                                                    id="path9"
                                                    onClick={() => { setSelectedHouseNo("9"); setSelectedHouseBHK(3); }}
                                                    className={`house_path bhk3 ${selectedHouseNo == "9" && 'house_selected'}`}
                                                    d="m 334.65866,236.89519 -2.11367,4.53024 -11.10229,-3.8893 -14.92683,25.29541 11.65217,3.30793 30.65218,9.16905 5.22004,-9.82005 13.39457,4.20103 -4.82078,9.74471 24.65799,7.37586 -2.12589,19.90888 13.26499,5.19391 13.87297,-29.88236 -9.69519,-3.01535 0.20173,-21.22265 -24.30951,-7.13323 4.54599,-8.73652 -13.39633,-4.20099 -4.91373,8.71022 -26.13072,-8.0273 z"
                                                />
                                                <path
                                                    id="path10"
                                                    onClick={() => { setSelectedHouseNo("10"); setSelectedHouseBHK(3); }}
                                                    className={`house_path bhk3 ${selectedHouseNo == "10" && 'house_selected'}`}
                                                    d="m 380.13746,161.95186 -3.218,5.23397 -10.09415,-3.07319 -13.02012,21.38734 10.95219,3.23433 1.6471,-3.02241 27.05356,8.52261 5.37194,-9.07362 12.47643,3.97299 -2.90612,9.87755 21.63292,6.36168 -4.56181,19.71888 13.49808,4.0237 12.46927,-24.94383 -13.01274,-4.22354 4.40992,-18.99484 -20.89528,-6.44997 2.80706,-9.40104 -12.63315,-3.84677 -5.176,8.98842 z"
                                                />
                                                <path
                                                    id="path11"
                                                    onClick={() => { setSelectedHouseNo("11"); setSelectedHouseBHK(3); }}
                                                    className={`house_path bhk3 ${selectedHouseNo == "11" && 'house_selected'}`}
                                                    d="m 418.47154,96.821417 -1.44395,2.641687 -9.53717,-2.643038 -13.11218,21.702034 9.95388,2.87842 1.96046,-3.08997 25.91309,7.469 4.9292,-8.98423 11.62755,3.38094 -2.66688,9.22755 19.89358,5.81895 -0.67612,14.86091 11.37467,3.59648 8.35485,-15.7797 -8.54384,-2.24755 1.30918,-22.08751 -20.06761,-5.20265 2.6104,-9.269308 -11.5788,-3.207516 -4.79979,8.057164 z"
                                                />
                                                <path
                                                    onClick={() => { setSelectedHouseNo("14"); setSelectedHouseBHK(3); }}
                                                    className={`house_path bhk3 ${selectedHouseNo == "14" && 'house_selected'}`}
                                                    d="m 454.71703,36.877606 -9.76306,-2.315929 9.70129,-15.254483 8.41978,1.888758 3.42778,-5.035967 23.51729,6.00339 4.51351,-8.08268 10.53257,2.681319 -1.89395,8.919196 17.99912,4.349417 -4.56221,18.096508 11.12522,3.184118 -9.18406,18.154601 -11.36804,-3.08713 4.34897,-18.620647 -18.37173,-4.586888 0.84769,-4.825147 0.7235,-0.598161 0.87611,-3.528552 -10.58917,-2.771358 -4.97418,8.53812 -23.28059,-6.307014 z"
                                                    id="path14"
                                                />
                                                <path
                                                    onClick={() => { setSelectedHouseNo("15"); setSelectedHouseBHK(3); }}
                                                    className={`house_path bhk3 ${selectedHouseNo == "15" && 'house_selected'}`}
                                                    d="m 509.74931,-56.535629 -8.32977,-2.563004 8.11621,-13.028606 7.47549,2.563005 3.41725,-5.126009 21.46521,5.553176 4.65463,-8.027708 8.48389,2.003132 -1.72701,8.705104 15.32622,3.247997 -1.06794,19.008946 7.51211,1.495083 -6.05362,13.539799 -8.13767,-1.719403 1.6935,-18.571047 -16.85791,-2.647026 2.32349,-8.381593 -9.00717,-2.36015 -3.84454,7.05899 -22.76493,-5.376235 z"
                                                    id="path15"
                                                />
                                                <path
                                                    d="m 226.70605,169.71759 16.84165,-22.24196 14.14917,4.44345 5.78635,-7.56095 11.41543,3.46287 -1.12303,9.31181 28.05652,8.75104 -0.0603,6.13064 11.03455,3.05161 -3.93705,15.4572 -12.16155,18.47279 -3.33787,-3.6054 3.79037,-6.24996 -11.18591,-3.34221 0.21457,-5.96848 -29.35099,-9.45211 0.72911,-9.36365 -11.55129,-2.69699 -4.72295,6.41011 z"
                                                    id="path17"
                                                    onClick={() => { setSelectedHouseNo("17"); setSelectedHouseBHK(3); }}
                                                    className={`house_path bhk3 ${selectedHouseNo == "17" && 'house_selected'}`}
                                                />
                                                <path
                                                    d="m 289.46494,84.913055 14.73727,-19.552715 13.1938,3.621301 5.80555,-7.562797 11.03828,2.835098 -1.20379,8.911987 26.7512,7.514357 -1.27956,1.95411 0.0615,0.842078 11.86334,3.295927 -4.44413,6.708739 -0.47831,8.44536 -5.68753,8.81544 -2.30246,9.13397 -6.97006,10.95764 0.51993,-14.25624 4.17886,-6.94225 -10.6451,-3.1164 0.60659,-5.15966 -27.29017,-8.412319 0.9195,-7.439091 1.01713,-1.550689 -10.82946,-3.155219 -5.93664,8.038428 z"
                                                    id="path18"
                                                    onClick={() => { setSelectedHouseNo("18"); setSelectedHouseBHK(3); }}
                                                    className={`house_path bhk3 ${selectedHouseNo == "18" && 'house_selected'}`}
                                                />
                                                <path
                                                    d="m 531.29425,-101.20293 2.05256,-10.28339 -3.74818,-0.95434 6.50413,-10.99078 1.06505,0.24613 3.85772,-5.69274 1.50652,-7.29296 2.15443,-3.36625 18.01055,3.8793 -0.70624,2.38014 12.1196,2.52187 -1.99536,8.22919 -5.58374,9.70188 -2.07974,10.24883 -4.13306,-0.65228 -4.3109,7.537727 z"
                                                    id="path19"
                                                    onClick={() => { setSelectedHouseNo("19"); setSelectedHouseBHK(3); }}
                                                    className={`house_path bhk3 ${selectedHouseNo == "19" && 'house_selected'}`}
                                                />
                                                <path
                                                    d="m 561.48593,-158.46265 6.96766,-11.00425 7.24244,1.08467 1.2218,-2.10756 18.87865,3.36395 1.88764,-3.0823 8.75959,1.45529 -0.90621,3.5011 14.94457,2.72527 -1.89695,7.55352 1.103,0.29756 -2.19962,4.0691 -1.09753,4.37029 8.24443,1.70917 -2.88174,12.39574 -3.56366,7.32315 0.27457,-5.89982 -8.95158,-2.37563 5.3264,-18.71311 -14.14155,-2.76665 1.88093,-7.69526 -8.17585,-1.61341 -3.74428,6.14066 -0.16875,1.23216 -19.09797,-3.61104 -1.94264,3.02053 z"
                                                    id="path20"
                                                    onClick={() => { setSelectedHouseNo("20"); setSelectedHouseBHK(3); }}
                                                    className={`house_path bhk3 ${selectedHouseNo == "20" && 'house_selected'}`}
                                                />
                                                <path
                                                    d="m -67.950561,208.72245 0.427164,-6.83468 6.407508,-6.83468 -1.708668,-11.10636 14.591816,-14.43632 59.735312,20.84382 0.427171,5.126 8.970516,4.27168 -0.353881,20.55958 -18.2001475,19.96063 z"
                                                    id="path21"
                                                    onClick={() => { setSelectedHouseNo("21"); setSelectedHouseBHK(2); }}
                                                    className={`house_path ${selectedHouseNo == "21" && 'house_selected'}`}
                                                />
                                                <path
                                                    d="m 101.05724,22.109556 10.28498,-10.181332 12.79616,3.359221 5.30399,-6.2148416 18.80058,5.0815046 -0.49416,8.100458 16.4893,4.599367 0.12354,2.58134 10.44835,3.157662 -5.01134,33.624229 -7.67489,8.361136 3.02054,-30.8094 -9.91591,-2.343132 -0.30193,-3.499526 z"
                                                    id="path23"
                                                    onClick={() => { setSelectedHouseNo("23"); setSelectedHouseBHK(2); }}
                                                    className={`house_path ${selectedHouseNo == "23" && 'house_selected'}`}
                                                />
                                                <path
                                                    id="path24"
                                                    onClick={() => { setSelectedHouseNo("24"); setSelectedHouseBHK(3); }}
                                                    className={`house_path bhk3 ${selectedHouseNo == "24" && 'house_selected'}`}
                                                    d="m 85.712659,216.67403 -3.999492,5.01927 -8.116594,-2.99096 -23.493472,27.76627 12.387656,5.55291 -8.116594,10.25302 0.42728,15.80416 8.116597,-11.10581 77.05463,33.48316 -0.31511,-21.96935 6.19984,2.13717 4.45068,-6.03245 -0.90987,-0.43917 9.48626,-12.39383 -12.1738,-3.9694 -0.15571,-19.65929 z"
                                                />
                                                <path
                                                    id="path25"
                                                    onClick={() => { setSelectedHouseNo("25"); setSelectedHouseBHK(3); }}
                                                    className={`house_path bhk3 ${selectedHouseNo == "25" && 'house_selected'}`}
                                                    d="m 192.32842,122.30323 -5.73854,7.24804 -0.90536,0.60413 -20.8422,-6.64386 -4.83318,4.53023 -7.24979,-2.4166 -16.91437,19.33097 8.45806,2.71956 2.11363,-2.71956 21.44637,7.2498 6.94684,-7.55098 10.57169,3.32193 -0.90532,9.66637 18.42386,6.34267 0.90712,19.33098 9.79595,4.15548 5.94342,-7.9257 11.44553,-15.86194 -9.96755,-2.71956 v -20.84223 l -19.02979,-5.43556 0.90532,-9.06223 z"
                                                />
                                                <path
                                                    d="m -46.854256,168.34511 -1.43699,-17.87293 -55.774604,-18.98932 -3.33959,2.49489 -6.33939,-2.04846 14.582197,-13.24222 6.863525,2.03886 2.66959,-2.31053 8.698835,2.72811 6.974044,-6.51071 19.597688,6.33599 0.601885,9.76636 19.552728,6.22318 1.436987,17.86329 z"
                                                    id="path27"
                                                    onClick={() => { setSelectedHouseNo("27"); setSelectedHouseBHK(2); }}
                                                    className={`house_path ${selectedHouseNo == "27" && 'house_selected'}`}
                                                />
                                                <path
                                                    d="m 19.066479,103.30686 -0.02135,-17.841889 -55.026859,-16.430768 -6.165617,-2.08037 8.745639,-7.511238 6.308308,1.958895 2.916881,-2.739927 9.548714,2.990179 5.1992989,-6.282412 20.0768641,5.980357 0.427172,7.475434 18.44149,5.095638 0.146595,18.206441 z"
                                                    id="path28"
                                                    onClick={() => { setSelectedHouseNo("28"); setSelectedHouseBHK(2); }}
                                                    className={`house_path ${selectedHouseNo == "28" && 'house_selected'}`}
                                                />
                                                <path
                                                    d="M 98.014432,25.400632 V 8.43747 l -17.802623,-4.2209389 0.08736,-8.9611738 -17.913855,-4.8702265 -5.032636,4.6832159 v 1.8375731 l -10.31747,-2.5048983 -1.737919,1.7475306 -5.601663,-1.4369767 -10.679191,9.8248483 6.193926,1.9222539 2.539958,-2.3159224 C 54.36844,9.3716837 70.456691,14.052866 87.178197,18.936571 l 0.169637,16.636485 z"
                                                    id="path29"
                                                    onClick={() => { setSelectedHouseNo("29"); setSelectedHouseBHK(2); }}
                                                    className={`house_path ${selectedHouseNo == "29" && 'house_selected'}`}
                                                />
                                                <path
                                                    d="m -222.38965,136.19709 -1.81232,-9.06159 5.1349,-3.92667 -2.84202,-13.72952 16.13235,-12.549085 49.53668,17.519075 0.90617,5.73899 10.2698,3.62464 1.81231,22.04986 -21.1437,17.82114 z"
                                                    id="path30"
                                                    onClick={() => { setSelectedHouseNo("30"); setSelectedHouseBHK(2); }}
                                                    className={`house_path ${selectedHouseNo == "30" && 'house_selected'}`}
                                                />
                                                <path
                                                    d="m -132.62977,39.590058 14.70062,-11.986595 8.54335,2.990176 6.40751,-5.55318 16.659532,5.751584 0.552279,9.125986 14.825746,4.344966 v 4.69884 l 8.543351,2.563004 v 20.931194 l -12.142071,11.136687 -0.401265,-21.712211 -8.064353,-3.443257 v -3.844508 z"
                                                    id="path31"
                                                    onClick={() => { setSelectedHouseNo("31"); setSelectedHouseBHK(2); }}
                                                    className={`house_path ${selectedHouseNo == "31" && 'house_selected'}`}
                                                />
                                                <path
                                                    d="m -55.509413,-22.448056 -0.509711,-11.217748 -15.936231,-4.558187 -0.480461,-7.7375 -16.013976,-4.776588 -5.519112,4.305739 0.26207,1.791219 -7.130816,-1.995186 -2.51932,1.873769 -3.29112,-0.922466 -11.28106,8.145438 4.05809,1.495083 2.77659,-2.13583 43.143909,13.669356 0.689234,11.577195 z"
                                                    id="path35"
                                                    onClick={() => { setSelectedHouseNo("35"); setSelectedHouseBHK(2); }}
                                                    className={`house_path ${selectedHouseNo == "35" && 'house_selected'}`}
                                                />
                                                <path
                                                    d="m -340.49236,66.120822 -3.62464,-13.894436 7.31881,2.94795 -6.06321,-20.64913 16.86758,-11.295912 45.77429,15.492063 0.64409,4.30871 7.71864,2.925773 -1.20378,1.406641 4.16955,21.898798 -20.12499,15.204785 z"
                                                    id="path36"
                                                    onClick={() => { setSelectedHouseNo("36"); setSelectedHouseBHK(2); }}
                                                    className={`house_path ${selectedHouseNo == "36" && 'house_selected'}`}
                                                />
                                                <path
                                                    d="m -265.83771,-16.501608 14.23628,-9.146913 43.40827,13.235565 0.15103,4.7573427 8.7725,2.2028339 -1.46692,1.626481 3.91776,21.0038044 -10.63816,7.751238 -4.66291,-20.7287866 -8.75952,-2.4164229 -0.67518,-4.1813689 -14.42748,-4.2761097 -1.89077,-8.1228419 -14.98421,-4.865435 -6.26446,4.296855 0.15788,1.605472 z"
                                                    id="path37"
                                                    onClick={() => { setSelectedHouseNo("37"); setSelectedHouseBHK(2); }}
                                                    className={`house_path ${selectedHouseNo == "37" && 'house_selected'}`}
                                                />
                                                <path
                                                    d="m -472.03672,16.323452 -2.60852,-8.622396 3.73456,-2.4164263 -5.56049,-15.3497277 17.40914,-9.652095 40.74938,13.5238129 1.20821,3.9680599 6.98859,2.73207307 3.61103,13.64735513 0.90616,2.471398 -5.57409,3.281202 2.11436,7.853381 -16.61291,11.175966 z"
                                                    id="path39"
                                                    onClick={() => { setSelectedHouseNo("39"); setSelectedHouseBHK(2); }}
                                                    className={`house_path ${selectedHouseNo == "39" && 'house_selected'}`}
                                                />
                                                <path
                                                    id="path41"
                                                    onClick={() => { setSelectedHouseNo("41"); setSelectedHouseBHK(2); }}
                                                    className={`house_path ${selectedHouseNo == "41" && 'house_selected'}`}
                                                    d="m -225.63684,-88.289193 -5.94488,3.709021 0.48046,2.134958 -5.211,-1.547557 -2.64874,1.592278 -1.71647,-0.630822 -10.45537,6.377435 3.37016,0.961213 39.43201,11.828276 1.21596,8.539246 12.46597,-8.671443 -1.02955,-8.68301 -14.30658,-3.563117 -0.85124,-7.975711 z"
                                                />
                                                <path
                                                    onClick={() => { setSelectedHouseNo("43"); setSelectedHouseBHK(2); }}
                                                    className={`house_path ${selectedHouseNo == "43" && 'house_selected'}`}
                                                    d="m -330.69779,-26.967381 -3.59164,-18.261194 -7.04827,-2.135836 -0.85433,-5.126015 -38.87223,-11.960688 14.52368,-8.329765 5.35883,1.757163 -0.34943,-2.048484 6.96091,-3.718278 14.08691,4.436767 1.28151,8.543354 12.81502,2.77659 0.78621,4.494866 5.54356,2.262069 -2.20367,2.928228 4.51422,16.48825 z"
                                                    id="path43"
                                                />
                                                <path
                                                    onClick={() => { setSelectedHouseNo("44"); setSelectedHouseBHK(2); }}
                                                    className={`house_path ${selectedHouseNo == "44" && 'house_selected'}`}
                                                    d="m 42.812846,-100.91447 9.967749,2.718478 -0.302067,-2.114378 4.832846,-3.92669 15.102656,4.530797 0.906155,7.853381 12.082122,2.416419 -7e-6,5.134907 8.155438,1.812315 0.604102,18.727282 -6.645164,6.34312 -0.906159,-18.123181 -9.061587,-1.812321 v -3.926691 l -19.935489,-5.43695 v -1.812315 l -15.4047,-3.92669 -2.718477,2.416419 -6.34311,-2.114365 z"
                                                    id="path44"
                                                />
                                                <path
                                                    d="m 61.82224,-115.3033 9.036804,-7.33403 6.693159,1.46048 2.10364,-1.77567 15.404677,4.30962 0.301932,2.30446 17.382798,4.29981 0.21584,4.71421 7.47173,2.34404 0.007,18.24313 -7.55872,6.525221 -0.16732,-18.203143 -8.1391,-1.828618 0.17471,-4.27611 -14.112458,-3.2491 0.242683,-7.42694 -14.541831,-3.81988 -4.176537,3.38179 0.208743,2.92853 z"
                                                    id="path45"
                                                    onClick={() => { setSelectedHouseNo("67A"); setSelectedHouseBHK(2); }}
                                                    className={`house_path ${selectedHouseNo == "67A" && 'house_selected'}`}
                                                />
                                                <path
                                                    onClick={() => { setSelectedHouseNo("46"); setSelectedHouseBHK(2); }}
                                                    className={`house_path ${selectedHouseNo == "46" && 'house_selected'}`}
                                                    d="m 159.97676,-186.03678 -0.067,-7.13308 7.56543,-6.05256 6.47451,1.70866 3.12875,-2.74733 13.95276,3.1745 -0.0565,3.23203 15.97481,3.35035 -0.1131,3.36079 6.72156,1.59035 -1.35366,17.81749 -12.20262,11.16813 -10.4069,-2.02276 0.0928,-5.97249 4.53469,-4.27952 -8.00825,-1.33282 -0.42721,-4.69884 -11.96072,-1.70867 v -6.40751 z"
                                                    id="path46"
                                                />
                                                <path
                                                    onClick={() => { setSelectedHouseNo("47"); setSelectedHouseBHK(2); }}
                                                    className={`house_path ${selectedHouseNo == "47" && 'house_selected'}`}
                                                    d="m 256.66636,-206.93506 -0.17471,-14.68936 3.70883,-3.56855 -7.4536,-1.55764 -0.0874,-2.6711 -11.70003,-2.22694 0.96092,-6.81987 -13.21783,-2.41642 -3.06787,2.4564 -0.0799,4.00666 -10.30246,-2.23432 -5.8737,4.78547 5.96105,1.16084 3.00579,-2.19433 13.25774,2.71108 -0.14211,2.67849 14.64061,3.32259 -0.14211,3.97406 5.69898,1.59762 -0.73135,15.91406 z"
                                                    id="path47"
                                                />
                                                <path
                                                    id="path48"
                                                    onClick={() => { setSelectedHouseNo("48"); setSelectedHouseBHK(2); }}
                                                    className={`house_path ${selectedHouseNo == "48" && 'house_selected'}`}
                                                    d="m -181.57759,-127.03099 -30.75575,19.00866 v 2.56367 l -8.54366,4.91185 9.18445,2.35024 0.21394,6.193421 -3.20497,1.493965 v 5.232239 l 3.84731,1.058333 0.69608,6.518466 8.33231,2.431376 -0.27234,-20.579623 4.69842,-4.271057 -0.42736,-3.63027 9.82369,-5.98206 -0.42736,-7.90081 9.82575,-5.98052 6.83473,1.28003 0.21394,2.13682 5.76657,-2.99103 z"
                                                />
                                                <path
                                                    onClick={() => { setSelectedHouseNo("49"); setSelectedHouseBHK(2); }}
                                                    className={`house_path ${selectedHouseNo == "49" && 'house_selected'}`}
                                                    d="m -117.78328,-83.110634 28.91113,-20.125356 16.123544,4.272789 0.710716,6.969412 4.113251,-3.018313 1.034222,19.553832 -36.369163,27.239523 -13.80519,-4.028842 -0.0992,-6.741432 -3.37582,-0.41668 -1.52476,-15.083846 5.2326,-3.980349 z"
                                                    id="path49"
                                                />
                                                <path
                                                    onClick={() => { setSelectedHouseNo("50"); setSelectedHouseBHK(2); }}
                                                    className={`house_path ${selectedHouseNo == "50" && 'house_selected'}`}
                                                    d="m 32.54305,-92.759038 -0.604105,-9.967742 -15.706758,-3.92669 -0.302068,-6.34312 -14.8005914,-4.83285 -3.9266902,3.32259 v 4.22874 l -8.7595364,-3.02053 -3.624639,3.62463 -3.624626,-0.90615 -9.967756,7.24926 4.530795,1.20822 5.134907,-3.92669 3.322575,1.51026 1.812325,-1.20821 35.340188,10.571852 0.906166,10.571861 z"
                                                    id="path50"
                                                />
                                                <path
                                                    onClick={() => { setSelectedHouseNo("51"); setSelectedHouseBHK(2); }}
                                                    className={`house_path ${selectedHouseNo == "51" && 'house_selected'}`}
                                                    d="m -157.06404,-120.9735 -1.23541,-7.17391 9.67929,-6.30174 -0.97473,-6.94042 10.39334,-6.48025 6.29493,1.81912 0.41201,1.91546 3.00013,-1.89507 15.94703,3.48071 -29.45045,18.66551 0.1921,6.85767 z"
                                                    id="path51"
                                                />
                                                <path
                                                    onClick={() => { setSelectedHouseNo("53"); setSelectedHouseBHK(2); }}
                                                    className={`house_path ${selectedHouseNo == "53" && 'house_selected'}`}
                                                    d="m 44.399691,-178.65662 -6.199155,-1.55685 -0.213589,-4.27168 -11.680104,-2.51169 -0.151818,-7.29534 -13.370954,-2.58083 -3.772287,2.46774 0.3088522,3.9115 -8.94223817,-2.22588 -8.89092803,5.80549 4.3408099,1.14751 2.9053624,-1.92225 13.4379467,2.99017 v 2.74309 l 16.399853,3.32207 0.314081,3.94715 7.518319,1.90122 -6.98114,4.98571 0.30236,12.63717 -1.110603,1.79022 0.06699,5.85259 9.907522,-7.311 -0.09005,-6.05994 5.558408,-4.30518 -5.856792,-2.02703 -0.09526,-6.6629 z"
                                                    id="path53"
                                                />
                                                <path
                                                    id="path54"
                                                    onClick={() => { setSelectedHouseNo("54"); setSelectedHouseBHK(2); }}
                                                    className={`house_path ${selectedHouseNo == "54" && 'house_selected'}`}
                                                    d="m -49.029534,-156.01759 -2.155319,1.43372 -4.591889,-1.06821 -10.435463,6.79582 1.456555,13.02858 -5.970688,4.09811 0.213657,6.83475 8.405533,2.60571 7.356596,-4.90323 22.351721,5.43733 -5.134381,4.22729 0.266181,4.07583 15.664236,3.7203 12.0762392,-9.33783 -0.1263004,-21.7861 -6.4074708,-1.17549 -0.68935,-4.1837 -18.522637,-3.88271 -0.09545,-1.85844 0.691644,-0.64477 -0.809852,-0.27412 z"
                                                />
                                                <path
                                                    onClick={() => { setSelectedHouseNo("55"); setSelectedHouseBHK(2); }}
                                                    className={`house_path ${selectedHouseNo == "55" && 'house_selected'}`}
                                                    d="m 86.470455,-134.93373 -0.640757,-10.67918 -12.979002,-2.85211 0.07774,-6.69439 -15.718947,-4.33645 -3.669784,2.68813 -0.06255,3.07641 -7.350313,-1.56838 -4.722533,3.70644 -3.417344,-1.2815 -8.579996,6.16801 3.579099,1.2815 4.360147,-3.39143 3.630922,1.4951 3.203761,-2.34943 13.028599,4.0581 0.213589,2.34942 20.931204,4.27167 0.213589,10.67918 7.048259,-5.98034 z"
                                                    id="path55"
                                                />
                                                <path
                                                    onClick={() => { setSelectedHouseNo("56"); setSelectedHouseBHK(2); }}
                                                    className={`house_path ${selectedHouseNo == "56" && 'house_selected'}`}
                                                    d="m 135.54311,-174.91745 0.37062,-8.99302 -14.06613,-3.13727 0.30885,-6.7755 -13.30395,-2.95876 -3.93349,2.75304 v 3.35294 l -8.402512,-1.7406 -2.68497,2.28816 -3.102202,-0.84597 -5.170481,4.07536 7.182275,1.82858 3.205852,-2.59494 13.619578,3.38435 -0.0482,2.53997 18.59696,4.05702 0.48057,9.10977 z"
                                                    id="path56"
                                                />
                                                <path
                                                    onClick={() => { setSelectedHouseNo("57"); setSelectedHouseBHK(2); }}
                                                    className={`house_path ${selectedHouseNo == "57" && 'house_selected'}`}
                                                    d="m 204.89175,-228.82031 0.55593,-9.61072 -12.34992,-2.18973 0.3637,-7.06397 -13.1254,-2.37534 -3.14405,2.53997 0.30885,3.70029 -8.51922,-1.77123 -2.65678,2.15575 -3.01375,-0.49446 -5.71824,4.07092 4.0295,0.78941 3.21972,-2.45071 3.32257,0.75514 1.81238,-1.20821 12.88511,2.26539 -0.0894,3.4943 15.89912,3.06841 0.10997,9.41153 z"
                                                    id="path57"
                                                />
                                                <path
                                                    onClick={() => { setSelectedHouseNo("59"); setSelectedHouseBHK(2); }}
                                                    className={`house_path ${selectedHouseNo == "59" && 'house_selected'}`}
                                                    d="m 334.56464,-207.97936 5.14381,-5.37309 11.93923,2.63616 0.27381,-4.46836 2.49594,-2.50124 14.48288,2.84358 -1.02192,7.44193 12.15127,1.95575 -0.0905,3.01845 7.57241,1.6746 -2.12608,2.45622 -0.85909,11.03362 -4.91241,5.55318 0.66499,-11.45117 -5.65501,-2.81024 0.16507,-3.67962 -15.35876,-2.77659 0.21349,-3.20376 -14.05777,-3.20375 -2.81536,2.563 z"
                                                    id="path59"
                                                />
                                                <path
                                                    onClick={() => { setSelectedHouseNo("60"); setSelectedHouseBHK(2); }}
                                                    className={`house_path ${selectedHouseNo == "60" && 'house_selected'}`}
                                                    d="m 171.33641,-202.55529 -0.15114,-8.60851 -17.67011,-4.37977 3e-5,-3.32258 -13.1393,-2.11437 -2.2654,2.71847 -6.79619,-1.66129 7.55132,-5.89003 10.42086,1.66129 0.30193,-3.02053 4.68182,-2.41642 11.32699,2.71847 v 7.09825 l 13.13927,1.96334 -0.30193,9.51467 z"
                                                    id="path60"
                                                />
                                                <path
                                                    onClick={() => { setSelectedHouseNo("62"); setSelectedHouseBHK(2); }}
                                                    className={`house_path ${selectedHouseNo == "62" && 'house_selected'}`}
                                                    d="m 290.65647,-150.73893 1.06791,-16.44594 6.83471,-5.76676 8.54336,2.77659 2.77656,-3.41734 15.59162,3.8445 -0.36452,3.21449 15.31545,3.62019 v 3.20376 l 6.83468,1.92225 -1.06791,11.7471 -0.21349,3.41734 -11.10636,12.17427 -3.20377,-0.42716 -2.34944,-0.42717 0.6408,-5.98034 -7.26186,-1.49509 0.21349,-2.99017 -13.24222,-2.34942 0.42715,-7.9026 -16.23233,-3.41734 z"
                                                    id="path62"
                                                />
                                                <path
                                                    d="m 477.7691,-170.38665 -6.64511,-1.51027 2.71847,-17.21702 -12.892,-1.97043 1.61971,-7.75023 -7.75706,-1.4553 -4.83288,5.73901 -0.0687,1.20821 -15.85067,-3.19224 -1.85375,2.10077 -5.78719,-1.62701 -8.77308,10.99745 5.75258,1.09147 2.95195,-2.93836 15.42512,3.14407 5.43695,-6.96081 7.71628,1.36632 -1.46211,7.812 12.82335,2.40283 -1.20827,17.21702 6.04115,1.51027 z"
                                                    id="path64"
                                                    onClick={() => { setSelectedHouseNo("64"); setSelectedHouseBHK(3); }}
                                                    className={`house_path bhk3 ${selectedHouseNo == "64" && 'house_selected'}`}
                                                />
                                                <path
                                                    d="m 361.47867,-85.509773 0.9062,-9.06159 -7.85332,-2.71847 0.30193,-6.645167 6.04105,-3.92669 v -2.41642 l -5.73905,-1.51026 7.55136,-9.06159 5.73898,1.51026 3.32257,-3.62464 9.36363,2.71848 2.71857,-3.92669 16.91488,4.5308 0.30193,4.22874 17.51911,3.02052 -0.39054,8.26537 3.2082,1.09606 -1.91145,17.43596 -4.83292,13.375659 z"
                                                    id="path65"
                                                    onClick={() => { setSelectedHouseNo("65"); setSelectedHouseBHK(3); }}
                                                    className={`house_path bhk3 ${selectedHouseNo == "65" && 'house_selected'}`}
                                                />
                                                <path
                                                    d="m 431.73384,-110.9498 5.41739,-6.30609 13.69305,3.03978 0.21349,-4.05809 4.05805,-4.0581 16.01877,4.0581 -0.85428,7.68901 14.31012,3.20375 -0.6408,4.0581 9.18416,2.13583 -3.89801,5.873553 -3.42647,19.993764 -4.77429,7.350323 4.82617,-23.923605 -7.20154,-1.753823 0.59106,-5.617958 -15.97994,-3.555404 -0.039,-3.27927 -17.08668,-3.63092 -2.68815,2.67516 z"
                                                    id="path66"
                                                    onClick={() => { setSelectedHouseNo("66"); setSelectedHouseBHK(3); }}
                                                    className={`house_path bhk3 ${selectedHouseNo == "66" && 'house_selected'}`}
                                                />
                                                <path

                                                    d="m 582.05734,-44.899945 6.98721,-14.505932 15.37208,3.275213 3.83935,-7.933346 9.96776,2.416426 -1.81227,9.06159 24.16416,4.530796 0.60413,3.624629 9.06159,1.812321 -6.04105,15.404697 -10.26982,-2.71847 v -3.624636 l -24.76833,-5.1349 2.11433,-8.155432 -9.36362,-2.416429 -3.92671,8.457485 z"
                                                    id="path67"
                                                    onClick={() => { setSelectedHouseNo("67"); setSelectedHouseBHK(3); }}
                                                    className={`house_path bhk3 ${selectedHouseNo == "67" && 'house_selected'}`}
                                                />
                                                <path
                                                    onClick={() => { setSelectedHouseNo("68"); setSelectedHouseBHK(3); }}
                                                    className={`house_path bhk3 ${selectedHouseNo == "68" && 'house_selected'}`}
                                                    d="m 497.94705,119.44447 4.2198,-21.608618 5.77754,-9.39768 8.04292,1.958899 8.97047,-18.368216 59.37626,16.659538 -0.25009,4.49601 9.62205,3.417357 -17.91512,47.61839 -11.96071,-4.27168 -0.85436,-3.41732 -31.61036,-6.83468 2.563,-10.67918 -10.252,-3.8445 -4.27172,11.10632 z"
                                                    id="path68"
                                                />
                                                <path
                                                    d="m 428.53101,265.77233 -9.2741,18.85191 -7.00953,-2.50123 13.42225,-27.26127 7.25324,2.03365 8.87347,-18.28086 20.36785,6.41714 4.4852,-9.18409 13.3323,4.17116 -2.86667,10.13893 35.82555,10.81319 -2.14628,6.41796 11.53347,3.58696 -10.13893,25.99023 -13.83627,-5.1147 0.44143,-2.61786 -34.66575,-11.61676 3.11069,-9.45621 -13.56154,-4.3282 -4.4853,9.20188 z"
                                                    id="path70"
                                                    onClick={() => { setSelectedHouseNo("70"); setSelectedHouseBHK(3); }}
                                                    className={`house_path bhk3 ${selectedHouseNo == "70" && 'house_selected'}`}
                                                />
                                                <path
                                                    id="path71"
                                                    onClick={() => { setSelectedHouseNo("71"); setSelectedHouseBHK(3); }}
                                                    className={`house_path bhk3 ${selectedHouseNo == "71" && 'house_selected'}`}
                                                    d="m 580.1651,-3.3507725 -5.1344,8.7592684 -15.65196,-4.1672654 -0.85358,1.6642145 -5.80053,-1.545284 -7.75106,16.104927 6.19436,1.837082 16.00905,3.624887 5.43732,-9.062217 9.66461,2.416592 -1.50949,9.365166 26.58077,6.342679 -0.60417,4.229036 10.27054,3.321938 6.03972,-16.310242 -10.26877,-2.719541 1.50949,-6.645628 -26.27782,-5.4355787 1.50952,-8.75926841 z"
                                                />
                                                <path
                                                    d="m 398.94343,-153.30193 -7.26186,-1.49508 8.75692,-9.61127 5.7668,1.06792 3.41736,-3.84451 14.73723,2.56301 5.33956,-6.6211 8.75691,1.92225 -0.6407,7.68901 14.31013,2.56301 v 16.44594 l 4.27161,1.06793 -3.84453,6.83467 -8.32971,-1.70867 0.21349,-11.31993 -15.37797,-2.56301 0.21349,-7.26184 -7.26182,-1.92226 -5.98036,6.40752 -14.73727,-3.41734 z"
                                                    id="path72"
                                                    onClick={() => { setSelectedHouseNo("72"); setSelectedHouseBHK(3); }}
                                                    className={`house_path bhk3 ${selectedHouseNo == "72" && 'house_selected'}`}
                                                />
                                                <path
                                                    d="m 484.29364,-12.462393 -9.11158,-2.50988 8.23801,-13.923588 8.68651,2.193477 2.4225,-4.643154 22.37526,5.122527 4.87807,-8.222598 9.83758,2.738912 -2.22648,8.544862 17.13816,4.004497 -4.15423,18.0271705 10.3192,2.5429032 -7.71971,16.1111853 -11.47615,-2.946637 4.80828,-17.677749 -17.59625,-4.408252 2.46147,-8.74674 -10.4161,-2.416643 -4.7305,8.478801 -22.00449,-5.875706 z"
                                                    id="path73"
                                                    onClick={() => { setSelectedHouseNo("106"); setSelectedHouseBHK(3); }}
                                                    className={`house_path bhk3 ${selectedHouseNo == "106" && 'house_selected'}`}
                                                />
                                                {console.log("fhsdjhsfj", selectedHouseNo, selectedHouseNo == 106)}
                                                <rect
                                                    style={{
                                                        opacity: 0.5,
                                                        fill: "none",
                                                        stroke: "#000000",
                                                        strokeWidth: 0.499999,
                                                        strokeMiterlimit: 4.2,
                                                        strokeDashoffset: 0.0378709,
                                                        paintOrder: "stroke fill markers",
                                                    }}
                                                    id="rect74"
                                                    width={1719.7916}
                                                    height={1031.875}
                                                    x={-755.07227}
                                                    y={-283.38989}
                                                />
                                            </g>
                                        </g>
                                        <g id="g64" transform="translate(-2.5055241,-1.0022096)" onClick={() => { setView("explore_campus_3d_360"); setPanoramaName("Street%20View%2003"); }}>
                                            <circle
                                                style={{
                                                    opacity: 1,
                                                    fill: "url(#radialGradient61)",
                                                    fillOpacity: 1,
                                                    fillRule: "nonzero",
                                                    strokeWidth: 0.499999,
                                                    strokeMiterlimit: 4.2,
                                                    strokeDashoffset: 0.0378709,
                                                    paintOrder: "stroke fill markers",
                                                }}
                                                id="circle33"
                                                cx={960.02625}
                                                cy={327.4295}
                                                r={13.746275}
                                            />
                                            <path
                                                id="path34"
                                                style={{
                                                    fill: "#000000",
                                                    strokeWidth: 0.999999,
                                                }}
                                                d="m 961.5701,332.73718 c -1.23406,-0.67272 -2.25372,-1.2331 -2.2659,-1.24528 -0.0122,-0.0122 0.97189,-0.62805 2.18682,-1.36861 l 2.32646,-1.33667 0.009,1.82223 0.14351,-0.007 c 0.3635,-4.4e-4 1.50525,-0.1235 2.12095,-0.22871 2.07708,-0.35491 3.6877,-1.20256 4.21837,-2.22006 0.13647,-0.26165 0.16324,-0.38208 0.16444,-0.73958 10e-4,-0.36316 -0.0241,-0.47756 -0.16938,-0.7648 -0.2097,-0.41465 -0.73749,-0.96072 -1.21114,-1.25307 -0.19506,-0.1204 -0.35466,-0.22928 -0.35466,-0.24197 0,-0.0127 0.23364,0.0976 0.51919,0.2451 1.18733,0.61323 1.8122,1.56155 1.65481,2.51136 -0.11133,0.67186 -0.56071,1.40223 -1.18826,1.93126 -1.13615,0.95778 -3.14501,1.68924 -5.1707,2.15565 l -0.70937,0.0947 -0.0308,1.86876 z m -4.50342,-0.42847 c -1.39306,-0.24011 -1.72039,-0.30452 -2.49037,-0.48999 -3.07278,-0.74017 -5.09553,-2.13492 -5.42288,-3.73926 -0.18542,-0.90877 0.31732,-1.85758 1.30084,-2.45503 0.33268,-0.20209 0.74777,-0.39801 0.74777,-0.35294 0,0.0128 -0.12421,0.10301 -0.27602,0.20043 -0.41038,0.26333 -0.95758,0.86207 -1.13402,1.24082 -0.49602,1.06473 0.1637,2.12504 1.74615,2.80645 1.32349,0.5699 2.81077,0.79633 5.23799,0.79745 l 1.27527,6.6e-4 -0.20512,2.08908 c 0,0 -0.24867,-0.008 -0.77961,-0.0976 z m -3.33961,-4.33134 c -0.40788,-0.0682 -0.94362,-0.27655 -0.91527,-0.35604 0.0129,-0.0361 0.0701,-0.24864 0.12724,-0.47235 l 0.10384,-0.40675 0.24319,0.10424 c 0.57857,0.248 1.22041,0.2808 1.63599,0.0836 0.41378,-0.19636 0.51396,-0.72615 0.20404,-1.07913 -0.21051,-0.23976 -0.45237,-0.31578 -1.00597,-0.31621 l -0.4128,-2.2e-4 v -0.44836 -0.44837 l 0.46974,-0.0256 c 0.55381,-0.0302 0.80585,-0.14131 0.93507,-0.41229 0.321,-0.67313 -0.59206,-1.04005 -1.58321,-0.63621 l -0.32074,0.13068 -0.11785,-0.42775 c -0.0648,-0.23527 -0.10596,-0.44698 -0.0914,-0.47048 0.0486,-0.0786 0.73185,-0.27668 1.1827,-0.34292 1.43284,-0.21052 2.49637,0.60059 2.19772,1.6761 -0.0786,0.28296 -0.39236,0.62626 -0.71532,0.7826 l -0.25668,0.12426 0.33147,0.13304 c 0.77327,0.31035 1.08687,1.14738 0.70807,1.88989 -0.3757,0.73643 -1.51205,1.12013 -2.71979,0.91835 z m 5.24041,-0.0144 c -0.99654,-0.25428 -1.55917,-1.10958 -1.55917,-2.37025 0,-0.48614 0.17248,-1.16229 0.41141,-1.61286 0.49283,-0.92938 1.53922,-1.51687 2.70596,-1.51924 l 0.4128,-8.8e-4 v 0.44363 0.44363 l -0.50848,0.059 c -0.87854,0.10202 -1.47474,0.48776 -1.67859,1.08605 -0.0757,0.22214 -0.0405,0.33774 0.0555,0.18239 0.0213,-0.0345 0.17018,-0.12396 0.33075,-0.19873 0.35847,-0.16691 0.95594,-0.18521 1.37586,-0.0421 0.38252,0.13033 0.77531,0.53134 0.91414,0.93328 0.34227,0.99088 -0.0944,2.05427 -1.01643,2.47504 -0.39537,0.18043 -1.00921,0.23187 -1.44376,0.12099 z m 1.06805,-1.05247 c 0.28881,-0.32324 0.34731,-0.90719 0.13248,-1.32262 -0.25979,-0.50237 -1.05164,-0.53309 -1.39276,-0.054 -0.2718,0.38171 -0.0852,1.18659 0.34121,1.47174 0.28884,0.19316 0.69948,0.15068 0.91907,-0.0951 z m 3.56039,1.05127 c -0.95673,-0.26975 -1.47988,-1.25121 -1.47596,-2.76896 0.003,-1.00614 0.26217,-1.77437 0.76379,-2.26057 0.36851,-0.35718 0.71947,-0.4928 1.27872,-0.49414 0.40752,-8.7e-4 0.50696,0.0208 0.83663,0.18309 0.73466,0.36167 1.09947,1.09882 1.15996,2.34387 0.0367,0.75649 -0.0631,1.41589 -0.28904,1.90948 -0.18971,0.4144 -0.5978,0.83921 -0.95292,0.99198 -0.3618,0.15564 -0.95524,0.19842 -1.32118,0.0952 z m 0.81806,-0.91964 c 0.37713,-0.19502 0.53516,-0.84079 0.49666,-2.02953 -0.029,-0.89419 -0.10793,-1.21147 -0.36944,-1.48443 -0.19479,-0.20331 -0.55342,-0.21984 -0.75218,-0.0347 -0.35487,0.33061 -0.52743,1.29442 -0.41381,2.31124 0.0773,0.69216 0.2225,1.05285 0.48913,1.21543 0.21467,0.13091 0.33004,0.13551 0.54964,0.022 z m 2.95325,-2.55118 c -0.67277,-0.35518 -0.82843,-1.26275 -0.31658,-1.84571 0.58739,-0.669 1.7197,-0.5075 2.09287,0.29851 0.26771,0.57822 -0.0107,1.30426 -0.60329,1.57349 -0.33514,0.15225 -0.85697,0.14055 -1.173,-0.0263 z m 0.9236,-0.46915 c 0.17498,-0.0905 0.33432,-0.37543 0.33432,-0.59788 0,-0.0667 -0.0428,-0.21163 -0.0952,-0.32199 -0.19865,-0.41861 -0.80502,-0.45075 -1.04606,-0.0554 -0.36145,0.59279 0.21032,1.28384 0.80696,0.97531 z"
                                            />
                                        </g>
                                        <g id="g100" transform="translate(-84.002486,95.376807)" onClick={() => { setView("explore_campus_3d_360"); setPanoramaName("Street%20View%2002"); }}>
                                            <circle
                                                style={{
                                                    opacity: 1,
                                                    fill: "url(#radialGradient100)",
                                                    fillOpacity: 1,
                                                    fillRule: "nonzero",
                                                    strokeWidth: 0.499999,
                                                    strokeMiterlimit: 4.2,
                                                    strokeDashoffset: 0.0378709,
                                                    paintOrder: "stroke fill markers",
                                                }}
                                                id="circle100"
                                                cx={960.02625}
                                                cy={327.4295}
                                                r={13.746275}
                                            />
                                            <path
                                                id="path100"
                                                style={{
                                                    fill: "#000000",
                                                    strokeWidth: 0.999999,
                                                }}
                                                d="m 961.5701,332.73718 c -1.23406,-0.67272 -2.25372,-1.2331 -2.2659,-1.24528 -0.0122,-0.0122 0.97189,-0.62805 2.18682,-1.36861 l 2.32646,-1.33667 0.009,1.82223 0.14351,-0.007 c 0.3635,-4.4e-4 1.50525,-0.1235 2.12095,-0.22871 2.07708,-0.35491 3.6877,-1.20256 4.21837,-2.22006 0.13647,-0.26165 0.16324,-0.38208 0.16444,-0.73958 10e-4,-0.36316 -0.0241,-0.47756 -0.16938,-0.7648 -0.2097,-0.41465 -0.73749,-0.96072 -1.21114,-1.25307 -0.19506,-0.1204 -0.35466,-0.22928 -0.35466,-0.24197 0,-0.0127 0.23364,0.0976 0.51919,0.2451 1.18733,0.61323 1.8122,1.56155 1.65481,2.51136 -0.11133,0.67186 -0.56071,1.40223 -1.18826,1.93126 -1.13615,0.95778 -3.14501,1.68924 -5.1707,2.15565 l -0.70937,0.0947 -0.0308,1.86876 z m -4.50342,-0.42847 c -1.39306,-0.24011 -1.72039,-0.30452 -2.49037,-0.48999 -3.07278,-0.74017 -5.09553,-2.13492 -5.42288,-3.73926 -0.18542,-0.90877 0.31732,-1.85758 1.30084,-2.45503 0.33268,-0.20209 0.74777,-0.39801 0.74777,-0.35294 0,0.0128 -0.12421,0.10301 -0.27602,0.20043 -0.41038,0.26333 -0.95758,0.86207 -1.13402,1.24082 -0.49602,1.06473 0.1637,2.12504 1.74615,2.80645 1.32349,0.5699 2.81077,0.79633 5.23799,0.79745 l 1.27527,6.6e-4 -0.20512,2.08908 c 0,0 -0.24867,-0.008 -0.77961,-0.0976 z m -3.33961,-4.33134 c -0.40788,-0.0682 -0.94362,-0.27655 -0.91527,-0.35604 0.0129,-0.0361 0.0701,-0.24864 0.12724,-0.47235 l 0.10384,-0.40675 0.24319,0.10424 c 0.57857,0.248 1.22041,0.2808 1.63599,0.0836 0.41378,-0.19636 0.51396,-0.72615 0.20404,-1.07913 -0.21051,-0.23976 -0.45237,-0.31578 -1.00597,-0.31621 l -0.4128,-2.2e-4 v -0.44836 -0.44837 l 0.46974,-0.0256 c 0.55381,-0.0302 0.80585,-0.14131 0.93507,-0.41229 0.321,-0.67313 -0.59206,-1.04005 -1.58321,-0.63621 l -0.32074,0.13068 -0.11785,-0.42775 c -0.0648,-0.23527 -0.10596,-0.44698 -0.0914,-0.47048 0.0486,-0.0786 0.73185,-0.27668 1.1827,-0.34292 1.43284,-0.21052 2.49637,0.60059 2.19772,1.6761 -0.0786,0.28296 -0.39236,0.62626 -0.71532,0.7826 l -0.25668,0.12426 0.33147,0.13304 c 0.77327,0.31035 1.08687,1.14738 0.70807,1.88989 -0.3757,0.73643 -1.51205,1.12013 -2.71979,0.91835 z m 5.24041,-0.0144 c -0.99654,-0.25428 -1.55917,-1.10958 -1.55917,-2.37025 0,-0.48614 0.17248,-1.16229 0.41141,-1.61286 0.49283,-0.92938 1.53922,-1.51687 2.70596,-1.51924 l 0.4128,-8.8e-4 v 0.44363 0.44363 l -0.50848,0.059 c -0.87854,0.10202 -1.47474,0.48776 -1.67859,1.08605 -0.0757,0.22214 -0.0405,0.33774 0.0555,0.18239 0.0213,-0.0345 0.17018,-0.12396 0.33075,-0.19873 0.35847,-0.16691 0.95594,-0.18521 1.37586,-0.0421 0.38252,0.13033 0.77531,0.53134 0.91414,0.93328 0.34227,0.99088 -0.0944,2.05427 -1.01643,2.47504 -0.39537,0.18043 -1.00921,0.23187 -1.44376,0.12099 z m 1.06805,-1.05247 c 0.28881,-0.32324 0.34731,-0.90719 0.13248,-1.32262 -0.25979,-0.50237 -1.05164,-0.53309 -1.39276,-0.054 -0.2718,0.38171 -0.0852,1.18659 0.34121,1.47174 0.28884,0.19316 0.69948,0.15068 0.91907,-0.0951 z m 3.56039,1.05127 c -0.95673,-0.26975 -1.47988,-1.25121 -1.47596,-2.76896 0.003,-1.00614 0.26217,-1.77437 0.76379,-2.26057 0.36851,-0.35718 0.71947,-0.4928 1.27872,-0.49414 0.40752,-8.7e-4 0.50696,0.0208 0.83663,0.18309 0.73466,0.36167 1.09947,1.09882 1.15996,2.34387 0.0367,0.75649 -0.0631,1.41589 -0.28904,1.90948 -0.18971,0.4144 -0.5978,0.83921 -0.95292,0.99198 -0.3618,0.15564 -0.95524,0.19842 -1.32118,0.0952 z m 0.81806,-0.91964 c 0.37713,-0.19502 0.53516,-0.84079 0.49666,-2.02953 -0.029,-0.89419 -0.10793,-1.21147 -0.36944,-1.48443 -0.19479,-0.20331 -0.55342,-0.21984 -0.75218,-0.0347 -0.35487,0.33061 -0.52743,1.29442 -0.41381,2.31124 0.0773,0.69216 0.2225,1.05285 0.48913,1.21543 0.21467,0.13091 0.33004,0.13551 0.54964,0.022 z m 2.95325,-2.55118 c -0.67277,-0.35518 -0.82843,-1.26275 -0.31658,-1.84571 0.58739,-0.669 1.7197,-0.5075 2.09287,0.29851 0.26771,0.57822 -0.0107,1.30426 -0.60329,1.57349 -0.33514,0.15225 -0.85697,0.14055 -1.173,-0.0263 z m 0.9236,-0.46915 c 0.17498,-0.0905 0.33432,-0.37543 0.33432,-0.59788 0,-0.0667 -0.0428,-0.21163 -0.0952,-0.32199 -0.19865,-0.41861 -0.80502,-0.45075 -1.04606,-0.0554 -0.36145,0.59279 0.21032,1.28384 0.80696,0.97531 z"
                                            />
                                        </g>
                                        <g id="g101" transform="translate(-178.60982,206.28355)" onClick={() => { setView("explore_campus_3d_360"); setPanoramaName("Street%20View%2001"); }}>
                                            <circle
                                                style={{
                                                    opacity: 1,
                                                    fill: "url(#radialGradient101)",
                                                    fillOpacity: 1,
                                                    fillRule: "nonzero",
                                                    strokeWidth: 0.499999,
                                                    strokeMiterlimit: 4.2,
                                                    strokeDashoffset: 0.0378709,
                                                    paintOrder: "stroke fill markers",
                                                }}
                                                id="circle101"
                                                cx={960.02625}
                                                cy={327.4295}
                                                r={13.746275}
                                            />
                                            <path
                                                id="path101"
                                                style={{
                                                    fill: "#000000",
                                                    strokeWidth: 0.999999,
                                                }}
                                                d="m 961.5701,332.73718 c -1.23406,-0.67272 -2.25372,-1.2331 -2.2659,-1.24528 -0.0122,-0.0122 0.97189,-0.62805 2.18682,-1.36861 l 2.32646,-1.33667 0.009,1.82223 0.14351,-0.007 c 0.3635,-4.4e-4 1.50525,-0.1235 2.12095,-0.22871 2.07708,-0.35491 3.6877,-1.20256 4.21837,-2.22006 0.13647,-0.26165 0.16324,-0.38208 0.16444,-0.73958 10e-4,-0.36316 -0.0241,-0.47756 -0.16938,-0.7648 -0.2097,-0.41465 -0.73749,-0.96072 -1.21114,-1.25307 -0.19506,-0.1204 -0.35466,-0.22928 -0.35466,-0.24197 0,-0.0127 0.23364,0.0976 0.51919,0.2451 1.18733,0.61323 1.8122,1.56155 1.65481,2.51136 -0.11133,0.67186 -0.56071,1.40223 -1.18826,1.93126 -1.13615,0.95778 -3.14501,1.68924 -5.1707,2.15565 l -0.70937,0.0947 -0.0308,1.86876 z m -4.50342,-0.42847 c -1.39306,-0.24011 -1.72039,-0.30452 -2.49037,-0.48999 -3.07278,-0.74017 -5.09553,-2.13492 -5.42288,-3.73926 -0.18542,-0.90877 0.31732,-1.85758 1.30084,-2.45503 0.33268,-0.20209 0.74777,-0.39801 0.74777,-0.35294 0,0.0128 -0.12421,0.10301 -0.27602,0.20043 -0.41038,0.26333 -0.95758,0.86207 -1.13402,1.24082 -0.49602,1.06473 0.1637,2.12504 1.74615,2.80645 1.32349,0.5699 2.81077,0.79633 5.23799,0.79745 l 1.27527,6.6e-4 -0.20512,2.08908 c 0,0 -0.24867,-0.008 -0.77961,-0.0976 z m -3.33961,-4.33134 c -0.40788,-0.0682 -0.94362,-0.27655 -0.91527,-0.35604 0.0129,-0.0361 0.0701,-0.24864 0.12724,-0.47235 l 0.10384,-0.40675 0.24319,0.10424 c 0.57857,0.248 1.22041,0.2808 1.63599,0.0836 0.41378,-0.19636 0.51396,-0.72615 0.20404,-1.07913 -0.21051,-0.23976 -0.45237,-0.31578 -1.00597,-0.31621 l -0.4128,-2.2e-4 v -0.44836 -0.44837 l 0.46974,-0.0256 c 0.55381,-0.0302 0.80585,-0.14131 0.93507,-0.41229 0.321,-0.67313 -0.59206,-1.04005 -1.58321,-0.63621 l -0.32074,0.13068 -0.11785,-0.42775 c -0.0648,-0.23527 -0.10596,-0.44698 -0.0914,-0.47048 0.0486,-0.0786 0.73185,-0.27668 1.1827,-0.34292 1.43284,-0.21052 2.49637,0.60059 2.19772,1.6761 -0.0786,0.28296 -0.39236,0.62626 -0.71532,0.7826 l -0.25668,0.12426 0.33147,0.13304 c 0.77327,0.31035 1.08687,1.14738 0.70807,1.88989 -0.3757,0.73643 -1.51205,1.12013 -2.71979,0.91835 z m 5.24041,-0.0144 c -0.99654,-0.25428 -1.55917,-1.10958 -1.55917,-2.37025 0,-0.48614 0.17248,-1.16229 0.41141,-1.61286 0.49283,-0.92938 1.53922,-1.51687 2.70596,-1.51924 l 0.4128,-8.8e-4 v 0.44363 0.44363 l -0.50848,0.059 c -0.87854,0.10202 -1.47474,0.48776 -1.67859,1.08605 -0.0757,0.22214 -0.0405,0.33774 0.0555,0.18239 0.0213,-0.0345 0.17018,-0.12396 0.33075,-0.19873 0.35847,-0.16691 0.95594,-0.18521 1.37586,-0.0421 0.38252,0.13033 0.77531,0.53134 0.91414,0.93328 0.34227,0.99088 -0.0944,2.05427 -1.01643,2.47504 -0.39537,0.18043 -1.00921,0.23187 -1.44376,0.12099 z m 1.06805,-1.05247 c 0.28881,-0.32324 0.34731,-0.90719 0.13248,-1.32262 -0.25979,-0.50237 -1.05164,-0.53309 -1.39276,-0.054 -0.2718,0.38171 -0.0852,1.18659 0.34121,1.47174 0.28884,0.19316 0.69948,0.15068 0.91907,-0.0951 z m 3.56039,1.05127 c -0.95673,-0.26975 -1.47988,-1.25121 -1.47596,-2.76896 0.003,-1.00614 0.26217,-1.77437 0.76379,-2.26057 0.36851,-0.35718 0.71947,-0.4928 1.27872,-0.49414 0.40752,-8.7e-4 0.50696,0.0208 0.83663,0.18309 0.73466,0.36167 1.09947,1.09882 1.15996,2.34387 0.0367,0.75649 -0.0631,1.41589 -0.28904,1.90948 -0.18971,0.4144 -0.5978,0.83921 -0.95292,0.99198 -0.3618,0.15564 -0.95524,0.19842 -1.32118,0.0952 z m 0.81806,-0.91964 c 0.37713,-0.19502 0.53516,-0.84079 0.49666,-2.02953 -0.029,-0.89419 -0.10793,-1.21147 -0.36944,-1.48443 -0.19479,-0.20331 -0.55342,-0.21984 -0.75218,-0.0347 -0.35487,0.33061 -0.52743,1.29442 -0.41381,2.31124 0.0773,0.69216 0.2225,1.05285 0.48913,1.21543 0.21467,0.13091 0.33004,0.13551 0.54964,0.022 z m 2.95325,-2.55118 c -0.67277,-0.35518 -0.82843,-1.26275 -0.31658,-1.84571 0.58739,-0.669 1.7197,-0.5075 2.09287,0.29851 0.26771,0.57822 -0.0107,1.30426 -0.60329,1.57349 -0.33514,0.15225 -0.85697,0.14055 -1.173,-0.0263 z m 0.9236,-0.46915 c 0.17498,-0.0905 0.33432,-0.37543 0.33432,-0.59788 0,-0.0667 -0.0428,-0.21163 -0.0952,-0.32199 -0.19865,-0.41861 -0.80502,-0.45075 -1.04606,-0.0554 -0.36145,0.59279 0.21032,1.28384 0.80696,0.97531 z"
                                            />
                                        </g>
                                        <g id="g102" transform="translate(-243.80739,298.76489)" onClick={() => { setView("explore_campus_3d_360"); setPanoramaName("Entrance%20Gate"); }}>
                                            <circle
                                                style={{
                                                    opacity: 1,
                                                    fill: "url(#radialGradient102)",
                                                    fillOpacity: 1,
                                                    fillRule: "nonzero",
                                                    strokeWidth: 0.499999,
                                                    strokeMiterlimit: 4.2,
                                                    strokeDashoffset: 0.0378709,
                                                    paintOrder: "stroke fill markers",
                                                }}
                                                id="circle102"
                                                cx={960.02625}
                                                cy={327.4295}
                                                r={13.746275}
                                            />
                                            <path
                                                id="path102"
                                                style={{
                                                    fill: "#000000",
                                                    strokeWidth: 0.999999,
                                                }}
                                                d="m 961.5701,332.73718 c -1.23406,-0.67272 -2.25372,-1.2331 -2.2659,-1.24528 -0.0122,-0.0122 0.97189,-0.62805 2.18682,-1.36861 l 2.32646,-1.33667 0.009,1.82223 0.14351,-0.007 c 0.3635,-4.4e-4 1.50525,-0.1235 2.12095,-0.22871 2.07708,-0.35491 3.6877,-1.20256 4.21837,-2.22006 0.13647,-0.26165 0.16324,-0.38208 0.16444,-0.73958 10e-4,-0.36316 -0.0241,-0.47756 -0.16938,-0.7648 -0.2097,-0.41465 -0.73749,-0.96072 -1.21114,-1.25307 -0.19506,-0.1204 -0.35466,-0.22928 -0.35466,-0.24197 0,-0.0127 0.23364,0.0976 0.51919,0.2451 1.18733,0.61323 1.8122,1.56155 1.65481,2.51136 -0.11133,0.67186 -0.56071,1.40223 -1.18826,1.93126 -1.13615,0.95778 -3.14501,1.68924 -5.1707,2.15565 l -0.70937,0.0947 -0.0308,1.86876 z m -4.50342,-0.42847 c -1.39306,-0.24011 -1.72039,-0.30452 -2.49037,-0.48999 -3.07278,-0.74017 -5.09553,-2.13492 -5.42288,-3.73926 -0.18542,-0.90877 0.31732,-1.85758 1.30084,-2.45503 0.33268,-0.20209 0.74777,-0.39801 0.74777,-0.35294 0,0.0128 -0.12421,0.10301 -0.27602,0.20043 -0.41038,0.26333 -0.95758,0.86207 -1.13402,1.24082 -0.49602,1.06473 0.1637,2.12504 1.74615,2.80645 1.32349,0.5699 2.81077,0.79633 5.23799,0.79745 l 1.27527,6.6e-4 -0.20512,2.08908 c 0,0 -0.24867,-0.008 -0.77961,-0.0976 z m -3.33961,-4.33134 c -0.40788,-0.0682 -0.94362,-0.27655 -0.91527,-0.35604 0.0129,-0.0361 0.0701,-0.24864 0.12724,-0.47235 l 0.10384,-0.40675 0.24319,0.10424 c 0.57857,0.248 1.22041,0.2808 1.63599,0.0836 0.41378,-0.19636 0.51396,-0.72615 0.20404,-1.07913 -0.21051,-0.23976 -0.45237,-0.31578 -1.00597,-0.31621 l -0.4128,-2.2e-4 v -0.44836 -0.44837 l 0.46974,-0.0256 c 0.55381,-0.0302 0.80585,-0.14131 0.93507,-0.41229 0.321,-0.67313 -0.59206,-1.04005 -1.58321,-0.63621 l -0.32074,0.13068 -0.11785,-0.42775 c -0.0648,-0.23527 -0.10596,-0.44698 -0.0914,-0.47048 0.0486,-0.0786 0.73185,-0.27668 1.1827,-0.34292 1.43284,-0.21052 2.49637,0.60059 2.19772,1.6761 -0.0786,0.28296 -0.39236,0.62626 -0.71532,0.7826 l -0.25668,0.12426 0.33147,0.13304 c 0.77327,0.31035 1.08687,1.14738 0.70807,1.88989 -0.3757,0.73643 -1.51205,1.12013 -2.71979,0.91835 z m 5.24041,-0.0144 c -0.99654,-0.25428 -1.55917,-1.10958 -1.55917,-2.37025 0,-0.48614 0.17248,-1.16229 0.41141,-1.61286 0.49283,-0.92938 1.53922,-1.51687 2.70596,-1.51924 l 0.4128,-8.8e-4 v 0.44363 0.44363 l -0.50848,0.059 c -0.87854,0.10202 -1.47474,0.48776 -1.67859,1.08605 -0.0757,0.22214 -0.0405,0.33774 0.0555,0.18239 0.0213,-0.0345 0.17018,-0.12396 0.33075,-0.19873 0.35847,-0.16691 0.95594,-0.18521 1.37586,-0.0421 0.38252,0.13033 0.77531,0.53134 0.91414,0.93328 0.34227,0.99088 -0.0944,2.05427 -1.01643,2.47504 -0.39537,0.18043 -1.00921,0.23187 -1.44376,0.12099 z m 1.06805,-1.05247 c 0.28881,-0.32324 0.34731,-0.90719 0.13248,-1.32262 -0.25979,-0.50237 -1.05164,-0.53309 -1.39276,-0.054 -0.2718,0.38171 -0.0852,1.18659 0.34121,1.47174 0.28884,0.19316 0.69948,0.15068 0.91907,-0.0951 z m 3.56039,1.05127 c -0.95673,-0.26975 -1.47988,-1.25121 -1.47596,-2.76896 0.003,-1.00614 0.26217,-1.77437 0.76379,-2.26057 0.36851,-0.35718 0.71947,-0.4928 1.27872,-0.49414 0.40752,-8.7e-4 0.50696,0.0208 0.83663,0.18309 0.73466,0.36167 1.09947,1.09882 1.15996,2.34387 0.0367,0.75649 -0.0631,1.41589 -0.28904,1.90948 -0.18971,0.4144 -0.5978,0.83921 -0.95292,0.99198 -0.3618,0.15564 -0.95524,0.19842 -1.32118,0.0952 z m 0.81806,-0.91964 c 0.37713,-0.19502 0.53516,-0.84079 0.49666,-2.02953 -0.029,-0.89419 -0.10793,-1.21147 -0.36944,-1.48443 -0.19479,-0.20331 -0.55342,-0.21984 -0.75218,-0.0347 -0.35487,0.33061 -0.52743,1.29442 -0.41381,2.31124 0.0773,0.69216 0.2225,1.05285 0.48913,1.21543 0.21467,0.13091 0.33004,0.13551 0.54964,0.022 z m 2.95325,-2.55118 c -0.67277,-0.35518 -0.82843,-1.26275 -0.31658,-1.84571 0.58739,-0.669 1.7197,-0.5075 2.09287,0.29851 0.26771,0.57822 -0.0107,1.30426 -0.60329,1.57349 -0.33514,0.15225 -0.85697,0.14055 -1.173,-0.0263 z m 0.9236,-0.46915 c 0.17498,-0.0905 0.33432,-0.37543 0.33432,-0.59788 0,-0.0667 -0.0428,-0.21163 -0.0952,-0.32199 -0.19865,-0.41861 -0.80502,-0.45075 -1.04606,-0.0554 -0.36145,0.59279 0.21032,1.28384 0.80696,0.97531 z"
                                            />
                                        </g>
                                        <g id="g103" transform="translate(-156.64108,-60.88476)" onClick={() => { setView("explore_campus_3d_360"); setPanoramaName("Street%20View%2010"); }}>
                                            <circle
                                                style={{
                                                    opacity: 1,
                                                    fill: "url(#radialGradient103)",
                                                    fillOpacity: 1,
                                                    fillRule: "nonzero",
                                                    strokeWidth: 0.499999,
                                                    strokeMiterlimit: 4.2,
                                                    strokeDashoffset: 0.0378709,
                                                    paintOrder: "stroke fill markers",
                                                }}
                                                id="circle103"
                                                cx={960.02625}
                                                cy={327.4295}
                                                r={13.746275}
                                            />
                                            <path
                                                id="path103"
                                                style={{
                                                    fill: "#000000",
                                                    strokeWidth: 0.999999,
                                                }}
                                                d="m 961.5701,332.73718 c -1.23406,-0.67272 -2.25372,-1.2331 -2.2659,-1.24528 -0.0122,-0.0122 0.97189,-0.62805 2.18682,-1.36861 l 2.32646,-1.33667 0.009,1.82223 0.14351,-0.007 c 0.3635,-4.4e-4 1.50525,-0.1235 2.12095,-0.22871 2.07708,-0.35491 3.6877,-1.20256 4.21837,-2.22006 0.13647,-0.26165 0.16324,-0.38208 0.16444,-0.73958 10e-4,-0.36316 -0.0241,-0.47756 -0.16938,-0.7648 -0.2097,-0.41465 -0.73749,-0.96072 -1.21114,-1.25307 -0.19506,-0.1204 -0.35466,-0.22928 -0.35466,-0.24197 0,-0.0127 0.23364,0.0976 0.51919,0.2451 1.18733,0.61323 1.8122,1.56155 1.65481,2.51136 -0.11133,0.67186 -0.56071,1.40223 -1.18826,1.93126 -1.13615,0.95778 -3.14501,1.68924 -5.1707,2.15565 l -0.70937,0.0947 -0.0308,1.86876 z m -4.50342,-0.42847 c -1.39306,-0.24011 -1.72039,-0.30452 -2.49037,-0.48999 -3.07278,-0.74017 -5.09553,-2.13492 -5.42288,-3.73926 -0.18542,-0.90877 0.31732,-1.85758 1.30084,-2.45503 0.33268,-0.20209 0.74777,-0.39801 0.74777,-0.35294 0,0.0128 -0.12421,0.10301 -0.27602,0.20043 -0.41038,0.26333 -0.95758,0.86207 -1.13402,1.24082 -0.49602,1.06473 0.1637,2.12504 1.74615,2.80645 1.32349,0.5699 2.81077,0.79633 5.23799,0.79745 l 1.27527,6.6e-4 -0.20512,2.08908 c 0,0 -0.24867,-0.008 -0.77961,-0.0976 z m -3.33961,-4.33134 c -0.40788,-0.0682 -0.94362,-0.27655 -0.91527,-0.35604 0.0129,-0.0361 0.0701,-0.24864 0.12724,-0.47235 l 0.10384,-0.40675 0.24319,0.10424 c 0.57857,0.248 1.22041,0.2808 1.63599,0.0836 0.41378,-0.19636 0.51396,-0.72615 0.20404,-1.07913 -0.21051,-0.23976 -0.45237,-0.31578 -1.00597,-0.31621 l -0.4128,-2.2e-4 v -0.44836 -0.44837 l 0.46974,-0.0256 c 0.55381,-0.0302 0.80585,-0.14131 0.93507,-0.41229 0.321,-0.67313 -0.59206,-1.04005 -1.58321,-0.63621 l -0.32074,0.13068 -0.11785,-0.42775 c -0.0648,-0.23527 -0.10596,-0.44698 -0.0914,-0.47048 0.0486,-0.0786 0.73185,-0.27668 1.1827,-0.34292 1.43284,-0.21052 2.49637,0.60059 2.19772,1.6761 -0.0786,0.28296 -0.39236,0.62626 -0.71532,0.7826 l -0.25668,0.12426 0.33147,0.13304 c 0.77327,0.31035 1.08687,1.14738 0.70807,1.88989 -0.3757,0.73643 -1.51205,1.12013 -2.71979,0.91835 z m 5.24041,-0.0144 c -0.99654,-0.25428 -1.55917,-1.10958 -1.55917,-2.37025 0,-0.48614 0.17248,-1.16229 0.41141,-1.61286 0.49283,-0.92938 1.53922,-1.51687 2.70596,-1.51924 l 0.4128,-8.8e-4 v 0.44363 0.44363 l -0.50848,0.059 c -0.87854,0.10202 -1.47474,0.48776 -1.67859,1.08605 -0.0757,0.22214 -0.0405,0.33774 0.0555,0.18239 0.0213,-0.0345 0.17018,-0.12396 0.33075,-0.19873 0.35847,-0.16691 0.95594,-0.18521 1.37586,-0.0421 0.38252,0.13033 0.77531,0.53134 0.91414,0.93328 0.34227,0.99088 -0.0944,2.05427 -1.01643,2.47504 -0.39537,0.18043 -1.00921,0.23187 -1.44376,0.12099 z m 1.06805,-1.05247 c 0.28881,-0.32324 0.34731,-0.90719 0.13248,-1.32262 -0.25979,-0.50237 -1.05164,-0.53309 -1.39276,-0.054 -0.2718,0.38171 -0.0852,1.18659 0.34121,1.47174 0.28884,0.19316 0.69948,0.15068 0.91907,-0.0951 z m 3.56039,1.05127 c -0.95673,-0.26975 -1.47988,-1.25121 -1.47596,-2.76896 0.003,-1.00614 0.26217,-1.77437 0.76379,-2.26057 0.36851,-0.35718 0.71947,-0.4928 1.27872,-0.49414 0.40752,-8.7e-4 0.50696,0.0208 0.83663,0.18309 0.73466,0.36167 1.09947,1.09882 1.15996,2.34387 0.0367,0.75649 -0.0631,1.41589 -0.28904,1.90948 -0.18971,0.4144 -0.5978,0.83921 -0.95292,0.99198 -0.3618,0.15564 -0.95524,0.19842 -1.32118,0.0952 z m 0.81806,-0.91964 c 0.37713,-0.19502 0.53516,-0.84079 0.49666,-2.02953 -0.029,-0.89419 -0.10793,-1.21147 -0.36944,-1.48443 -0.19479,-0.20331 -0.55342,-0.21984 -0.75218,-0.0347 -0.35487,0.33061 -0.52743,1.29442 -0.41381,2.31124 0.0773,0.69216 0.2225,1.05285 0.48913,1.21543 0.21467,0.13091 0.33004,0.13551 0.54964,0.022 z m 2.95325,-2.55118 c -0.67277,-0.35518 -0.82843,-1.26275 -0.31658,-1.84571 0.58739,-0.669 1.7197,-0.5075 2.09287,0.29851 0.26771,0.57822 -0.0107,1.30426 -0.60329,1.57349 -0.33514,0.15225 -0.85697,0.14055 -1.173,-0.0263 z m 0.9236,-0.46915 c 0.17498,-0.0905 0.33432,-0.37543 0.33432,-0.59788 0,-0.0667 -0.0428,-0.21163 -0.0952,-0.32199 -0.19865,-0.41861 -0.80502,-0.45075 -1.04606,-0.0554 -0.36145,0.59279 0.21032,1.28384 0.80696,0.97531 z"
                                            />
                                        </g>
                                        <g id="g104" transform="translate(-67.348756,-133.16902)" onClick={() => { setView("explore_campus_3d_360"); setPanoramaName("Street%20View%2009"); }}>
                                            <circle
                                                style={{
                                                    opacity: 1,
                                                    fill: "url(#radialGradient104)",
                                                    fillOpacity: 1,
                                                    fillRule: "nonzero",
                                                    strokeWidth: 0.499999,
                                                    strokeMiterlimit: 4.2,
                                                    strokeDashoffset: 0.0378709,
                                                    paintOrder: "stroke fill markers",
                                                }}
                                                id="circle104"
                                                cx={960.02625}
                                                cy={327.4295}
                                                r={13.746275}
                                            />
                                            <path
                                                id="path104"
                                                style={{
                                                    fill: "#000000",
                                                    strokeWidth: 0.999999,
                                                }}
                                                d="m 961.5701,332.73718 c -1.23406,-0.67272 -2.25372,-1.2331 -2.2659,-1.24528 -0.0122,-0.0122 0.97189,-0.62805 2.18682,-1.36861 l 2.32646,-1.33667 0.009,1.82223 0.14351,-0.007 c 0.3635,-4.4e-4 1.50525,-0.1235 2.12095,-0.22871 2.07708,-0.35491 3.6877,-1.20256 4.21837,-2.22006 0.13647,-0.26165 0.16324,-0.38208 0.16444,-0.73958 10e-4,-0.36316 -0.0241,-0.47756 -0.16938,-0.7648 -0.2097,-0.41465 -0.73749,-0.96072 -1.21114,-1.25307 -0.19506,-0.1204 -0.35466,-0.22928 -0.35466,-0.24197 0,-0.0127 0.23364,0.0976 0.51919,0.2451 1.18733,0.61323 1.8122,1.56155 1.65481,2.51136 -0.11133,0.67186 -0.56071,1.40223 -1.18826,1.93126 -1.13615,0.95778 -3.14501,1.68924 -5.1707,2.15565 l -0.70937,0.0947 -0.0308,1.86876 z m -4.50342,-0.42847 c -1.39306,-0.24011 -1.72039,-0.30452 -2.49037,-0.48999 -3.07278,-0.74017 -5.09553,-2.13492 -5.42288,-3.73926 -0.18542,-0.90877 0.31732,-1.85758 1.30084,-2.45503 0.33268,-0.20209 0.74777,-0.39801 0.74777,-0.35294 0,0.0128 -0.12421,0.10301 -0.27602,0.20043 -0.41038,0.26333 -0.95758,0.86207 -1.13402,1.24082 -0.49602,1.06473 0.1637,2.12504 1.74615,2.80645 1.32349,0.5699 2.81077,0.79633 5.23799,0.79745 l 1.27527,6.6e-4 -0.20512,2.08908 c 0,0 -0.24867,-0.008 -0.77961,-0.0976 z m -3.33961,-4.33134 c -0.40788,-0.0682 -0.94362,-0.27655 -0.91527,-0.35604 0.0129,-0.0361 0.0701,-0.24864 0.12724,-0.47235 l 0.10384,-0.40675 0.24319,0.10424 c 0.57857,0.248 1.22041,0.2808 1.63599,0.0836 0.41378,-0.19636 0.51396,-0.72615 0.20404,-1.07913 -0.21051,-0.23976 -0.45237,-0.31578 -1.00597,-0.31621 l -0.4128,-2.2e-4 v -0.44836 -0.44837 l 0.46974,-0.0256 c 0.55381,-0.0302 0.80585,-0.14131 0.93507,-0.41229 0.321,-0.67313 -0.59206,-1.04005 -1.58321,-0.63621 l -0.32074,0.13068 -0.11785,-0.42775 c -0.0648,-0.23527 -0.10596,-0.44698 -0.0914,-0.47048 0.0486,-0.0786 0.73185,-0.27668 1.1827,-0.34292 1.43284,-0.21052 2.49637,0.60059 2.19772,1.6761 -0.0786,0.28296 -0.39236,0.62626 -0.71532,0.7826 l -0.25668,0.12426 0.33147,0.13304 c 0.77327,0.31035 1.08687,1.14738 0.70807,1.88989 -0.3757,0.73643 -1.51205,1.12013 -2.71979,0.91835 z m 5.24041,-0.0144 c -0.99654,-0.25428 -1.55917,-1.10958 -1.55917,-2.37025 0,-0.48614 0.17248,-1.16229 0.41141,-1.61286 0.49283,-0.92938 1.53922,-1.51687 2.70596,-1.51924 l 0.4128,-8.8e-4 v 0.44363 0.44363 l -0.50848,0.059 c -0.87854,0.10202 -1.47474,0.48776 -1.67859,1.08605 -0.0757,0.22214 -0.0405,0.33774 0.0555,0.18239 0.0213,-0.0345 0.17018,-0.12396 0.33075,-0.19873 0.35847,-0.16691 0.95594,-0.18521 1.37586,-0.0421 0.38252,0.13033 0.77531,0.53134 0.91414,0.93328 0.34227,0.99088 -0.0944,2.05427 -1.01643,2.47504 -0.39537,0.18043 -1.00921,0.23187 -1.44376,0.12099 z m 1.06805,-1.05247 c 0.28881,-0.32324 0.34731,-0.90719 0.13248,-1.32262 -0.25979,-0.50237 -1.05164,-0.53309 -1.39276,-0.054 -0.2718,0.38171 -0.0852,1.18659 0.34121,1.47174 0.28884,0.19316 0.69948,0.15068 0.91907,-0.0951 z m 3.56039,1.05127 c -0.95673,-0.26975 -1.47988,-1.25121 -1.47596,-2.76896 0.003,-1.00614 0.26217,-1.77437 0.76379,-2.26057 0.36851,-0.35718 0.71947,-0.4928 1.27872,-0.49414 0.40752,-8.7e-4 0.50696,0.0208 0.83663,0.18309 0.73466,0.36167 1.09947,1.09882 1.15996,2.34387 0.0367,0.75649 -0.0631,1.41589 -0.28904,1.90948 -0.18971,0.4144 -0.5978,0.83921 -0.95292,0.99198 -0.3618,0.15564 -0.95524,0.19842 -1.32118,0.0952 z m 0.81806,-0.91964 c 0.37713,-0.19502 0.53516,-0.84079 0.49666,-2.02953 -0.029,-0.89419 -0.10793,-1.21147 -0.36944,-1.48443 -0.19479,-0.20331 -0.55342,-0.21984 -0.75218,-0.0347 -0.35487,0.33061 -0.52743,1.29442 -0.41381,2.31124 0.0773,0.69216 0.2225,1.05285 0.48913,1.21543 0.21467,0.13091 0.33004,0.13551 0.54964,0.022 z m 2.95325,-2.55118 c -0.67277,-0.35518 -0.82843,-1.26275 -0.31658,-1.84571 0.58739,-0.669 1.7197,-0.5075 2.09287,0.29851 0.26771,0.57822 -0.0107,1.30426 -0.60329,1.57349 -0.33514,0.15225 -0.85697,0.14055 -1.173,-0.0263 z m 0.9236,-0.46915 c 0.17498,-0.0905 0.33432,-0.37543 0.33432,-0.59788 0,-0.0667 -0.0428,-0.21163 -0.0952,-0.32199 -0.19865,-0.41861 -0.80502,-0.45075 -1.04606,-0.0554 -0.36145,0.59279 0.21032,1.28384 0.80696,0.97531 z"
                                            />
                                        </g>
                                        <g id="g105" transform="translate(-16.324571,-182.42153)" onClick={() => { setView("explore_campus_3d_360"); setPanoramaName("Street%20View%2008"); }}>
                                            <circle
                                                style={{
                                                    opacity: 1,
                                                    fill: "url(#radialGradient105)",
                                                    fillOpacity: 1,
                                                    fillRule: "nonzero",
                                                    strokeWidth: 0.499999,
                                                    strokeMiterlimit: 4.2,
                                                    strokeDashoffset: 0.0378709,
                                                    paintOrder: "stroke fill markers",
                                                }}
                                                id="circle105"
                                                cx={960.02625}
                                                cy={327.4295}
                                                r={13.746275}
                                            />
                                            <path
                                                id="path105"
                                                style={{
                                                    fill: "#000000",
                                                    strokeWidth: 0.999999,
                                                }}
                                                d="m 961.5701,332.73718 c -1.23406,-0.67272 -2.25372,-1.2331 -2.2659,-1.24528 -0.0122,-0.0122 0.97189,-0.62805 2.18682,-1.36861 l 2.32646,-1.33667 0.009,1.82223 0.14351,-0.007 c 0.3635,-4.4e-4 1.50525,-0.1235 2.12095,-0.22871 2.07708,-0.35491 3.6877,-1.20256 4.21837,-2.22006 0.13647,-0.26165 0.16324,-0.38208 0.16444,-0.73958 10e-4,-0.36316 -0.0241,-0.47756 -0.16938,-0.7648 -0.2097,-0.41465 -0.73749,-0.96072 -1.21114,-1.25307 -0.19506,-0.1204 -0.35466,-0.22928 -0.35466,-0.24197 0,-0.0127 0.23364,0.0976 0.51919,0.2451 1.18733,0.61323 1.8122,1.56155 1.65481,2.51136 -0.11133,0.67186 -0.56071,1.40223 -1.18826,1.93126 -1.13615,0.95778 -3.14501,1.68924 -5.1707,2.15565 l -0.70937,0.0947 -0.0308,1.86876 z m -4.50342,-0.42847 c -1.39306,-0.24011 -1.72039,-0.30452 -2.49037,-0.48999 -3.07278,-0.74017 -5.09553,-2.13492 -5.42288,-3.73926 -0.18542,-0.90877 0.31732,-1.85758 1.30084,-2.45503 0.33268,-0.20209 0.74777,-0.39801 0.74777,-0.35294 0,0.0128 -0.12421,0.10301 -0.27602,0.20043 -0.41038,0.26333 -0.95758,0.86207 -1.13402,1.24082 -0.49602,1.06473 0.1637,2.12504 1.74615,2.80645 1.32349,0.5699 2.81077,0.79633 5.23799,0.79745 l 1.27527,6.6e-4 -0.20512,2.08908 c 0,0 -0.24867,-0.008 -0.77961,-0.0976 z m -3.33961,-4.33134 c -0.40788,-0.0682 -0.94362,-0.27655 -0.91527,-0.35604 0.0129,-0.0361 0.0701,-0.24864 0.12724,-0.47235 l 0.10384,-0.40675 0.24319,0.10424 c 0.57857,0.248 1.22041,0.2808 1.63599,0.0836 0.41378,-0.19636 0.51396,-0.72615 0.20404,-1.07913 -0.21051,-0.23976 -0.45237,-0.31578 -1.00597,-0.31621 l -0.4128,-2.2e-4 v -0.44836 -0.44837 l 0.46974,-0.0256 c 0.55381,-0.0302 0.80585,-0.14131 0.93507,-0.41229 0.321,-0.67313 -0.59206,-1.04005 -1.58321,-0.63621 l -0.32074,0.13068 -0.11785,-0.42775 c -0.0648,-0.23527 -0.10596,-0.44698 -0.0914,-0.47048 0.0486,-0.0786 0.73185,-0.27668 1.1827,-0.34292 1.43284,-0.21052 2.49637,0.60059 2.19772,1.6761 -0.0786,0.28296 -0.39236,0.62626 -0.71532,0.7826 l -0.25668,0.12426 0.33147,0.13304 c 0.77327,0.31035 1.08687,1.14738 0.70807,1.88989 -0.3757,0.73643 -1.51205,1.12013 -2.71979,0.91835 z m 5.24041,-0.0144 c -0.99654,-0.25428 -1.55917,-1.10958 -1.55917,-2.37025 0,-0.48614 0.17248,-1.16229 0.41141,-1.61286 0.49283,-0.92938 1.53922,-1.51687 2.70596,-1.51924 l 0.4128,-8.8e-4 v 0.44363 0.44363 l -0.50848,0.059 c -0.87854,0.10202 -1.47474,0.48776 -1.67859,1.08605 -0.0757,0.22214 -0.0405,0.33774 0.0555,0.18239 0.0213,-0.0345 0.17018,-0.12396 0.33075,-0.19873 0.35847,-0.16691 0.95594,-0.18521 1.37586,-0.0421 0.38252,0.13033 0.77531,0.53134 0.91414,0.93328 0.34227,0.99088 -0.0944,2.05427 -1.01643,2.47504 -0.39537,0.18043 -1.00921,0.23187 -1.44376,0.12099 z m 1.06805,-1.05247 c 0.28881,-0.32324 0.34731,-0.90719 0.13248,-1.32262 -0.25979,-0.50237 -1.05164,-0.53309 -1.39276,-0.054 -0.2718,0.38171 -0.0852,1.18659 0.34121,1.47174 0.28884,0.19316 0.69948,0.15068 0.91907,-0.0951 z m 3.56039,1.05127 c -0.95673,-0.26975 -1.47988,-1.25121 -1.47596,-2.76896 0.003,-1.00614 0.26217,-1.77437 0.76379,-2.26057 0.36851,-0.35718 0.71947,-0.4928 1.27872,-0.49414 0.40752,-8.7e-4 0.50696,0.0208 0.83663,0.18309 0.73466,0.36167 1.09947,1.09882 1.15996,2.34387 0.0367,0.75649 -0.0631,1.41589 -0.28904,1.90948 -0.18971,0.4144 -0.5978,0.83921 -0.95292,0.99198 -0.3618,0.15564 -0.95524,0.19842 -1.32118,0.0952 z m 0.81806,-0.91964 c 0.37713,-0.19502 0.53516,-0.84079 0.49666,-2.02953 -0.029,-0.89419 -0.10793,-1.21147 -0.36944,-1.48443 -0.19479,-0.20331 -0.55342,-0.21984 -0.75218,-0.0347 -0.35487,0.33061 -0.52743,1.29442 -0.41381,2.31124 0.0773,0.69216 0.2225,1.05285 0.48913,1.21543 0.21467,0.13091 0.33004,0.13551 0.54964,0.022 z m 2.95325,-2.55118 c -0.67277,-0.35518 -0.82843,-1.26275 -0.31658,-1.84571 0.58739,-0.669 1.7197,-0.5075 2.09287,0.29851 0.26771,0.57822 -0.0107,1.30426 -0.60329,1.57349 -0.33514,0.15225 -0.85697,0.14055 -1.173,-0.0263 z m 0.9236,-0.46915 c 0.17498,-0.0905 0.33432,-0.37543 0.33432,-0.59788 0,-0.0667 -0.0428,-0.21163 -0.0952,-0.32199 -0.19865,-0.41861 -0.80502,-0.45075 -1.04606,-0.0554 -0.36145,0.59279 0.21032,1.28384 0.80696,0.97531 z"
                                            />
                                        </g>
                                        <g id="g106" transform="translate(49.227334,-160.80712)" onClick={() => { setView("explore_campus_3d_360"); setPanoramaName("Terrace%20View%2001"); }}>
                                            <circle
                                                style={{
                                                    opacity: 1,
                                                    fill: "url(#radialGradient106)",
                                                    fillOpacity: 1,
                                                    fillRule: "nonzero",
                                                    strokeWidth: 0.499999,
                                                    strokeMiterlimit: 4.2,
                                                    strokeDashoffset: 0.0378709,
                                                    paintOrder: "stroke fill markers",
                                                }}
                                                id="circle106"
                                                cx={960.02625}
                                                cy={327.4295}
                                                r={13.746275}
                                            />
                                            <path
                                                id="path106"
                                                style={{
                                                    fill: "#000000",
                                                    strokeWidth: 0.999999,
                                                }}
                                                d="m 961.5701,332.73718 c -1.23406,-0.67272 -2.25372,-1.2331 -2.2659,-1.24528 -0.0122,-0.0122 0.97189,-0.62805 2.18682,-1.36861 l 2.32646,-1.33667 0.009,1.82223 0.14351,-0.007 c 0.3635,-4.4e-4 1.50525,-0.1235 2.12095,-0.22871 2.07708,-0.35491 3.6877,-1.20256 4.21837,-2.22006 0.13647,-0.26165 0.16324,-0.38208 0.16444,-0.73958 10e-4,-0.36316 -0.0241,-0.47756 -0.16938,-0.7648 -0.2097,-0.41465 -0.73749,-0.96072 -1.21114,-1.25307 -0.19506,-0.1204 -0.35466,-0.22928 -0.35466,-0.24197 0,-0.0127 0.23364,0.0976 0.51919,0.2451 1.18733,0.61323 1.8122,1.56155 1.65481,2.51136 -0.11133,0.67186 -0.56071,1.40223 -1.18826,1.93126 -1.13615,0.95778 -3.14501,1.68924 -5.1707,2.15565 l -0.70937,0.0947 -0.0308,1.86876 z m -4.50342,-0.42847 c -1.39306,-0.24011 -1.72039,-0.30452 -2.49037,-0.48999 -3.07278,-0.74017 -5.09553,-2.13492 -5.42288,-3.73926 -0.18542,-0.90877 0.31732,-1.85758 1.30084,-2.45503 0.33268,-0.20209 0.74777,-0.39801 0.74777,-0.35294 0,0.0128 -0.12421,0.10301 -0.27602,0.20043 -0.41038,0.26333 -0.95758,0.86207 -1.13402,1.24082 -0.49602,1.06473 0.1637,2.12504 1.74615,2.80645 1.32349,0.5699 2.81077,0.79633 5.23799,0.79745 l 1.27527,6.6e-4 -0.20512,2.08908 c 0,0 -0.24867,-0.008 -0.77961,-0.0976 z m -3.33961,-4.33134 c -0.40788,-0.0682 -0.94362,-0.27655 -0.91527,-0.35604 0.0129,-0.0361 0.0701,-0.24864 0.12724,-0.47235 l 0.10384,-0.40675 0.24319,0.10424 c 0.57857,0.248 1.22041,0.2808 1.63599,0.0836 0.41378,-0.19636 0.51396,-0.72615 0.20404,-1.07913 -0.21051,-0.23976 -0.45237,-0.31578 -1.00597,-0.31621 l -0.4128,-2.2e-4 v -0.44836 -0.44837 l 0.46974,-0.0256 c 0.55381,-0.0302 0.80585,-0.14131 0.93507,-0.41229 0.321,-0.67313 -0.59206,-1.04005 -1.58321,-0.63621 l -0.32074,0.13068 -0.11785,-0.42775 c -0.0648,-0.23527 -0.10596,-0.44698 -0.0914,-0.47048 0.0486,-0.0786 0.73185,-0.27668 1.1827,-0.34292 1.43284,-0.21052 2.49637,0.60059 2.19772,1.6761 -0.0786,0.28296 -0.39236,0.62626 -0.71532,0.7826 l -0.25668,0.12426 0.33147,0.13304 c 0.77327,0.31035 1.08687,1.14738 0.70807,1.88989 -0.3757,0.73643 -1.51205,1.12013 -2.71979,0.91835 z m 5.24041,-0.0144 c -0.99654,-0.25428 -1.55917,-1.10958 -1.55917,-2.37025 0,-0.48614 0.17248,-1.16229 0.41141,-1.61286 0.49283,-0.92938 1.53922,-1.51687 2.70596,-1.51924 l 0.4128,-8.8e-4 v 0.44363 0.44363 l -0.50848,0.059 c -0.87854,0.10202 -1.47474,0.48776 -1.67859,1.08605 -0.0757,0.22214 -0.0405,0.33774 0.0555,0.18239 0.0213,-0.0345 0.17018,-0.12396 0.33075,-0.19873 0.35847,-0.16691 0.95594,-0.18521 1.37586,-0.0421 0.38252,0.13033 0.77531,0.53134 0.91414,0.93328 0.34227,0.99088 -0.0944,2.05427 -1.01643,2.47504 -0.39537,0.18043 -1.00921,0.23187 -1.44376,0.12099 z m 1.06805,-1.05247 c 0.28881,-0.32324 0.34731,-0.90719 0.13248,-1.32262 -0.25979,-0.50237 -1.05164,-0.53309 -1.39276,-0.054 -0.2718,0.38171 -0.0852,1.18659 0.34121,1.47174 0.28884,0.19316 0.69948,0.15068 0.91907,-0.0951 z m 3.56039,1.05127 c -0.95673,-0.26975 -1.47988,-1.25121 -1.47596,-2.76896 0.003,-1.00614 0.26217,-1.77437 0.76379,-2.26057 0.36851,-0.35718 0.71947,-0.4928 1.27872,-0.49414 0.40752,-8.7e-4 0.50696,0.0208 0.83663,0.18309 0.73466,0.36167 1.09947,1.09882 1.15996,2.34387 0.0367,0.75649 -0.0631,1.41589 -0.28904,1.90948 -0.18971,0.4144 -0.5978,0.83921 -0.95292,0.99198 -0.3618,0.15564 -0.95524,0.19842 -1.32118,0.0952 z m 0.81806,-0.91964 c 0.37713,-0.19502 0.53516,-0.84079 0.49666,-2.02953 -0.029,-0.89419 -0.10793,-1.21147 -0.36944,-1.48443 -0.19479,-0.20331 -0.55342,-0.21984 -0.75218,-0.0347 -0.35487,0.33061 -0.52743,1.29442 -0.41381,2.31124 0.0773,0.69216 0.2225,1.05285 0.48913,1.21543 0.21467,0.13091 0.33004,0.13551 0.54964,0.022 z m 2.95325,-2.55118 c -0.67277,-0.35518 -0.82843,-1.26275 -0.31658,-1.84571 0.58739,-0.669 1.7197,-0.5075 2.09287,0.29851 0.26771,0.57822 -0.0107,1.30426 -0.60329,1.57349 -0.33514,0.15225 -0.85697,0.14055 -1.173,-0.0263 z m 0.9236,-0.46915 c 0.17498,-0.0905 0.33432,-0.37543 0.33432,-0.59788 0,-0.0667 -0.0428,-0.21163 -0.0952,-0.32199 -0.19865,-0.41861 -0.80502,-0.45075 -1.04606,-0.0554 -0.36145,0.59279 0.21032,1.28384 0.80696,0.97531 z"
                                            />
                                        </g>
                                        <g id="g107" transform="translate(4.581172,-95.963885)" onClick={() => { setView("explore_campus_3d_360"); setPanoramaName("Swimming%20Pool%2002"); }}>
                                            <circle
                                                style={{
                                                    opacity: 1,
                                                    fill: "url(#radialGradient107)",
                                                    fillOpacity: 1,
                                                    fillRule: "nonzero",
                                                    strokeWidth: 0.499999,
                                                    strokeMiterlimit: 4.2,
                                                    strokeDashoffset: 0.0378709,
                                                    paintOrder: "stroke fill markers",
                                                }}
                                                id="circle107"
                                                cx={960.02625}
                                                cy={327.4295}
                                                r={13.746275}
                                            />
                                            <path
                                                id="path107"
                                                style={{
                                                    fill: "#000000",
                                                    strokeWidth: 0.999999,
                                                }}
                                                d="m 961.5701,332.73718 c -1.23406,-0.67272 -2.25372,-1.2331 -2.2659,-1.24528 -0.0122,-0.0122 0.97189,-0.62805 2.18682,-1.36861 l 2.32646,-1.33667 0.009,1.82223 0.14351,-0.007 c 0.3635,-4.4e-4 1.50525,-0.1235 2.12095,-0.22871 2.07708,-0.35491 3.6877,-1.20256 4.21837,-2.22006 0.13647,-0.26165 0.16324,-0.38208 0.16444,-0.73958 10e-4,-0.36316 -0.0241,-0.47756 -0.16938,-0.7648 -0.2097,-0.41465 -0.73749,-0.96072 -1.21114,-1.25307 -0.19506,-0.1204 -0.35466,-0.22928 -0.35466,-0.24197 0,-0.0127 0.23364,0.0976 0.51919,0.2451 1.18733,0.61323 1.8122,1.56155 1.65481,2.51136 -0.11133,0.67186 -0.56071,1.40223 -1.18826,1.93126 -1.13615,0.95778 -3.14501,1.68924 -5.1707,2.15565 l -0.70937,0.0947 -0.0308,1.86876 z m -4.50342,-0.42847 c -1.39306,-0.24011 -1.72039,-0.30452 -2.49037,-0.48999 -3.07278,-0.74017 -5.09553,-2.13492 -5.42288,-3.73926 -0.18542,-0.90877 0.31732,-1.85758 1.30084,-2.45503 0.33268,-0.20209 0.74777,-0.39801 0.74777,-0.35294 0,0.0128 -0.12421,0.10301 -0.27602,0.20043 -0.41038,0.26333 -0.95758,0.86207 -1.13402,1.24082 -0.49602,1.06473 0.1637,2.12504 1.74615,2.80645 1.32349,0.5699 2.81077,0.79633 5.23799,0.79745 l 1.27527,6.6e-4 -0.20512,2.08908 c 0,0 -0.24867,-0.008 -0.77961,-0.0976 z m -3.33961,-4.33134 c -0.40788,-0.0682 -0.94362,-0.27655 -0.91527,-0.35604 0.0129,-0.0361 0.0701,-0.24864 0.12724,-0.47235 l 0.10384,-0.40675 0.24319,0.10424 c 0.57857,0.248 1.22041,0.2808 1.63599,0.0836 0.41378,-0.19636 0.51396,-0.72615 0.20404,-1.07913 -0.21051,-0.23976 -0.45237,-0.31578 -1.00597,-0.31621 l -0.4128,-2.2e-4 v -0.44836 -0.44837 l 0.46974,-0.0256 c 0.55381,-0.0302 0.80585,-0.14131 0.93507,-0.41229 0.321,-0.67313 -0.59206,-1.04005 -1.58321,-0.63621 l -0.32074,0.13068 -0.11785,-0.42775 c -0.0648,-0.23527 -0.10596,-0.44698 -0.0914,-0.47048 0.0486,-0.0786 0.73185,-0.27668 1.1827,-0.34292 1.43284,-0.21052 2.49637,0.60059 2.19772,1.6761 -0.0786,0.28296 -0.39236,0.62626 -0.71532,0.7826 l -0.25668,0.12426 0.33147,0.13304 c 0.77327,0.31035 1.08687,1.14738 0.70807,1.88989 -0.3757,0.73643 -1.51205,1.12013 -2.71979,0.91835 z m 5.24041,-0.0144 c -0.99654,-0.25428 -1.55917,-1.10958 -1.55917,-2.37025 0,-0.48614 0.17248,-1.16229 0.41141,-1.61286 0.49283,-0.92938 1.53922,-1.51687 2.70596,-1.51924 l 0.4128,-8.8e-4 v 0.44363 0.44363 l -0.50848,0.059 c -0.87854,0.10202 -1.47474,0.48776 -1.67859,1.08605 -0.0757,0.22214 -0.0405,0.33774 0.0555,0.18239 0.0213,-0.0345 0.17018,-0.12396 0.33075,-0.19873 0.35847,-0.16691 0.95594,-0.18521 1.37586,-0.0421 0.38252,0.13033 0.77531,0.53134 0.91414,0.93328 0.34227,0.99088 -0.0944,2.05427 -1.01643,2.47504 -0.39537,0.18043 -1.00921,0.23187 -1.44376,0.12099 z m 1.06805,-1.05247 c 0.28881,-0.32324 0.34731,-0.90719 0.13248,-1.32262 -0.25979,-0.50237 -1.05164,-0.53309 -1.39276,-0.054 -0.2718,0.38171 -0.0852,1.18659 0.34121,1.47174 0.28884,0.19316 0.69948,0.15068 0.91907,-0.0951 z m 3.56039,1.05127 c -0.95673,-0.26975 -1.47988,-1.25121 -1.47596,-2.76896 0.003,-1.00614 0.26217,-1.77437 0.76379,-2.26057 0.36851,-0.35718 0.71947,-0.4928 1.27872,-0.49414 0.40752,-8.7e-4 0.50696,0.0208 0.83663,0.18309 0.73466,0.36167 1.09947,1.09882 1.15996,2.34387 0.0367,0.75649 -0.0631,1.41589 -0.28904,1.90948 -0.18971,0.4144 -0.5978,0.83921 -0.95292,0.99198 -0.3618,0.15564 -0.95524,0.19842 -1.32118,0.0952 z m 0.81806,-0.91964 c 0.37713,-0.19502 0.53516,-0.84079 0.49666,-2.02953 -0.029,-0.89419 -0.10793,-1.21147 -0.36944,-1.48443 -0.19479,-0.20331 -0.55342,-0.21984 -0.75218,-0.0347 -0.35487,0.33061 -0.52743,1.29442 -0.41381,2.31124 0.0773,0.69216 0.2225,1.05285 0.48913,1.21543 0.21467,0.13091 0.33004,0.13551 0.54964,0.022 z m 2.95325,-2.55118 c -0.67277,-0.35518 -0.82843,-1.26275 -0.31658,-1.84571 0.58739,-0.669 1.7197,-0.5075 2.09287,0.29851 0.26771,0.57822 -0.0107,1.30426 -0.60329,1.57349 -0.33514,0.15225 -0.85697,0.14055 -1.173,-0.0263 z m 0.9236,-0.46915 c 0.17498,-0.0905 0.33432,-0.37543 0.33432,-0.59788 0,-0.0667 -0.0428,-0.21163 -0.0952,-0.32199 -0.19865,-0.41861 -0.80502,-0.45075 -1.04606,-0.0554 -0.36145,0.59279 0.21032,1.28384 0.80696,0.97531 z"
                                            />
                                        </g>
                                        <g id="g108" transform="translate(133.55897,-148.75974)" onClick={() => { setView("explore_campus_3d_360"); setPanoramaName("Street%20View%2007"); }}>
                                            <circle
                                                style={{
                                                    opacity: 1,
                                                    fill: "url(#radialGradient108)",
                                                    fillOpacity: 1,
                                                    fillRule: "nonzero",
                                                    strokeWidth: 0.499999,
                                                    strokeMiterlimit: 4.2,
                                                    strokeDashoffset: 0.0378709,
                                                    paintOrder: "stroke fill markers",
                                                }}
                                                id="circle108"
                                                cx={960.02625}
                                                cy={327.4295}
                                                r={13.746275}
                                            />
                                            <path
                                                id="path108"
                                                style={{
                                                    fill: "#000000",
                                                    strokeWidth: 0.999999,
                                                }}
                                                d="m 961.5701,332.73718 c -1.23406,-0.67272 -2.25372,-1.2331 -2.2659,-1.24528 -0.0122,-0.0122 0.97189,-0.62805 2.18682,-1.36861 l 2.32646,-1.33667 0.009,1.82223 0.14351,-0.007 c 0.3635,-4.4e-4 1.50525,-0.1235 2.12095,-0.22871 2.07708,-0.35491 3.6877,-1.20256 4.21837,-2.22006 0.13647,-0.26165 0.16324,-0.38208 0.16444,-0.73958 10e-4,-0.36316 -0.0241,-0.47756 -0.16938,-0.7648 -0.2097,-0.41465 -0.73749,-0.96072 -1.21114,-1.25307 -0.19506,-0.1204 -0.35466,-0.22928 -0.35466,-0.24197 0,-0.0127 0.23364,0.0976 0.51919,0.2451 1.18733,0.61323 1.8122,1.56155 1.65481,2.51136 -0.11133,0.67186 -0.56071,1.40223 -1.18826,1.93126 -1.13615,0.95778 -3.14501,1.68924 -5.1707,2.15565 l -0.70937,0.0947 -0.0308,1.86876 z m -4.50342,-0.42847 c -1.39306,-0.24011 -1.72039,-0.30452 -2.49037,-0.48999 -3.07278,-0.74017 -5.09553,-2.13492 -5.42288,-3.73926 -0.18542,-0.90877 0.31732,-1.85758 1.30084,-2.45503 0.33268,-0.20209 0.74777,-0.39801 0.74777,-0.35294 0,0.0128 -0.12421,0.10301 -0.27602,0.20043 -0.41038,0.26333 -0.95758,0.86207 -1.13402,1.24082 -0.49602,1.06473 0.1637,2.12504 1.74615,2.80645 1.32349,0.5699 2.81077,0.79633 5.23799,0.79745 l 1.27527,6.6e-4 -0.20512,2.08908 c 0,0 -0.24867,-0.008 -0.77961,-0.0976 z m -3.33961,-4.33134 c -0.40788,-0.0682 -0.94362,-0.27655 -0.91527,-0.35604 0.0129,-0.0361 0.0701,-0.24864 0.12724,-0.47235 l 0.10384,-0.40675 0.24319,0.10424 c 0.57857,0.248 1.22041,0.2808 1.63599,0.0836 0.41378,-0.19636 0.51396,-0.72615 0.20404,-1.07913 -0.21051,-0.23976 -0.45237,-0.31578 -1.00597,-0.31621 l -0.4128,-2.2e-4 v -0.44836 -0.44837 l 0.46974,-0.0256 c 0.55381,-0.0302 0.80585,-0.14131 0.93507,-0.41229 0.321,-0.67313 -0.59206,-1.04005 -1.58321,-0.63621 l -0.32074,0.13068 -0.11785,-0.42775 c -0.0648,-0.23527 -0.10596,-0.44698 -0.0914,-0.47048 0.0486,-0.0786 0.73185,-0.27668 1.1827,-0.34292 1.43284,-0.21052 2.49637,0.60059 2.19772,1.6761 -0.0786,0.28296 -0.39236,0.62626 -0.71532,0.7826 l -0.25668,0.12426 0.33147,0.13304 c 0.77327,0.31035 1.08687,1.14738 0.70807,1.88989 -0.3757,0.73643 -1.51205,1.12013 -2.71979,0.91835 z m 5.24041,-0.0144 c -0.99654,-0.25428 -1.55917,-1.10958 -1.55917,-2.37025 0,-0.48614 0.17248,-1.16229 0.41141,-1.61286 0.49283,-0.92938 1.53922,-1.51687 2.70596,-1.51924 l 0.4128,-8.8e-4 v 0.44363 0.44363 l -0.50848,0.059 c -0.87854,0.10202 -1.47474,0.48776 -1.67859,1.08605 -0.0757,0.22214 -0.0405,0.33774 0.0555,0.18239 0.0213,-0.0345 0.17018,-0.12396 0.33075,-0.19873 0.35847,-0.16691 0.95594,-0.18521 1.37586,-0.0421 0.38252,0.13033 0.77531,0.53134 0.91414,0.93328 0.34227,0.99088 -0.0944,2.05427 -1.01643,2.47504 -0.39537,0.18043 -1.00921,0.23187 -1.44376,0.12099 z m 1.06805,-1.05247 c 0.28881,-0.32324 0.34731,-0.90719 0.13248,-1.32262 -0.25979,-0.50237 -1.05164,-0.53309 -1.39276,-0.054 -0.2718,0.38171 -0.0852,1.18659 0.34121,1.47174 0.28884,0.19316 0.69948,0.15068 0.91907,-0.0951 z m 3.56039,1.05127 c -0.95673,-0.26975 -1.47988,-1.25121 -1.47596,-2.76896 0.003,-1.00614 0.26217,-1.77437 0.76379,-2.26057 0.36851,-0.35718 0.71947,-0.4928 1.27872,-0.49414 0.40752,-8.7e-4 0.50696,0.0208 0.83663,0.18309 0.73466,0.36167 1.09947,1.09882 1.15996,2.34387 0.0367,0.75649 -0.0631,1.41589 -0.28904,1.90948 -0.18971,0.4144 -0.5978,0.83921 -0.95292,0.99198 -0.3618,0.15564 -0.95524,0.19842 -1.32118,0.0952 z m 0.81806,-0.91964 c 0.37713,-0.19502 0.53516,-0.84079 0.49666,-2.02953 -0.029,-0.89419 -0.10793,-1.21147 -0.36944,-1.48443 -0.19479,-0.20331 -0.55342,-0.21984 -0.75218,-0.0347 -0.35487,0.33061 -0.52743,1.29442 -0.41381,2.31124 0.0773,0.69216 0.2225,1.05285 0.48913,1.21543 0.21467,0.13091 0.33004,0.13551 0.54964,0.022 z m 2.95325,-2.55118 c -0.67277,-0.35518 -0.82843,-1.26275 -0.31658,-1.84571 0.58739,-0.669 1.7197,-0.5075 2.09287,0.29851 0.26771,0.57822 -0.0107,1.30426 -0.60329,1.57349 -0.33514,0.15225 -0.85697,0.14055 -1.173,-0.0263 z m 0.9236,-0.46915 c 0.17498,-0.0905 0.33432,-0.37543 0.33432,-0.59788 0,-0.0667 -0.0428,-0.21163 -0.0952,-0.32199 -0.19865,-0.41861 -0.80502,-0.45075 -1.04606,-0.0554 -0.36145,0.59279 0.21032,1.28384 0.80696,0.97531 z"
                                            />
                                        </g>
                                        <g id="g109" transform="translate(158.00806,-97.38122)" onClick={() => { setView("explore_campus_3d_360"); setPanoramaName("Garden%20View%201"); }}>
                                            <circle
                                                style={{
                                                    opacity: 1,
                                                    fill: "url(#radialGradient109)",
                                                    fillOpacity: 1,
                                                    fillRule: "nonzero",
                                                    strokeWidth: 0.499999,
                                                    strokeMiterlimit: 4.2,
                                                    strokeDashoffset: 0.0378709,
                                                    paintOrder: "stroke fill markers",
                                                }}
                                                id="circle109"
                                                cx={960.02625}
                                                cy={327.4295}
                                                r={13.746275}
                                            />
                                            <path
                                                id="path109"
                                                style={{
                                                    fill: "#000000",
                                                    strokeWidth: 0.999999,
                                                }}
                                                d="m 961.5701,332.73718 c -1.23406,-0.67272 -2.25372,-1.2331 -2.2659,-1.24528 -0.0122,-0.0122 0.97189,-0.62805 2.18682,-1.36861 l 2.32646,-1.33667 0.009,1.82223 0.14351,-0.007 c 0.3635,-4.4e-4 1.50525,-0.1235 2.12095,-0.22871 2.07708,-0.35491 3.6877,-1.20256 4.21837,-2.22006 0.13647,-0.26165 0.16324,-0.38208 0.16444,-0.73958 10e-4,-0.36316 -0.0241,-0.47756 -0.16938,-0.7648 -0.2097,-0.41465 -0.73749,-0.96072 -1.21114,-1.25307 -0.19506,-0.1204 -0.35466,-0.22928 -0.35466,-0.24197 0,-0.0127 0.23364,0.0976 0.51919,0.2451 1.18733,0.61323 1.8122,1.56155 1.65481,2.51136 -0.11133,0.67186 -0.56071,1.40223 -1.18826,1.93126 -1.13615,0.95778 -3.14501,1.68924 -5.1707,2.15565 l -0.70937,0.0947 -0.0308,1.86876 z m -4.50342,-0.42847 c -1.39306,-0.24011 -1.72039,-0.30452 -2.49037,-0.48999 -3.07278,-0.74017 -5.09553,-2.13492 -5.42288,-3.73926 -0.18542,-0.90877 0.31732,-1.85758 1.30084,-2.45503 0.33268,-0.20209 0.74777,-0.39801 0.74777,-0.35294 0,0.0128 -0.12421,0.10301 -0.27602,0.20043 -0.41038,0.26333 -0.95758,0.86207 -1.13402,1.24082 -0.49602,1.06473 0.1637,2.12504 1.74615,2.80645 1.32349,0.5699 2.81077,0.79633 5.23799,0.79745 l 1.27527,6.6e-4 -0.20512,2.08908 c 0,0 -0.24867,-0.008 -0.77961,-0.0976 z m -3.33961,-4.33134 c -0.40788,-0.0682 -0.94362,-0.27655 -0.91527,-0.35604 0.0129,-0.0361 0.0701,-0.24864 0.12724,-0.47235 l 0.10384,-0.40675 0.24319,0.10424 c 0.57857,0.248 1.22041,0.2808 1.63599,0.0836 0.41378,-0.19636 0.51396,-0.72615 0.20404,-1.07913 -0.21051,-0.23976 -0.45237,-0.31578 -1.00597,-0.31621 l -0.4128,-2.2e-4 v -0.44836 -0.44837 l 0.46974,-0.0256 c 0.55381,-0.0302 0.80585,-0.14131 0.93507,-0.41229 0.321,-0.67313 -0.59206,-1.04005 -1.58321,-0.63621 l -0.32074,0.13068 -0.11785,-0.42775 c -0.0648,-0.23527 -0.10596,-0.44698 -0.0914,-0.47048 0.0486,-0.0786 0.73185,-0.27668 1.1827,-0.34292 1.43284,-0.21052 2.49637,0.60059 2.19772,1.6761 -0.0786,0.28296 -0.39236,0.62626 -0.71532,0.7826 l -0.25668,0.12426 0.33147,0.13304 c 0.77327,0.31035 1.08687,1.14738 0.70807,1.88989 -0.3757,0.73643 -1.51205,1.12013 -2.71979,0.91835 z m 5.24041,-0.0144 c -0.99654,-0.25428 -1.55917,-1.10958 -1.55917,-2.37025 0,-0.48614 0.17248,-1.16229 0.41141,-1.61286 0.49283,-0.92938 1.53922,-1.51687 2.70596,-1.51924 l 0.4128,-8.8e-4 v 0.44363 0.44363 l -0.50848,0.059 c -0.87854,0.10202 -1.47474,0.48776 -1.67859,1.08605 -0.0757,0.22214 -0.0405,0.33774 0.0555,0.18239 0.0213,-0.0345 0.17018,-0.12396 0.33075,-0.19873 0.35847,-0.16691 0.95594,-0.18521 1.37586,-0.0421 0.38252,0.13033 0.77531,0.53134 0.91414,0.93328 0.34227,0.99088 -0.0944,2.05427 -1.01643,2.47504 -0.39537,0.18043 -1.00921,0.23187 -1.44376,0.12099 z m 1.06805,-1.05247 c 0.28881,-0.32324 0.34731,-0.90719 0.13248,-1.32262 -0.25979,-0.50237 -1.05164,-0.53309 -1.39276,-0.054 -0.2718,0.38171 -0.0852,1.18659 0.34121,1.47174 0.28884,0.19316 0.69948,0.15068 0.91907,-0.0951 z m 3.56039,1.05127 c -0.95673,-0.26975 -1.47988,-1.25121 -1.47596,-2.76896 0.003,-1.00614 0.26217,-1.77437 0.76379,-2.26057 0.36851,-0.35718 0.71947,-0.4928 1.27872,-0.49414 0.40752,-8.7e-4 0.50696,0.0208 0.83663,0.18309 0.73466,0.36167 1.09947,1.09882 1.15996,2.34387 0.0367,0.75649 -0.0631,1.41589 -0.28904,1.90948 -0.18971,0.4144 -0.5978,0.83921 -0.95292,0.99198 -0.3618,0.15564 -0.95524,0.19842 -1.32118,0.0952 z m 0.81806,-0.91964 c 0.37713,-0.19502 0.53516,-0.84079 0.49666,-2.02953 -0.029,-0.89419 -0.10793,-1.21147 -0.36944,-1.48443 -0.19479,-0.20331 -0.55342,-0.21984 -0.75218,-0.0347 -0.35487,0.33061 -0.52743,1.29442 -0.41381,2.31124 0.0773,0.69216 0.2225,1.05285 0.48913,1.21543 0.21467,0.13091 0.33004,0.13551 0.54964,0.022 z m 2.95325,-2.55118 c -0.67277,-0.35518 -0.82843,-1.26275 -0.31658,-1.84571 0.58739,-0.669 1.7197,-0.5075 2.09287,0.29851 0.26771,0.57822 -0.0107,1.30426 -0.60329,1.57349 -0.33514,0.15225 -0.85697,0.14055 -1.173,-0.0263 z m 0.9236,-0.46915 c 0.17498,-0.0905 0.33432,-0.37543 0.33432,-0.59788 0,-0.0667 -0.0428,-0.21163 -0.0952,-0.32199 -0.19865,-0.41861 -0.80502,-0.45075 -1.04606,-0.0554 -0.36145,0.59279 0.21032,1.28384 0.80696,0.97531 z"
                                            />
                                        </g>
                                        <g id="g110" transform="translate(143.48034,-14.46692)" onClick={() => { setView("explore_campus_3d_360"); setPanoramaName("Multi%20Sport%20Court"); }}>
                                            <circle
                                                style={{
                                                    opacity: 1,
                                                    fill: "url(#radialGradient110)",
                                                    fillOpacity: 1,
                                                    fillRule: "nonzero",
                                                    strokeWidth: 0.499999,
                                                    strokeMiterlimit: 4.2,
                                                    strokeDashoffset: 0.0378709,
                                                    paintOrder: "stroke fill markers",
                                                }}
                                                id="circle110"
                                                cx={960.02625}
                                                cy={327.4295}
                                                r={13.746275}
                                            />
                                            <path
                                                id="path110"
                                                style={{
                                                    fill: "#000000",
                                                    strokeWidth: 0.999999,
                                                }}
                                                d="m 961.5701,332.73718 c -1.23406,-0.67272 -2.25372,-1.2331 -2.2659,-1.24528 -0.0122,-0.0122 0.97189,-0.62805 2.18682,-1.36861 l 2.32646,-1.33667 0.009,1.82223 0.14351,-0.007 c 0.3635,-4.4e-4 1.50525,-0.1235 2.12095,-0.22871 2.07708,-0.35491 3.6877,-1.20256 4.21837,-2.22006 0.13647,-0.26165 0.16324,-0.38208 0.16444,-0.73958 10e-4,-0.36316 -0.0241,-0.47756 -0.16938,-0.7648 -0.2097,-0.41465 -0.73749,-0.96072 -1.21114,-1.25307 -0.19506,-0.1204 -0.35466,-0.22928 -0.35466,-0.24197 0,-0.0127 0.23364,0.0976 0.51919,0.2451 1.18733,0.61323 1.8122,1.56155 1.65481,2.51136 -0.11133,0.67186 -0.56071,1.40223 -1.18826,1.93126 -1.13615,0.95778 -3.14501,1.68924 -5.1707,2.15565 l -0.70937,0.0947 -0.0308,1.86876 z m -4.50342,-0.42847 c -1.39306,-0.24011 -1.72039,-0.30452 -2.49037,-0.48999 -3.07278,-0.74017 -5.09553,-2.13492 -5.42288,-3.73926 -0.18542,-0.90877 0.31732,-1.85758 1.30084,-2.45503 0.33268,-0.20209 0.74777,-0.39801 0.74777,-0.35294 0,0.0128 -0.12421,0.10301 -0.27602,0.20043 -0.41038,0.26333 -0.95758,0.86207 -1.13402,1.24082 -0.49602,1.06473 0.1637,2.12504 1.74615,2.80645 1.32349,0.5699 2.81077,0.79633 5.23799,0.79745 l 1.27527,6.6e-4 -0.20512,2.08908 c 0,0 -0.24867,-0.008 -0.77961,-0.0976 z m -3.33961,-4.33134 c -0.40788,-0.0682 -0.94362,-0.27655 -0.91527,-0.35604 0.0129,-0.0361 0.0701,-0.24864 0.12724,-0.47235 l 0.10384,-0.40675 0.24319,0.10424 c 0.57857,0.248 1.22041,0.2808 1.63599,0.0836 0.41378,-0.19636 0.51396,-0.72615 0.20404,-1.07913 -0.21051,-0.23976 -0.45237,-0.31578 -1.00597,-0.31621 l -0.4128,-2.2e-4 v -0.44836 -0.44837 l 0.46974,-0.0256 c 0.55381,-0.0302 0.80585,-0.14131 0.93507,-0.41229 0.321,-0.67313 -0.59206,-1.04005 -1.58321,-0.63621 l -0.32074,0.13068 -0.11785,-0.42775 c -0.0648,-0.23527 -0.10596,-0.44698 -0.0914,-0.47048 0.0486,-0.0786 0.73185,-0.27668 1.1827,-0.34292 1.43284,-0.21052 2.49637,0.60059 2.19772,1.6761 -0.0786,0.28296 -0.39236,0.62626 -0.71532,0.7826 l -0.25668,0.12426 0.33147,0.13304 c 0.77327,0.31035 1.08687,1.14738 0.70807,1.88989 -0.3757,0.73643 -1.51205,1.12013 -2.71979,0.91835 z m 5.24041,-0.0144 c -0.99654,-0.25428 -1.55917,-1.10958 -1.55917,-2.37025 0,-0.48614 0.17248,-1.16229 0.41141,-1.61286 0.49283,-0.92938 1.53922,-1.51687 2.70596,-1.51924 l 0.4128,-8.8e-4 v 0.44363 0.44363 l -0.50848,0.059 c -0.87854,0.10202 -1.47474,0.48776 -1.67859,1.08605 -0.0757,0.22214 -0.0405,0.33774 0.0555,0.18239 0.0213,-0.0345 0.17018,-0.12396 0.33075,-0.19873 0.35847,-0.16691 0.95594,-0.18521 1.37586,-0.0421 0.38252,0.13033 0.77531,0.53134 0.91414,0.93328 0.34227,0.99088 -0.0944,2.05427 -1.01643,2.47504 -0.39537,0.18043 -1.00921,0.23187 -1.44376,0.12099 z m 1.06805,-1.05247 c 0.28881,-0.32324 0.34731,-0.90719 0.13248,-1.32262 -0.25979,-0.50237 -1.05164,-0.53309 -1.39276,-0.054 -0.2718,0.38171 -0.0852,1.18659 0.34121,1.47174 0.28884,0.19316 0.69948,0.15068 0.91907,-0.0951 z m 3.56039,1.05127 c -0.95673,-0.26975 -1.47988,-1.25121 -1.47596,-2.76896 0.003,-1.00614 0.26217,-1.77437 0.76379,-2.26057 0.36851,-0.35718 0.71947,-0.4928 1.27872,-0.49414 0.40752,-8.7e-4 0.50696,0.0208 0.83663,0.18309 0.73466,0.36167 1.09947,1.09882 1.15996,2.34387 0.0367,0.75649 -0.0631,1.41589 -0.28904,1.90948 -0.18971,0.4144 -0.5978,0.83921 -0.95292,0.99198 -0.3618,0.15564 -0.95524,0.19842 -1.32118,0.0952 z m 0.81806,-0.91964 c 0.37713,-0.19502 0.53516,-0.84079 0.49666,-2.02953 -0.029,-0.89419 -0.10793,-1.21147 -0.36944,-1.48443 -0.19479,-0.20331 -0.55342,-0.21984 -0.75218,-0.0347 -0.35487,0.33061 -0.52743,1.29442 -0.41381,2.31124 0.0773,0.69216 0.2225,1.05285 0.48913,1.21543 0.21467,0.13091 0.33004,0.13551 0.54964,0.022 z m 2.95325,-2.55118 c -0.67277,-0.35518 -0.82843,-1.26275 -0.31658,-1.84571 0.58739,-0.669 1.7197,-0.5075 2.09287,0.29851 0.26771,0.57822 -0.0107,1.30426 -0.60329,1.57349 -0.33514,0.15225 -0.85697,0.14055 -1.173,-0.0263 z m 0.9236,-0.46915 c 0.17498,-0.0905 0.33432,-0.37543 0.33432,-0.59788 0,-0.0667 -0.0428,-0.21163 -0.0952,-0.32199 -0.19865,-0.41861 -0.80502,-0.45075 -1.04606,-0.0554 -0.36145,0.59279 0.21032,1.28384 0.80696,0.97531 z"
                                            />
                                        </g>
                                        <g id="g111" transform="translate(245.88304,-46.357035)" onClick={() => { setView("explore_campus_3d_360"); setPanoramaName("Street%20View%2005"); }}>
                                            <circle
                                                style={{
                                                    opacity: 1,
                                                    fill: "url(#radialGradient111)",
                                                    fillOpacity: 1,
                                                    fillRule: "nonzero",
                                                    strokeWidth: 0.499999,
                                                    strokeMiterlimit: 4.2,
                                                    strokeDashoffset: 0.0378709,
                                                    paintOrder: "stroke fill markers",
                                                }}
                                                id="circle111"
                                                cx={960.02625}
                                                cy={327.4295}
                                                r={13.746275}
                                            />
                                            <path
                                                id="path111"
                                                style={{
                                                    fill: "#000000",
                                                    strokeWidth: 0.999999,
                                                }}
                                                d="m 961.5701,332.73718 c -1.23406,-0.67272 -2.25372,-1.2331 -2.2659,-1.24528 -0.0122,-0.0122 0.97189,-0.62805 2.18682,-1.36861 l 2.32646,-1.33667 0.009,1.82223 0.14351,-0.007 c 0.3635,-4.4e-4 1.50525,-0.1235 2.12095,-0.22871 2.07708,-0.35491 3.6877,-1.20256 4.21837,-2.22006 0.13647,-0.26165 0.16324,-0.38208 0.16444,-0.73958 10e-4,-0.36316 -0.0241,-0.47756 -0.16938,-0.7648 -0.2097,-0.41465 -0.73749,-0.96072 -1.21114,-1.25307 -0.19506,-0.1204 -0.35466,-0.22928 -0.35466,-0.24197 0,-0.0127 0.23364,0.0976 0.51919,0.2451 1.18733,0.61323 1.8122,1.56155 1.65481,2.51136 -0.11133,0.67186 -0.56071,1.40223 -1.18826,1.93126 -1.13615,0.95778 -3.14501,1.68924 -5.1707,2.15565 l -0.70937,0.0947 -0.0308,1.86876 z m -4.50342,-0.42847 c -1.39306,-0.24011 -1.72039,-0.30452 -2.49037,-0.48999 -3.07278,-0.74017 -5.09553,-2.13492 -5.42288,-3.73926 -0.18542,-0.90877 0.31732,-1.85758 1.30084,-2.45503 0.33268,-0.20209 0.74777,-0.39801 0.74777,-0.35294 0,0.0128 -0.12421,0.10301 -0.27602,0.20043 -0.41038,0.26333 -0.95758,0.86207 -1.13402,1.24082 -0.49602,1.06473 0.1637,2.12504 1.74615,2.80645 1.32349,0.5699 2.81077,0.79633 5.23799,0.79745 l 1.27527,6.6e-4 -0.20512,2.08908 c 0,0 -0.24867,-0.008 -0.77961,-0.0976 z m -3.33961,-4.33134 c -0.40788,-0.0682 -0.94362,-0.27655 -0.91527,-0.35604 0.0129,-0.0361 0.0701,-0.24864 0.12724,-0.47235 l 0.10384,-0.40675 0.24319,0.10424 c 0.57857,0.248 1.22041,0.2808 1.63599,0.0836 0.41378,-0.19636 0.51396,-0.72615 0.20404,-1.07913 -0.21051,-0.23976 -0.45237,-0.31578 -1.00597,-0.31621 l -0.4128,-2.2e-4 v -0.44836 -0.44837 l 0.46974,-0.0256 c 0.55381,-0.0302 0.80585,-0.14131 0.93507,-0.41229 0.321,-0.67313 -0.59206,-1.04005 -1.58321,-0.63621 l -0.32074,0.13068 -0.11785,-0.42775 c -0.0648,-0.23527 -0.10596,-0.44698 -0.0914,-0.47048 0.0486,-0.0786 0.73185,-0.27668 1.1827,-0.34292 1.43284,-0.21052 2.49637,0.60059 2.19772,1.6761 -0.0786,0.28296 -0.39236,0.62626 -0.71532,0.7826 l -0.25668,0.12426 0.33147,0.13304 c 0.77327,0.31035 1.08687,1.14738 0.70807,1.88989 -0.3757,0.73643 -1.51205,1.12013 -2.71979,0.91835 z m 5.24041,-0.0144 c -0.99654,-0.25428 -1.55917,-1.10958 -1.55917,-2.37025 0,-0.48614 0.17248,-1.16229 0.41141,-1.61286 0.49283,-0.92938 1.53922,-1.51687 2.70596,-1.51924 l 0.4128,-8.8e-4 v 0.44363 0.44363 l -0.50848,0.059 c -0.87854,0.10202 -1.47474,0.48776 -1.67859,1.08605 -0.0757,0.22214 -0.0405,0.33774 0.0555,0.18239 0.0213,-0.0345 0.17018,-0.12396 0.33075,-0.19873 0.35847,-0.16691 0.95594,-0.18521 1.37586,-0.0421 0.38252,0.13033 0.77531,0.53134 0.91414,0.93328 0.34227,0.99088 -0.0944,2.05427 -1.01643,2.47504 -0.39537,0.18043 -1.00921,0.23187 -1.44376,0.12099 z m 1.06805,-1.05247 c 0.28881,-0.32324 0.34731,-0.90719 0.13248,-1.32262 -0.25979,-0.50237 -1.05164,-0.53309 -1.39276,-0.054 -0.2718,0.38171 -0.0852,1.18659 0.34121,1.47174 0.28884,0.19316 0.69948,0.15068 0.91907,-0.0951 z m 3.56039,1.05127 c -0.95673,-0.26975 -1.47988,-1.25121 -1.47596,-2.76896 0.003,-1.00614 0.26217,-1.77437 0.76379,-2.26057 0.36851,-0.35718 0.71947,-0.4928 1.27872,-0.49414 0.40752,-8.7e-4 0.50696,0.0208 0.83663,0.18309 0.73466,0.36167 1.09947,1.09882 1.15996,2.34387 0.0367,0.75649 -0.0631,1.41589 -0.28904,1.90948 -0.18971,0.4144 -0.5978,0.83921 -0.95292,0.99198 -0.3618,0.15564 -0.95524,0.19842 -1.32118,0.0952 z m 0.81806,-0.91964 c 0.37713,-0.19502 0.53516,-0.84079 0.49666,-2.02953 -0.029,-0.89419 -0.10793,-1.21147 -0.36944,-1.48443 -0.19479,-0.20331 -0.55342,-0.21984 -0.75218,-0.0347 -0.35487,0.33061 -0.52743,1.29442 -0.41381,2.31124 0.0773,0.69216 0.2225,1.05285 0.48913,1.21543 0.21467,0.13091 0.33004,0.13551 0.54964,0.022 z m 2.95325,-2.55118 c -0.67277,-0.35518 -0.82843,-1.26275 -0.31658,-1.84571 0.58739,-0.669 1.7197,-0.5075 2.09287,0.29851 0.26771,0.57822 -0.0107,1.30426 -0.60329,1.57349 -0.33514,0.15225 -0.85697,0.14055 -1.173,-0.0263 z m 0.9236,-0.46915 c 0.17498,-0.0905 0.33432,-0.37543 0.33432,-0.59788 0,-0.0667 -0.0428,-0.21163 -0.0952,-0.32199 -0.19865,-0.41861 -0.80502,-0.45075 -1.04606,-0.0554 -0.36145,0.59279 0.21032,1.28384 0.80696,0.97531 z"
                                            />
                                        </g>
                                        <g id="g112" transform="translate(293.71821,-125.72799)" onClick={() => { setView("explore_campus_3d_360"); setPanoramaName("Street%20View%2006"); }}>
                                            <circle
                                                style={{
                                                    opacity: 1,
                                                    fill: "url(#radialGradient112)",
                                                    fillOpacity: 1,
                                                    fillRule: "nonzero",
                                                    strokeWidth: 0.499999,
                                                    strokeMiterlimit: 4.2,
                                                    strokeDashoffset: 0.0378709,
                                                    paintOrder: "stroke fill markers",
                                                }}
                                                id="circle112"
                                                cx={960.02625}
                                                cy={327.4295}
                                                r={13.746275}
                                            />
                                            <path
                                                id="path112"
                                                style={{
                                                    fill: "#000000",
                                                    strokeWidth: 0.999999,
                                                }}
                                                d="m 961.5701,332.73718 c -1.23406,-0.67272 -2.25372,-1.2331 -2.2659,-1.24528 -0.0122,-0.0122 0.97189,-0.62805 2.18682,-1.36861 l 2.32646,-1.33667 0.009,1.82223 0.14351,-0.007 c 0.3635,-4.4e-4 1.50525,-0.1235 2.12095,-0.22871 2.07708,-0.35491 3.6877,-1.20256 4.21837,-2.22006 0.13647,-0.26165 0.16324,-0.38208 0.16444,-0.73958 10e-4,-0.36316 -0.0241,-0.47756 -0.16938,-0.7648 -0.2097,-0.41465 -0.73749,-0.96072 -1.21114,-1.25307 -0.19506,-0.1204 -0.35466,-0.22928 -0.35466,-0.24197 0,-0.0127 0.23364,0.0976 0.51919,0.2451 1.18733,0.61323 1.8122,1.56155 1.65481,2.51136 -0.11133,0.67186 -0.56071,1.40223 -1.18826,1.93126 -1.13615,0.95778 -3.14501,1.68924 -5.1707,2.15565 l -0.70937,0.0947 -0.0308,1.86876 z m -4.50342,-0.42847 c -1.39306,-0.24011 -1.72039,-0.30452 -2.49037,-0.48999 -3.07278,-0.74017 -5.09553,-2.13492 -5.42288,-3.73926 -0.18542,-0.90877 0.31732,-1.85758 1.30084,-2.45503 0.33268,-0.20209 0.74777,-0.39801 0.74777,-0.35294 0,0.0128 -0.12421,0.10301 -0.27602,0.20043 -0.41038,0.26333 -0.95758,0.86207 -1.13402,1.24082 -0.49602,1.06473 0.1637,2.12504 1.74615,2.80645 1.32349,0.5699 2.81077,0.79633 5.23799,0.79745 l 1.27527,6.6e-4 -0.20512,2.08908 c 0,0 -0.24867,-0.008 -0.77961,-0.0976 z m -3.33961,-4.33134 c -0.40788,-0.0682 -0.94362,-0.27655 -0.91527,-0.35604 0.0129,-0.0361 0.0701,-0.24864 0.12724,-0.47235 l 0.10384,-0.40675 0.24319,0.10424 c 0.57857,0.248 1.22041,0.2808 1.63599,0.0836 0.41378,-0.19636 0.51396,-0.72615 0.20404,-1.07913 -0.21051,-0.23976 -0.45237,-0.31578 -1.00597,-0.31621 l -0.4128,-2.2e-4 v -0.44836 -0.44837 l 0.46974,-0.0256 c 0.55381,-0.0302 0.80585,-0.14131 0.93507,-0.41229 0.321,-0.67313 -0.59206,-1.04005 -1.58321,-0.63621 l -0.32074,0.13068 -0.11785,-0.42775 c -0.0648,-0.23527 -0.10596,-0.44698 -0.0914,-0.47048 0.0486,-0.0786 0.73185,-0.27668 1.1827,-0.34292 1.43284,-0.21052 2.49637,0.60059 2.19772,1.6761 -0.0786,0.28296 -0.39236,0.62626 -0.71532,0.7826 l -0.25668,0.12426 0.33147,0.13304 c 0.77327,0.31035 1.08687,1.14738 0.70807,1.88989 -0.3757,0.73643 -1.51205,1.12013 -2.71979,0.91835 z m 5.24041,-0.0144 c -0.99654,-0.25428 -1.55917,-1.10958 -1.55917,-2.37025 0,-0.48614 0.17248,-1.16229 0.41141,-1.61286 0.49283,-0.92938 1.53922,-1.51687 2.70596,-1.51924 l 0.4128,-8.8e-4 v 0.44363 0.44363 l -0.50848,0.059 c -0.87854,0.10202 -1.47474,0.48776 -1.67859,1.08605 -0.0757,0.22214 -0.0405,0.33774 0.0555,0.18239 0.0213,-0.0345 0.17018,-0.12396 0.33075,-0.19873 0.35847,-0.16691 0.95594,-0.18521 1.37586,-0.0421 0.38252,0.13033 0.77531,0.53134 0.91414,0.93328 0.34227,0.99088 -0.0944,2.05427 -1.01643,2.47504 -0.39537,0.18043 -1.00921,0.23187 -1.44376,0.12099 z m 1.06805,-1.05247 c 0.28881,-0.32324 0.34731,-0.90719 0.13248,-1.32262 -0.25979,-0.50237 -1.05164,-0.53309 -1.39276,-0.054 -0.2718,0.38171 -0.0852,1.18659 0.34121,1.47174 0.28884,0.19316 0.69948,0.15068 0.91907,-0.0951 z m 3.56039,1.05127 c -0.95673,-0.26975 -1.47988,-1.25121 -1.47596,-2.76896 0.003,-1.00614 0.26217,-1.77437 0.76379,-2.26057 0.36851,-0.35718 0.71947,-0.4928 1.27872,-0.49414 0.40752,-8.7e-4 0.50696,0.0208 0.83663,0.18309 0.73466,0.36167 1.09947,1.09882 1.15996,2.34387 0.0367,0.75649 -0.0631,1.41589 -0.28904,1.90948 -0.18971,0.4144 -0.5978,0.83921 -0.95292,0.99198 -0.3618,0.15564 -0.95524,0.19842 -1.32118,0.0952 z m 0.81806,-0.91964 c 0.37713,-0.19502 0.53516,-0.84079 0.49666,-2.02953 -0.029,-0.89419 -0.10793,-1.21147 -0.36944,-1.48443 -0.19479,-0.20331 -0.55342,-0.21984 -0.75218,-0.0347 -0.35487,0.33061 -0.52743,1.29442 -0.41381,2.31124 0.0773,0.69216 0.2225,1.05285 0.48913,1.21543 0.21467,0.13091 0.33004,0.13551 0.54964,0.022 z m 2.95325,-2.55118 c -0.67277,-0.35518 -0.82843,-1.26275 -0.31658,-1.84571 0.58739,-0.669 1.7197,-0.5075 2.09287,0.29851 0.26771,0.57822 -0.0107,1.30426 -0.60329,1.57349 -0.33514,0.15225 -0.85697,0.14055 -1.173,-0.0263 z m 0.9236,-0.46915 c 0.17498,-0.0905 0.33432,-0.37543 0.33432,-0.59788 0,-0.0667 -0.0428,-0.21163 -0.0952,-0.32199 -0.19865,-0.41861 -0.80502,-0.45075 -1.04606,-0.0554 -0.36145,0.59279 0.21032,1.28384 0.80696,0.97531 z"
                                            />
                                        </g>
                                        <g id="g113" transform="translate(180.33114,51.793654)" onClick={() => { setView("explore_campus_3d_360"); setPanoramaName("Street%20View%2004"); }}>
                                            <circle
                                                style={{
                                                    opacity: 1,
                                                    fill: "url(#radialGradient113)",
                                                    fillOpacity: 1,
                                                    fillRule: "nonzero",
                                                    strokeWidth: 0.499999,
                                                    strokeMiterlimit: 4.2,
                                                    strokeDashoffset: 0.0378709,
                                                    paintOrder: "stroke fill markers",
                                                }}
                                                id="circle113"
                                                cx={960.02625}
                                                cy={327.4295}
                                                r={13.746275}
                                            />
                                            <path
                                                id="path113"
                                                style={{
                                                    fill: "#000000",
                                                    strokeWidth: 0.999999,
                                                }}
                                                d="m 961.5701,332.73718 c -1.23406,-0.67272 -2.25372,-1.2331 -2.2659,-1.24528 -0.0122,-0.0122 0.97189,-0.62805 2.18682,-1.36861 l 2.32646,-1.33667 0.009,1.82223 0.14351,-0.007 c 0.3635,-4.4e-4 1.50525,-0.1235 2.12095,-0.22871 2.07708,-0.35491 3.6877,-1.20256 4.21837,-2.22006 0.13647,-0.26165 0.16324,-0.38208 0.16444,-0.73958 10e-4,-0.36316 -0.0241,-0.47756 -0.16938,-0.7648 -0.2097,-0.41465 -0.73749,-0.96072 -1.21114,-1.25307 -0.19506,-0.1204 -0.35466,-0.22928 -0.35466,-0.24197 0,-0.0127 0.23364,0.0976 0.51919,0.2451 1.18733,0.61323 1.8122,1.56155 1.65481,2.51136 -0.11133,0.67186 -0.56071,1.40223 -1.18826,1.93126 -1.13615,0.95778 -3.14501,1.68924 -5.1707,2.15565 l -0.70937,0.0947 -0.0308,1.86876 z m -4.50342,-0.42847 c -1.39306,-0.24011 -1.72039,-0.30452 -2.49037,-0.48999 -3.07278,-0.74017 -5.09553,-2.13492 -5.42288,-3.73926 -0.18542,-0.90877 0.31732,-1.85758 1.30084,-2.45503 0.33268,-0.20209 0.74777,-0.39801 0.74777,-0.35294 0,0.0128 -0.12421,0.10301 -0.27602,0.20043 -0.41038,0.26333 -0.95758,0.86207 -1.13402,1.24082 -0.49602,1.06473 0.1637,2.12504 1.74615,2.80645 1.32349,0.5699 2.81077,0.79633 5.23799,0.79745 l 1.27527,6.6e-4 -0.20512,2.08908 c 0,0 -0.24867,-0.008 -0.77961,-0.0976 z m -3.33961,-4.33134 c -0.40788,-0.0682 -0.94362,-0.27655 -0.91527,-0.35604 0.0129,-0.0361 0.0701,-0.24864 0.12724,-0.47235 l 0.10384,-0.40675 0.24319,0.10424 c 0.57857,0.248 1.22041,0.2808 1.63599,0.0836 0.41378,-0.19636 0.51396,-0.72615 0.20404,-1.07913 -0.21051,-0.23976 -0.45237,-0.31578 -1.00597,-0.31621 l -0.4128,-2.2e-4 v -0.44836 -0.44837 l 0.46974,-0.0256 c 0.55381,-0.0302 0.80585,-0.14131 0.93507,-0.41229 0.321,-0.67313 -0.59206,-1.04005 -1.58321,-0.63621 l -0.32074,0.13068 -0.11785,-0.42775 c -0.0648,-0.23527 -0.10596,-0.44698 -0.0914,-0.47048 0.0486,-0.0786 0.73185,-0.27668 1.1827,-0.34292 1.43284,-0.21052 2.49637,0.60059 2.19772,1.6761 -0.0786,0.28296 -0.39236,0.62626 -0.71532,0.7826 l -0.25668,0.12426 0.33147,0.13304 c 0.77327,0.31035 1.08687,1.14738 0.70807,1.88989 -0.3757,0.73643 -1.51205,1.12013 -2.71979,0.91835 z m 5.24041,-0.0144 c -0.99654,-0.25428 -1.55917,-1.10958 -1.55917,-2.37025 0,-0.48614 0.17248,-1.16229 0.41141,-1.61286 0.49283,-0.92938 1.53922,-1.51687 2.70596,-1.51924 l 0.4128,-8.8e-4 v 0.44363 0.44363 l -0.50848,0.059 c -0.87854,0.10202 -1.47474,0.48776 -1.67859,1.08605 -0.0757,0.22214 -0.0405,0.33774 0.0555,0.18239 0.0213,-0.0345 0.17018,-0.12396 0.33075,-0.19873 0.35847,-0.16691 0.95594,-0.18521 1.37586,-0.0421 0.38252,0.13033 0.77531,0.53134 0.91414,0.93328 0.34227,0.99088 -0.0944,2.05427 -1.01643,2.47504 -0.39537,0.18043 -1.00921,0.23187 -1.44376,0.12099 z m 1.06805,-1.05247 c 0.28881,-0.32324 0.34731,-0.90719 0.13248,-1.32262 -0.25979,-0.50237 -1.05164,-0.53309 -1.39276,-0.054 -0.2718,0.38171 -0.0852,1.18659 0.34121,1.47174 0.28884,0.19316 0.69948,0.15068 0.91907,-0.0951 z m 3.56039,1.05127 c -0.95673,-0.26975 -1.47988,-1.25121 -1.47596,-2.76896 0.003,-1.00614 0.26217,-1.77437 0.76379,-2.26057 0.36851,-0.35718 0.71947,-0.4928 1.27872,-0.49414 0.40752,-8.7e-4 0.50696,0.0208 0.83663,0.18309 0.73466,0.36167 1.09947,1.09882 1.15996,2.34387 0.0367,0.75649 -0.0631,1.41589 -0.28904,1.90948 -0.18971,0.4144 -0.5978,0.83921 -0.95292,0.99198 -0.3618,0.15564 -0.95524,0.19842 -1.32118,0.0952 z m 0.81806,-0.91964 c 0.37713,-0.19502 0.53516,-0.84079 0.49666,-2.02953 -0.029,-0.89419 -0.10793,-1.21147 -0.36944,-1.48443 -0.19479,-0.20331 -0.55342,-0.21984 -0.75218,-0.0347 -0.35487,0.33061 -0.52743,1.29442 -0.41381,2.31124 0.0773,0.69216 0.2225,1.05285 0.48913,1.21543 0.21467,0.13091 0.33004,0.13551 0.54964,0.022 z m 2.95325,-2.55118 c -0.67277,-0.35518 -0.82843,-1.26275 -0.31658,-1.84571 0.58739,-0.669 1.7197,-0.5075 2.09287,0.29851 0.26771,0.57822 -0.0107,1.30426 -0.60329,1.57349 -0.33514,0.15225 -0.85697,0.14055 -1.173,-0.0263 z m 0.9236,-0.46915 c 0.17498,-0.0905 0.33432,-0.37543 0.33432,-0.59788 0,-0.0667 -0.0428,-0.21163 -0.0952,-0.32199 -0.19865,-0.41861 -0.80502,-0.45075 -1.04606,-0.0554 -0.36145,0.59279 0.21032,1.28384 0.80696,0.97531 z"
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
                view === "explore_campus_3d_360" && <TheAugustaExplore360Campus setView={setView} view={view} selectedHouseBHK={selectedHouseBHK} panoramaName={panoramaName} />
            }
            {
                (view === "explore_360" || view === "explore_interior") &&
                (selectedHouseBHK === 3 ? <TheAugusta3BHK setView={setView} view={view} selectedHouseBHK={selectedHouseBHK} /> : <TheAugusta2BHK setView={setView} view={view} selectedHouseBHK={selectedHouseBHK} />)
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
                            <img src={HouseRender} alt="house_preview" className='villa_preview_image' />
                            <div className='d-flex justify-content-between'>
                                <span className='villa_number_text'>House: {selectedHouseNo}</span>
                                <span className='villa_number_text'>{selectedHouseBHK && selectedHouseBHK} BHK</span>
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

export default AugustaHome;