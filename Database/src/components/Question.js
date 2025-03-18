import React, { useState, useEffect } from "react";
import DraggableWord from "./DraggableWord";
import DroppableArea from "./DroppableArea";
import "../App.css";

const Question = ({ questionData, onCorrect }) => {
  const [droppedWords, setDroppedWords] = useState([]);
  const [shuffledWords, setShuffledWords] = useState([]);
  const [isCorrect, setIsCorrect] = useState(null);
  const [isLocked, setIsLocked] = useState(false);
  const [formattedAnswer, setFormattedAnswer] = useState("");

  useEffect(() => {
    if (!questionData || !Array.isArray(questionData.correctAnswer)) return;

    const extraWords = Array.isArray(questionData.extraWords) ? questionData.extraWords : [];
    const allWords = [...questionData.correctAnswer, ...extraWords].sort(() => Math.random() - 0.5);

    setShuffledWords(allWords);
    setDroppedWords([]);
    setIsCorrect(null);
    setIsLocked(false);

    // Generate the printed answer with two missing words
    setFormattedAnswer(generateFillInTheBlanks(questionData.correctAnswer));
  }, [questionData]);

  const generateFillInTheBlanks = (answerArray) => {
    let indicesToRemove = new Set();
    while (indicesToRemove.size < 2) {
      let randomIndex = Math.floor(Math.random() * answerArray.length);
      indicesToRemove.add(randomIndex);
    }

    return answerArray
      .map((word, index) => (indicesToRemove.has(index) ? "_____" : word))
      .join(" ");
  };

  const checkAnswer = () => {
    const isAnswerCorrect =
      droppedWords.length === questionData.correctAnswer.length &&
      droppedWords.every((word, index) => word === questionData.correctAnswer[index]);

    if (isAnswerCorrect) {
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
      <h3>{questionData?.question || "Loading question..."}</h3>

      {/* ✅ This is the new feature: Showing the answer with missing words */}
      <p style={{ fontStyle: "italic", color: "gray" }}>Hint: {formattedAnswer}</p>

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
