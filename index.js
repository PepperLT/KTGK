import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import BMICalculator from "./BMICalcutor";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BMICalculator />
  </React.StrictMode>
);

reportWebVitals();
