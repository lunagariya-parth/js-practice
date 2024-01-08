// Write a JavaScript program to flatten a nested (any depth) array. If you pass shallow, the array will only be flattened to a single level.

// Sample Data:
// console.log(flatten([1, [2], [3, [[4]]],[5,6]]));
// [1, 2, 3, 4, 5, 6]
// console.log(flatten([1, [2], [3, [[4]]],[5,6]], true));
// [1, 2, 3, [[4]], 5, 6]

const input = [1, [2], [3, [[4]]], [5, 6]];
// function FlattenArray(input) {
//   let resArr = [];
//   let n = input.length;
//   let i = 0;
//   while (i < n) {
//     if (Array.isArray(input[i])) {
//       let j = 0;
//       let inn = input[i].length;
//       while (j < inn) {
//         resArr.push(input[i][j]);
//         j++;
//       }
//     } else {
//       resArr.push(input[i]);
//     }
//     i++;
//   }
//     return resArr;
// }
function FlattenArray(input) {
  let resArr = [];
  let n = input.length;
  let i = 0;
  while (i < n) {
    if (Array.isArray(input[i])) {
      resArr = resArr.concat(FlattenArray(input[i]));
    } else {
      resArr.push(input[i]);
    }
    i++;
  }
  return resArr;
}
console.log(FlattenArray([1, [2], [3, [[4]]], [5, 6]]));
