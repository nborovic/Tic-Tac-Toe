import React from "react";
import Square from "./Square";

const Board = props => {
  let squareRows = [0, 1, 2];

  return (
    <div className="tic-tac-toe__board">
      {squareRows.map(row => (
        <div key={row} className="board__row">
          {props.squares.slice(row * 3, (row + 1) * 3).map(square => (
            <Square
              key={square.id}
              className="row__square"
              id={square.id}
              player={props.squares[square.id - 1].player}
              onSquareClick={props.onSquareClick}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
