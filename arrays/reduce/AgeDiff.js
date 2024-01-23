const input = [
    {
      name: "John",
      age: 13,
    },
    {
      name: "Mark",
      age: 56,
    },
    {
      name: "Rachel",
      age: 45,
    },
    {
      name: "Nate",
      age: 67,
    },
    {
      name: "Jennifer",
      age: 65,
    },
];
  
function AgeDiff(arr) {
    const ages = arr.map((item) => item.age);
    return([Math.min(...ages),Math.max(...ages) ,Math.max(...ages) - Math.min(...ages)])
}
console.log(AgeDiff(input));