/*
Implement Fibonacci series in an optimal way
*/

const naive = require('./fth-fibonacci.naive');
const fast = require('./fth-fibonacci.fast');

const test = () => {
    while (true) {
        const n = Math.floor(Math.random() * 44) + 1;
        const fibNaive = naive.fibonacci(n);
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