import { readLines } from "../../utils/string.ts";

const normalizePosition = (position: number): number => {
  return (position + 1000) % 100;
}
const parseCommand = (command: string): {direction: string, value: number} => {
  const direction = command[0];
  const valueStr = command.slice(1);
  const value = parseInt(valueStr, 10);
  return { direction, value };
}
const applyCommand = (commandParsed: ReturnType<typeof parseCommand>, currentPosition: number): number => {
  const {direction, value} = commandParsed;

  switch (direction) {
    case 'R':
      return currentPosition + value;
    case 'L':
      return currentPosition - value;
    default:
      throw new Error(`Unknown direction: ${direction}`);
  }
}
const countClicksOnZero = (commandParsed: ReturnType<typeof parseCommand>, oldPosition: number) => {
  const {direction, value} = commandParsed;
  // Each 100 units crossed counts as a turn
  const numberOfExtraTurns = Math.floor(Math.abs(value) / 100);
  const newValue = value % 100;
  const nextPositionPreNormalize = applyCommand(commandParsed, oldPosition);
  const nextPosition = normalizePosition(nextPositionPreNormalize);
  if(
  // If it ends exactly on a 0 position, we need to add one more turn
    (oldPosition != 0 && nextPosition === 0) ||
    // If it crosses over 0 position but without a full lap
    (direction === 'R' && oldPosition + newValue > 100) ||
    (direction === 'L' && oldPosition - newValue < 0 && oldPosition !== 0)
  ) {
    return {clicksOnZero: numberOfExtraTurns + 1, nextPosition };
  }
  return {clicksOnZero: numberOfExtraTurns, nextPosition };
}
const first = (input: string) => {
  const lineCommands = readLines(input);
  const result = lineCommands.reduce((agg, lineCommand) => {
    const currentPosition = agg.currentPosition;
    const nextPosition = normalizePosition(applyCommand(parseCommand(lineCommand), currentPosition));
    agg.positions.push(nextPosition);
    return { currentPosition: nextPosition, positions: agg.positions };
  }, {currentPosition: 50, positions: [50]});
  return result.positions.filter(pos => pos === 0).length;
};

const expectedFirstSolution = '1180';

const second = (input: string) => {
  const lineCommands = readLines(input);
   const result = lineCommands.reduce((agg, command) => {
    const {clicksOnZero, nextPosition} = countClicksOnZero(parseCommand(command), agg.currentPosition);
    return { currentPosition: nextPosition, clicksOnZero: agg.clicksOnZero + clicksOnZero };
  }, {currentPosition: 50, clicksOnZero: 0});
  return result.clicksOnZero;
};

const expectedSecondSolution = '6892';

export { expectedFirstSolution, expectedSecondSolution, first, second };
