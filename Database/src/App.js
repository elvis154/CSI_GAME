import React, { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Question from "./components/Question";
import McqQuestion from "./components/McqQuestion";
import Timer from "./components/Timer";
import questions from "./data/questions";
import mcqQuestions from "./data/mcqQuestions";
import "./App.css";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";

const App = () => {
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [selectedMCQs, setSelectedMCQs] = useState([]);
  const [solvedQuestions, setSolvedQuestions] = useState(0);
  const [elapsedMinutes, setElapsedMinutes] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);

  useEffect(() => {
    const shuffledSQL = [...questions].sort(() => Math.random() - 0.5).slice(0, 3);
    const shuffledMCQ = [...mcqQuestions].sort(() => Math.random() - 0.5).slice(0, 2);
    setSelectedQuestions(shuffledSQL);
    setSelectedMCQs(shuffledMCQ);
  }, []);

  const handleCorrectAnswer = () => {
    setSolvedQuestions((prev) => {
      const newSolved = prev + 1;
      if (newSolved === 5) {
        setGameFinished(true);
        setTimeout(() => setShowPopup(true), 500); // Small delay for better UX
      }
      return newSolved;
    });
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setElapsedMinutes(0);
    setSolvedQuestions(0);
    setGameFinished(false);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="container">
        {/* Left Panel - SQL Queries */}
        <div className="left-panel">
          <h2 id="left-h2">SQL Query Challenge</h2>
          {selectedQuestions.map((q, index) => (
            <Question key={index} questionData={q} onCorrect={handleCorrectAnswer} />
          ))}
        </div>

        {/* Right Panel - Timer & MCQs */}
        <div className="right-panel">
          <div className="timer-section">
            <Timer onTimeUpdate={setElapsedMinutes} stopTimer={gameFinished} />
          </div>

          <div className="mcq-section">
            <h2 id="mcq-h2">📜 SQL MCQ Challenge</h2>
            {selectedMCQs.map((q, index) => (
              <McqQuestion key={index} questionData={q} onCorrect={handleCorrectAnswer} />
            ))}
          </div>
        </div>
      </div>

      {/* Popup Window for Final Score */}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>🎉 Database Created Successfully! 🎉</h2>
            <p>Your Final Score: {Math.max(100 - elapsedMinutes * 10, 0)} Points</p>
            <button
              className="win95-button"
              onClick={() => {
                // Sign out the user first
                signOut(auth)
                  .then(() => {
                    // Then redirect to login page
                    window.location.href = "/";
                  })
                  .catch((error) => {
                    console.error("Sign out error:", error);
                    // Still redirect even if there's an error
                    window.location.href = "/";
                  });
              }}
            >
              Return to Login
            </button>
          </div>
        </div>
      )}
    </DndProvider>
  );
};

export default App;
