import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid"; // Import UUID library for unique ids
import "./GraphComparison.css";

const GraphComparison = () => {
  const [components, setComponents] = useState([]);
  const [connections, setConnections] = useState([]);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [isCorrectGraph, setIsCorrectGraph] = useState(null);

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

  const referenceComponents = [
    { type: "Frontend", x: 50, y: 50 },
    { type: "Backend", x: 200, y: 50 },
    { type: "Database", x: 350, y: 50 },
    { type: "API Gateway", x: 200, y: 175 },
    { type: "Storage", x: 350, y: 150 },
    { type: "Network", x: 500, y: 100 },
    { type: "Cache", x: 50, y: 200 },
    { type: "Load Balancer", x: 350, y: 225 },
    { type: "Monitoring", x: 650, y: 185 },
  ];

  useEffect(() => {
    checkGraph();
  }, [connections, components]);

  const handleDrop = (event) => {
    event.preventDefault();
    const type = event.dataTransfer.getData("text/plain");
    const rect = event.target.getBoundingClientRect();

    const newComponent = {
      id: uuidv4(), // Use UUID for unique component ID
      type,
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };

    setComponents([...components, newComponent]);
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

  // Delete component on right-click (context menu)
  const handleComponentRightClick = (event, id) => {
    event.preventDefault();
    setComponents(components.filter((comp) => comp.id !== id));
    setConnections(connections.filter((conn) => conn.from !== id && conn.to !== id));
  };

  const handleDeleteConnection = (index) => {
    setConnections(connections.filter((_, i) => i !== index));
  };

  // Check if the user-created graph matches the reference (bidirectional comparison)
  const checkGraph = () => {
    if (connections.length === referenceGraph.length) {
      // Normalize user connections by sorting both 'from' and 'to' lexicographically to account for bidirectional connections
      const sortedConnections = connections.map(conn => ({
        from: components.find(comp => comp.id === conn.from)?.type,
        to: components.find(comp => comp.id === conn.to)?.type,
      })).map(conn => ({
        from: conn.from < conn.to ? conn.from : conn.to,
        to: conn.from < conn.to ? conn.to : conn.from,
      })).sort((a, b) => a.from.localeCompare(b.from) || a.to.localeCompare(b.to));

      const sortedReference = referenceGraph.map(conn => ({
        from: conn.from < conn.to ? conn.from : conn.to,
        to: conn.from < conn.to ? conn.to : conn.from,
      })).sort((a, b) => a.from.localeCompare(b.from) || a.to.localeCompare(b.to));

      const isCorrect = JSON.stringify(sortedConnections) === JSON.stringify(sortedReference);
      setIsCorrectGraph(isCorrect);
    } else {
      setIsCorrectGraph(false);
    }
  };

  return (
    <div className="graph-container">
      {/* Playground */}
      <div className="playground" onDrop={handleDrop} onDragOver={handleDragOver}>
        <span className="playground-label">Playground</span>
        {components.map((comp) => (
          <div
            key={comp.id} // Use the UUID as the unique key
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

            const offset = (index % 2 === 0 ? 10 : -10); // Define the offset for the curve

            return (
              <g key={conn.from + "-" + conn.to}> {/* Unique key based on component ids */}
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
            key={comp.type + index}  // Use type and index to ensure uniqueness
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

            const offset = (index % 2 === 0 ? 10 : -10); // Define the offset for the curve

            return (
              <g key={conn.from + "-" + conn.to}> {/* Unique key for reference connections */}
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
        {["Frontend", "Backend", "Database", "API Gateway", "Storage", "Network", "Cache", "Load Balancer", "Monitoring"].map((component, index) => (
          <div
            key={index}  // Key based on index for panel components
            className="component-button"
            draggable
            onDragStart={(e) => handleDragStart(e, component)}
          >
            {component}
          </div>
        ))}
      </div>

      {/* Graph Validation Message */}
      <div className="graph-validation">
        {isCorrectGraph === true ? (
          <span className="correct-graph">✅ Correct Graph</span>
        ) : isCorrectGraph === false ? (
          <span className="incorrect-graph">❌ Incorrect Graph</span>
        ) : null}
      </div>
    </div>
  );
};

export default GraphComparison;
