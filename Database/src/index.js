import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage"; 
import "./index.css";  // Updated styles for Windows 95 theme

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<React.StrictMode>
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/App" element={<App />} />
            {/* <Route path="/logout" element={<LogoutPage/>} /> */}
            {/* <Route path="/leaderboard" element={}></> */}
        </Routes>
    </BrowserRouter>
</React.StrictMode>);