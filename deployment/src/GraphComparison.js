// GraphComparison.jsx
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid"; // Import UUID library for unique ids
import "./GraphComparison.css";
import { useNavigate } from "react-router-dom";

const GraphComparison = () => {
  // Existing states
  const [components, setComponents] = useState([]);
  const [connections, setConnections] = useState([]);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [isCorrectGraph, setIsCorrectGraph] = useState(null);
  const [showPopup, setShowPopup] = useState(false); // <-- NEW: Controls pop-up visibility
  const [showFailPopup, setShowFailPopup] = useState(false); // Fail popup
  // New states for timer and score
  const [timeLeft, setTimeLeft] = useState(180);
  const [score, setScore] = useState(100);

  const referenceGraph = [
    { from: "Frontend", to: "Backend" },
    { from: "Backend", to: "Database" },
    { from: "Backend", to: "API Gateway" },
    { from: "Database", to: "Storage" },
    { from: "API Gateway", to: "Network" },
    { from: "Frontend", to: "Cache" },
    { from: "Backend", to: "Load Balancer" },
    { from: "API Gateway", to: "Monitoring" },
  ];

  const navigate = useNavigate();

  const referenceComponents = [
    { type: "Frontend", x: 50, y: 50 },
    { type: "Backend", x: 200, y: 80 },
    { type: "Database", x: 350, y: 50 },
    { type: "API Gateway", x: 200, y: 175 },
    { type: "Storage", x: 365, y: 160 },
    { type: "Network", x: 500, y: 100 },
    { type: "Cache", x: 50, y: 200 },
    { type: "Load Balancer", x: 350, y: 225 },
    { type: "Monitoring", x: 650, y: 185 },
  ];

 // Timer: Decrease timeLeft and score every second
 useEffect(() => {
  if (timeLeft > 0 && isCorrectGraph !== true) {
    const timerId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);

      // Decrease score by 1 point every 3 seconds if timer is at 180 seconds and score is 100
      if (timeLeft % 3 === 0 && score > 0) {
        setScore((prev) => (prev > 0 ? prev - 1 : 0)); // Decrease by 1 point every 3 seconds
      }

    }, 1000);

    return () => clearInterval(timerId);
  } else if (timeLeft === 0) {
    setShowFailPopup(true); // ⏳ Timer ran out → Show fail screen
  }
}, [timeLeft, isCorrectGraph, score]);

  useEffect(() => {
    checkGraph();
  }, [connections, components]);

  const handleDrop = (event) => {
    event.preventDefault();
    const type = event.dataTransfer.getData("text/plain");
    const rect = event.target.getBoundingClientRect();
  
    // Assuming components are 100px by 50px for simplicity
    const componentWidth = 100;
    const componentHeight = 50;
  
    // Calculate x and y so that the cursor is the center of the component
    const newComponent = {
      id: uuidv4(),
      type,
      x: event.clientX - rect.left - componentWidth / 2, // Cursor is center of component
      y: event.clientY - rect.top - componentHeight / 2, // Cursor is center of component
    };
  
    setComponents([...components, newComponent]);
  };
  
  const handleMouseDown = (event, id) => {
    // Start tracking mouse movement for dragging
    const mouseMoveHandler = (moveEvent) => {
      const newComponents = components.map((comp) => {
        if (comp.id === id) {
          // Update the component's position based on the cursor
          return {
            ...comp,
            x: moveEvent.clientX - 50, // Offset to center the component
            y: moveEvent.clientY - 25, // Offset to center the component
          };
        }
        return comp;
      });
      setComponents(newComponents);
    };
  
    const mouseUpHandler = () => {
      // Remove the event listeners when mouse is released
      document.removeEventListener("mousemove", mouseMoveHandler);
      document.removeEventListener("mouseup", mouseUpHandler);
    };
  
    // Add event listeners for mouse move and mouse up
    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", mouseUpHandler);
  };
  

  const handleDragOver = (event) => event.preventDefault();

  const handleDragStart = (event, type) => {
    event.dataTransfer.setData("text/plain", type);
  };

  const handleComponentClick = (id) => {
    if (selectedComponent === null) {
      setSelectedComponent(id);
    } else {
      if (selectedComponent !== id) {
        setConnections([...connections, { from: selectedComponent, to: id }]);
      }
      setSelectedComponent(null);
    }
  };

  const handleComponentRightClick = (event, id) => {
    event.preventDefault();
    setComponents(components.filter((comp) => comp.id !== id));
    setConnections(connections.filter((conn) => conn.from !== id && conn.to !== id));
  };

  const handleDeleteConnection = (index) => {
    setConnections(connections.filter((_, i) => i !== index));
  };

  const checkGraph = () => {
    if (connections.length === referenceGraph.length) {
      const sortedConnections = connections
        .map((conn) => ({
          from: components.find((comp) => comp.id === conn.from)?.type,
          to: components.find((comp) => comp.id === conn.to)?.type,
        }))
        .map((conn) => ({
          from: conn.from < conn.to ? conn.from : conn.to,
          to: conn.from < conn.to ? conn.to : conn.from,
        }))
        .sort((a, b) => a.from.localeCompare(b.from) || a.to.localeCompare(b.to));
  
      const sortedReference = referenceGraph
        .map((conn) => ({
          from: conn.from < conn.to ? conn.from : conn.to,
          to: conn.from < conn.to ? conn.to : conn.from,
        }))
        .sort((a, b) => a.from.localeCompare(b.from) || a.to.localeCompare(b.to));
  
      const isCorrect = JSON.stringify(sortedConnections) === JSON.stringify(sortedReference);
      setIsCorrectGraph(isCorrect);
  
      if (isCorrect) {
        setShowPopup(true); // ✅ Show success popup when graph is correct
      }
    } else {
      setIsCorrectGraph(false);
    }
  };
  
  return (
    <div className="graph-container">
      {/* 
        Original timer/score container 
        - We are NOT removing it, just leaving it in code.
        - We'll hide it in CSS so we can replace it with a Win95-style "taskbar" at the bottom.
      */}
      <div className="timer-score">
        <span className="timer">Time Left: {timeLeft}s</span>
        <span className="score">Score: {score}</span>
      </div>

      {/* Playground */}
      <div className="playground" onDrop={handleDrop} onDragOver={handleDragOver}>
        <span className="playground-label">Playground</span>
        {components.map((comp) => (
          <div
            key={comp.id}
            className="component-box"
            style={{ left: comp.x, top: comp.y }}
            onClick={() => handleComponentClick(comp.id)}
            onContextMenu={(event) => handleComponentRightClick(event, comp.id)}
          >
            {comp.type}
          </div>
        ))}
        <svg className="connections">
          {connections.map((conn, index) => {
            const from = components.find((c) => c.id === conn.from);
            const to = components.find((c) => c.id === conn.to);
            if (!from || !to) return null;

            const fromX = from.x + 40;
            const fromY = from.y + 20;
            const toX = to.x + 40;
            const toY = to.y + 20;

            const offset = index % 2 === 0 ? 10 : -10;

            return (
              <g key={conn.from + "-" + conn.to}>
                <path
                  d={`M ${fromX},${fromY} C ${fromX + 50},${fromY + offset} ${toX - 50},${toY + offset} ${toX},${toY}`}
                  stroke="black"
                  strokeWidth="2"
                  fill="transparent"
                />
              </g>
            );
          })}
        </svg>
      </div>

      {/* Reference Graph */}
      <div className="reference-graph">
        <span className="reference-label">Reference Graph</span>
        {referenceComponents.map((comp, index) => (
          <div
            key={comp.type + index}
            className="component-box"
            style={{ left: comp.x, top: comp.y }}
          >
            {comp.type}
          </div>
        ))}
        <svg className="connections">
          {referenceGraph.map((conn, index) => {
            const from = referenceComponents.find((c) => c.type === conn.from);
            const to = referenceComponents.find((c) => c.type === conn.to);
            if (!from || !to) return null;

            const fromX = from.x + 40;
            const fromY = from.y + 20;
            const toX = to.x + 40;
            const toY = to.y + 20;

            const offset = index % 2 === 0 ? 10 : -10;

            return (
              <g key={conn.from + "-" + conn.to}>
                <path
                  d={`M ${fromX},${fromY} C ${fromX + 50},${fromY + offset} ${toX - 50},${toY + offset} ${toX},${toY}`}
                  stroke="black"
                  strokeWidth="2"
                  fill="transparent"
                />
              </g>
            );
          })}
        </svg>
      </div>

      {/* Components Panel */}
      <div className="components-panel">
        <div className="components-header">Components</div>
        {[
          "Frontend",
          "Backend",
          "Database",
          "API Gateway",
          "Storage",
          "Network",
          "Cache",
          "Load Balancer",
          "Monitoring",
        ].map((component, index) => (
          <div
            key={index}
            className="component-button"
            draggable
            onDragStart={(e) => handleDragStart(e, component)}
          >
            {component}
          </div>
        ))}
      </div>

      {/* Original Graph Validation Message (not removed, just hidden via CSS) */}
      <div className="graph-validation">
        {isCorrectGraph === true ? (
          <span className="correct-graph">✅ Correct Graph</span>
        ) : isCorrectGraph === false ? (
          <span className="incorrect-graph">❌ Incorrect Graph</span>
        ) : null}
      </div>

      {/* NEW: Windows 95–style Taskbar at the bottom */}
      <div className="win95-taskbar">
        <div className="taskbar-left">
          {/* Show correct/incorrect graph status on the left side of the bar */}
          {isCorrectGraph === true ? (
            <span className="correct-graph">✅ Correct Graph</span>
          ) : isCorrectGraph === false ? (
            <span className="incorrect-graph">❌ Incorrect Graph</span>
          ) : (
            <span className="placeholder-text">...</span>
          )}
        </div>
        <div className="taskbar-right">
          {/* Show time left and score on the right side, styled like a Win95 clock */}
          <span className="timer">Time Left: {timeLeft}s</span>
          <span className="score">Score: {score}</span>
        </div>
      </div>

       {/* Windows 95-style Pop-up Window */}
       {showPopup && (
        <div className="win95-popup">
          <div className="win95-popup-header">
            <span>Task Completed</span>
            <button className="close-button" onClick={() => setShowPopup(false)}>X</button>
          </div>
          <div className="win95-popup-body">
            <p>✅ You have completed the graph correctly!</p>
            <p>Final Score: <strong>{score}</strong></p>
            <button className="win95-ok-button" onClick={() => navigate("/")}>Return to Login</button>
          </div>
        </div>
      )}
        {/* Fail Popup (Timer Ran Out) */}
        {showFailPopup && (
        <div className="win95-popup">
          <div className="win95-popup-header">
            <span>⏳ Time’s Up!</span>
            <button className="close-button" onClick={() => setShowFailPopup(false)}>X</button>
          </div>
          <div className="win95-popup-body">
            <p>❌ Time ran out! You did not complete the graph in time.</p>
            <button className="win95-ok-button" onClick={() => navigate("/")}>
              Return to Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GraphComparison;
