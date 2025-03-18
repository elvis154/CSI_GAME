import React, { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid"; // Import UUID library for unique ids
import "./GraphComparison.css";
import { useNavigate } from "react-router-dom";

const GraphComparison = () => {
  // Existing states
  const [components, setComponents] = useState([]);
  const [connections, setConnections] = useState([]);
  const [isDragging, setIsDragging] = useState(false); // Track if we're dragging
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 }); // Store drag offset
  const [isCorrectGraph, setIsCorrectGraph] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showFailPopup, setShowFailPopup] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180);
  const [score, setScore] = useState(100);
  
  // New states for connection creation
  const [isCreatingConnection, setIsCreatingConnection] = useState(false);
  const [connectionStart, setConnectionStart] = useState(null);
  const [tempConnectionPos, setTempConnectionPos] = useState({ x: 0, y: 0 });
  const [activeComponentId, setActiveComponentId] = useState(null); // Track active component for connection
  
  // Create a ref for the playground area
  const playgroundRef = useRef(null);

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
    { type: "Storage", x: 420, y: 140 },
    { type: "Network", x: 500, y: 60 },
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

  // Safe boundary function to keep components inside playground
  const keepInBounds = (x, y) => {
    if (!playgroundRef.current) return { x, y };
    
    const playground = playgroundRef.current.getBoundingClientRect();
    const compWidth = 100; // Component width
    const compHeight = 50; // Component height
    
    // Get playground dimensions (minus borders/padding)
    const minX = 0;
    const minY = 0;
    const maxX = playground.width - compWidth - 10;
    const maxY = playground.height - compHeight - 10;
    
    return {
      x: Math.max(minX, Math.min(maxX, x)),
      y: Math.max(minY, Math.min(maxY, y)),
    };
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const type = event.dataTransfer.getData("text/plain");
    
    if (!playgroundRef.current) return;
    
    const rect = playgroundRef.current.getBoundingClientRect();
    const componentWidth = 100;
    const componentHeight = 50;
    
    // Calculate position relative to playground
    const x = event.clientX - rect.left - componentWidth / 2;
    const y = event.clientY - rect.top - componentHeight / 2;
    
    // Ensure component stays within bounds
    const { x: boundedX, y: boundedY } = keepInBounds(x, y);
    
    const newComponent = {
      id: uuidv4(),
      type,
      x: boundedX,
      y: boundedY,
    };
    
    setComponents([...components, newComponent]);
  };

  // Component dragging functionality
  const handleMouseDown = (event, id) => {
    if (showPopup || showFailPopup) return; // Prevent dragging when popup is shown
    
    event.stopPropagation();
    
    // Find the component
    const component = components.find(comp => comp.id === id);
    if (!component) return;
    
    // Calculate offset between mouse position and component top-left corner
    const offsetX = event.clientX - component.x - (playgroundRef.current?.getBoundingClientRect().left || 0);
    const offsetY = event.clientY - component.y - (playgroundRef.current?.getBoundingClientRect().top || 0);
    
    setDragOffset({ x: offsetX, y: offsetY });
    setIsDragging(true);
    
    // Track which component we're dragging
    const draggedComponentId = id;
    
    const handleMouseMove = (moveEvent) => {
      if (!playgroundRef.current) return;
      
      const rect = playgroundRef.current.getBoundingClientRect();
      
      // Calculate new position with offset
      const newX = moveEvent.clientX - rect.left - dragOffset.x;
      const newY = moveEvent.clientY - rect.top - dragOffset.y;
      
      // Keep within bounds
      const { x: boundedX, y: boundedY } = keepInBounds(newX, newY);
      
      setComponents(prevComponents => 
        prevComponents.map(comp => 
          comp.id === draggedComponentId 
            ? { ...comp, x: boundedX, y: boundedY } 
            : comp
        )
      );
    };
    
    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
    
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleDragOver = (event) => event.preventDefault();

  const handleDragStart = (event, type) => {
    if (showPopup || showFailPopup) {
      event.preventDefault();
      return;
    }
    event.dataTransfer.setData("text/plain", type);
  };
  
  const handleComponentRightClick = (event, id) => {
    if (showPopup || showFailPopup) return; // Prevent right-click when popup is shown
    
    event.preventDefault();
    event.stopPropagation();
    setComponents(components.filter((comp) => comp.id !== id));
    setConnections(connections.filter((conn) => conn.from !== id && conn.to !== id));
  };

  const handleDeleteConnection = (index, event) => {
    if (showPopup || showFailPopup) return; // Prevent connection deletion when popup is shown
    
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    setConnections(connections.filter((_, i) => i !== index));
  };

  // Check if point is inside a component
  const getComponentAtPoint = (x, y) => {
    for (let comp of components) {
      if (
        x >= comp.x &&
        x <= comp.x + 100 && // assuming component width is 100
        y >= comp.y &&
        y <= comp.y + 50 // assuming component height is 50
      ) {
        return comp.id;
      }
    }
    return null;
  };

  // Fixed connector functionality 
  const handleConnectorMouseDown = (event, componentId) => {
    if (showPopup || showFailPopup) return; // Prevent connection creation when popup is shown
    
    event.stopPropagation();
    event.preventDefault();
    
    const component = components.find(c => c.id === componentId);
    if (!component) return;
    
    // Start creating a connection
    setIsCreatingConnection(true);
    setConnectionStart({
      id: componentId,
      x: component.x + 50, // Center of component
      y: component.y + 25
    });
    
    // Set initial temp position to mouse position
    if (playgroundRef.current) {
      const rect = playgroundRef.current.getBoundingClientRect();
      setTempConnectionPos({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      });
    }
    
    // Store the componentId separately to ensure it's available in mousemove handler
    const startComponentId = componentId;
    
    const handleMouseMove = (moveEvent) => {
      if (!playgroundRef.current) return;
      
      const rect = playgroundRef.current.getBoundingClientRect();
      const mouseX = moveEvent.clientX - rect.left;
      const mouseY = moveEvent.clientY - rect.top;
      
      setTempConnectionPos({
        x: mouseX,
        y: mouseY
      });
      
      // Update active component based on mouse position
      const hoveredComponentId = getComponentAtPoint(mouseX, mouseY);
      // Make sure we don't connect to the same component we started from
      if (hoveredComponentId && hoveredComponentId !== startComponentId) {
        setActiveComponentId(hoveredComponentId);
      } else {
        setActiveComponentId(null);
      }
    };
    
    const handleMouseUp = (upEvent) => {
      if (!playgroundRef.current) {
        setIsCreatingConnection(false);
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        return;
      }
      
      const rect = playgroundRef.current.getBoundingClientRect();
      const mouseX = upEvent.clientX - rect.left;
      const mouseY = upEvent.clientY - rect.top;
      
      // Find component under mouse
      const targetComponentId = getComponentAtPoint(mouseX, mouseY);
      
      if (targetComponentId && startComponentId && targetComponentId !== startComponentId) {
        // Check if connection already exists
        const connectionExists = connections.some(
          conn => 
            (conn.from === startComponentId && conn.to === targetComponentId) || 
            (conn.from === targetComponentId && conn.to === startComponentId)
        );
        
        if (!connectionExists) {
          setConnections(prevConnections => [...prevConnections, { 
            from: startComponentId, 
            to: targetComponentId 
          }]);
        }
      }
      
      // Reset states
      setIsCreatingConnection(false);
      setActiveComponentId(null);
      setConnectionStart(null);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
    
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  // Helper function to create a unique connection ID
  const getConnectionId = (from, to) => {
    // Sort to ensure same connection has same ID regardless of direction
    return [from, to].sort().join("-");
  };

  const checkGraph = () => {
    if (components.length === 0 || connections.length === 0) {
      setIsCorrectGraph(false);
      return;
    }
    
    // Make sure all components in the connections exist
    const validConnections = connections.filter(conn => {
      const fromComponent = components.find(c => c.id === conn.from);
      const toComponent = components.find(c => c.id === conn.to);
      return fromComponent && toComponent;
    });
    
    if (validConnections.length === referenceGraph.length) {
      const sortedConnections = validConnections
        .map((conn) => ({
          from: components.find((comp) => comp.id === conn.from)?.type,
          to: components.find((comp) => comp.id === conn.to)?.type,
        }))
        .filter(conn => conn.from && conn.to) // Filter out connections with missing components
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
  
  // Helper function to generate a unique path for each connection
  const getConnectionPath = (from, to, index) => {
    if (!from || !to) return "";
    
    const fromX = from.x + 50; // Center of component
    const fromY = from.y + 25;
    const toX = to.x + 50;
    const toY = to.y + 25;
    
    // Calculate midpoint
    const midX = (fromX + toX) / 2;
    const midY = (fromY + toY) / 2;
    
    // Calculate distance
    const distance = Math.sqrt(Math.pow(toX - fromX, 2) + Math.pow(toY - fromY, 2));
    
    // Calculate perpendicular offset for curve based on index to prevent overlaps
    const offsetX = (toY - fromY) / distance * (20 + (index % 3) * 10);
    const offsetY = -(toX - fromX) / distance * (20 + (index % 3) * 10);
    
    // Create curved path
    return `M ${fromX},${fromY} Q ${midX + offsetX},${midY + offsetY} ${toX},${toY}`;
  };
  
  // Gray connector dot style with updated z-index
  const connectorStyle = {
    position: 'absolute',
    width: '12px',
    height: '12px',
    backgroundColor: '#888888', // Gray color
    border: '2px solid white',
    borderRadius: '50%',
    right: '0',
    bottom: '0',
    cursor: 'crosshair',
    zIndex: '5', // Lower z-index to prevent overlapping with popups
    boxShadow: '0 0 2px rgba(0, 0, 0, 0.5)',
    pointerEvents: showPopup || showFailPopup ? 'none' : 'auto' // Disable pointer events when popup is shown
  };

  return (
    <div className="graph-container">
      {/* Timer/score container */}
      <div className="timer-score">
        <span className="timer">Time Left: {timeLeft}s</span>
        <span className="score">Score: {score}</span>
      </div>

      {/* Playground */}
      <div 
        className="playground" 
        onDrop={handleDrop} 
        onDragOver={handleDragOver}
        ref={playgroundRef}
        style={{ pointerEvents: showPopup || showFailPopup ? 'none' : 'auto' }} // Disable pointer events when popup is shown
      >
        <span className="playground-label">Playground</span>
        {components.map((comp) => (
          <div
            key={comp.id}
            data-id={comp.id}
            className="component-box"
            style={{ 
              left: comp.x, 
              top: comp.y,
              position: 'absolute',
              zIndex: '6' // Lower z-index to prevent overlapping with popups
            }}
            onMouseDown={(event) => handleMouseDown(event, comp.id)}
            onContextMenu={(event) => handleComponentRightClick(event, comp.id)}
          >
            {comp.type}
            
            {/* Connector point with gray color */}
            <div 
              style={connectorStyle}
              onMouseDown={(e) => handleConnectorMouseDown(e, comp.id)}
              title="Drag to connect"
            />
          </div>
        ))}
        <svg className="connections" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: showPopup || showFailPopup ? 'none' : 'auto', zIndex: '1' }}>
          {/* Existing connections */}
          {connections.map((conn, index) => {
            const from = components.find((c) => c.id === conn.from);
            const to = components.find((c) => c.id === conn.to);
            
            // Skip invalid connections
            if (!from || !to) return null;

            // Create a unique connector path
            const path = getConnectionPath(from, to, index);
            const connectionId = getConnectionId(conn.from, conn.to);

            return (
              <g key={connectionId} onClick={(e) => handleDeleteConnection(index, e)} style={{ cursor: 'pointer', pointerEvents: showPopup || showFailPopup ? 'none' : 'all' }}>
                <path
                  d={path}
                  stroke="black"
                  strokeWidth="2"
                  fill="transparent"
                />
                <path
                  d={path}
                  stroke="transparent"
                  strokeWidth="10"
                  fill="transparent"
                  style={{ pointerEvents: 'stroke' }}
                />
                {/* Arrow head */}
                <circle cx={to.x + 50} cy={to.y + 25} r="4" fill="black" />
              </g>
            );
          })}
          
          {/* Temporary connection being drawn */}
          {isCreatingConnection && connectionStart && (
            <path
              d={`M ${connectionStart.x},${connectionStart.y} L ${tempConnectionPos.x},${tempConnectionPos.y}`}
              stroke="black"
              strokeWidth="2"
              strokeDasharray="5,5"
              fill="transparent"
              pointerEvents="none"
            />
          )}
        </svg>
      </div>

      {/* Reference Graph */}
<div className="reference-graph">
  <span className="reference-label">Reference Graph</span>

  {/* SVG for connections - Render this FIRST */}
  <svg className="connections">
    {referenceGraph.map((conn, index) => {
      const from = referenceComponents.find((c) => c.type === conn.from);
      const to = referenceComponents.find((c) => c.type === conn.to);

      // Skip invalid connections
      if (!from || !to) return null;

      // Generate a unique connection path for reference as well
      const referenceConnId = getConnectionId(conn.from, conn.to);
      const path = getConnectionPath(from, to, index);

      return (
        <g key={referenceConnId}>
          <path
            d={path}
            stroke="black"
            strokeWidth="2"
            fill="transparent"
          />
          {/* Arrow head */}
          <circle cx={to.x + 50} cy={to.y + 25} r="4" fill="black" />
        </g>
      );
    })}
  </svg>

  {/* Render Components AFTER SVG so they appear on top */}
  {referenceComponents.map((comp, index) => (
    <div
      key={comp.type + index}
      className="component-box"
      style={{ 
        left: comp.x, 
        top: comp.y,
        position: 'absolute',
      }}
    >
      {comp.type}
    </div>
  ))}
</div>

      {/* Components Panel */}
      <div 
        className="components-panel"
        style={{ pointerEvents: showPopup || showFailPopup ? 'none' : 'auto' }} // Disable pointer events when popup is shown
      >
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
            draggable={!showPopup && !showFailPopup} // Disable draggable when popup is shown
            onDragStart={(e) => handleDragStart(e, component)}
          >
            {component}
          </div>
        ))}
      </div>

      {/* Windows 95–style Taskbar at the bottom */}
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

       {/* Windows 95-style Pop-up Window with higher z-index */}
       {showPopup && (
        <div className="win95-popup" style={{ zIndex: '1000' }}>
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
        {/* Fail Popup (Timer Ran Out) with higher z-index */}
        {showFailPopup && (
        <div className="win95-popup" style={{ zIndex: '1000' }}>
          <div className="win95-popup-header">
            <span>⏳ Time's Up!</span>
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