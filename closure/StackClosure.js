function Stack(n) {
  //first in last out
  let arr = [1,2,3];
  let headPointer = -1;
  //this will return stack
  function stack() {
    return arr;
  }
  //this will return head positioned element
  function head() {
    return headPointer == -1 && arr.length == 0 ? "stack is empty" : arr[headPointer];
  }
  //this will add element into stack and return added element
  function addToStack(elem) {
    if (headPointer < arr.length) {
      headPointer += 1;
      arr[headPointer] = elem;
      return elem;
    }
    return "stack is full";
  }

  //this will remove element into stack and return removed element
  function removeFromStack() {
    if (headPointer == -1) {
      return "stack is empty";
    }
    let removedElem = arr[headPointer];
    arr[headPointer] = null;
    headPointer -= 1;
    return removedElem;
  }
  return {
    stack,
    head,
    addToStack,
    removeFromStack,
  };
}
// Create a stack with a maximum size of 3
const myStack = Stack(3);

// Check the initial state of the stack
console.log("Initial Stack:", myStack.stack()); // Output: [undefined, undefined, undefined]

// Add elements to the stack
console.log("Added:", myStack.addToStack(1)); // Output: Added: 1
console.log("Added:", myStack.addToStack(2)); // Output: Added: 2
console.log("Added:", myStack.addToStack(3)); // Output: Added: 3

// Try adding an element when the stack is full
console.log("Added:", myStack.addToStack(4)); // Output: stack is full

// Check the state of the stack after additions
console.log("Stack after additions:", myStack.stack()); // Output: [1, 2, 3]

// Get the head of the stack
console.log("Head of the stack:", myStack.head()); // Output: 3

// Remove elements from the stack
console.log("Removed:", myStack.removeFromStack()); // Output: Removed: 3
console.log("Removed:", myStack.removeFromStack()); // Output: Removed: 2
console.log("Removed:", myStack.removeFromStack()); // Output: Removed: 1

// Try removing an element when the stack is empty
console.log("Removed:", myStack.removeFromStack()); // Output: stack is empty

// Check the final state of the stack
console.log("Final Stack:", myStack.stack()); // Output: [undefined, undefined, undefined]
