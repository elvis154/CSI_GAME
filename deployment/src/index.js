import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Import BrowserRouter and Routes

import LoginPage from "./LoginPage"; // Import LoginPage
import ErrorPage from "./ErrorPage"; // Import ErrorPage (this is for the error page)
import GraphComparison from "./GraphComparison";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />       
        <Route path="/deployment" element={<GraphComparison/>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
