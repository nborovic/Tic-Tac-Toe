import React from "react";
import Move from "./Move";

const Timeline = props => {
  return (
    <div className="tic-tac-toe__timeline">
      <h2>Timeline</h2>

      {props.history.map((move, index) => (
        <Move
          key={index}
          id={index + 1}
          move={move}
          onMoveClick={props.onMoveClick}
        />
      ))}
    </div>
  );
};

export default Timeline;
