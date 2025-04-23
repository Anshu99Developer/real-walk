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

// AIzaSyBdFGefj5ZQtuH1RoIX6rew90V9B_t3qyk
{
  /* <header className="flex justify-between items-center p-4 bg-transparent">
        <img src="/main-logo.png" alt="Logo" className="h-10" />
        <button
          className="px-4 py-2 bg-transparent hover:bg-golden border border-golden text-white rounded"
          onClick={() => alert("Contact Us clicked!")}
        >
          Contact Us
        </button>
      </header> */
}
