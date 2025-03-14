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
    contactForm: 60061,
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
          <div
            id={`section-navbar`}
            className={`website-section navbar-section ${
              hoveredSection === "navbar" &&
              !placedComponents["navbar"]?.imagePath
                ? "section-highlighted"
                : ""
            }`}
            onMouseEnter={() =>
              !placedComponents["navbar"]?.imagePath &&
              setHoveredSection("navbar")
            }
            onMouseLeave={() =>
              !placedComponents["navbar"]?.imagePath && setHoveredSection(null)
            }
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, "navbar")}
          >
            <div className="section-content">
              {/* Show the ID on hover (only if no image is placed) */}
              {hoveredSection === "navbar" &&
                !placedComponents["navbar"]?.imagePath && (
                  <div className="section-id-reveal">
                    <div className="section-id">ID: {sectionIds.navbar}</div>
                  </div>
                )}

              {/* Show the image if it exists */}
              {placedComponents["navbar"]?.imagePath && (
                <div className="placed-component">
                  <img
                    src={placedComponents["navbar"].imagePath}
                    className="component-image"
                  />
                </div>
              )}
            </div>
          </div>

          <div
            id={`section-login`}
            className={`website-section login-section ${
              hoveredSection === "login" ? "section-highlighted" : ""
            }`}
            onMouseEnter={() => setHoveredSection("login")}
            onMouseLeave={() => setHoveredSection(null)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, "login")}
          >
            <div className="section-content">
              {hoveredSection === "login" ? (
                <div className="section-id-reveal">
                  <div className="section-id">ID: {sectionIds.login}</div>
                </div>
              ) : (
                <div className="section-label">
                  {placedComponents["login"]
                    ? placedComponents["login"].label
                    : ""}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Middle sections: Content, Images, Contact Form */}
        <div className="website-middle">
          <div className="website-middle-left">
            <div
              id={`section-content`}
              className={`website-section content-section ${
                hoveredSection === "content" ? "section-highlighted" : ""
              }`}
              onMouseEnter={() => setHoveredSection("content")}
              onMouseLeave={() => setHoveredSection(null)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e, "content")}
            >
              <div className="section-content">
                {hoveredSection === "content" ? (
                  <div className="section-id-reveal">
                    <div className="section-id">ID: {sectionIds.content}</div>
                  </div>
                ) : (
                  <div className="section-label">
                    {placedComponents["content"]
                      ? placedComponents["content"].label
                      : ""}
                  </div>
                )}
              </div>
            </div>

            <div
              id={`section-imageLeft`}
              className={`website-section image-section ${
                hoveredSection === "imageLeft" ? "section-highlighted" : ""
              }`}
              onMouseEnter={() => setHoveredSection("imageLeft")}
              onMouseLeave={() => setHoveredSection(null)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e, "imageLeft")}
            >
              <div className="section-content">
                {hoveredSection === "imageLeft" ? (
                  <div className="section-id-reveal">
                    <div className="section-id">ID: {sectionIds.imageLeft}</div>
                  </div>
                ) : (
                  <div className="section-label">
                    {placedComponents["imageLeft"]
                      ? placedComponents["imageLeft"].label
                      : ""}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="website-middle-right">
            <div
              id={`section-imageTop`}
              className={`website-section image-section ${
                hoveredSection === "imageTop" ? "section-highlighted" : ""
              }`}
              onMouseEnter={() => setHoveredSection("imageTop")}
              onMouseLeave={() => setHoveredSection(null)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e, "imageTop")}
            >
              <div className="section-content">
                {hoveredSection === "imageTop" ? (
                  <div className="section-id-reveal">
                    <div className="section-id">ID: {sectionIds.imageTop}</div>
                  </div>
                ) : (
                  <div className="section-label">
                    {placedComponents["imageTop"]
                      ? placedComponents["imageTop"].label
                      : ""}
                  </div>
                )}
              </div>
            </div>

            <div
              id={`section-contactForm`}
              className={`website-section contact-form-section ${
                hoveredSection === "contactForm" ? "section-highlighted" : ""
              }`}
              onMouseEnter={() => setHoveredSection("contactForm")}
              onMouseLeave={() => setHoveredSection(null)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e, "contactForm")}
            >
              <div className="section-content">
                {hoveredSection === "contactForm" ? (
                  <div className="section-id-reveal">
                    <div className="section-id">
                      ID: {sectionIds.contactForm}
                    </div>
                  </div>
                ) : (
                  <div className="section-label">
                    {placedComponents["contactForm"]
                      ? placedComponents["contactForm"].label
                      : ""}
                  </div>
                )}
              </div>
            </div>

            <div className="buttons-container">
              <div
                id={`section-buttons`}
                className={`website-section buttons-section ${
                  hoveredSection === "buttons" ? "section-highlighted" : ""
                }`}
                onMouseEnter={() => setHoveredSection("buttons")}
                onMouseLeave={() => setHoveredSection(null)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleDrop(e, "buttons")}
              >
                <div className="section-content">
                  {hoveredSection === "buttons" ? (
                    <div className="section-id-reveal">
                      <div className="section-id">ID: {sectionIds.buttons}</div>
                    </div>
                  ) : (
                    <div className="section-label">
                      {placedComponents["buttons"]
                        ? placedComponents["buttons"].label
                        : ""}
                    </div>
                  )}
                </div>
              </div>

              {/* Second button with its own ID */}
              <div
                id={`section-buttonsAlt`}
                className={`website-section buttons-section-placeholder ${
                  hoveredSection === "buttonsAlt" ? "section-highlighted" : ""
                }`}
                onMouseEnter={() => setHoveredSection("buttonsAlt")}
                onMouseLeave={() => setHoveredSection(null)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleDrop(e, "buttonsAlt")}
              >
                <div className="section-content">
                  {hoveredSection === "buttonsAlt" ? (
                    <div className="section-id-reveal">
                      <div className="section-id">
                        ID: {sectionIds.buttonsAlt}
                      </div>
                    </div>
                  ) : (
                    <div className="section-label">
                      {placedComponents["buttonsAlt"]
                        ? placedComponents["buttonsAlt"].label
                        : ""}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer section */}
        <div
          id={`section-footer`}
          className={`website-section footer-section ${
            hoveredSection === "footer" ? "section-highlighted" : ""
          }`}
          onMouseEnter={() => setHoveredSection("footer")}
          onMouseLeave={() => setHoveredSection(null)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDrop(e, "footer")}
        >
          <div className="section-content">
            {hoveredSection === "footer" ? (
              <div className="section-id-reveal">
                <div className="section-id">ID: {sectionIds.footer}</div>
              </div>
            ) : (
              <div className="section-label">
                {placedComponents["footer"]
                  ? placedComponents["footer"].label
                  : ""}
              </div>
            )}
          </div>
        </div>
      </div>

      {errorMessage && (
        <ErrorPage
          message={errorMessage}
          onClose={() => setErrorMessage(null)}
        />
      )}
    </div>
  );
};

export default WebsiteSections;
