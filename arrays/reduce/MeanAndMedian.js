const input = [12, 46, 32, 64];

function MeanAndMedian(arr) {
  let sortedArr = arr.sort((a, b) => a - b);
  const n = sortedArr.length;
  const mean = sortedArr.reduce((acc, cur) => {
    return (acc += cur / n);
  }, 0);
  let medain = 0;
  if (n % 2 == 0) {
    medain = (sortedArr[n / 2 - 1] + sortedArr[n / 2]) / 2;
  } else {
    medain = sortedArr[(n + 1) / 2 - 1];
  }
  return { mean: mean, medain: medain };
}

console.log(MeanAndMedian(input));
