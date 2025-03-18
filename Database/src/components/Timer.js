import React, { useEffect, useState } from "react";
import clockIcon from "../assets/clock-icon.png"; // Ensure this file exists in `assets` folder
import "./Timer.css";

const Timer = ({ onTimeUpdate, stopTimer }) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (stopTimer) return; // Stop timer if gameFinished is true

    const interval = setInterval(() => {
      setSeconds((prev) => {
        const newSeconds = prev + 1;
        onTimeUpdate(Math.floor(newSeconds / 60));
        return newSeconds;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [stopTimer, onTimeUpdate]); // Removed `seconds` from dependency to avoid re-triggering

  return (
    <div className="timer-box">
      <img src={clockIcon} alt="Clock" className="clock-icon" />
      <span className="timer-text">Time Elapsed:</span>
      <span className="timer-time">
        {String(Math.floor(seconds / 60)).padStart(2, "0")}:
        {String(seconds % 60).padStart(2, "0")}
      </span>
    </div>
  );
};

export default Timer;
