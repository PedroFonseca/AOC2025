import { readLines } from "../../utils/string.ts";

const readInput1 = (rawInput: string) => {
  const lines = readLines(rawInput).map((line) =>
    line.split(" ").filter((char) => char.length > 0)
  );
  return {
    numbers: lines[0].map((_numFirstRow, index) => {
      return lines.slice(0, -1).map((row) => parseInt(row[index]));
    }),
    operators: lines.slice(-1)[0],
  };
};
const readInput2 = (rawInput: string) => {
  const lines = readLines(rawInput);
  const operators = lines.slice(-1)[0];
  const { result, curr } = operators.split("").reduce(
    (agg, nextChar) => {
      if (agg.curr.length > 0 && nextChar !== " ") {
        return { result: [...agg.result, agg.curr], curr: nextChar };
      }
      return { result: agg.result, curr: agg.curr + nextChar };
    },
    { result: [] as string[], curr: "" }
  );
  const splitOperators = [...result, curr];
  // The length of each column
  const numberLengths = splitOperators.map((op) => op.length);
  let initIndex = 0;
  const extractedNumbersWithSpacesIntact = numberLengths.map(
    (len, indexNumberLengths) => {
      // bethween every column except the last one there is an extra space
      const stringLen =
        indexNumberLengths === numberLengths.length - 1 ? len : len - 1;
      const colRes = lines
        .slice(0, -1)
        .map((line) => line.substring(initIndex, initIndex + stringLen));
      initIndex += len;
      return colRes;
    }
  );
  return {
    numbers: extractedNumbersWithSpacesIntact,
    operators: splitOperators.map((op) => op.trim()),
  };
};

const applyOperator = (operator: string, numbers: number[]): number => {
  switch (operator) {
    case "+":
      return numbers.reduce((acc, curr) => acc + curr, 0);
    case "*":
      return numbers.reduce((acc, curr) => acc * curr, 1);
    default:
      throw new Error(`Unknown operator: ${operator}`);
  }
};

const first = (input: string) => {
  const { numbers, operators } = readInput1(input);
  const results = operators.map((operator, index) =>
    applyOperator(operator, numbers[index].map(Number))
  );
  return results.reduce((acc, curr) => acc + curr, 0);
};
const expectedFirstSolution = "6169101504608";

const second = (input: string) => {
  const { numbers, operators } = readInput2(input);
  const newNumbers = numbers.map((lineNumbers) => {
    const lineMaxLen = Math.max.apply(
      this,
      lineNumbers.map((num) => num.length)
    );
    const lineNums = lineNumbers.map((num) => num.split("").reverse());
    return Array.from({ length: lineMaxLen }, (_, i) =>
      Number(lineNums.map((nums) => nums[i] ?? "").join(""))
    );
  });
  const results = operators.map((operator, index) => {
    return applyOperator(operator, newNumbers[index]);
  });
  return results.reduce((acc, curr) => acc + curr, 0);
};

const expectedSecondSolution = "10442199710797";

export { expectedFirstSolution, expectedSecondSolution, first, second };
