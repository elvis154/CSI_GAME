import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook
import "./login.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  // Check if the user is already logged in when the component mounts
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setIsAuthenticated(!!user);
      if (user) {
        navigate("/logout"); // If logged in, redirect to the logout page
      }
    });
    return unsubscribe;
  }, [navigate]);

  const handleLoginClick = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful! 🎉");
      setEmail(""); // Clear email after successful login
      setPassword(""); // Clear password after successful login
    } catch (err) {
      console.error("Login failed:", err.message);
      if (err.code === 'auth/wrong-password') {
        setError("Incorrect password. Please try again.");
      } else if (err.code === 'auth/user-not-found') {
        setError("No user found with this email.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
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
          {!isAuthenticated ? (
            <>
              <p className="win95-text">Enter your username and password</p>
              {error && <div className="win95-error">{error}</div>}
              <form onSubmit={handleLoginClick}>
                <div className="win95-input-group">
                  <label htmlFor="email">Username:</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="win95-input-group">
                  <label htmlFor="password">Password:</label>
                  <input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="win95-buttons">
                  <button type="submit" disabled={loading}>Login</button>
                  <button type="button" className="cancel" onClick={() => { setEmail(""); setPassword(""); setError(""); }}>Cancel</button>
                </div>
              </form>
              {loading && <div className="win95-loading">Logging in...</div>}
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
