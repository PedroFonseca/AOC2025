const readInput = (rawInput: string) => {
  const [freshRanges, ingredientsToCheck] = rawInput.trim().split("\r\n\r\n");
  return {
    freshRanges: freshRanges
      .split("\r\n")
      .map((range) =>
        range.split("-").map((numStr) => parseInt(numStr.trim()))
      ),
    ingredientsToCheck: ingredientsToCheck
      .split("\r\n")
      .map((line) => parseInt(line.trim())),
  };
};
const isNumberInRange = (
  num: number,
  [rangeStart, rangeEnd]: number[]
): boolean => {
  return num >= rangeStart && num <= rangeEnd;
};

const first = (input: string) => {
  const { freshRanges, ingredientsToCheck } = readInput(input);
  const freshIngredients = ingredientsToCheck.filter((ingredient) =>
    freshRanges.some((range) => isNumberInRange(ingredient, range))
  );
  return freshIngredients.length;
};

const expectedFirstSolution = "798";

const second = (input: string) => {
  const { freshRanges } = readInput(input);
  const sortedRanges = freshRanges.sort((a, b) => a[0] - b[0]);
  const mergeRanges = sortedRanges.reduce((agg, curr) => {
    if (agg.length === 0 || agg[agg.length - 1][1] < curr[0]) {
      return [...agg, curr];
    }
    return [
      ...agg.slice(0, -1),
      [agg[agg.length - 1][0], Math.max(agg[agg.length - 1][1], curr[1])],
    ];
  }, [] as number[][]);
  const countRangeElements = mergeRanges.map(([start, end]) => end - start + 1);
  const totalCount = countRangeElements.reduce((acc, curr) => acc + curr, 0);
  return totalCount;
};

const expectedSecondSolution = "366181852921027";

export { expectedFirstSolution, expectedSecondSolution, first, second };
