import React, { useState } from "react";

// Define the size of the grid: you can define this 5 or 10
const gridSize = 10;

// Define types for the grid cell
type GridValue = number;

const generateRandomGrid = (): GridValue[][] => {
  const grid: GridValue[][] = [];
  for (let i = 0; i < gridSize; i++) {
    const row: GridValue[] = [];
    for (let j = 0; j < gridSize; j++) {
      row.push(Math.floor(Math.random() * 5) + 1); //Random numbers between 1 and 5
    }
    grid.push(row);
  }
  return grid;
};

const Grid: React.FC = () => {
  const [grid, setGrid] = useState<GridValue[][]>(generateRandomGrid());
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(
    null
  );
  const [highlightedCells, setHighlightedCells] = useState<[number, number][]>(
    []
  );

  //Handle cell click
  const handleCellClick = (row: number, col: number) => {
    setSelectedCell([row, col]);
    findAdjacentIdenticalCells(row, col);
  };

  //Check for adjacent identical cells
  const findAdjacentIdenticalCells = (row: number, col: number) => {
    const value = grid[row][col];
    const adjCells: [number, number][] = [];

    const directions: [number, number][] = [
      [-1, 0], // up
      [1, 0], // down
      [0, -1], // left
      [0, 1], // right
    ];

    directions.forEach(([dx, dy]) => {
      const newRow = row + dx;
      const newCol = col + dy;

      if (
        newRow >= 0 &&
        newRow < gridSize &&
        newCol >= 0 &&
        newCol < gridSize
      ) {
        if (grid[newRow][newCol] === value) {
          adjCells.push([newRow, newCol]);
        }
      }
    });
    setHighlightedCells(adjCells);
  };

  const getBackgroundColor = (cell: number): string => {
    // Define color classes for specific cell values
    const colorClasses: { [key: number]: string } = {
      1: "bg-blue-100",
      2: "bg-blue-200",
      3: "bg-blue-300",
      4: "bg-blue-400",
    };
    return colorClasses[cell] || "bg-blue-500";
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="grid grid-cols-10 gap-3 w-[45rem] h-[40rem] shadow-xl rounded p-2 bg-gray-200">
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              onClick={() => handleCellClick(rowIndex, colIndex)}
              className={`flex items-center justify-center cursor-pointer 
                w-full h-full text-lg font-semibold shadow-xl transition-all duration-100 
                ${
                  highlightedCells.some(
                    ([r, c]) => r === rowIndex && c === colIndex
                  )
                    ? "bg-red-300"
                    : getBackgroundColor(cell)
                }
                     ${
                       selectedCell &&
                       selectedCell[0] === rowIndex &&
                       selectedCell[1] === colIndex
                         ? "transform scale-110"
                         : ""
                     }
              `}
            >
              {cell}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Grid;
