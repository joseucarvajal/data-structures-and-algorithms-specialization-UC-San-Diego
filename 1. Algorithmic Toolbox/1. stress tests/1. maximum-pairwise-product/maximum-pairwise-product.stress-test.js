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

const maxPairwiseProduct_naive = (arr) => {

    if (arr === undefined || !Array.isArray(arr) || arr.length < 2) {
        return 0;
    }

    let maxProd = -1;
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] * arr[j] > maxProd) {
                maxProd = arr[i] * arr[j];
            }
        }
    }

    return maxProd;
}

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

const test = () => {
    let n;
    while (true) {
        n = Math.floor(Math.random() * 1000) + 2;
        const arr = new Array(n);
        for (let i = 0; i < n; i++) {
            arr[i] = Math.floor(Math.random() * 1000);
        }

        const productNaive = maxPairwiseProduct_naive(arr);
        const productFast = maxPairwiseProduct_fast(arr);

        console.log({arr});
        console.log({productNaive});
        console.log({productFast});
        
        if (productNaive !== productFast) {
            console.log('**************************** ERROR ****************************');
            console.log({productNaive});
            console.log({productFast});
            break;
        }
        else {
            console.log('OK');
        }
    }

    process.exit();
}

test();






