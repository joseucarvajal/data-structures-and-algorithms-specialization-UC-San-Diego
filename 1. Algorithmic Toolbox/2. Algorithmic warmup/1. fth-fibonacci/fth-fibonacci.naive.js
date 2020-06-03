/*
    Implement Fibonacci series in an optimal fashion
*/

const fibonacci = (n) => {

    if (n == 0) {
        return 0;
    } else if (n <= 2) {
        return 1;
    }

    return fibonacci(n - 2) + fibonacci(n - 1);
}

exports.fibonacci = fibonacci;

const readline = require('readline');
process.stdin.setEncoding('utf8');
const rli = readline.createInterface({
    input: process.stdin,
    terminal: false
});

rli.on('line', (line) => {
    if (line !== '\n') {
        const lineData = parseInt(line);
        const nFib = fibonacci(lineData);
        console.log(nFib);
        process.exit();
    }
});
