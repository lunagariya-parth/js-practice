const input = [
  ["a", "b", "c"],
  ["c", "d", "f"],
  ["d", "f", "g"],
];
function countElement(arr) {
  const flatternArray = arr.flat();
  return flatternArray.reduce((a, c) => {
    if (a[c]) {
      a[c] += 1;
    } else {
      a[c] = 1;
    }
    return a;
  }, {});
}
console.log(countElement(input));
