import SplashScreenTilal from "../pages/Tilal/SplashScreenTilal";
import LeftSideBarNav from "./LeftSideBarNav"

const MenuLayoutWithLoaderTilal = ({ children, splashDone, setSplashDone }) => {
    return (
        <div>
            {!splashDone &&
                <SplashScreenTilal onComplete={() => setSplashDone(true)} />
            }
            <div style={{ display: splashDone ? "block" : "none" }}>
                {/* <LeftSideBarNav /> */}
                {children}
            </div>
        </div>
    )
}

export default MenuLayoutWithLoaderTilal;