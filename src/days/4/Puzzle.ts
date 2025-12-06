import { readLines } from "../../utils/string.ts";

const readInput = (rawInput: string) => {
  const lines = readLines(rawInput);
  return lines.map((line) => line.split(""));
};
const neighborDirections = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];
const getNeighbors = (grid: string[][], row: number, col: number): string[] => {
  return neighborDirections
    .map(([dRow, dCol]) => [row + dRow, col + dCol])
    .filter(
      ([nRow, nCol]) =>
        nRow >= 0 && nRow < grid.length && nCol >= 0 && nCol < grid[0].length
    )
    .map(([nRow, nCol]) => grid[nRow][nCol]);
};
const countOccupiedNeighbors = (
  grid: string[][],
  row: number,
  col: number
): number => {
  return getNeighbors(grid, row, col).filter((seat) => seat === "@").length;
};
const first = (input: string) => {
  const grid = readInput(input);
  const positionsWithLessThan4 = grid.flatMap((row, rowIndex) =>
    row.map((cell, colIndex) =>
      cell === "@" && countOccupiedNeighbors(grid, rowIndex, colIndex) < 4
        ? 1
        : 0
    )
  );
  const sum = positionsWithLessThan4.reduce(
    (acc, curr) => acc + curr,
    0 as number
  );
  return sum;
};

const expectedFirstSolution = "1457";

const second = (input: string) => {
  let grid = readInput(input);
  let countTotalRollsRemoved = 0;
  let countRollsRemovedThisIteration = 0;
  do {
    countTotalRollsRemoved += countRollsRemovedThisIteration;
    countRollsRemovedThisIteration = 0;
    grid = grid.map((row, rowIndex) => {
      return row.map((cell, colIndex) => {
        if (
          cell === "@" &&
          countOccupiedNeighbors(grid, rowIndex, colIndex) < 4
        ) {
          countRollsRemovedThisIteration++;
          return ".";
        }
        return cell;
      });
    });
  } while (countRollsRemovedThisIteration > 0);
  return countTotalRollsRemoved;
};

const expectedSecondSolution = "8310";

export { expectedFirstSolution, expectedSecondSolution, first, second };
