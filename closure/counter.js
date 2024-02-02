const counter = () => {
  let counter_val = 0;
  function changeVal(val) {
    counter_val += val;
  }
  return {
    increment() {
      changeVal(1);
    },
    decrement() {
      changeVal(-1);
    },
    value() {
      return counter_val;
    },
  };
};

//what if we want to increment counter
let c = counter();
//before
console.log(c.value())
//after
c.increment();
console.log(c.value());

//what if we want to decrement counter
c.decrement();
console.log(c.value());
