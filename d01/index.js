const fs = require("fs");
const inputFilePath = "./input.txt";

const getInputAsArray = (buffer) => {
  const array = buffer?.split("\n");
  return array;
};

const getIncreasingCountByLine = (input) => {
  let count = [];
  input?.forEach((num, i) => {
    const bool = Number(num) > Number(input[i - 1]);
    count.push(bool);
  });
  const total = count.filter(Boolean).length;
  return total;
};

const getIncreasingCountBySum = (input, windowLen) => {
  let newArr = input?.reduce((arr, cur, inputIndex) => {
    const additive = Array.from({ length: windowLen - 1 }, (_, i) => i + 1);
    const num = additive.reduce(
      (newNum, add, currentIndex) =>
        currentIndex < windowLen &&
        Number(newNum) + Number(input[inputIndex + add]),
      cur
    );

    return [...arr, num];
  }, []);

  return getIncreasingCountByLine(newArr);
};

const getIncreasingNumber = (inputFile) => {
  fs.readFile(inputFile, (err, dataBuffer) => {
    if (err) {
      throw err;
    }
    const content = dataBuffer.toString();
    const input = getInputAsArray(content);

    console.log(
      "Total number of increases per line",
      getIncreasingCountByLine(input)
    );
    console.log(
      `Total number of increases per sum of 3 numbers`,
      getIncreasingCountBySum(input, 3)
    );
  });
};

getIncreasingNumber(inputFilePath);
