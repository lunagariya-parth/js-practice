// Create a function that takes a callback and returns a new function. 
// When the new function is invoked, it should call the original callback with additional parameters.

function callbackClosure(callback, extraParam) {
    return function(...args) {
      return callback(...args, extraParam);
    };
  }
  
  function originalCallback(a, b, c, extraParam) {
    console.log(a + b + c + extraParam);
  }
  
  const newFunction = callbackClosure(originalCallback, 10);
  newFunction(1, 2, 3); // Output: 16 (1 + 2 + 3 + 10)
  