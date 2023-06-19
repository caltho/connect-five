"use client";

import { useState } from "react";

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
      row.map((cell, colIndex) =>
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
  const checkWinCondition = (board, rowIndex, colIndex) => {
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
            {row.map((cell, colIndex) => {
              const [hovered, setHovered] = useState<boolean>(false);

              const handleMouseEnter = () => {
                setHovered(true);
              };

              const handleMouseLeave = () => {
                setHovered(false);
              };
              return (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className="aspect-square relative"
                  onClick={
                    winCondition
                      ? undefined
                      : () => [
                          handleClick(rowIndex, colIndex),
                          setHovered(false),
                        ]
                  }
                  onMouseEnter={
                    cell === null && winCondition === false
                      ? handleMouseEnter
                      : undefined
                  }
                  onMouseLeave={
                    cell === null && winCondition === false
                      ? handleMouseLeave
                      : undefined
                  }
                >
                  {/* Render the player's piece based on the cell value */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    {hovered && (
                      <div
                        className={`absolute w-5/6 h-5/6 rounded-full bg-${
                          whiteTurn ? "orange-500" : "blue-600"
                        } opacity-20 rounded-full`}
                      />
                    )}
                    {cell === "black" && (
                      <div className="w-5/6 h-5/6 bg-orange-500 rounded-full z-10 drop-shadow-lg" />
                    )}
                    {cell === "white" && (
                      <div className="w-5/6 h-5/6 bg-blue-600 rounded-full z-10 drop-shadow-lg" />
                    )}
                    {/* all internal gridlines */}
                    {
                      <>
                        {colIndex !== 18 && (
                          <div className="absolute left-1/2 top-0 w-1/2 h-full transform -translate-x-full translate-y-1/2 border-r z-0 border-gray-400" />
                        )}
                        {rowIndex !== 18 && (
                          <div className="absolute left-0 top-1/2 w-full h-1/2 transform translate-x-1/2 -translate-y-full border-b z-0 border-gray-400" />
                        )}
                      </>
                    }

                    {cell === null && colIndex === 9 && rowIndex === 9 && (
                      <div className="absolute w-1/2 h-1/2 bg-gray-400 rounded-full" />
                    )}
                    {cell === null &&
                      (rowIndex + 3) % 6 == 0 &&
                      (colIndex + 3) % 6 == 0 && (
                        <div className="w-1/4 h-1/4 bg-gray-400 rounded-full" />
                      )}
                  </div>
                </div>
              );
            })}
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
