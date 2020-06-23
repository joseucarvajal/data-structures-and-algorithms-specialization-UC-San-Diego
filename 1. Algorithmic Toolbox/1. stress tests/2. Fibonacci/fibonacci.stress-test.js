/*
Implement Fibonacci series in an optimal way
*/

const readline = require('readline');
process.stdin.setEncoding('utf8');
const rli = readline.createInterface({
    input: process.stdin,
    terminal: false
});

const fibonacci_naive = (n) => {
    if (n == 0) {
        return 0;
    } else if (n <= 2) {
        return 1;
    }

    return fibonacci_naive(n - 2) + fibonacci_naive(n - 1);
}

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

const test = () => {
    while (true) {
        const n = Math.floor(Math.random() * 46) + 1;
        const fibNaive = fibonacci_naive(n);
        const fibFast = fibonacci_fast(n);

        if (fibNaive !== fibFast) {
            console.error('********************** ERROR **********************');
            console.log({ n });
            console.log({ fibNaive });
            console.log({ fibFast });
            break;
        }
        else {
            console.log('OK');
            console.log({ n });
            console.log({ fibNaive });
            console.log({ fibFast });
        }
    }

    process.exit();
}

test();