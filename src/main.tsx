// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import SoundTestScreen from "./components/SoundTestScreen";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SoundTestScreen />
  </React.StrictMode>
);
