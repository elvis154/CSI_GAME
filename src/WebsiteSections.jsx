import React, { useState, useContext, useEffect } from 'react';
import { GameContext } from './GameContext';
import ErrorPage from './ErrorPage';
import './dnd.css';

const WebsiteSections = ({ onComponentDrop }) => {
  const { freezeScreen } = useContext(GameContext);
  const [hoveredSection, setHoveredSection] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  
  // Fixed section IDs - these will be shown on hover
  const sectionIds = {
    header: 10011,
    navbar: 20025,
    hero: 30032,
    content: 40044,
    sidebar: 50054,
    features: 60061,
    contact: 70070,
    footer: 80083,
  };

  // Website sections
  const sections = Object.keys(sectionIds).map((id) => ({
    id,
    label: id.charAt(0).toUpperCase() + id.slice(1).replace(/-/g, ' '),
    numericId: sectionIds[id]
  }));

  // Handle component drop
  const [placedComponents, setPlacedComponents] = useState({});

  const handleDrop = (e, sectionId) => {
    e.preventDefault();
    try {
      const componentData = JSON.parse(e.dataTransfer.getData("component"));
      const componentNumericId = Number(componentData.id.split('-')[1]);
      
      // Check if the component is already placed
      if (placedComponents[sectionId]) {
        setErrorMessage(`Section '${sectionId}' already has a component.`);
        return;
      }

      // Check if the dropped component matches the section ID
      if (componentNumericId === sectionIds[sectionId]) {
        setPlacedComponents((prev) => ({
          ...prev,
          [sectionId]: componentData
        }));
        onComponentDrop(componentData, sectionId, true);
      } else {
        setErrorMessage(
          `Incorrect placement! Component ID ${componentNumericId} doesn't match section ID ${sectionIds[sectionId]}.`
        );
        freezeScreen(true);
        setTimeout(() => {
          freezeScreen(false);
          setErrorMessage(null);
        }, (Math.random() * 3 + 3) * 1000);
        onComponentDrop(componentData, sectionId, false);
      }
    } catch (error) {
      console.error("Error handling drop:", error);
    }
  };

  return (
    <div className="website-builder">
      <div className="website-builder-title">Website Layout</div>
      <div className="website-builder-hint">
        Drag components to their matching sections
      </div>

      {sections.map((section) => (
        <div
          key={section.id}
          id={`section-${section.id}`}
          className={`website-section ${
            hoveredSection === section.id ? 'section-highlighted' : ''
          }`}
          onMouseEnter={() => setHoveredSection(section.id)}
          onMouseLeave={() => setHoveredSection(null)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDrop(e, section.id)}
        >
          <div className="section-content">
            {hoveredSection === section.id ? (
              <div className="section-id-reveal">
                <div className="section-id">
                  ID: {section.numericId}
                </div>
              </div>
            ) : (
              <div className="section-label">{placedComponents[section.id] ? placedComponents[section.id].label : ""}</div>
            )}
          </div>
        </div>
      ))}

      {errorMessage && (
        <ErrorPage message={errorMessage} onClose={() => setErrorMessage(null)} />
      )}
    </div>
  );
};

export default WebsiteSections;