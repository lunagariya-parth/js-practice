// Write a JavaScript function to generate an array of integer numbers, increasing one from the starting
// position, of a specified length.

// Test Data :
// console.log(array_range(1, 4));
// [1, 2, 3, 4]
// console.log(array_range(-6, 4));
// [-6, -5, -4, -3]

function array_range(start, length) {
  let resArr = [];
  if (length > 0) {
    for (let i = 0; i < length; i++) {
      resArr.push(start);
      start++;
    }
    return resArr;
  } else if (length == 0) {
    resArr.push(start);
    return resArr;
  } else {
    return "range can not be negative";
  }
}
console.log(array_range(1, 4));
console.log(array_range(-6, 4));
console.log(array_range(-6, 0));
console.log(array_range(-6, -1));