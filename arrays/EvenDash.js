// Write a JavaScript program that accepts a number as input and inserts dashes (-) between each even number. For example if you accept 025468 the output should be 0-254-6-8.

function evenDash(num) {
    const number = String(num).split("");
    var res = String(number[0]);
    var i = 0;
    var n = number.length;

    while (i < n - 1) { 
        if (Number(number[i]) % 2 === 0 && Number(number[i + 1]) % 2 === 0 ) {
            res = res.concat('-', number[i + 1]); 
            //console.log(res);
        } else {
            res = res.concat(number[i + 1]);
           // console.log(res);
        }
        i = i + 1;
    }
    console.log(res);
}

evenDash(3025468);