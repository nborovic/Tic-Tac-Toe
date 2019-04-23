import React, { Component } from "react";
import Board from "./Board";
import Timeline from "./Timeline";
import "./tictactoe.css";

const winCombinations = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [7, 5, 3]
];

class TicTacToe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePlayer: "X",
      squares: [
        { id: 1, active: false, player: null },
        { id: 2, active: false, player: null },
        { id: 3, active: false, player: null },
        { id: 4, active: false, player: null },
        { id: 5, active: false, player: null },
        { id: 6, active: false, player: null },
        { id: 7, active: false, player: null },
        { id: 8, active: false, player: null },
        { id: 9, active: false, player: null }
      ],
      history: [],
      turn: 0,
      winner: undefined
    };
  }

  changePlayer = currentPlayer => {
    return currentPlayer === "X" ? "O" : "X";
  };

  handleSquareClick = id => {
    if (this.state.squares[id - 1].active) return;

    this.setState(state => {
      let winner = undefined;
      const newPlayer = this.changePlayer(state.activePlayer);

      const newSquares = [];
      state.squares.forEach(square =>
        newSquares.push(Object.assign({}, square))
      );
      newSquares[id - 1].active = true;
      newSquares[id - 1].player = state.activePlayer;

      if (this.checkWinConditions(state.activePlayer, ...newSquares)) {
        winner = state.activePlayer;
        newSquares.map(square => (square.active = true));
      }

      let newHistory = [];
      state.history.forEach(move => newHistory.push(Object.assign({}, move)));

      let newTurn = state.turn + 1;

      console.log(newTurn);
      if (newTurn < newHistory.length)
        newHistory = newHistory.splice(
          newTurn - 1,
          newHistory.length - newTurn - 1
        );
      console.log(newHistory);

      newHistory.push({
        activePlayer: newPlayer,
        squares: newSquares,
        turn: newTurn,
        winner: winner
      });

      return {
        activePlayer: newPlayer,
        squares: newSquares,
        history: newHistory,
        turn: newTurn,
        winner: winner
      };
    });
  };

  checkWinConditions = (activePlayer, ...squares) => {
    const currentCombination = [];

    squares.forEach(square => {
      if (square.player === activePlayer) currentCombination.push(square.id);
    });

    let returnValue = false;

    winCombinations.forEach(combination => {
      if (
        currentCombination.includes(combination[0]) &&
        currentCombination.includes(combination[1]) &&
        currentCombination.includes(combination[2])
      )
        returnValue = true;
    });

    return returnValue;
  };

  handleMoveClick = move => {
    const newPlayer = move.activePlayer;
    const newSquares = move.squares;
    const newTurn = move.turn;
    const winner = move.winner;

    this.setState({
      activePlayer: newPlayer,
      squares: newSquares,
      turn: newTurn,
      winner: winner
    });
  };

  isMatchOver = () => {
    this.state.squares.forEach(square => {
      if (!square.active) return;
    });
  };

  render() {
    return (
      <>
        {this.state.winner === undefined ? (
          <p>Current player: {this.state.activePlayer}</p>
        ) : (
          <p>Winner: {this.state.winner}</p>
        )}

        <Board
          squares={this.state.squares}
          onSquareClick={this.handleSquareClick}
        />

        <Timeline
          history={this.state.history}
          onMoveClick={this.handleMoveClick}
        />
      </>
    );
  }
}

export default TicTacToe;
