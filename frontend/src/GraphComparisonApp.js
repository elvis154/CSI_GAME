import React, { useState } from 'react';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend'; // Import HTML5 backend
import './GraphComparison.css';  // Import the updated styles

// Constants for drag and drop
const ItemType = 'NODE';

// Node Component for drag and drop
const DraggableNode = ({ node, position, onDragEnd }) => {
  const [, drag] = useDrag(() => ({
    type: ItemType,
    item: { id: node, position },
    end: (item, monitor) => {
      const offset = monitor.getDifferenceFromInitialOffset();
      onDragEnd(item.id, offset);
    },
  }));

  return (
    <div
      ref={drag}
      className="draggable-node"
      style={{ left: position.x, top: position.y }}
    >
      {node}
    </div>
  );
};

// Graph comparison check (Isomorphism check)
const generatePermutations = (arr) => {
  if (arr.length === 0) return [[]];
  const first = arr[0];
  const rest = arr.slice(1);
  const permsWithoutFirst = generatePermutations(rest);
  const allPerms = [];
  permsWithoutFirst.forEach((perm) => {
    for (let i = 0; i <= perm.length; i++) {
      allPerms.push([...perm.slice(0, i), first, ...perm.slice(i)]);
    }
  });
  return allPerms;
};

const compareGraphs = (graph1, graph2) => {
  const nodes1 = Object.keys(graph1);
  const nodes2 = Object.keys(graph2);

  if (nodes1.length !== nodes2.length) return false;

  const permutations = generatePermutations(nodes2);

  for (let perm of permutations) {
    let isMatch = true;

    for (let i = 0; i < nodes1.length; i++) {
      const node1 = nodes1[i];
      const permutedNode2 = perm[i];

      const neighbors1 = graph1[node1].sort();
      const neighbors2 = graph2[permutedNode2].sort();
      if (JSON.stringify(neighbors1) !== JSON.stringify(neighbors2)) {
        isMatch = false;
        break;
      }
    }

    if (isMatch) return true;
  }

  return false;
};

// Main Graph Component
const GraphComparisonApp = () => {
  const [graph, setGraph] = useState({
    A: ['B', 'C'],
    B: ['A', 'D'],
    C: ['A', 'D'],
    D: ['B', 'C'],
  });
  const [graph2, setGraph2] = useState({
    W: ['X', 'Y'],
    X: ['W', 'Z'],
    Y: ['W', 'Z'],
    Z: ['X', 'Y'],
  });

  const [nodes, setNodes] = useState([
    { id: 'A', position: { x: 100, y: 100 } },
    { id: 'B', position: { x: 200, y: 100 } },
    { id: 'C', position: { x: 300, y: 100 } },
    { id: 'D', position: { x: 400, y: 100 } },
  ]);
  const [edges, setEdges] = useState([]);

  // Update position of nodes when dragging
  const handleNodeDragEnd = (nodeId, offset) => {
    setNodes((prevNodes) => {
      return prevNodes.map((node) =>
        node.id === nodeId
          ? { ...node, position: { x: node.position.x + offset.x, y: node.position.y + offset.y } }
          : node
      );
    });
  };

  // Graph comparison check
  const handleGraphComparison = () => {
    const userGraph = {};
    nodes.forEach((node) => {
      userGraph[node.id] = edges.filter((edge) => edge.from === node.id).map((edge) => edge.to);
    });

    const result = compareGraphs(userGraph, graph2);
    alert(result ? "The graphs are Identical!" : "The graphs are Not Identical!");
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="terminal-container">
        <div className="terminal-box">
          <div className="terminal-header">
            <span>Graph Comparison (Windows 95 Style)</span>
            <span className="cursor-pointer">X</span>
          </div>
          
          <div className="terminal-content">
            <div className="graph-area" onClick={handleGraphComparison}>
              <div className="graph-background">
                {nodes.map((node) => (
                  <DraggableNode
                    key={node.id}
                    node={node.id}
                    position={node.position}
                    onDragEnd={handleNodeDragEnd}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="chart-container">
            <button className="cursor-pointer" onClick={handleGraphComparison}>Compare Graphs</button>
          </div>

          <div className="status-bar">
            <p>Windows 95 Styled Graph Editor</p>
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default GraphComparisonApp;
