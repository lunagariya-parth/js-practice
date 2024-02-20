const num = 3443445.5;

const options = {
    style: 'currency',
    unit: 'celsius',
    currency: 'EUR',
    useGrouping:false
};
console.log('US:      ' ,new Intl.NumberFormat('en-US',options).format(num) );
console.log('GErmany: ' ,new Intl.NumberFormat('de-DE',options).format(num) );
console.log('Syria:   ' ,new Intl.NumberFormat('ar-SY',options).format(num) );