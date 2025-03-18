import React, { useContext, useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import { GameContext } from "./GameContext";

const TimeoutScreen = () => {
  const { score, handleTimeoutOk } = useContext(GameContext);
  const [effects, setEffects] = useState([]);

  useEffect(() => {
    // Create disaster effects
    const newEffects = [];

    // Create fractures (falling debris)
    for (let i = 0; i < 15; i++) {
      const size = 20 + Math.random() * 30;
      const left = Math.random() * 100;
      const delay = Math.random() * 2;

      newEffects.push({
        id: `fracture-${i}`,
        type: "fracture",
        style: {
          width: `${size}px`,
          height: `${size * 2}px`,
          left: `${left}%`,
          top: `-${size}px`,
          animationDelay: `${delay}s`,
        },
      });
    }

    // Create lightning
    for (let i = 0; i < 5; i++) {
      const size = 80 + Math.random() * 120;
      const left = Math.random() * 80;
      const delay = Math.random() * 3;

      newEffects.push({
        id: `lightning-${i}`,
        type: "lightning",
        style: {
          width: `${size}px`,
          height: `${size * 2}px`,
          left: `${left}%`,
          top: `${Math.random() * 50}%`,
          animationDelay: `${delay}s`,
        },
      });
    }

    // Create smoke particles
    for (let i = 0; i < 30; i++) {
      const size = 10 + Math.random() * 20;
      const left = 20 + Math.random() * 60;
      const bottom = Math.random() * 20;
      const delay = Math.random() * 2;

      newEffects.push({
        id: `smoke-${i}`,
        type: "smoke",
        style: {
          width: `${size}px`,
          height: `${size}px`,
          left: `${left}%`,
          bottom: `${bottom}%`,
          animationDelay: `${delay}s`,
        },
      });
    }

    setEffects(newEffects);

    // Play alarm sound
    const audio = new Audio("/alarm-sound.mp3");
    audio.volume = 0.3;
    audio.play().catch((e) => {});

    // Create periodic rumble effect
    const rumbleInterval = setInterval(() => {
      const intensity = Math.random() * 3 + 1;
      document.body.style.transform = `translate(${
        Math.random() * intensity - intensity / 2
      }px, ${Math.random() * intensity - intensity / 2}px)`;
    }, 50);

    return () => {
      clearInterval(rumbleInterval);
      document.body.style.transform = "";
    };
  }, []);

  return (
    <div className="win95-timeout-overlay">
      {/* Disaster effects */}
      {effects.map((effect) => (
        <div key={effect.id} className={effect.type} style={effect.style} />
      ))}

      {/* Timeout Dialog */}
      <div className="win95-timeout-dialog">
        <div className="win95-title-bar">
          <span>Time's Up!</span>
          <span>✕</span>
        </div>
        <div className="win95-timeout-content">
          <div className="win95-hourglass-icon">⌛</div>
          <p>Your time has run out.</p>
          <p className="win95-score-display">Final Score: {score}</p>
          <div className="win95-button-group">
            <button
              className="win95-button"
              onClick={() => {
                // Sign out the user first
                signOut(auth)
                  .then(() => {
                    // Then redirect to login page
                    window.location.href = "/";
                  })
                  .catch((error) => {
                    console.error("Sign out error:", error);
                    // Still redirect even if there's an error
                    window.location.href = "/";
                  });
              }}
            >
              Return to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeoutScreen;
