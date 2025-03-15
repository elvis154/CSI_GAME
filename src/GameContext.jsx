import React, { createContext, useState, useEffect } from 'react';
import { componentData } from './ComponentData';

// Create Game Context
export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [timer, setTimer] = useState(240); // 4 minutes
  const [isCursorSlow, setIsCursorSlow] = useState(false);
  const [isScreenFrozen, setIsScreenFrozen] = useState(false);
  
  // Use all components from componentData
  const [components, setComponents] = useState(componentData);
  
  // Placed components tracking
  const [placedComponents, setPlacedComponents] = useState([]);
  
  // Timer effect
  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (!isScreenFrozen) { // Only decrease timer when screen is not frozen
        setTimer((prevTimer) => {
          if (prevTimer <= 0) {
            clearInterval(timerInterval);
            // Handle game over
            return 0;
          }
          return prevTimer - 1;
        });
      }
    }, 1000);
    
    return () => clearInterval(timerInterval);
  }, [isScreenFrozen]);
  
  // Freeze screen function
  const freezeScreen = (freeze) => {
    setIsScreenFrozen(freeze);
  };
  
  // Check if component placement is correct (based on ID pattern)
  const checkPlacement = (componentId, sectionId) => {
    console.log("checkPlacement", componentId, sectionId, level)
    
    return (componentId===sectionId);
  };
  
  // Handle component drop
  const handleComponentDrop = (component, sectionId, isCorrect) => {
    // Add to placed components
    setPlacedComponents(prev => [
      ...prev,
      { ...component, sectionId, isCorrect, placedAt: Date.now() }
    ]);
    
    // Update score
    console.log("cooooo", isCorrect)
    if (isCorrect) {
      setScore(prevScore => prevScore + 10);
    } else {
      setScore(prevScore => Math.max(0, prevScore - 5));
    }
    
    // Check level completion
    checkLevelCompletion();
  };
  
  // Check if level is complete
  const checkLevelCompletion = () => {
    // For simplicity, let's say a level is complete when at least 8 components are correctly placed
    const correctPlacements = placedComponents.filter(c => c.isCorrect).length;
    
    // Determine required components based on level
    const requiredComponents = 5 + level; // increases with level
    
    if (correctPlacements >= requiredComponents) {
      // Level complete!
      setLevel(prevLevel => prevLevel + 1);
      // Reset placed components for next level
      setPlacedComponents([]);
      // Add time bonus
      setTimer(prevTimer => prevTimer + 60);
      // Update score with completion bonus
      setScore(prevScore => prevScore + 50);
      // Load next level
      loadLevel(level + 1);
    }
  };
  
  // Load level data
  const loadLevel = (levelNum) => {
    console.log(`Loading level ${levelNum}`);
    
    // Increase difficulty as level increases
    if (levelNum > 1) {
      setIsCursorSlow(true);
    }
    
    if (levelNum > 2) {
      // Make components more challenging for placement
      // This would be populated with actual level data
      // For example, shuffle component targets or add more complex matching rules
    }
    
    // For higher levels, you could make only a subset of components available
    // or change the matching rules to be more complex
    if (levelNum > 3) {
      // Example: Only show a random subset of components for higher levels
      const shuffled = [...componentData].sort(() => 0.5 - Math.random());
      const selectedComponents = shuffled.slice(0, 20 + levelNum * 2); // Increase available components with level
      setComponents(selectedComponents);
    } else {
      // Reset to all components for lower levels
      setComponents(componentData);
    }
  };
  
  return (
    <GameContext.Provider
      value={{
        score,
        level,
        timer,
        isCursorSlow,
        isScreenFrozen,
        components,
        placedComponents,
        checkPlacement,
        handleComponentDrop,
        freezeScreen
      }}
    >
      {children}
    </GameContext.Provider>
  );
};