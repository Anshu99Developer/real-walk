import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/css/index.css";
import AnimatedBackground from "./components/AnimatedBackground";
import ParallaxBackground from "./components/ParallaxBackground";
import App from "./pages/App";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ParallaxBackground s />
    {/* <SnowEffect />    */}
    <AnimatedBackground />
    <span className="globe-bg"></span>
    <div className="relative z-50">
      <App />
    </div>
  </StrictMode>
);
