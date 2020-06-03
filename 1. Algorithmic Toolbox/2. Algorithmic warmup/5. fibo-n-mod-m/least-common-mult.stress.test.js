/*
    Task. Given two integers 𝑛 and 𝑚, output 𝐹𝑛 mod 𝑚 (that is, the remainder of 𝐹𝑛 when divided by 𝑚).+

    Input Format. The input consists of two integers 𝑛 and 𝑚 given on the same line (separated by a space).

    Constraints. 1 ≤ 𝑛 ≤ 1014, 2 ≤ 𝑚 ≤ 103.
    
    Output Format. Output 𝐹𝑛 mod 𝑚.
*/

const naive = require('./fibo-n-mod-m.naive');
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