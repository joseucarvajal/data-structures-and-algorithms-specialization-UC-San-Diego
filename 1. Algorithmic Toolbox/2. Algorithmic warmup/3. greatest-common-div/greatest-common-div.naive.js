/*
    Greatest Common Divisor
*/

const gcd = (a, b) => {

    const min = Math.min(a, b);
    const max = Math.max(a, b);

    let gcd = 1;
    for(let i=1; i<=min; i++){
        if(max % i === 0 && min % i === 0){
            gcd = i;
        }
    }

    return gcd;
}
exports.gcd = gcd;

const readline = require('readline');
process.stdin.setEncoding('utf8');
const rli = readline.createInterface({
    input: process.stdin,
    terminal: false
});

rli.on('line', (line) => {
    if (line !== '\n') {
        const lineData = line.split(' ').map(v => parseInt(v, 10));
        const gcdValue = gcd(lineData[0], lineData[1]);
        console.log(gcdValue);
        process.exit();
    }
});
