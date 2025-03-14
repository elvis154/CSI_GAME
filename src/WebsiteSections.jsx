import React, { useState, useContext, useEffect } from "react";
import { GameContext } from "./GameContext";
import ErrorPage from "./ErrorPage";
import "./dnd.css";
import { componentData } from "./ComponentData";

const WebsiteSections = ({ onComponentDrop }) => {
  const { freezeScreen } = useContext(GameContext);
  const [hoveredSection, setHoveredSection] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  // Fixed section IDs - these will be shown on hover
  const sectionIds = {
    navbar: 20031,
    login: 25031,
    content: 40041,
    imageTop: 45050,
    imageLeft: 50050,
    contactForm: 60071,
    buttons: 65062,
    buttonsAlt: 70070, // New ID for the second button
    footer: 80082,
  };

  // Website sections
  const sections = Object.keys(sectionIds).map((id) => ({
    id,
    label: id.charAt(0).toUpperCase() + id.slice(1).replace(/-/g, " "),
    numericId: sectionIds[id],
  }));

  // Handle component drop
  const [placedComponents, setPlacedComponents] = useState({});

  const handleDrop = (e, sectionId) => {
    e.preventDefault();
    try {
      // Get the component data from the drop event
      const droppedComponentData = JSON.parse(
        e.dataTransfer.getData("component")
      );
  
      // Extract the numeric ID
      const idParts = droppedComponentData.id.split("-");
      const fullId = idParts[1] || droppedComponentData.id; // Handle if there's no dash
      console.log("Full ID:", fullId);
      
      // Keep the full 5-digit ID
      const componentNumericId = Number(fullId);
      console.log("Component Numeric ID (5 digits):", componentNumericId);
      
      // Extract the base ID (first 4 digits) for matching with componentData
      const baseComponentId = parseInt(fullId.slice(0, 4));
      console.log("Base Component ID (4 digits):", baseComponentId);
  
      // Check if the component is already placed
      if (placedComponents[sectionId]) {
        setErrorMessage(`Section '${sectionId}' already has a component.`);
        return;
      }
  
      // Check if the dropped component matches the section ID
      console.log("Component ID:", componentNumericId, "Section ID:", sectionIds[sectionId]);
      if (componentNumericId === sectionIds[sectionId]) {
        // Find the matching component from componentData array using the base ID (4 digits)
        const matchingComponent = componentData.find((comp) => {
          const compIdParts = comp.id.split("-");
          const compNumericId = Number(compIdParts[1] || comp.id);
          console.log("Matching:", compNumericId, baseComponentId);
          return compNumericId === baseComponentId; // Compare with the 4-digit base ID
        });
  
        if (matchingComponent) {
          // Create an enhanced component object with the image path
          const enhancedComponent = {
            ...droppedComponentData,
            imagePath: matchingComponent.imagePath+parseInt(fullId.slice(4))+".png",
            variant: parseInt(fullId.slice(4)) || 0, // Extract variant from the 5th digit
            targetSection: matchingComponent.targetSection,
          };
  
          // Update state with the placed component
          setPlacedComponents((prev) => ({
            ...prev,
            [sectionId]: enhancedComponent,
          }));
  
          // Call the parent callback with success
          onComponentDrop(enhancedComponent, sectionId, true);
        } else {
          console.error("Could not find matching component in componentData");
          setErrorMessage(
            "Component data missing. Please try another component."
          );
        }
      } else {
        // Handle incorrect placement
        setErrorMessage(
          `Incorrect placement! Component ID ${componentNumericId} doesn't match section ID ${sectionIds[sectionId]}.`
        );
        freezeScreen(true);
        setTimeout(() => {
          freezeScreen(false);
          setErrorMessage(null);
        }, (Math.random() * 3 + 3) * 1000);
        onComponentDrop(droppedComponentData, sectionId, false);
      }
    } catch (error) {
      console.error("Error handling drop:", error);
      setErrorMessage("An error occurred while processing the component");
      setTimeout(() => setErrorMessage(null), 3000);
    }
  };

  return (
    <div className="website-builder">
      <div className="website-builder-title">Website Layout</div>
      <div className="website-builder-hint">
        Drag components to their matching sections
      </div>

      <div className="website-layout">
        {/* Top sections: Navbar and Login */}
        <div className="website-top">
          {/* Navbar Section */}
                    <div
                    id={`section-navbar`}
                    className={`website-section navbar-section ${
                    hoveredSection === "navbar" && !placedComponents["navbar"]?.imagePath
                    ? "section-highlighted"
                    : ""
                    }`}
                    onMouseEnter={() =>
                    !placedComponents["navbar"]?.imagePath && setHoveredSection("navbar")
                    }
                    onMouseLeave={() =>
                    !placedComponents["navbar"]?.imagePath && setHoveredSection(null)
                    }
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => handleDrop(e, "navbar")}
                    >
                    <div className="section-content">
                    {hoveredSection === "navbar" &&
                    !placedComponents["navbar"]?.imagePath && (
                    <div className="section-id-reveal">
                    <div className="section-id">ID: {sectionIds.navbar}</div>
                    </div>
                    )}
                    {placedComponents["navbar"]?.imagePath && (
                    <div className="placed-component" style={{ width: '100%', height: '100%', position: 'relative' }}>
                    <img
                        src={placedComponents["navbar"].imagePath}
                        className="component-image"
                        style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
                    />
                </div>
                
                    )}
                    </div>
                    </div>

                    {/* Login Section */}
          <div
            id={`section-login`}
            className={`website-section login-section ${
              hoveredSection === "login" && !placedComponents["login"]?.imagePath
                ? "section-highlighted"
                : ""
            }`}
            onMouseEnter={() =>
              !placedComponents["login"]?.imagePath && setHoveredSection("login")
            }
            onMouseLeave={() =>
              !placedComponents["login"]?.imagePath && setHoveredSection(null)
            }
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, "login")}
          >
            <div className="section-content">
              {hoveredSection === "login" &&
                !placedComponents["login"]?.imagePath && (
                  <div className="section-id-reveal">
                    <div className="section-id">ID: {sectionIds.login}</div>
                  </div>
                )}
              {placedComponents["login"]?.imagePath && (
                <div className="placed-component">
                  <img
                    src={placedComponents["login"].imagePath}
                    className="component-image"
                    style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Middle sections */}
        <div className="website-middle">
          <div className="website-middle-left">
            {/* Content Section */}
            <div
              id={`section-content`}
              className={`website-section content-section ${
                hoveredSection === "content" && !placedComponents["content"]?.imagePath
                  ? "section-highlighted"
                  : ""
              }`}
              onMouseEnter={() =>
                !placedComponents["content"]?.imagePath &&
                setHoveredSection("content")
              }
              onMouseLeave={() =>
                !placedComponents["content"]?.imagePath && setHoveredSection(null)
              }
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e, "content")}
            >
              <div className="section-content">
                {hoveredSection === "content" &&
                  !placedComponents["content"]?.imagePath && (
                    <div className="section-id-reveal">
                      <div className="section-id">ID: {sectionIds.content}</div>
                    </div>
                  )}
                {placedComponents["content"]?.imagePath && (
                  <div className="placed-component">
                    <img
                      src={placedComponents["content"].imagePath}
                      className="component-image"
                      style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Image Left Section */}
            <div
              id={`section-imageLeft`}
              className={`website-section image-section ${
                hoveredSection === "imageLeft" &&
                !placedComponents["imageLeft"]?.imagePath
                  ? "section-highlighted"
                  : ""
              }`}
              onMouseEnter={() =>
                !placedComponents["imageLeft"]?.imagePath &&
                setHoveredSection("imageLeft")
              }
              onMouseLeave={() =>
                !placedComponents["imageLeft"]?.imagePath &&
                setHoveredSection(null)
              }
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e, "imageLeft")}
            >
              <div className="section-content">
                {hoveredSection === "imageLeft" &&
                  !placedComponents["imageLeft"]?.imagePath && (
                    <div className="section-id-reveal">
                      <div className="section-id">ID: {sectionIds.imageLeft}</div>
                    </div>
                  )}
                {placedComponents["imageLeft"]?.imagePath && (
                  <div className="placed-component">
                    <img
                      src={placedComponents["imageLeft"].imagePath}
                      className="component-image"
                      style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="website-middle-right">
            {/* Image Top Section */}
            <div
              id={`section-imageTop`}
              className={`website-section image-section ${
                hoveredSection === "imageTop" &&
                !placedComponents["imageTop"]?.imagePath
                  ? "section-highlighted"
                  : ""
              }`}
              onMouseEnter={() =>
                !placedComponents["imageTop"]?.imagePath &&
                setHoveredSection("imageTop")
              }
              onMouseLeave={() =>
                !placedComponents["imageTop"]?.imagePath && setHoveredSection(null)
              }
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e, "imageTop")}
            >
              <div className="section-content">
                {hoveredSection === "imageTop" &&
                  !placedComponents["imageTop"]?.imagePath && (
                    <div className="section-id-reveal">
                      <div className="section-id">ID: {sectionIds.imageTop}</div>
                    </div>
                  )}
                {placedComponents["imageTop"]?.imagePath && (
                  <div className="placed-component">
                    <img
                      src={placedComponents["imageTop"].imagePath}
                      className="component-image"
                      style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Contact Form Section */}
            <div
              id={`section-contactForm`}
              className={`website-section contact-form-section ${
                hoveredSection === "contactForm" &&
                !placedComponents["contactForm"]?.imagePath
                  ? "section-highlighted"
                  : ""
              }`}
              onMouseEnter={() =>
                !placedComponents["contactForm"]?.imagePath &&
                setHoveredSection("contactForm")
              }
              onMouseLeave={() =>
                !placedComponents["contactForm"]?.imagePath &&
                setHoveredSection(null)
              }
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e, "contactForm")}
            >
              <div className="section-content">
                {hoveredSection === "contactForm" &&
                  !placedComponents["contactForm"]?.imagePath && (
                    <div className="section-id-reveal">
                      <div className="section-id">ID: {sectionIds.contactForm}</div>
                    </div>
                  )}
                {placedComponents["contactForm"]?.imagePath && (
                  <div className="placed-component">
                    <img
                      src={placedComponents["contactForm"].imagePath}
                      className="component-image"
                      style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="buttons-container">
              {/* Buttons Section */}
              <div
                id={`section-buttons`}
                className={`website-section buttons-section ${
                  hoveredSection === "buttons" &&
                  !placedComponents["buttons"]?.imagePath
                    ? "section-highlighted"
                    : ""
                }`}
                onMouseEnter={() =>
                  !placedComponents["buttons"]?.imagePath &&
                  setHoveredSection("buttons")
                }
                onMouseLeave={() =>
                  !placedComponents["buttons"]?.imagePath &&
                  setHoveredSection(null)
                }
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleDrop(e, "buttons")}
              >
                <div className="section-content">
                  {hoveredSection === "buttons" &&
                    !placedComponents["buttons"]?.imagePath && (
                      <div className="section-id-reveal">
                        <div className="section-id">ID: {sectionIds.buttons}</div>
                      </div>
                    )}
                  {placedComponents["buttons"]?.imagePath && (
                    <div className="placed-component">
                      <img
                        src={placedComponents["buttons"].imagePath}
                        className="component-image"
                        style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Buttons Alt Section */}
              <div
                id={`section-buttonsAlt`}
                className={`website-section buttons-section-placeholder ${
                  hoveredSection === "buttonsAlt" &&
                  !placedComponents["buttonsAlt"]?.imagePath
                    ? "section-highlighted"
                    : ""
                }`}
                onMouseEnter={() =>
                  !placedComponents["buttonsAlt"]?.imagePath &&
                  setHoveredSection("buttonsAlt")
                }
                onMouseLeave={() =>
                  !placedComponents["buttonsAlt"]?.imagePath &&
                  setHoveredSection(null)
                }
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleDrop(e, "buttonsAlt")}
              >
                <div className="section-content">
                  {hoveredSection === "buttonsAlt" &&
                    !placedComponents["buttonsAlt"]?.imagePath && (
                      <div className="section-id-reveal">
                        <div className="section-id">
                          ID: {sectionIds.buttonsAlt}
                        </div>
                      </div>
                    )}
                  {placedComponents["buttonsAlt"]?.imagePath && (
                    <div className="placed-component">
                      <img
                        src={placedComponents["buttonsAlt"].imagePath}
                        className="component-image"
                        style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div
          id={`section-footer`}
          className={`website-section footer-section ${
            hoveredSection === "footer" && !placedComponents["footer"]?.imagePath
              ? "section-highlighted"
              : ""
          }`}
          onMouseEnter={() =>
            !placedComponents["footer"]?.imagePath && setHoveredSection("footer")
          }
          onMouseLeave={() =>
            !placedComponents["footer"]?.imagePath && setHoveredSection(null)
          }
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDrop(e, "footer")}
        >
          <div className="section-content">
            {hoveredSection === "footer" &&
              !placedComponents["footer"]?.imagePath && (
                <div className="section-id-reveal">
                  <div className="section-id">ID: {sectionIds.footer}</div>
                </div>
              )}
            {placedComponents["footer"]?.imagePath && (
              <div className="placed-component">
                <img
                  src={placedComponents["footer"].imagePath}
                  className="component-image"
                  style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {errorMessage && (
        <ErrorPage message={errorMessage} onClose={() => setErrorMessage(null)} />
      )}
    </div>
  );
};

export default WebsiteSections;
