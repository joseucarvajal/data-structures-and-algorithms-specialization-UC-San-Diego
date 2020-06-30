/*
    Given an integer 𝑛, find the last digit of the 𝑛th Fibonacci number 𝐹𝑛 (that is, 𝐹𝑛 mod 10).
*/

const lastDigitNthFibo = (n) => {

    let fib = 0;
    let prev = 1;
    let tmp;

    for (let i = 0; i < n; i++) {
        tmp = fib;
        fib = prev + fib;
        prev = tmp;
    }

    return fib%10;
}
exports.lastDigitNthFibo = lastDigitNthFibo;

const readline = require('readline');
process.stdin.setEncoding('utf8');
const rli = readline.createInterface({
    input: process.stdin,
    terminal: false
});


rli.on('line', (line) => {
    if (line !== '\n') {
        const lineData = parseInt(line, 10);
        const nFib = lastDigitNthFibo(lineData);
        console.log(nFib);
        process.exit();
    }
});