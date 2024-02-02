// Create a function that returns an object with a private variable. 
// Implement methods to set and get the value of the private variable.

function privateVariable(value) {
    let privateVar = value;
  
    function setPrivateVar(newValue) {
      privateVar = newValue;
    }
  
    function getPrivateVar() {
      return privateVar;
    }
  
    return {
      setPrivateVar,
      getPrivateVar,
    };
  }
  
  // Example usage:
  const instance = privateVariable(42);
  console.log(instance.getPrivateVar()); // Output: 42
  instance.setPrivateVar(10);
  console.log(instance.getPrivateVar()); // Output: 10
  