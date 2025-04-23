import {
  Route,
  BrowserRouter as Router,
  Routes
} from "react-router-dom";
import Globe from "../components/Globe";
import MyGoogleMap from "../components/MyGoogleMap";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Globe />} />
          <Route path="/city/:city" element={<MyGoogleMap />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
