/*
    Least Common Multiple
*/

const naive = require('./least-common-mult.naive');
const fast = require('./least-common-mult.fast');

const test = () => {
    while (true) {
        const a = Math.floor(Math.random() * 100);
        const b = Math.floor(Math.random() * 100);
        const naiveValue = naive.lcm(a, b);
        const fastValue = fast.lcm(a, b);

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