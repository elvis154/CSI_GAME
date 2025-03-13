import React, { useState, useEffect, useRef } from 'react';
import './terminal.css';

const DropZone = ({ id, label, onComponentDrop, checkCorrectPlacement }) => {
  const [isOver, setIsOver] = useState(false);
  const [droppedComponents, setDroppedComponents] = useState([]);
  const [zoneHeight, setZoneHeight] = useState(getInitialHeight());
  const dropZoneRef = useRef(null);

  // Set initial height based on section type
  function getInitialHeight() {
    switch(id) {
      case 'navbar':
        return 60;
      case 'hero':
        return 150;
      case 'footer':
        return 80;
      default:
        return 200;
    }
  }

  // Update zone height when components change
  useEffect(() => {
    if (droppedComponents.length === 0) {
      setZoneHeight(getInitialHeight());
      return;
    }

    // Allow a small delay for images to load
    const timer = setTimeout(() => {
      if (dropZoneRef.current) {
        // Calculate needed height based on content
        const contentHeight = dropZoneRef.current.scrollHeight;
        // Set minimum height but allow growth
        setZoneHeight(Math.max(getInitialHeight(), contentHeight));
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [droppedComponents, id]);

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
    const baseStyle = {
      height: `${zoneHeight}px`,
      transition: 'height 0.3s ease'
    };
    
    switch(id) {
      case 'sidebar':
        return { ...baseStyle, width: '30%', minHeight: '300px' };
      case 'main-content':
        return { ...baseStyle, width: '70%', minHeight: '300px' };
      default:
        return baseStyle;
    }
  };

  return (
    <div 
      ref={dropZoneRef}
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
          >
            {component.imagePath ? (
              <div className="component-image-container">
                <img 
                  src={component.imagePath} 
                  alt={component.label}
                  className="component-preview-image"
                  onLoad={() => {
                    // Recalculate height after image loads
                    if (dropZoneRef.current) {
                      const contentHeight = dropZoneRef.current.scrollHeight;
                      setZoneHeight(Math.max(getInitialHeight(), contentHeight));
                    }
                  }}
                />
                <div className="component-label">
                  {component.icon && <span className="component-icon">{component.icon}</span>}
                  <span>{component.label}</span>
                </div>
              </div>
            ) : (
              <>
                {component.icon && <span className="component-icon">{component.icon}</span>}
                <span>{component.label}</span>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DropZone;