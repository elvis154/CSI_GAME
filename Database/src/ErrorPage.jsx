import React from "react";
import { useNavigate } from "react-router-dom";
import "./error.css";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="error-container">
      <div className="error-box">
        <h2 className="error-title">Error</h2>
        <p className="error-message">
          This program has performed an illegal operation and will be shut down.
        </p>
        <button className="error-button" onClick={() => navigate("/")}>
          OK
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
