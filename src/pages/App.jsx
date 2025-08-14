import { useState, useEffect } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
  useParams,
} from "react-router-dom";
import Globe from "../components/Globe";
import MenuLayout from "../components/MenuLayout";
import MyGoogleMap from "../components/MyGoogleMap";
import DayNight from "./DayNight";
import Highlights from "./Highlights";
import Home from "./Home";
import Tour360 from "./Tour360";
import Views from "./Views";
import Amenities from "./Amenities";
import FloorPlans from "./FloorPlans";
import Inventory from "./Inventory";
import Loader from "../components/ui/Loader";
import Location from "./Location";
import { baseUrl, baseUrlAWS } from "../utils/helper";

// ProjectsData
import 'bootstrap/dist/css/bootstrap.min.css';
import TilalHome from './Tilal/TilalHome';
import TilalHomeV2 from './Tilal/TilalHomeV2';
import MenuLayoutWithLoaderTilal from '../components/MenuLayoutWithLoaderTilal';
import LotusHome from './Lotus/LotusHome';
import TheAugusta2BHK from './The_Augusta/TheAugusta2BHK';
import TheAugusta3BHK from './The_Augusta/TheAugusta3BHK';
import TheAugusta3BHKCOP from './The_Augusta/TheAugusta3BHKCOP';
import AugustaHome from './The_Augusta/AugustaHome';
import GamaraOuter360 from './Gamara/GamaraOuter360';
import GamaraOuter360High from './Gamara/GamaraOuter360High';
import GamaraOuter360NightHigh from './Gamara/GamaraOuter360NightHigh';
import GamaraOuter360NightLow from './Gamara/GamaraOuter360NightLow';
import MarinaBay3BHK from './MarinaBay/MarinaBay3BHK';
import MarinaBay4BHK from './MarinaBay/MarinaBay4BHK';
import MenuLayoutWithLoader from "../components/MenuLayoutWithLoader";
import Apartment from "./Apartment";
import TirupatiMenuLayout from "../components/TirupatiMenuLayout";


function DeveloperRoutes() {
  const [developerData, setDeveloperData] = useState(null);
  const [loading, setLoading] = useState(true); // loader state
  const [routeLoading, setRouteLoading] = useState(false);
  const location = useLocation(); // detect route changes

  const param = useParams();

  const getData = async (developer) => {
    try {
      setLoading(true);
      const response = await fetch(`${baseUrl}/${developer}.json`);
      const data = await response.json();
      setDeveloperData(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // end loading
    }
  };

  useEffect(() => {
    if (param.developer) {
      getData(param.developer);
    }
  }, [param.developer]);

  if (loading || !developerData) {
    return <Loader />;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="relative z-50">
            <MenuLayout>
              <Home data={developerData?.home} />
            </MenuLayout>
          </div>
        }
      />
      <Route
        path="/day-night"
        element={
          <div className="relative z-50">
            <MenuLayout>
              <DayNight data={developerData?.day_night} />
            </MenuLayout>
          </div>
        }
      />
      <Route
        path="/360-tour"
        element={
          <div className="relative z-50">
            <MenuLayout>
              <Tour360 data={developerData?.tour360} />
            </MenuLayout>
          </div>
        }
      />
      <Route
        path="/views"
        element={
          <div className="relative z-50">
            <MenuLayout>
              <Views data={developerData?.droneViews} />
            </MenuLayout>
          </div>
        }
      />
      <Route
        path="/highlights"
        element={
          <div className="relative z-50">
            <MenuLayout>
              <Highlights data={developerData?.highlight} />
            </MenuLayout>
          </div>
        }
      />
      <Route
        path="/amenities"
        element={
          <div className="relative z-50">
            <MenuLayout>
              <Amenities data={developerData?.amenities} />
            </MenuLayout>
          </div>
        }
      />
      <Route
        path="/location"
        element={
          <div className="relative z-50">
            <MenuLayout>
              <Location data={developerData?.location} />
            </MenuLayout>
          </div>
        }
      />
      <Route
        path="/floorplans"
        element={
          <div className="relative z-50">
            <MenuLayout>
              <FloorPlans data={developerData?.floorPlans} />
            </MenuLayout>
          </div>
        }
      />
      <Route
        path="/inventory"
        element={
          <div className="relative z-50">
            <MenuLayout>
              <Inventory data={developerData?.inventory} />
            </MenuLayout>
          </div>
        }
      />
    </Routes>
  );
}

function TirupatiDeveloperRoutes() {
  const [developerData, setDeveloperData] = useState(null);
  const [loading, setLoading] = useState(true); // loader state
  const [routeLoading, setRouteLoading] = useState(false);
  const location = useLocation(); // detect route changes

  const param = useParams();

  const getData = async (developer) => {
    try {
      setLoading(true);
      const response = await fetch(`${baseUrlAWS}/JSON/tirupati-namaah.json`);
      const data = await response.json();
      setDeveloperData(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // end loading
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading || !developerData) {
    return <Loader />;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="relative z-50">
            <TirupatiMenuLayout>
              <Home data={developerData?.home} />
            </TirupatiMenuLayout>
          </div>
        }
      />
      <Route
        path="/day-night"
        element={
          <div className="relative z-50">
            <TirupatiMenuLayout>
              <DayNight data={developerData?.day_night} />
            </TirupatiMenuLayout>
          </div>
        }
      />
      <Route
        path="/360-tour"
        element={
          <div className="relative z-50">
            <TirupatiMenuLayout>
              <Tour360 data={developerData?.tour360} />
            </TirupatiMenuLayout>
          </div>
        }
      />
      <Route
        path="/views"
        element={
          <div className="relative z-50">
            <TirupatiMenuLayout>
              <Views data={developerData?.droneViews} />
            </TirupatiMenuLayout>
          </div>
        }
      />
      <Route
        path="/highlights"
        element={
          <div className="relative z-50">
            <TirupatiMenuLayout>
              <Highlights data={developerData?.highlight} />
            </TirupatiMenuLayout>
          </div>
        }
      />
      <Route
        path="/amenities"
        element={
          <div className="relative z-50">
            <TirupatiMenuLayout>
              <Amenities data={developerData?.amenities} />
            </TirupatiMenuLayout>
          </div>
        }
      />
      <Route
        path="/location"
        element={
          <div className="relative z-50">
            <TirupatiMenuLayout>
              <Location data={developerData?.location} />
            </TirupatiMenuLayout>
          </div>
        }
      />
      <Route
        path="/floorplans"
        element={
          <div className="relative z-50">
            <TirupatiMenuLayout>
              <FloorPlans data={developerData?.floorPlans} />
            </TirupatiMenuLayout>
          </div>
        }
      />
      <Route
        path="/inventory"
        element={
          <div className="relative z-50">
            <TirupatiMenuLayout>
              <Inventory data={developerData?.inventory} />
            </TirupatiMenuLayout>
          </div>
        }
      />
    </Routes>
  );
}
function App() {
  const [splashDone, setSplashDone] = useState(false); // for loading screen layout
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Globe />} />
          <Route path="/city/:city" element={<MyGoogleMap />} />
          <Route path="/developers/:developer/*" element={<DeveloperRoutes />} />

          <Route path="/tirupati-namaah/*" element={<TirupatiDeveloperRoutes />} />


          {/* ProjectData */}
          <Route path="/tilal/v1" element={<TilalHome />} />
          <Route path="/tilal/" element={<MenuLayoutWithLoaderTilal splashDone={splashDone} setSplashDone={setSplashDone}> <TilalHomeV2 /></MenuLayoutWithLoaderTilal>} />

          <Route path="/lotus" element={<LotusHome />} />

          <Route path="/the_augusta/2bhk" element={<TheAugusta2BHK />} />
          <Route path="/the_augusta/3bhk" element={<TheAugusta3BHK />} />
          <Route path="/the_augusta/cop" element={<TheAugusta3BHKCOP />} />
          <Route path="/the_augusta/v1" element={<AugustaHome />} />

          <Route path="/gamara" element={<GamaraOuter360 />} />
          <Route path="/gamara-high" element={<GamaraOuter360High />} />
          <Route path="/gamara-night" element={<GamaraOuter360NightLow />} />
          <Route path="/gamara-night-high" element={<GamaraOuter360NightHigh />} />

          <Route path="/marina-bay/3bhk" element={<MarinaBay3BHK />} />
          <Route path="/marina-bay/4bhk" element={<MarinaBay4BHK />} />


        </Routes>
      </Router>
    </>
  );
}

export default App;
