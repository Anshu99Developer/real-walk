import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/css/index.css";
import ParallaxBackground from "./components/ParallaxBackground";
import App from "./pages/App";
import SnowEffect from "./components/SnowEffect";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <ParallaxBackground /> */}
    <SnowEffect />   
    <App />
  </StrictMode>
);
