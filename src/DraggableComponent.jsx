// DraggableComponent.jsx
import React, { useState } from 'react';
import './dnd.css';

const DraggableComponent = ({ id, type, label, icon, colorOptions }) => {
  const [selectedColor, setSelectedColor] = useState(colorOptions?.[0] || 'black');
  const [isColorMenuOpen, setIsColorMenuOpen] = useState(false);
  
  // Handle drag start
  const handleDragStart = (e) => {
    // Set the drag data with component info including selected color
    const componentData = {
      id,
      type,
      label,
      icon,
      color: selectedColor
    };
    
    e.dataTransfer.setData('component', JSON.stringify(componentData));
    
    // Add pixelated effect during drag
    e.dataTransfer.setDragImage(e.target, 0, 0);
    
    // Add class for styling during drag
    e.target.classList.add('dragging');
  };
  
  // Handle drag end
  const handleDragEnd = (e) => {
    e.target.classList.remove('dragging');
  };
  
  // Toggle color menu
  const toggleColorMenu = (e) => {
    e.stopPropagation();
    setIsColorMenuOpen(!isColorMenuOpen);
  };
  
  // Select color
  const selectColor = (color, e) => {
    e.stopPropagation();
    setSelectedColor(color);
    setIsColorMenuOpen(false);
  };
  
  return (
    <div 
      className={`draggable-component ${type} color-${selectedColor}`}
      draggable="true"
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      data-component-id={id}
    >
      <div className="component-icon">{icon}</div>
      <div className="component-label">{label}</div>
      <div className="component-id">ID: {id}</div>
      
      <div className="color-selector">
        <button 
          className="color-button" 
          onClick={toggleColorMenu}
          style={{ backgroundColor: selectedColor }}
        >
          <span className="color-dot"></span>
        </button>
        
        {isColorMenuOpen && (
          <div className="color-dropdown">
            {colorOptions.map(color => (
              <div 
                key={color}
                className="color-option"
                style={{ backgroundColor: color }}
                onClick={(e) => selectColor(color, e)}
              ></div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DraggableComponent;