import React, { useState, useEffect } from "react";
import DraggableWord from "./DraggableWord";
import DroppableArea from "./DroppableArea";
import "../App.css"; // Windows 95 Styles

const Question = ({ questionData, onCorrect }) => {
  const [droppedWords, setDroppedWords] = useState([]);
  const [shuffledWords, setShuffledWords] = useState([]);
  const [isCorrect, setIsCorrect] = useState(null);
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    if (!questionData || !questionData.correctAnswer) return;

    // Ensure extraWords is always an array
    const extraWords = questionData.extraWords || []; 
    const allWords = [...questionData.correctAnswer, ...extraWords];

    setShuffledWords(allWords.sort(() => Math.random() - 0.5));
  }, [questionData]);

  const checkAnswer = () => {
    if (JSON.stringify(droppedWords) === JSON.stringify(questionData.correctAnswer)) {
      setIsCorrect(true);
      setIsLocked(true); // Prevent further changes
      onCorrect(); // Notify parent component
    } else {
      setIsCorrect(false);
    }
    setTimeout(() => setIsCorrect(null), 2000); // Hide message after 2 seconds
  };

  return (
    <div className="question-container">
      <h3>{questionData?.question}</h3>

      <DroppableArea droppedWords={droppedWords} setDroppedWords={setDroppedWords} disabled={isLocked} />

      <div style={{ marginTop: "10px", pointerEvents: isLocked ? "none" : "auto" }}>
        {shuffledWords.map((word, index) => (
          <DraggableWord key={index} word={word} />
        ))}
      </div>

      <button onClick={checkAnswer} style={{ marginTop: "10px" }} disabled={isLocked}>
        Check Answer
      </button>

      {isCorrect === true && <div className="correct-msg">✅ Correct!</div>}
      {isCorrect === false && <div className="wrong-msg">❌ Try Again!</div>}
    </div>
  );
};

export default Question;
