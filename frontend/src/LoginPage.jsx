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
          alert("Login successful! 🎉");
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
    <div className="win95-container">
      <div className="win95-box">
        <div className="win95-titlebar">
          <span>Login - Windows 95</span>
        </div>
        <div className="win95-content">
          <p className="win95-text">Enter your password</p>
          {error && <div className="win95-error">{error}</div>}
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
              />
            </div>
            <div className="win95-buttons">
              <button type="submit" disabled={loading}>Login</button>
              <button type="button" className="cancel" onClick={() => { setPassword(""); setError(""); }}>Cancel</button>
            </div>
          </form>
          {loading && <div className="win95-loading">Logging in...</div>}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
