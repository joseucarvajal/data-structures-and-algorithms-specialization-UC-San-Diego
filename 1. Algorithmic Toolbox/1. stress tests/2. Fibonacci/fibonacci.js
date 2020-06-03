/*
Implement Fibonacci series in an optimal way
*/

const readline = require('readline');
process.stdin.setEncoding('utf8');
const rli = readline.createInterface({
    input: process.stdin,
    terminal: false
});

const fibonacci_fast = (n) => {
    
    let fib = 0;
    let prev = 1;
    let tmp;

    for (let i = 0; i < n; i++) {
        tmp = fib;
        fib = prev + fib;
        prev = tmp;
    }

    return fib;
}

rli.on('line', (line) => {   
    if (line !== '\n') {
        const lineData = parseInt(line);
        const nFib = fibonacci_fast(lineData);
        console.log(nFib);
        process.exit();
    }
});