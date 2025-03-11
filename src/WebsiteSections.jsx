import React, { useState, useContext } from 'react';
import { GameContext } from './GameContext';
import ErrorPage from './ErrorPage';
import './dnd.css';

const WebsiteSections = ({ onComponentDrop }) => {
  const { freezeScreen } = useContext(GameContext);
  const [hoveredSection, setHoveredSection] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  // Fixed section IDs
  const fixedSectionIds = {
    header: 1001,
    navbar: 2002,
    hero: 3003,
    content: 4004,
    sidebar: 5005,
    features: 6006,
    contact: 7007,
    footer: 8008,
  };

  // Website sections
  const sections = Object.keys(fixedSectionIds).map((id) => ({
    id,
    label: id.charAt(0).toUpperCase() + id.slice(1).replace(/-/g, ' '),
  }));

  // Handle component drop
  const handleDrop = (e, sectionId) => {
    e.preventDefault();
    try {
      const componentData = JSON.parse(e.dataTransfer.getData('component'));
      const componentNumericId = componentData.id.split('-')[1];

      if (componentNumericId === fixedSectionIds[sectionId].toString()) {
        onComponentDrop(componentData, sectionId, true);
      } else {
        setErrorMessage(
          `Incorrect placement! Component '${componentData.label}' with ID '${componentData.id}' doesn't match section '${sectionId}-${fixedSectionIds[sectionId]}'`
        );
        freezeScreen(true);
        setTimeout(() => {
          freezeScreen(false);
          setErrorMessage(null);
        }, (Math.random() * 5 + 5) * 1000);
        onComponentDrop(componentData, sectionId, false);
      }
    } catch (error) {
      console.error('Error handling drop:', error);
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
                  ID: {section.id}-{fixedSectionIds[section.id]}
                </div>
              </div>
            ) : (
              <div className="section-label">{section.label}</div>
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
