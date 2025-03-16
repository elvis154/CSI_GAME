import React, { useContext } from "react"
import { GameContext } from "./GameContext"
import "./dnd.css"

const SuccessScreen = () => {
  const { score, handleSuccessOk } = useContext(GameContext)

  return (
    <div className="win95-modal-overlay">
      <div className="win95-success-dialog">
        <div className="win95-title-bar">
          <div className="win95-title">Success!</div>
        </div>
        <div className="win95-success-content">
          <div className="win95-trophy-icon">🏆</div>
          <h2>Congratulations!</h2>
          <p>You have successfully completed the website layout!</p>
          <p>Final Score: {score}</p>
          <button className="win95-button" onClick={handleSuccessOk}>
            Play Again
          </button>
        </div>
      </div>
    </div>
  )
}

export default SuccessScreen