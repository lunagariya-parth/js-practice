// Write a JavaScript function to get the last element of an array.
// Passing the parameter 'n' will return the last 'n' elements of the array.

// Test Data :
// console.log(last([7, 9, 0, -2]));
// console.log(last([7, 9, 0, -2],3));
// console.log(last([7, 9, 0, -2],6));

function last(array, n = 0) {
  var res = [];

  if (n === 0) {
    return array.pop();
  } else if (n > 0) {
    for (let i = 0; i < n && array.length > 0; i++) {
      res = [array.pop(), ...res];
    }
    return res;
  } else {
    return "n should be a non-negative integer";
  }
}
  
  
  console.log(last([7, 9, 0, -2]));
  console.log(last([7, 9, 0, -2],3));
  console.log(last([7, 9, 0, -2],6));