import React from "react";
import { useDrop } from "react-dnd";

const DroppableArea = ({ droppedWords, setDroppedWords, disabled }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "WORD",
    drop: (item) => {
      if (!disabled) {
        setDroppedWords((prevWords) => [...prevWords, item.word]);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const removeWord = (index) => {
    setDroppedWords((prevWords) => prevWords.filter((_, i) => i !== index));
  };

  return (
    <div
      ref={drop}
      style={{
        minHeight: "50px",
        border: "2px dashed gray",
        padding: "10px",
        display: "flex",
        flexWrap: "wrap",
        gap: "10px",
        backgroundColor: isOver ? "#d3ffd3" : "#f8f8f8",
        transition: "background-color 0.3s ease",
      }}
    >
      {droppedWords.length > 0 ? (
        droppedWords.map((word, index) => (
          <span
            key={index}
            onClick={() => removeWord(index)}
            style={{
              padding: "8px",
              backgroundColor: "lightgreen",
              cursor: "pointer",
              borderRadius: "5px",
            }}
          >
            {word}
          </span>
        ))
      ) : (
        <span style={{ color: "gray" }}>Drop words here</span>
      )}
    </div>
  );
};

export default DroppableArea;
