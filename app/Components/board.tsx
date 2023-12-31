"use client";

import { useState } from "react";
import Tile from "./tile";

const Board = () => {
  const [board, setBoard] = useState(Array(19).fill(Array(19).fill(null)));
  const [firstTurn, setFirstTurn] = useState<boolean>(true);
  const [whiteTurn, setWhiteTurn] = useState<boolean>(true);
  const [winCondition, setWinCondition] = useState<boolean>(false);

  const resetGame = () => {
    setBoard(Array(19).fill(Array(19).fill(null)));
    setWhiteTurn(!firstTurn);
    setFirstTurn(!firstTurn);
    setWinCondition(false);
  };

  const handleClick = (clickedRowIndex: number, clickedColIndex: number) => {
    // Check if the selected cell is already occupied
    if (board[clickedRowIndex][clickedColIndex] !== null) {
      return; // Cell already occupied, do nothing
    }
    // Handle the click event and update the board state accordingly
    const updatedBoard = board.map((row, rowIndex) =>
      row.map((cell: null | string, colIndex: number) =>
        rowIndex === clickedRowIndex && colIndex === clickedColIndex
          ? whiteTurn
            ? "black"
            : "white"
          : cell
      )
    );
    setBoard(updatedBoard);
    checkWinCondition(updatedBoard, clickedRowIndex, clickedColIndex)
      ? setWinCondition(true)
      : setWhiteTurn(!whiteTurn);
  };
  // Check for a winning condition
  const checkWinCondition = (
    board: string[],
    rowIndex: number,
    colIndex: number
  ) => {
    const currentPlayer = board[rowIndex][colIndex];

    // Check horizontal win condition
    let count = 1;
    let i = colIndex - 1;
    while (i >= 0 && board[rowIndex][i] === currentPlayer) {
      count++;
      i--;
    }
    i = colIndex + 1;
    while (i < board[rowIndex].length && board[rowIndex][i] === currentPlayer) {
      count++;
      i++;
    }
    if (count >= 5) {
      return true;
    }

    // Check vertical win condition
    count = 1;
    let j = rowIndex - 1;
    while (j >= 0 && board[j][colIndex] === currentPlayer) {
      count++;
      j--;
    }
    j = rowIndex + 1;
    while (j < board.length && board[j][colIndex] === currentPlayer) {
      count++;
      j++;
    }
    if (count >= 5) {
      return true;
    }

    // Check diagonal (top-left to bottom-right) win condition
    count = 1;
    i = colIndex - 1;
    j = rowIndex - 1;
    while (i >= 0 && j >= 0 && board[j][i] === currentPlayer) {
      count++;
      i--;
      j--;
    }
    i = colIndex + 1;
    j = rowIndex + 1;
    while (
      i < board[rowIndex].length &&
      j < board.length &&
      board[j][i] === currentPlayer
    ) {
      count++;
      i++;
      j++;
    }
    if (count >= 5) {
      return true;
    }

    // Check diagonal (top-right to bottom-left) win condition
    count = 1;
    i = colIndex + 1;
    j = rowIndex - 1;
    while (
      i < board[rowIndex].length &&
      j >= 0 &&
      board[j][i] === currentPlayer
    ) {
      count++;
      i++;
      j--;
    }
    i = colIndex - 1;
    j = rowIndex + 1;
    while (i >= 0 && j < board.length && board[j][i] === currentPlayer) {
      count++;
      i--;
      j++;
    }
    if (count >= 5) {
      return true;
    }

    return false; // No winning condition found
  };

  return (
    <div className="flex-col w-full">
      <div
        className={`flex w-full border-4 rounded-xl aspect-square bg-stone-900 ${
          winCondition
            ? whiteTurn
              ? "border-orange-600"
              : "border-blue-500"
            : undefined
        }`}
      >
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="flex-col w-full">
            {row.map((cell: string, colIndex: number) => (
              <Tile
                key={`${rowIndex}-${colIndex}`}
                rowIndex={rowIndex}
                colIndex={colIndex}
                cell={cell}
                winCondition={winCondition}
                whiteTurn={whiteTurn}
                handleClick={handleClick}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="flex-row">
        <button className="border p-2 mt-3 rounded text-lg" onClick={resetGame}>
          New Game
        </button>
        {winCondition && (
          <div className="text-2xl">
            {whiteTurn ? "Orange " : "Blue "} wins!
          </div>
        )}
      </div>
    </div>
  );
};

export default Board;
