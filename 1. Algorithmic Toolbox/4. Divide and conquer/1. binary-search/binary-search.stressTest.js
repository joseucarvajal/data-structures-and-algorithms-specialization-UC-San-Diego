const readline = require('readline');

const binarySearch = require('./binary-search');

const searchSequenceInArray = (arr, sequence) => {
    if (!Array.isArray(arr) || !Array.isArray(sequence)) {
        throw new Error('Either array or sequence are invalid inputs');
    }

    const searchResult = [];
    for (let value of sequence) {
        searchResult.push(binarySearch(arr, value));
    }

    return searchResult;
}

const searchSequenceInArrayNaive = (arr, sequence) => {
    if (!Array.isArray(arr) || !Array.isArray(sequence)) {
        throw new Error('Either array or sequence are invalid inputs');
    }

    const searchResult = [];
    for (let value of sequence) {
        searchResult.push(linearSearch(arr, value));
    }

    return searchResult;
}

const linearSearch = (arr, key) => {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === key) {
            return i;
        }
    }

    return -1;
}

while (true) {
    const n = Math.ceil(Math.random() * 10);
    let arr = [];
    const seq = [];
    for (let i = 0; i < n; i++) {
        arr.push(Math.ceil(Math.random() * 1000));
        seq.push(Math.ceil(Math.random() * 1000));
    }

    arr = arr.sort((a, b) => a - b );

    const resultNaive = searchSequenceInArrayNaive(arr, seq);
    const result = searchSequenceInArray(arr, seq);

    if (resultNaive.join() !== result.join()) {
        console.log({result});
        console.log({resultNaive});
        console.log({arr});
        console.log({seq});
        throw new Error('ERROR');
    }
    else {
        console.log('OK');
    }
}