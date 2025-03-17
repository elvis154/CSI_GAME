import React, { useState, useRef, useEffect } from 'react';
import './dnd.css';

const DraggableComponent = ({ original_id, id, type, label, icon, subComponents = [] }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Toggle dropdown menu
  const toggleDropdown = (e) => {
    e.stopPropagation();
    setIsDropdownOpen(!isDropdownOpen);
  };
  
  // Handle drag start for subcomponents
  const handleSubComponentDragStart = (subComponent, index, e) => {
    // Append index to id to create a 5-digit ID (e.g., 1001 becomes 10010, 10011, etc.)
    const idWithIndex = `${id}${index}`;
    
    // Set the drag data with subcomponent info
    const componentData = {
      id: idWithIndex, // Modified ID with color index appended
      originalId: id, // Keep original ID for reference
      type,
      label,
      icon,
    };
    
    e.dataTransfer.setData('component', JSON.stringify(componentData));
    
    // Add class for styling during drag
    e.target.classList.add('dragging');
  };
  
  // Handle drag end
  const handleDragEnd = (e) => {
    e.target.classList.remove('dragging');
  };
  
  // Generate subcomponents if none provided
  const generatedSubComponents = subComponents.length > 0 ? subComponents : [
    { type: {original_id}, label: `${label} - Variant 1` },
    { type: {original_id}, label: `${label} - Variant 2` },
    { type: {original_id}, label: `${label} - Variant 3` }
  ];
  
  return (
    <div 
      className={`draggable-component ${type}`}
      data-component-id={id}
    >
      <div className="component-icon">{icon}</div>
      <div className="component-label">
        {label}
        <div className="component-id">ID: {id}</div>
      </div>
      
      <div className="color-dropdown-container" ref={dropdownRef}>
        <div className="color-selection-display">
          <button 
            className="dropdown-arrow-button" 
            onClick={toggleDropdown}
            aria-label="Show subcomponents"
            aria-expanded={isDropdownOpen}
          >
            <span className="dropdown-arrow">{isDropdownOpen ? '▲' : '▼'}</span>
          </button>
        </div>
        
        {isDropdownOpen && (
          <div className="color-dropdown">
            {generatedSubComponents.map((subComp, index) => (
              <div 
                key={index}
                className="draggable-component sub-component"
                draggable="true"
                onDragStart={(e) => handleSubComponentDragStart(subComp, index, e)}
                onDragEnd={handleDragEnd}
                style={{ borderLeft: `4px solid ${getColorForIndex(index)}` }}
              >
                <div className="component-icon">{subComp.icon || icon}</div>
                <div className="component-label">
                  {subComp.label}
                  <div className="component-id">ID: {id}{index}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Helper function to get color based on index
const getColorForIndex = (index) => {
  const colors = [
    '#000000', // Black (0)
    '#4285F4', // Blue (1)
    '#EA4335', // Red (2)
    '#FBBC05', // Yellow (3)
    '#34A853', // Green (4)
    '#9C27B0', // Purple (5)
    '#FF9800', // Orange (6)
    '#795548'  // Brown (7)
  ];
  
  return colors[index % colors.length];
};

export default DraggableComponent;