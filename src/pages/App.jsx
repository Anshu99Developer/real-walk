import { useState, useEffect } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
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

function DeveloperRoutes() {
  const [developerData, setDeveloperData] = useState({});
  const param = useParams();

  const getData = async (developer) => {
    try {
      const response = await fetch(`/data/${developer}.json`);
      const data = await response.json();
      setDeveloperData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (param.developer) {
      getData(param.developer);
    }
  }, [param.developer]);

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
            <Views data={developerData?.views} />
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
        path="/floorplans"
        element={
          <MenuLayout>
            <FloorPlans data={developerData?.floorPlans} />
          </MenuLayout>
        }
      />
      <Route path="/inventory" element={<MenuLayout><Inventory /></MenuLayout>} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Globe />} />
        <Route path="/city/:city" element={<MyGoogleMap />} />
        <Route path="/:developer/*" element={<DeveloperRoutes />} />
      </Routes>
    </Router>
  );
}

export default App;
