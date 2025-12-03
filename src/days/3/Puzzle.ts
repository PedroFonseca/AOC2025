import { readLines } from "../../utils/string.ts";

const readInput = (rawInput: string) => {
  const lines = readLines(rawInput);
  const characters = lines.map((line) =>
    line.split("").map((char) => parseInt(char))
  );
  return characters;
};
const getMaxNumber = (nums: number[]): { maxNum: number; index: number } => {
  return nums.reduce(
    (agg, curr, index) => (curr > agg.maxNum ? { maxNum: curr, index } : agg),
    { maxNum: nums[0], index: 0 }
  );
};
const getBiggestJoltageBatteryPerBank = (bank: number[]): number => {
  const { maxNum, index } = getMaxNumber(bank.slice(0, bank.length - 1));
  const { maxNum: secondMaxNum } = getMaxNumber(bank.slice(index + 1));
  return parseInt(`${maxNum}${secondMaxNum}`);
};

const getBiggestJoltageBatteryPerBankAndSize = (
  bank: number[],
  size: number
): number => {
  const aggregation = Array.from({ length: size }, (_, i) => i).reduce(
    (agg, numberIndex) => {
      const endIndexCalc = -size + numberIndex + 1;
      const endIndex = endIndexCalc === 0 ? undefined : endIndexCalc;
      const { maxNum, index } = getMaxNumber(
        bank.slice(agg.nextIndex, endIndex)
      );
      return {
        numStr: `${agg.numStr}${maxNum}`,
        nextIndex: index + agg.nextIndex + 1,
      };
    },
    { numStr: "", nextIndex: 0 }
  );
  return parseInt(aggregation.numStr);
};

const first = (input: string) => {
  const inputData = readInput(input);
  const biggestJoltagePerBank = inputData.map((row) =>
    getBiggestJoltageBatteryPerBank(row)
  );
  return biggestJoltagePerBank.reduce((acc, curr) => acc + curr, 0);
};

const expectedFirstSolution = "17694";

const second = (input: string) => {
  const inputData = readInput(input);
  const biggestJoltagePerBank = inputData.map((row) =>
    getBiggestJoltageBatteryPerBankAndSize(row, 12)
  );
  return biggestJoltagePerBank.reduce((acc, curr) => acc + curr, 0);
};

const expectedSecondSolution = "175659236361660";

export { expectedFirstSolution, expectedSecondSolution, first, second };
17694;
