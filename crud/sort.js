//   const n = arr.length;
//   for (var i = 0; i < n; i++) {
//     var min = arr[i];
//     for (var j = i + 1; j < n; j++) {
//       if (arr[j] < min) {
//         var temp = arr[j];
//         arr[j] = arr[i];
//         arr[i] = temp;
//       }
//       console.log(arr,min);
//     }
//   }

input = [4, 32, 75, 12, 96, 23, 89, 43, 7, 23];
// input = [4, 32, 75];
// function min5(arr) {
//   var res = [];
//   var n = arr.length;
//   for (var j = 0; j < n; j++) {
//     //get min elemt
//     var minIndex = 0;
//     for (var i = 0; i < n; i++) {
//       var min = arr[i];
//       if (arr[i] < min) {
//         var temp = arr[j];
//         arr[j] = arr[i];
//         arr[i] = temp;
//         minIndex = i;
//       }
//     }
//     res.push(arr.splice(minIndex, 1));
//   }
//    console.log(res);
// }
// function min5(arr) {
//   const n = arr.length;

//   for (var i = 0; i < n - 1; i++) {
//     var minIndex = i;

//     for (var j = i + 1; j < n; j++) {
//       if (arr[j] < arr[minIndex]) {
//         minIndex = j;
//       }
//     }

//     if (minIndex !== i) {
//       // Swap arr[i] and arr[minIndex]
//       var temp = arr[i];
//       arr[i] = arr[minIndex];
//       arr[minIndex] = temp;
//     }

//     console.log(arr);
//   }
// }

//step 1:remove duplicate
function removeDuplicate(arr) {
  const n = arr.length;
  var res = [...new Set(arr)];
  return res;
}
//step 2: sort array
function sortArray(arr) {
  return arr.sort((a, b) => a - b);
}
//step 3:return min5 items from sortedArray
function min5FromArray(sortedArr) {
  return sortedArr.length > 5 ? sortedArr.splice(0, 5) : sortedArr;
}
//final function
function challenge10(array, limit) {
  const arr = [...new Set(array)];
  console.log(arr);
  let resArr = [];

  function findAndRemoveMin() {
    let minIndex = 0;
    for (let i = 1; i < arr.length; i++) {
      if (arr[minIndex] > arr[i]) {
        minIndex = i;
      }
    }
    resArr.push(arr[minIndex]);
    arr.splice(minIndex, 1);
    console.log(resArr);
  }

  while (resArr.length < limit && arr.length > 0) {
    findAndRemoveMin();
  }

  return resArr.reverse();
}

//  Example usage:
// const res = removeDuplicate(input);
// console.log(res, typeof res);
// const sortedArr = sortArray(res);
// console.log(sortedArr);
// const finalRes = min5FromArray(sortedArr);
// console.log(finalRes);

const resArr = challenge10(input,5);
// const res = challenge10(input);
console.log(resArr);

// min5(input);
