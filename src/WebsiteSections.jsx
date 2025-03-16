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
    navbar: 20021, //[2002, 2003, 2004],
    login: 25042, //[2503, 2504, 2505],
    content: 40060, //[4004, 4005, 4006],
    imageTop: 45050, //[4505, 4506, 4507],
    imageLeft: 50061, // [5004, 5005, 5006],
    contactForm: 60072, //[6006, 6007, 6008],
    buttons: 65081, //[6508, 6507, 6506],
    buttonsAlt: 70072, // [7007, 7008, 7009],
    footer: 80082, // [8008, 8009, 8010],
  };

  // Website sections
  const sections = Object.keys(sectionIds).map((id) => ({
    id,
    label: id.charAt(0).toUpperCase() + id.slice(1).replace(/-/g, " "),
    numericId: sectionIds[id],
  }));

  // Handle component drop
  const [placedComponents, setPlacedComponents] = useState({});

  // This is a partial fix for the handleDrop function in WebsiteSections.jsx
  // Replace only this function in your WebsiteSections component

  const handleDrop = (e, sectionId) => {
    e.preventDefault();
    try {
      // Store the original sectionId for later use
      const originalSectionId = sectionId;

      // Extract the base section name (e.g., "navbar", "footer")
      const baseSectionId = sectionId.split("-")[0];

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
      if (placedComponents[baseSectionId]) {
        setErrorMessage(`Section '${baseSectionId}' already has a component.`);
        return;
      }

      // Get the expected numeric ID for this section
      const expectedSectionId = sectionIds[baseSectionId];
      console.log(
        "Expected Section ID:",
        expectedSectionId,
        "Component ID:",
        componentNumericId
      );

      // Check if the dropped component matches the section ID
      if (
        componentNumericId === expectedSectionId || // Exact match
        String(componentNumericId).startsWith(String(expectedSectionId)) || // Prefix match
        String(expectedSectionId).startsWith(String(componentNumericId))
      ) {
        // Find the matching component from componentData array using the base ID
        const matchingComponent = componentData.find((comp) => {
          const compIdParts = comp.id.split("-");
          const compNumericId = Number(compIdParts[1] || comp.id);
          console.log("Matching:", compNumericId, baseComponentId);
          return compNumericId === baseComponentId;
        });

        if (matchingComponent) {
          // Create an enhanced component object with the image path
          console.log("Matching component found!");
          const enhancedComponent = {
            ...droppedComponentData,
            imagePath:
              matchingComponent.imagePath + parseInt(fullId.slice(4)) + ".png",
            variant: parseInt(fullId.slice(4)) || 0,
            targetSection: matchingComponent.targetSection,
          };

          // Update state with the placed component
          setPlacedComponents((prev) => ({
            ...prev,
            [baseSectionId]: enhancedComponent,
          }));

          // Call the parent callback with success - use the original sectionId for the callback
          onComponentDrop(enhancedComponent, originalSectionId, true);
        } else {
          console.error("Could not find matching component in componentData");
          setErrorMessage(
            "Component data missing. Please try another component."
          );
        }
      } else {
        // Handle incorrect placement
        console.log("Incorrect placement!");
        setErrorMessage(
          `Incorrect placement! Component ID ${componentNumericId} doesn't match section ID ${expectedSectionId}.`
        );
        freezeScreen(true);
        setTimeout(() => {
          freezeScreen(false);
          setErrorMessage(null);
        }, (Math.random() * 3 + 3) * 1000);

        // Report the incorrect placement to the parent
        onComponentDrop(droppedComponentData, originalSectionId, false);
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
            onDrop={(e) => handleDrop(e, "navbar-" + sectionIds.navbar)}
          >
            <div className="section-content">
              {hoveredSection === "navbar" &&
                !placedComponents["navbar"]?.imagePath && (
                  <div className="section-id-reveal">
                    <div className="section-id">ID: {sectionIds.navbar}</div>
                  </div>
                )}
              {placedComponents["navbar"]?.imagePath && (
                <div
                  className="placed-component"
                  style={{
                    width: "100%",
                    height: "100%",
                    position: "relative",
                  }}
                >
                  <img
                    src={placedComponents["navbar"].imagePath}
                    className="component-image"
                    style={{
                      width: "100%",
                      height: "100%",
                      position: "absolute",
                      top: 0,
                      left: 0,
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Login Section */}
          <div
            id={`section-login`}
            className={`website-section login-section ${
              hoveredSection === "login" &&
              !placedComponents["login"]?.imagePath
                ? "section-highlighted"
                : ""
            }`}
            onMouseEnter={() =>
              !placedComponents["login"]?.imagePath &&
              setHoveredSection("login")
            }
            onMouseLeave={() =>
              !placedComponents["login"]?.imagePath && setHoveredSection(null)
            }
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, "login-" + sectionIds.login)}
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
                    style={{
                      width: "100%",
                      height: "100%",
                      position: "absolute",
                      top: 0,
                      left: 0,
                    }}
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
                hoveredSection === "content" &&
                !placedComponents["content"]?.imagePath
                  ? "section-highlighted"
                  : ""
              }`}
              onMouseEnter={() =>
                !placedComponents["content"]?.imagePath &&
                setHoveredSection("content")
              }
              onMouseLeave={() =>
                !placedComponents["content"]?.imagePath &&
                setHoveredSection(null)
              }
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e, "content-" + sectionIds.content)}
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
                      style={{
                        width: "100%",
                        height: "100%",
                        position: "absolute",
                        top: 0,
                        left: 0,
                      }}
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
              onDrop={(e) => handleDrop(e, "imageLeft-" + sectionIds.imageLeft)}
            >
              <div className="section-content">
                {hoveredSection === "imageLeft" &&
                  !placedComponents["imageLeft"]?.imagePath && (
                    <div className="section-id-reveal">
                      <div className="section-id">
                        ID: {sectionIds.imageLeft}
                      </div>
                    </div>
                  )}
                {placedComponents["imageLeft"]?.imagePath && (
                  <div className="placed-component">
                    <img
                      src={placedComponents["imageLeft"].imagePath}
                      className="component-image"
                      style={{
                        width: "100%",
                        height: "100%",
                        position: "absolute",
                        top: 0,
                        left: 0,
                      }}
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
                !placedComponents["imageTop"]?.imagePath &&
                setHoveredSection(null)
              }
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e, "imageTop-" + sectionIds.imageTop)}
            >
              <div className="section-content">
                {hoveredSection === "imageTop" &&
                  !placedComponents["imageTop"]?.imagePath && (
                    <div className="section-id-reveal">
                      <div className="section-id">
                        ID: {sectionIds.imageTop}
                      </div>
                    </div>
                  )}
                {placedComponents["imageTop"]?.imagePath && (
                  <div className="placed-component">
                    <img
                      src={placedComponents["imageTop"].imagePath}
                      className="component-image"
                      style={{
                        width: "100%",
                        height: "100%",
                        position: "absolute",
                        top: 0,
                        left: 0,
                      }}
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
              onDrop={(e) =>
                handleDrop(e, "contactForm-" + sectionIds.contactForm)
              }
            >
              <div className="section-content">
                {hoveredSection === "contactForm" &&
                  !placedComponents["contactForm"]?.imagePath && (
                    <div className="section-id-reveal">
                      <div className="section-id">
                        ID: {sectionIds.contactForm}
                      </div>
                    </div>
                  )}
                {placedComponents["contactForm"]?.imagePath && (
                  <div className="placed-component">
                    <img
                      src={placedComponents["contactForm"].imagePath}
                      className="component-image"
                      style={{
                        width: "100%",
                        height: "100%",
                        position: "absolute",
                        top: 0,
                        left: 0,
                      }}
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
                onDrop={(e) => handleDrop(e, "buttons-" + sectionIds.buttons)}
              >
                <div className="section-content">
                  {hoveredSection === "buttons" &&
                    !placedComponents["buttons"]?.imagePath && (
                      <div className="section-id-reveal">
                        <div className="section-id">
                          ID: {sectionIds.buttons}
                        </div>
                      </div>
                    )}
                  {placedComponents["buttons"]?.imagePath && (
                    <div className="placed-component">
                      <img
                        src={placedComponents["buttons"].imagePath}
                        className="component-image"
                        style={{
                          width: "100%",
                          height: "100%",
                          position: "absolute",
                          top: 0,
                          left: 0,
                        }}
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
                onDrop={(e) =>
                  handleDrop(e, "buttonsAlt-" + sectionIds.buttonsAlt)
                }
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
                        style={{
                          width: "100%",
                          height: "100%",
                          position: "absolute",
                          top: 0,
                          left: 0,
                        }}
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
            hoveredSection === "footer" &&
            !placedComponents["footer"]?.imagePath
              ? "section-highlighted"
              : ""
          }`}
          onMouseEnter={() =>
            !placedComponents["footer"]?.imagePath &&
            setHoveredSection("footer")
          }
          onMouseLeave={() =>
            !placedComponents["footer"]?.imagePath && setHoveredSection(null)
          }
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDrop(e, "footer-" + sectionIds.footer)}
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
                  style={{
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    top: 0,
                    left: 0,
                  }}
                />
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
