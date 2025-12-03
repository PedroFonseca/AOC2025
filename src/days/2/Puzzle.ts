const reatInput = (rawInput: string) => rawInput.trim().split(',').map(range => range.trim().split('-').map(Number));
const isInvalidIdPart1 = (id: string): boolean => {
  // Slit in half and see if the two halves are the same
  return id.length % 2 === 0 && id.substring(0, id.length / 2) === id.substring(id.length / 2);
}
const isInvalidIdPart2 = (id: string): boolean => {
  for (let patternLen = 1; patternLen <= id.length / 2; patternLen++) {
    if (id.length % patternLen === 0) {
      const repeatCount = id.length / patternLen;
      if (repeatCount >= 2) {
        const pattern = id.substring(0, patternLen);
        if (pattern.repeat(repeatCount) === id) {
          return true;
        } 
      }
    }
  }
  return false;
}
const invalidIds = ([rangeStart, rangeEnd]: number[], isInvalidId: typeof isInvalidIdPart1): number[] => {
  return Array.from({length: rangeEnd - rangeStart + 1}, (_, i) => (i + rangeStart)).filter(id => isInvalidId(`${id}`));
}
const sumInvalidIds = (ids: number[]): number => {
  return ids.reduce((acc, curr) => acc + curr, 0);
}

const first = (input: string) => {
  const ranges = reatInput(input);
  const invalidIdsRange = ranges.flatMap(range => invalidIds(range, isInvalidIdPart1));
  return sumInvalidIds(invalidIdsRange);
};

const expectedFirstSolution = '37314786486';

const second = (input: string) => {
  const ranges = reatInput(input);
  const invalidIdsRange = ranges.flatMap(range => invalidIds(range, isInvalidIdPart2));
  return sumInvalidIds(invalidIdsRange);
};

const expectedSecondSolution = '47477053982';

export { expectedFirstSolution, expectedSecondSolution, first, second };
