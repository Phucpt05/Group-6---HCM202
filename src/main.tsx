import React from "react";
import ReactDOM from "react-dom/client";
import HoChiMinhStateSlides from "./HoChiMinhStateSlides";
import "./styles/global.css";
import "./styles/learning.css";
import "./styles/review.css";
import "./styles/chat.css";
import "./styles/source-modal.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HoChiMinhStateSlides />
  </React.StrictMode>
);
