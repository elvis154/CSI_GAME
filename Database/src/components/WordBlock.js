import React from "react";
import { useDrag } from "react-dnd";
import "./WordBlock.css"; // Ensure this CSS file exists for styling



const WordBlock = ({ word }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "word",
    item: { word },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <span ref={drag} className={`word-block ${isDragging ? "dragging" : ""}`}>
      {word}
    </span>
  );
};

export default WordBlock;
