import React from "react";
import { useDrag } from "react-dnd";

const DraggableWord = ({ word }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "WORD",
    item: { word },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <span
      ref={drag}
      style={{
        padding: "8px",
        margin: "5px",
        backgroundColor: "lightblue",
        borderRadius: "5px",
        cursor: "grab",
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      {word}
    </span>
  );
};

export default DraggableWord;
