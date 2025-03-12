import React, { useState, useRef, useEffect } from 'react';
import './dnd.css';

const DraggableComponent = ({ id, type, label, icon, colorOptions = [] }) => {
  // If no color options are provided, generate some default colors
  const defaultColors = colorOptions.length > 0 ? colorOptions : [
    '#000000', // Black
    '#4285F4', // Blue
    '#EA4335', // Red
    '#FBBC05', // Yellow
    '#34A853', // Green
    '#9C27B0', // Purple
    '#FF9800', // Orange
    '#795548'  // Brown
  ];

  const [selectedColor, setSelectedColor] = useState(defaultColors[0]);
  const [isColorMenuOpen, setIsColorMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  // Generate unique color IDs for each color option
  const colorOptionsWithIds = defaultColors.map(color => ({
    id: `${id}-color-${Math.floor(Math.random() * 1000)}`,
    color
  }));
  
  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsColorMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
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
      className={`draggable-component ${type} color-${selectedColor.replace('#', '')}`}
      draggable="true"
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      data-component-id={id}
      style={{ borderLeft: `4px solid ${selectedColor}` }}
    >
      <div className="component-icon">{icon}</div>
      <div className="component-label">
        {label}
        <div className="component-id">ID: {id}</div>
      </div>
      
      <div className="color-dropdown-container" ref={dropdownRef}>
        <div className="color-selection-display">
          <div 
            className="selected-color-indicator" 
            style={{ backgroundColor: selectedColor }}
            title={selectedColor}
          ></div>
          
          <button 
            className="dropdown-arrow-button" 
            onClick={toggleColorMenu}
            aria-label="Select color"
            aria-expanded={isColorMenuOpen}
          >
            <span className="dropdown-arrow">{isColorMenuOpen ? '▲' : '▼'}</span>
          </button>
        </div>
        
        {isColorMenuOpen && (
          <div className="color-dropdown">
            {colorOptionsWithIds.map(({ id: colorId, color }) => (
              <div 
                key={colorId}
                className={`color-option ${color === selectedColor ? 'selected' : ''}`}
                style={{ backgroundColor: color }}
                onClick={(e) => selectColor(color, e)}
                data-color-id={colorId}
                title={color}
              ></div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DraggableComponent;