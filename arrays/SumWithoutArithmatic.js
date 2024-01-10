function sumWithoutArithmatic(a, b) {
    const arr1 = new Array(a);
    const arr2 = new Array(b);
    const resArr = [...arr1, ...arr2];
    return resArr.length;
}
console.log(sumWithoutArithmatic(5,5));