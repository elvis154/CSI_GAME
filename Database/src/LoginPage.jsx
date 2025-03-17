import React from "react";
import { useNavigate } from "react-router-dom";
import "@fontsource/press-start-2p";
import "./login.css";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    // Redirect to ErrorPage when login is clicked
    navigate("/error");
  };

  return (
    <div className="container">
      <div className="login-box">
        <h2 className="title">Login</h2>
        <div className="input-group">
          <label>Username</label>
          <input type="text" className="input" />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input type="password" className="input" />
        </div>
        <button className="login-button" onClick={handleLoginClick}>
          Login
        </button>
      </div>
      <footer className="footer">Windows 95 Edition | Retro Login</footer>
    </div>
  );
};

export default LoginPage;
