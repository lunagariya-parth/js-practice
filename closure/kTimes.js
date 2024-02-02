// Write a function named applyKTimes that takes an integer K and a closure and calls
//  the closure K times.The closure will not take any parameters and will not have a return value.

function applyKTimes(K, closure) {
  for (let i = 1; i <= K; i++) {
    closure();
  }
}

// Example usage:
applyKTimes(3, () => {
  console.log("Executing the closure");
});
