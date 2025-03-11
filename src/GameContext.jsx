import React, { createContext, useState, useEffect } from 'react';

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [timer, setTimer] = useState(300); // 5 minutes in seconds
  const [isPaused, setIsPaused] = useState(false);
  const [isCursorSlow, setIsCursorSlow] = useState(false);
  const [isScreenFrozen, setIsScreenFrozen] = useState(false);
  const [components, setComponents] = useState([]);
  const [placedComponents, setPlacedComponents] = useState([]);
  const [errors, setErrors] = useState(0);
  const [targetLayout, setTargetLayout] = useState([]);
  
  // Load level data
  useEffect(() => {
    loadLevel(level);
  }, [level]);
  
  // Timer countdown
  useEffect(() => {
    let interval = null;
    if (!isPaused && timer > 0) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      // Game over when timer reaches 0
      handleGameOver();
    }
    return () => clearInterval(interval);
  }, [isPaused, timer]);
  
  // Apply cursor slowdown penalty
  const applyCursorSlowdown = (duration = 10) => {
    setIsCursorSlow(true);
    document.body.classList.add('slow-cursor');
    
    setTimeout(() => {
      setIsCursorSlow(false);
      document.body.classList.remove('slow-cursor');
    }, duration * 1000);
  };
  
  // Apply screen freeze penalty
  const applyScreenFreeze = (duration = 3) => {
    setIsScreenFrozen(true);
    setIsPaused(true);
    
    setTimeout(() => {
      setIsScreenFrozen(false);
      setIsPaused(false);
    }, duration * 1000);
  };
  
  // Check if component placement is correct
  const checkPlacement = (componentId, zoneId) => {
    const isCorrect = targetLayout.some(item => 
      item.componentId === componentId && item.zoneId === zoneId
    );
    
    if (isCorrect) {
      // Reward points for correct placement
      setScore(prevScore => prevScore + 10);
    } else {
      // Record an error and apply penalties
      recordError();
    }
    
    return isCorrect;
  };
  
  // Record an error and apply appropriate penalty
  const recordError = () => {
    setErrors(prevErrors => prevErrors + 1);
    
    // Apply different penalties based on error count
    if (errors % 2 === 0) {
      applyCursorSlowdown();
    } else {
      applyScreenFreeze();
    }
  };
  
  // Load level data
  const loadLevel = (levelNumber) => {
    // Website builder level data
    const levelData = {
      1: {
        components: [
          { id: 'logo1', type: 'image', label: 'Logo' },
          { id: 'nav1', type: 'menu', label: 'Navigation Menu' },
          { id: 'hero1', type: 'text', label: 'Hero Heading' },
          { id: 'btn1', type: 'button', label: 'Call to Action' },
          { id: 'img1', type: 'image', label: 'Hero Image' },
          { id: 'txt1', type: 'text', label: 'Content Block' },
          { id: 'feat1', type: 'card', label: 'Feature Card' },
          { id: 'form1', type: 'form', label: 'Contact Form' },
          { id: 'social1', type: 'social', label: 'Social Links' },
          { id: 'copyright1', type: 'text', label: 'Copyright Text' }
        ],
        targetLayout: [
          { componentId: 'logo1', zoneId: 'navbar' },
          { componentId: 'nav1', zoneId: 'navbar' },
          { componentId: 'hero1', zoneId: 'hero' },
          { componentId: 'btn1', zoneId: 'hero' },
          { componentId: 'img1', zoneId: 'hero' },
          { componentId: 'txt1', zoneId: 'main-content' },
          { componentId: 'feat1', zoneId: 'main-content' },
          { componentId: 'form1', zoneId: 'sidebar' },
          { componentId: 'social1', zoneId: 'footer' },
          { componentId: 'copyright1', zoneId: 'footer' }
        ]
      },
      2: {
        // Level 2 data
        components: [
          { id: 'logo2', type: 'image', label: 'Logo' },
          { id: 'nav2', type: 'menu', label: 'Menu' },
          { id: 'slider1', type: 'slider', label: 'Image Slider' },
          { id: 'heading1', type: 'heading', label: 'Section Heading' },
          { id: 'gallery1', type: 'gallery', label: 'Product Gallery' },
          { id: 'sidebar1', type: 'text', label: 'Categories' },
          { id: 'cart1', type: 'button', label: 'Shopping Cart' },
          { id: 'newsletter1', type: 'form', label: 'Newsletter Signup' },
          { id: 'contact1', type: 'text', label: 'Contact Info' },
          { id: 'social2', type: 'social', label: 'Social Media' }
        ],
        targetLayout: [
          { componentId: 'logo2', zoneId: 'navbar' },
          { componentId: 'nav2', zoneId: 'navbar' },
          { componentId: 'cart1', zoneId: 'navbar' },
          { componentId: 'slider1', zoneId: 'hero' },
          { componentId: 'sidebar1', zoneId: 'sidebar' },
          { componentId: 'heading1', zoneId: 'main-content' },
          { componentId: 'gallery1', zoneId: 'main-content' },
          { componentId: 'newsletter1', zoneId: 'footer' },
          { componentId: 'contact1', zoneId: 'footer' },
          { componentId: 'social2', zoneId: 'footer' }
        ]
      }
    };
    
    // Set level data
    if (levelData[levelNumber]) {
      setComponents(levelData[levelNumber].components);
      setTargetLayout(levelData[levelNumber].targetLayout);
      setPlacedComponents([]);
    }
  };
  
  // Handle game over
  const handleGameOver = () => {
    setIsPaused(true);
    // Additional game over logic
  };
  
  // Component drop handler
  const handleComponentDrop = (component, zoneId, isCorrect) => {
    const placement = {
      componentId: component.id,
      zoneId,
      isCorrect
    };
    
    // Check if this component is already placed somewhere
    const existingIndex = placedComponents.findIndex(p => p.componentId === component.id);
    
    if (existingIndex >= 0) {
      // Update the placement if component was previously placed
      const updatedPlacements = [...placedComponents];
      updatedPlacements[existingIndex] = placement;
      setPlacedComponents(updatedPlacements);
    } else {
      // Add as a new placement
      setPlacedComponents(prev => [...prev, placement]);
    }
    
    // Check if level is complete
    checkLevelCompletion();
  };
  
  // Check if all required components are correctly placed
  const checkLevelCompletion = () => {
    // Get all correct placements
    const correctPlacements = placedComponents.filter(p => p.isCorrect);
    
    // Check if each target placement has been correctly made
    const allTargetsPlaced = targetLayout.every(target => 
      correctPlacements.some(p => 
        p.componentId === target.componentId && p.zoneId === target.zoneId
      )
    );
    
    if (allTargetsPlaced) {
      // Level complete!
      setLevel(prevLevel => prevLevel + 1);
      // Add bonus points for completing the level
      setScore(prevScore => prevScore + 100);
    }
  };
  
  return (
    <GameContext.Provider
      value={{
        score,
        level,
        timer,
        isPaused,
        isCursorSlow,
        isScreenFrozen,
        components,
        placedComponents,
        errors,
        setIsPaused,
        checkPlacement,
        handleComponentDrop,
        loadLevel,
        recordError
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameContext;