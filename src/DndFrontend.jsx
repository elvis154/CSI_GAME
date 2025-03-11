import React, { useState, useEffect, useContext } from 'react';
import { GameProvider, GameContext } from './GameContext';
import DraggableComponent from './DraggableComponent';
import DropZone from './DropZone';
import './dnd.css';

// Reference Window Component
const ReferenceWindow = ({ onClose, levelData }) => {
  const [position, setPosition] = useState({ x: window.innerWidth - 420, y: 20 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    if (e.target.classList.contains('win95-title-bar')) {
      setIsDragging(true);
      setDragOffset({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div 
      className="win95-window reference-window" 
      style={{ 
        position: 'absolute', 
        top: position.y, 
        left: position.x, 
        width: '400px',
        zIndex: 1000 
      }}
    >
      <div 
        className="win95-title-bar"
        onMouseDown={handleMouseDown}
      >
        <div className="win95-title">Reference Design</div>
        <button className="win95-close-btn" onClick={onClose}>×</button>
      </div>
      <div className="win95-window-content">
        <p>This is what you need to create:</p>
        <div className="reference-design">
          {/* Sample reference UI based on level */}
          <div className="ref-header">Example Windows 95 Layout</div>
          <div className="ref-content">
            {levelData?.referenceComponents?.map((ref, index) => (
              <div key={index} className={`ref-component ref-${ref.type}`}>
                {ref.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Error Dialog Component
const ErrorDialog = ({ message, onClose }) => {
  return (
    <div className="win95-error-dialog">
      <div className="win95-title-bar">
        <div className="win95-title">Error</div>
        <button className="win95-close-btn" onClick={onClose}>×</button>
      </div>
      <div className="win95-dialog-content">
        <div className="win95-error-icon">!</div>
        <div className="win95-error-message">{message}</div>
        <button className="win95-button" onClick={onClose}>OK</button>
      </div>
    </div>
  );
};

// Main Terminal Component - Game Container
const GameContainer = () => {
  const { 
    score, 
    level, 
    timer, 
    isCursorSlow, 
    isScreenFrozen,
    components,
    checkPlacement,
    handleComponentDrop
  } = useContext(GameContext);
  
  const [showReference, setShowReference] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  
  // Format timer as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
    
  // Level data with reference components
  const levelData = {
    referenceComponents: [
      { type: 'button', label: 'OK' },
      { type: 'button', label: 'Cancel' },
      { type: 'checkbox', label: 'Remember me' },
      { type: 'textinput', label: 'Username' },
      { type: 'textinput', label: 'Password' }
    ]
  };
  
  // Handle component drop and check placement
  const handleDrop = (component, zoneId) => {
    const isCorrect = checkPlacement(component.id, zoneId);
    handleComponentDrop(component, zoneId, isCorrect);
    
    if (!isCorrect) {
      setErrorMessage("Incorrect placement! Try again.");
      setTimeout(() => setErrorMessage(null), 3000);
    }
  };
  
  return (
    <div className={`game-container ${isCursorSlow ? 'slow-cursor' : ''} ${isScreenFrozen ? 'screen-frozen' : ''}`}>
      {/* Game header with score and timer */}
      <div className="game-header">
        <div className="game-stats">
          <div className="game-level">Level: {level}</div>
          <div className="game-score">Score: {score}</div>
          <div className="game-timer">Time: {formatTime(timer)}</div>
        </div>
        <button 
          className="win95-button reference-btn"
          onClick={() => setShowReference(!showReference)}
        >
          {showReference ? 'Hide Reference' : 'Show Reference'}
        </button>
      </div>
      
      <div className="game-content">
        {/* Sidebar with components */}
        <div className="components-sidebar">
          <div className="sidebar-title">Components</div>
          <div className="components-list">
            {components.map(comp => (
              <DraggableComponent
                key={comp.id}
                id={comp.id}
                type={comp.type}
                label={comp.label}
                icon={comp.icon}
              />
            ))}
          </div>
        </div>
        
        {/* Main drop area */}
        <div className="drop-areas">
          <DropZone 
            id="form-inputs" 
            label="Form Inputs" 
            onComponentDrop={handleDrop}
            checkCorrectPlacement={checkPlacement}
          />
          <DropZone 
            id="form-options" 
            label="Form Options" 
            onComponentDrop={handleDrop}
            checkCorrectPlacement={checkPlacement}
          />
          <DropZone 
            id="form-buttons" 
            label="Form Buttons" 
            onComponentDrop={handleDrop}
            checkCorrectPlacement={checkPlacement}
          />
        </div>
      </div>
      
      {/* Reference window */}
      {showReference && (
        <ReferenceWindow 
          onClose={() => setShowReference(false)} 
          levelData={levelData}
        />
      )}
      
      {/* Error dialog */}
      {errorMessage && (
        <ErrorDialog
          message={errorMessage}
          onClose={() => setErrorMessage(null)}
        />
      )}
      
      {/* Windows 95 taskbar */}
      <div className="win95-taskbar">
        <button className="win95-start-button">
          <span className="win95-logo">W</span>
          Start
        </button>
        <div className="win95-clock">{new Date().toLocaleTimeString()}</div>
      </div>
    </div>
  );
};

// Wrapper Component with Provider
const Win95Terminal = () => {
  return (
    <GameProvider>
      <div className="win95-terminal">
        <GameContainer />
      </div>
    </GameProvider>
  );
};

export default Win95Terminal;