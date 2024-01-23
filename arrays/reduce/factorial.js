function factorial(n) {
    return new Array(n).fill(null).map((c,index)=>index+1).reduce((a,c)=>a*c,0)
}
console.log(factorial(5));