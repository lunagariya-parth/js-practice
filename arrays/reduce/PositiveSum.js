const input = [1, -4, 12, 0, -3, 29, -150];

function sumPositive(arr) {
    return arr.filter((item)=>item>0).reduce((acc,cur)=>{return acc+cur},0)
}
console.log(sumPositive(input))