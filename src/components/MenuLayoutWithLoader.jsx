import SplashScreen from "../pages/SplashScreen";
import LeftSideBarNav from "./LeftSideBarNav"

const MenuLayoutWithLoader = ({ children, splashDone, setSplashDone }) => {
    return (
        <div>
            {!splashDone &&
                <SplashScreen onComplete={() => setSplashDone(true)} />
            }
            <div style={{ opacity: splashDone ? "1" : "0" }}>
                <LeftSideBarNav />
                {children}

            </div>
        </div>
    )
}

export default MenuLayoutWithLoader;