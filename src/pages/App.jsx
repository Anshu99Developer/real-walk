import {
  Route,
  BrowserRouter as Router,
  Routes
} from "react-router-dom";
import Globe from "../components/Globe";
import MyGoogleMap from "../components/MyGoogleMap";
import Home from "./Home";
import MenuLayout from "../components/MenuLayout";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Globe />} />
          <Route path="/city/:city" element={<MyGoogleMap />} />
          {/* <Route path="/:developer" element={<Developer />} /> */}
          <Route path="/:developer" element={<MenuLayout> <Home /></MenuLayout>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
