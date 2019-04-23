import React from "react";

const Square = props => {
  return (
    <div className="row__square" onClick={() => props.onSquareClick(props.id)}>
      <div className="square__player">{props.player}</div>
    </div>
  );
};

export default Square;
