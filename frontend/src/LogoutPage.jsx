import React, { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "./login.css";

const LogoutPage = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Hook for navigation

  const handleLogoutClick = async () => {
    try {
      await signOut(auth); // Log the user out
      alert("Logout successful! 👋");
      navigate("/"); // Redirect to the login page after logout
    } catch (err) {
      console.error("Logout failed:", err.message);
      setError("An error occurred during logout. Please try again.");
    }
  };

  return (
    <div className="win95-container">
      <div className="win95-box">
        <div className="win95-titlebar">
          <span>Logout - Windows 95</span>
        </div>
        <div className="win95-content">
          {error && <div className="win95-error">{error}</div>}
          <p className="win95-text">You are logged in!</p>
          <div className="win95-buttons">
            <button type="button" onClick={handleLogoutClick}>Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutPage;
