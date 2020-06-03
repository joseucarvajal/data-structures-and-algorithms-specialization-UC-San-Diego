/*
Implement Fibonacci series in an optimal way
*/

const fast = require('./fth-fibonacci.fast');

const fibonacci_naive = (n) => {

    if (n == 0) {
        return 0;
    } else if (n <= 2) {
        return 1;
    }

    return fibonacci_naive(n - 2) + fibonacci_naive(n - 1);
}

const test = () => {
    while (true) {
        const n = Math.floor(Math.random() * 44) + 1;
        const fibNaive = fibonacci_naive(n);
        const fibFast = fast.fibonacci(n);

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