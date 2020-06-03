/*
Maximum Pairwise Product Problem
Find the maximum product of two distinct numbers
in a sequence of non-negative integers.
Input: A sequence of non-negative
integers.
Output: The maximum value that
can be obtained by multiplying
two different elements from the sequence.
 */

const readline = require('readline');
process.stdin.setEncoding('utf8');
const rli = readline.createInterface({
    input: process.stdin,
    terminal: false
});

const maxPairwiseProduct_fast = (arr) => {

    if (arr === undefined || !Array.isArray(arr) || arr.length < 2) {
        return 0;
    }

    const maxPair = arr[0] <= arr[1] ? [arr[0], arr[1]] : [arr[1], arr[0]];
    for (let i = 2; i < arr.length; i++) {
        if (arr[i] > maxPair[1]) {
            maxPair[0] = maxPair[1];
            maxPair[1] = arr[i];
        }
        else if (arr[i] > maxPair[0]) {
            maxPair[0] = arr[i];
        }
    }

    const product = maxPair.reduce((acum, val) => acum * val);

    return product;
}

rli.prompt();

let lineNro = 0;
rli.on('line', (line) => {   
    if (line !== '\n') {
        if (lineNro === 1) {
            const lineData = line.toString().split(' ').map(v => parseInt(v, 10));
            const product = maxPairwiseProduct_fast(lineData);
            console.log(product);
            process.exit();
        }
    }
    lineNro++;
});