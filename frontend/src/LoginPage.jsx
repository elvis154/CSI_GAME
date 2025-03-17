import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";
import "./login.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Sign out any existing user when the login page loads
  useEffect(() => {
    // First sign out any existing user
    signOut(auth).then(() => {
      console.log("User signed out on login page load");
    }).catch(error => {
      console.error("Error signing out:", error);
    });
    
    // Then set up the auth state listener
    const unsubscribe = auth.onAuthStateChanged(user => {
      // We don't need to do anything here now - we've already signed out
    });
    
    return unsubscribe;
  }, []);

  const handleLoginClick = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful! 🎉");
      setEmail(""); // Clear email after successful login
      setPassword(""); // Clear password after successful login
      navigate("/Win1");
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
        </div>
      </div>
    </div>
  );
};

export default LoginPage;