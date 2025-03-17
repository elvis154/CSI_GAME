import React, { useContext, useEffect, useState } from "react";
import { GameContext } from "./GameContext";

const SuccessScreen = () => {
  const { score, handleSuccessOk } = useContext(GameContext);
  const [fireworks, setFireworks] = useState([]);
  const [confetti, setConfetti] = useState([]);
  
  // Function to create a firework explosion particles
  const createExplosion = (x, y, color) => {
    const particles = [];
    const particleCount = 30 + Math.floor(Math.random() * 20);
    
    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2;
      const distance = 50 + Math.random() * 80;
      const xMove = Math.cos(angle) * distance;
      const yMove = Math.sin(angle) * distance;
      
      particles.push({
        id: `particle-${x}-${y}-${i}`,
        style: {
          backgroundColor: color,
          left: x,
          top: y,
          '--x': `${xMove}px`,
          '--y': `${yMove}px`,
          animation: `explode 1s ease-out forwards`,
          animationDelay: `${Math.random() * 0.2}s`
        }
      });
    }
    
    return particles;
  };
  
  // Launch new fireworks periodically
  useEffect(() => {
    const colors = ['#FF5252', '#FFEB3B', '#2196F3', '#4CAF50', '#9C27B0', '#FF9800', '#FF4081', '#7C4DFF'];
    const newConfetti = [];
    let allParticles = [];
    
    // Generate initial confetti
    for (let i = 0; i < 50; i++) {
      const delay = Math.random() * 3;
      const colorIndex = Math.floor(Math.random() * colors.length);
      const left = Math.random() * 100;
      
      newConfetti.push({
        id: `confetti-${i}`,
        style: {
          left: `${left}%`,
          '--confetti-color': colors[colorIndex],
          animationDelay: `${delay}s`,
          animationDuration: `${2 + Math.random() * 3}s`
        }
      });
    }
    
    setConfetti(newConfetti);
    
    // Function to launch fireworks
    const launchFirework = () => {
      const x = 50 + Math.random() * (window.innerWidth - 100);
      const y = 50 + Math.random() * (window.innerHeight - 300);
      const colorIndex = Math.floor(Math.random() * colors.length);
      const color = colors[colorIndex];
      
      // Create explosion particles
      const explosionParticles = createExplosion(x, y, color);
      allParticles = [...allParticles, ...explosionParticles];
      setFireworks([...allParticles]);
      
      // Play explosion sound
      const audio = new Audio("/explosion-sound.mp3");
      audio.volume = 0.2;
      audio.play().catch(e => {});
    };
    
    // Launch initial fireworks
    for (let i = 0; i < 3; i++) {
      setTimeout(() => launchFirework(), i * 300);
    }
    
    // Continue launching fireworks
    const interval = setInterval(() => {
      launchFirework();
    }, 800);
    
    // Cleanup
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="win95-success-overlay">
      {/* Firework particles */}
      {fireworks.map(particle => (
        <div
          key={particle.id}
          className="firework-explosion"
          style={particle.style}
        />
      ))}
      
      {/* Confetti */}
      {confetti.map(piece => (
        <div
          key={piece.id}
          className="confetti"
          style={piece.style}
        />
      ))}
      
      {/* Success Dialog */}
      <div className="win95-success-dialog">
        <div className="win95-title-bar">
          <div className="win95-title">Success!</div>
        </div>
        <div className="win95-success-content">
          <div className="win95-trophy-icon">🏆</div>
          <h2>Congratulations!</h2>
          <p>You have successfully completed the website layout!</p>
          <p className="win95-score-display">Final Score: {score}</p>
          <button className="win95-button" onClick={handleSuccessOk}>
            Play Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessScreen;