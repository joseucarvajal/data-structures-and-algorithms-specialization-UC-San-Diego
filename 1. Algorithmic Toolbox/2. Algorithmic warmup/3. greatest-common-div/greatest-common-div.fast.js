/*
    Greatest Common Divisor
*/

const gcd = (a, b) => {

    if(a === 0){
        return b;
    }

    if(b === 0){
        return a;
    }

    return gcd(b, a%b);
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
