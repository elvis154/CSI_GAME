import React, { useState } from 'react';
import './terminal.css';

const DraggableComponent = ({ id, type, label, icon, color, size, align, onSelect }) => {
  const [isDragging, setIsDragging] = useState(false);
  
  const handleDragStart = (e) => {
    setIsDragging(true);
    
    // Set the drag data with component information
    e.dataTransfer.setData('application/json', JSON.stringify({
      id,
      type,
      label,
      icon,
      color,
      size,
      align
    }));
    
    // Create a ghost image effect
    const dragImage = document.createElement('div');
    dragImage.classList.add('win95-drag-preview');
    dragImage.textContent = label;
    document.body.appendChild(dragImage);
    
    // Set the drag image
    e.dataTransfer.setDragImage(dragImage, 20, 20);
    
    // Clean up the drag image element
    setTimeout(() => {
      document.body.removeChild(dragImage);
    }, 0);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleClick = () => {
    if (onSelect) {
      onSelect({ id, type, label, icon, color, size, align });
    }
  };

  return (
    <div
      className={`win95-component win95-${type} ${isDragging ? 'dragging' : ''}`}
      draggable="true"
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onClick={handleClick}
      style={{
        backgroundColor: color,
        fontSize: size === 'large' ? '14px' : size === 'small' ? '10px' : '12px',
        textAlign: align || 'left'
      }}
    >
      {icon && <img src={icon} alt={label} className="component-icon" />}
      <span className="component-label">{label}</span>
    </div>
  );
};

export default DraggableComponent;