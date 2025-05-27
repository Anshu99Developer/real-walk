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
import { baseUrl } from "../utils/helper";

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
          <MenuLayout>
            <Home data={developerData?.home} />
          </MenuLayout>
        }
      />
      <Route
        path="/day-night"
        element={
          <MenuLayout>
            <DayNight data={developerData?.day_night} />
          </MenuLayout>
        }
      />
      <Route
        path="/360-tour"
        element={
          <MenuLayout>
            <Tour360 data={developerData?.tour360} />
          </MenuLayout>
        }
      />
      <Route
        path="/views"
        element={
          <MenuLayout>
            <Views data={developerData?.droneViews} />
          </MenuLayout>
        }
      />
      <Route
        path="/highlights"
        element={
          <MenuLayout>
            <Highlights data={developerData?.highlight} />
          </MenuLayout>
        }
      />
      <Route
        path="/amenities"
        element={
          <MenuLayout>
            <Amenities data={developerData?.amenities} />
          </MenuLayout>
        }
      />
      <Route
        path="/location"
        element={
          <MenuLayout>
            <Location data={developerData?.location} />
          </MenuLayout>
        }
      />
      <Route
        path="/floorplans"
        element={
          <MenuLayout>
            <FloorPlans data={developerData?.floorPlans} />
          </MenuLayout>
        }
      />
      <Route
        path="/inventory"
        element={
          <MenuLayout>
            <Inventory data={developerData?.inventory} />
          </MenuLayout>
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Globe />} />
          <Route path="/city/:city" element={<MyGoogleMap />} />
          <Route path="/developers/:developer/*" element={<DeveloperRoutes />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
