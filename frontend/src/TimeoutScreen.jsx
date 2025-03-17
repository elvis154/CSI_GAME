import React, { useContext } from "react"
import { GameContext } from "./GameContext"
import "./dnd.css"

const TimeoutScreen = () => {
  const { score, handleTimeoutOk } = useContext(GameContext)

  return (
    <div className="win95-modal-overlay">
      <div className="win95-success-dialog">
        <div className="win95-title-bar">
          <div className="win95-title">Time's Up!</div>
        </div>
        <div className="win95-success-content">
          <div className="win95-hourglass-icon">⌛</div>
          <h2>Time's Up!</h2>
          <p>Your time has run out.</p>
          <p>Final Score: {score}</p>
          <button className="win95-button" onClick={handleTimeoutOk}>
            Try Again
          </button>
        </div>
      </div>
    </div>
  )
}

export default TimeoutScreen