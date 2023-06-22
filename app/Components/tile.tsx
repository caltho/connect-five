import { useState } from "react";

type Tile = {
  rowIndex: number;
  colIndex: number;
  cell: string;
  winCondition: boolean;
  whiteTurn: boolean;
  handleClick: (clickedRowIndex: number, clickedColIndex: number) => void;
};

export default function Tile({
  rowIndex,
  colIndex,
  cell,
  winCondition,
  whiteTurn,
  handleClick,
}: Tile) {
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
          : () => [handleClick(rowIndex, colIndex), setHovered(false)]
      }
      onMouseEnter={
        cell === null && winCondition === false ? handleMouseEnter : undefined
      }
      onMouseLeave={
        cell === null && winCondition === false ? handleMouseLeave : undefined
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
}
