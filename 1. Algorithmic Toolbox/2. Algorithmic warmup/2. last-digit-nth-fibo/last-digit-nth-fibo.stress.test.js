/*
    Given an integer 𝑛, find the last digit of the 𝑛th Fibonacci number 𝐹𝑛 (that is, 𝐹𝑛 mod 10).
*/

const fast = require('./last-digit-nth-fibo.fast');

const lastDigitNthFibo_naive = (n) => {
    
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

const test = () => {
    while (true) {
        const n = Math.floor(Math.random() * 45) + 1;
        const naiveValue = lastDigitNthFibo_naive(n);
        const fastValue =  fast.lastDigitNthFibo(n);

        if (naiveValue !== fastValue) {
            console.error('********************** ERROR **********************');
            console.log({ n });
            console.log({ fibNaive: naiveValue });
            console.log({ fibFast: fastValue });
            break;
        }
        else {
            console.log('OK');
            console.log({ n });
            console.log({ fibNaive: naiveValue });
            console.log({ fibFast: fastValue });
        }
    }

    process.exit();
}

test();