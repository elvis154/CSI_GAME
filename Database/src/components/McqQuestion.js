import React, { useState, useEffect } from "react";
import DraggableWord from "./DraggableWord";
import DroppableArea from "./DroppableArea";
import "../App.css";

const McqQuestion = ({ questionData, onCorrect }) => {
  const [droppedWords, setDroppedWords] = useState([]);
  const [shuffledWords, setShuffledWords] = useState([]);
  const [isCorrect, setIsCorrect] = useState(null);
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    if (!questionData || !questionData.correctAnswer) return;

    const correctAnswer = [questionData.correctAnswer]; // Convert to array for consistency
    const extraWords = questionData.options.filter(word => word !== questionData.correctAnswer);

    const allWords = [...correctAnswer, ...extraWords].sort(() => Math.random() - 0.5);
    setShuffledWords(allWords);
    setDroppedWords([]);
    setIsCorrect(null);
    setIsLocked(false);
  }, [questionData]);

  const checkAnswer = () => {
    if (droppedWords.join(" ") === questionData.correctAnswer) {
      setIsCorrect(true);
      setIsLocked(true);
      onCorrect();
    } else {
      setIsCorrect(false);
    }
    setTimeout(() => setIsCorrect(null), 2000);
  };

  return (
    <div className="question-container">
      <h3>{questionData.question}</h3>
      <DroppableArea droppedWords={droppedWords} setDroppedWords={setDroppedWords} disabled={isLocked} />

      <div className="mcq-words">
        {shuffledWords.map((word, index) => (
          <DraggableWord key={index} word={word} />
        ))}
      </div>

      <button onClick={checkAnswer} disabled={isLocked}>Check Answer</button>

      {isCorrect && <div className="correct-msg">✅ Correct!</div>}
      {isCorrect === false && <div className="wrong-msg">❌ Wrong! Try Again.</div>}
    </div>
  );
};

export default McqQuestion;
