/*
    Greatest Common Divisor
*/

const naive = require('./greatest-common-div.naive');
const fast = require('./greatest-common-div.fast');

const test = () => {
    while (true) {
        const factor = Math.floor(Math.random() * 10);
        const a = Math.floor(Math.random() * 10000) * factor + 1;
        const b = Math.floor(Math.random() * 100) * factor + 1;
        const naiveValue = naive.gcd(a, b);
        const fastValue = fast.gcd(a, b);

        if (naiveValue !== fastValue) {
            console.error('********************** ERROR **********************');
            console.log({ a });
            console.log({ b });
            console.log({ naiveValue });
            console.log({ fastValue });
            break;
        }
        else {
            console.log('OK');
            console.log({ a });
            console.log({ b });
            console.log({ naiveValue });
            console.log({ fastValue });
        }
    }

    process.exit();
}

test();