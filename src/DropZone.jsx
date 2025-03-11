import React, { useState } from 'react';
import './terminal.css';

const DropZone = ({ id, label, onComponentDrop, checkCorrectPlacement }) => {
  const [isOver, setIsOver] = useState(false);
  const [droppedComponents, setDroppedComponents] = useState([]);

  const handleDragOver = (e) => {
    e.preventDefault();
    if (!isOver) setIsOver(true);
  };

  const handleDragLeave = () => {
    setIsOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsOver(false);
    
    try {
      // Get the component data from the drag operation
      const componentData = JSON.parse(e.dataTransfer.getData('application/json'));
      
      // Check if this placement is correct according to the game rules
      const isCorrect = checkCorrectPlacement ? 
        checkCorrectPlacement(componentData.id, id) : 
        true;
      
      // Add the component to this drop zone
      const newComponent = {
        ...componentData,
        isCorrect,
        // Generate a unique instance ID for this dropped component
        instanceId: `${componentData.id}-${Date.now()}`
      };
      
      setDroppedComponents(prev => [...prev, newComponent]);
      
      // Notify parent component
      if (onComponentDrop) {
        onComponentDrop(componentData, id, isCorrect);
      }
      
    } catch (error) {
      console.error("Error handling drop:", error);
    }
  };

  // Get dropzone style based on which section it is
  const getDropZoneStyle = () => {
    switch(id) {
      case 'navbar':
        return { height: '60px' };
      case 'hero':
        return { height: '150px' };
      case 'sidebar':
        return { width: '30%', minHeight: '300px' };
      case 'main-content':
        return { width: '70%', minHeight: '300px' };
      case 'footer':
        return { height: '80px' };
      default:
        return {};
    }
  };

  return (
    <div 
      className={`win95-dropzone win95-dropzone-${id} ${isOver ? 'win95-dropzone-hover' : ''}`}
      style={getDropZoneStyle()}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="win95-dropzone-label">{label}</div>
      <div className="win95-dropzone-content">
        {droppedComponents.map((component) => (
          <div 
            key={component.instanceId}
            className={`dropped-component win95-${component.type} ${!component.isCorrect ? 'incorrect-placement' : ''}`}
            style={{
              backgroundColor: component.color,
              fontSize: component.size === 'large' ? '14px' : component.size === 'small' ? '10px' : '12px',
              textAlign: component.align || 'left'
            }}
          >
            {component.icon && <img src={component.icon} alt={component.label} className="component-icon" />}
            <span>{component.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DropZone;