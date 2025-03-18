import React, { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase"; // Ensure Firestore is initialized
import { useNavigate } from "react-router-dom";
import "./login.css";

const LoginPage = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [startupComplete, setStartupComplete] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }));

  useEffect(() => {
    // Simulate Windows 95 startup sequence
    setTimeout(() => {
      setStartupComplete(true);
    }, 4000);
  }, []);


  const handleLoginClick = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Fetch the stored password from Firestore (Collection: password, Document: password, Field: password)
      const docRef = doc(db, "password", "password");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const storedPassword = docSnap.data().password; // Retrieve the password field

        if (password === storedPassword) {
          // alert("Login successful! 🎉");
          setPassword(""); // Clear password field after successful login
          navigate("/Win1");
        } else {
          setError("Incorrect password. Please try again.");
        }
      } else {
        setError("Password document not found.");
      }
    } catch (err) {
      console.error("Error fetching password:", err.message);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="desktop-background">
      {!startupComplete ? (
        <div className="startup-screen">
          <div className="win95-logos">
            <div className="win-flags"></div>
            <span className="win-texts">Windows 95</span>
          </div>
          <div className="startup-progress">
            <div className="progress-bar"></div>
          </div>
        </div>
      ) : (
        <div className={`win95-container ${startupComplete ? 'fade-in' : ''}`}>
          <div className="win95-box">
            <div className="win95-titlebar">
              <div className="titlebar-left">
                <img src="/windows.png" alt="Win95" className="win95-icon" />
                <span>Ghost Protocol - CSI </span>
              </div>
              <div className="titlebar-buttons">
                <button className="titlebar-btn minimize-btn">--</button>
                <button className="titlebar-btn close-btn">X</button>
              </div>
            </div>
            <div className="win95-content">
              <div className="login-header">
                <div className="login-icon-container">
                  <img src="/padlock.png" alt="Login" className="login-icon pulse" />
                </div>
                <h2 className="welcome-text">Welcome to Ghost Protocol Level 2</h2>
              </div>
              <div className="user-profile">
                <div className="user-avatar">
                  <img src="/csi-logo.png" alt="User" className="avatar-img" />
                </div>
                <p className="user-name">User</p>
              </div>
              <p className="win95-text">Please enter your password to continue</p>
              {error && <div className="win95-error shake">{error}</div>}
              <form onSubmit={handleLoginClick}>
                <div className="win95-input-group">
                  <label htmlFor="password">Password:</label>
                  <input
                    id="password"
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="win95-input"
                  />
                </div>
                <div className="win95-buttons">
                  <button type="submit" disabled={loading} className="win95-button primary hover-effect">
                    {loading ? 'Processing...' : 'OK'}
                  </button>
                  <button 
                    type="button" 
                    className="win95-button cancel hover-effect" 
                    onClick={() => { setPassword(""); setError(""); }}>
                    Cancel
                  </button>
                </div>
              </form>
              {loading && (
                <div className="win95-loading">
                  <div className="hourglass-animation"></div>
                  <span>Verifying password...</span>
                </div>
              )}
              <div className="win95-tips">
                <p>Tip: Time is running up, HURRY !!!!</p>
              </div>
            </div>
            <div className="win95-statusbar"> 
              <span className="status-message">Press OK to LOG IN</span>
              <span className="status-time">{currentTime}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;