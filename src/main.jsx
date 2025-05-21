import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/css/index.css";
import AnimatedBackground from "./components/AnimatedBackground";
import App from "./pages/App";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <ParallaxBackground /> */}
    {/* <SnowEffect />    */}
    <AnimatedBackground />
    <span className="globe-bg"></span>
    <App />
  </StrictMode>
);
