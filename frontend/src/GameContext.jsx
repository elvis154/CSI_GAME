"use client";

import { createContext, useState, useEffect } from "react";
import { componentData } from "./ComponentData";

// Create Game Context
export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(4); // 4 minutes
  const [isCursorSlow, setIsCursorSlow] = useState(false);
  const [isScreenFrozen, setIsScreenFrozen] = useState(false);

  // Use all components from componentData
  const [components, setComponents] = useState(componentData);

  // Placed components tracking
  const [placedComponents, setPlacedComponents] = useState([]);

  // Track correct placements by section
  const [correctSections, setCorrectSections] = useState({
    navbar: false,
    login: false,
    content: false,
    imageTop: false,
    imageLeft: false,
    contactForm: false,
    buttons: false,
    buttonsAlt: false,
    footer: false,
  });

  // Add success and timeout screen states
  const [showSuccessScreen, setShowSuccessScreen] = useState(false);
  const [showTimeoutScreen, setShowTimeoutScreen] = useState(false);

  // Timer effect
  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (!isScreenFrozen) {
        // Only decrease timer when screen is not frozen
        setTimer((prevTimer) => {
          if (prevTimer <= 0) {
            clearInterval(timerInterval);
            // Handle game over - show timeout screen
            handleTimeout();
            return 0;
          }
          return prevTimer - 1;
        });
      }
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [isScreenFrozen]);

  // Add this useEffect for a periodic completion check
useEffect(() => {
  // Check completion every 5 seconds as a safety mechanism
  const completionInterval = setInterval(() => {
    // Count correct sections from correctSections state
    const correctCount = Object.values(correctSections).filter(Boolean).length;
    console.log(`Periodic check: ${correctCount}/9 sections correct`);
    
    if (correctCount >= 9 && !showSuccessScreen) {
      console.log("Periodic check detected all sections complete! Showing success screen.");
      setShowSuccessScreen(true);
      freezeScreen(true);
      setScore((prevScore) => prevScore + 0);
    }
  }, 5000);
  
  return () => clearInterval(completionInterval);
}, [correctSections, showSuccessScreen]);

  // Handle timeout when timer reaches 0
  const handleTimeout = () => {
    setShowTimeoutScreen(true);
    freezeScreen(true);
  };

  // Freeze screen function
  const freezeScreen = (freeze) => {
    setIsScreenFrozen(freeze);
  };

  // Check if component placement is correct (based on ID pattern)
  const checkPlacement = (componentId, sectionId) => {
    console.log("checkPlacement", componentId, sectionId);
    return componentId === sectionId;
  };

  // Handle component drop
  // Update in your handleComponentDrop function in GameContext.jsx
  const handleComponentDrop = (component, sectionId, isCorrect) => {
    // Extract the base section ID (without the numeric part)
    const baseSectionId = sectionId.split("-")[0];

    console.log(`DROPPING COMPONENT:`, {
      component,
      sectionId,
      baseSectionId,
      isCorrect,
    });

    // IMPORTANT: Make sure we're adding the component to placedComponents correctly
    const componentWithDetails = {
      ...component,
      sectionId,
      isCorrect,
      placedAt: Date.now(),
    };

    console.log("Adding to placedComponents:", componentWithDetails);

    // Add to placed components - use a callback to ensure we're working with latest state
    setPlacedComponents((prev) => {
      const newPlacedComponents = [...prev, componentWithDetails];
      console.log("Updated placedComponents:", newPlacedComponents);
      return newPlacedComponents;
    });

    // Update correct sections if placement is correct
    if (isCorrect) {
      console.log("Marking section as correct:", baseSectionId);
      setCorrectSections((prev) => {
        const updated = {
          ...prev,
          [baseSectionId]: true,
        };
        console.log("Updated correctSections:", updated);
        return updated;
      });

      // Update score
      setScore((prevScore) => prevScore + 10);
    } else {
      setScore((prevScore) => Math.max(0, prevScore - 5));
    }

    // Check for completion after state update - use a slightly longer timeout
    setTimeout(() => checkCompletion(), 200);
  };

  // After handleComponentDrop in your GameContext.jsx
useEffect(() => {
  // Special handling for the navbar section
  if (placedComponents.some(comp => comp.sectionId.startsWith("navbar-"))) {
    setCorrectSections(prev => ({
      ...prev,
      navbar: true
    }));
  }
}, [placedComponents]);

  // Check if all components are placed correctly
  // Update your checkCompletion function
  const checkCompletion = () => {
    // Get unique correctly placed components by sectionId base
    const uniqueCorrectPlacements = new Set();
  
    // Count correct placements from placedComponents array
    placedComponents.forEach((comp) => {
      if (comp.isCorrect) {
        // Extract the base section ID (without the numeric part)
        const baseSectionId = comp.sectionId.split("-")[0];
        uniqueCorrectPlacements.add(baseSectionId);
      }
    });
  
    // Log all the correctly placed sections for debugging
    console.log("Correct sections:", correctSections);
    console.log(`Unique correct placements set:`, [...uniqueCorrectPlacements]);
    console.log(`Unique correct placements: ${uniqueCorrectPlacements.size}/9`);
  
    // Also check using our correctSections object
    const correctSectionsCount = Object.values(correctSections).filter(Boolean).length;
    console.log(`Correct sections count: ${correctSectionsCount}/9`);
  
    // Count the number of expected sections
    const totalSections = Object.keys(correctSections).length;
    console.log(`Total expected sections: ${totalSections}`);
  
    // Check if all placed components are correct (using a slightly lower threshold)
    const totalCorrectPlacements = Math.max(uniqueCorrectPlacements.size, correctSectionsCount);
    
    // If we have 8 or more correct placements, show success
    if (totalCorrectPlacements >= 8) {
      console.log("At least 8 sections completed! Showing success screen.");
      setShowSuccessScreen(true);
      setScore((prevScore) => prevScore + 0);
      return;
    }
  
    // Original check for 9 sections
    if (correctSectionsCount >= 8 || uniqueCorrectPlacements.size >= 8) {
      console.log("All 9 sections completed! Showing success screen.");
      setShowSuccessScreen(true);
      setScore((prevScore) => prevScore + 0);
    }
  }

  // Handle OK button click on success screen
  const handleSuccessOk = () => {
    // Refresh the page to reset the game
    window.location.reload();
  };

  // Handle OK button click on timeout screen
  const handleTimeoutOk = () => {
    // Refresh the page to reset the game
    window.location.reload();
  };

  return (
    <GameContext.Provider
      value={{
        score,
        timer,
        isCursorSlow,
        isScreenFrozen,
        components,
        placedComponents,
        correctSections,
        checkPlacement,
        handleComponentDrop,
        freezeScreen,
        showSuccessScreen,
        handleSuccessOk,
        showTimeoutScreen,
        handleTimeoutOk,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
