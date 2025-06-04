import React, { useEffect, useState } from "react";
import Background from '../assets/Projects/images/SpleshScreen/TirupatiNamaah/background.jpg';
import DesktopBackground from '../assets/Projects/images/SpleshScreen/TirupatiNamaah/DesktopBackground.jpg';
import Presenting from '../assets/Projects/images/SpleshScreen/TirupatiNamaah/Presenting.png';
import GroupLogo from '../assets/Projects/images/SpleshScreen/TirupatiNamaah/GroupLogo.png';
import TagLine from '../assets/Projects/images/SpleshScreen/TirupatiNamaah/TagLine.png';
import ProjectLogo from '../assets/Projects/images/SpleshScreen/TirupatiNamaah/ProjectLogo.png';
// import SiLogo from '../assets/images/SI-logo.png';
import '../assets/Projects/css/SplashScreen.css'

const SplashScreen = ({ onComplete }) => {

    const [backgroundImage, setBackgroundImage] = useState("");
    useEffect(() => {
        if (window.innerWidth <= 767) {
            setBackgroundImage(Background);
        } else {
            setBackgroundImage(DesktopBackground);
        }
    }, [])

    return (
        <div className="splesh-screen-container">
            <div className="background-image-container">
                <img src={backgroundImage} alt="background" className="background-image" />
            </div>
            <div className="splesh-screen-absolute-container">
                <div className="black-overlay"></div>
                <div className="splesh-screen-right-container">
                    <img src={Presenting} alt="Presenting" className="presenting-image" />
                    <img src={ProjectLogo} alt="ProjectLogo" className="projectlogo-image" />
                    <img src={TagLine} alt="TagLine" className="tagLine-image" />
                    <img src={GroupLogo} alt="GroupLogo" className="groupLogo-image" />
                    {/* <img src={SiLogo} alt="SiLogo" className="silogo-image" /> */}
                    <div className="explore-real-walk silogo-image">
                        <button onClick={onComplete}>Explore Real Walk </button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default SplashScreen;