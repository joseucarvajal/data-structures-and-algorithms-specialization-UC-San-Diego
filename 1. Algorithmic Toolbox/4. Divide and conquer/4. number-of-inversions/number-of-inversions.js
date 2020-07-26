const readline = require('readline');

const numberOfInversions = (arr) => {
    return numberOfInversionsDAC(arr, 0, arr.length - 1);
}

/**
 * An inversion of a sequence 𝑎0, 𝑎1, . . . , 𝑎𝑛−1 is a pair of indices 0 ≤ 𝑖 < 𝑗 < 𝑛 such
 * that 𝑎𝑖 > 𝑎𝑗 . The number of inversions of a sequence in some sense measures how
 * close the sequence is to being sorted. For example, a sorted (in non-descending
 * order) sequence contains no inversions at all, while in a sequence sorted in descending
 * order any two elements constitute an inversion (for a total of 𝑛(𝑛 − 1)/2
 * inversions).
 * @param {Array<Number>} arr 
 * @param {Number} l Left position >= 0
 * @param {Number} r Right position < arr.length
 */
const numberOfInversionsDAC = (arr, l, r) => {

    if (l >= r) {
        return 0;
    }

    const m = Math.floor((r + l) / 2);

    const leftCount = numberOfInversionsDAC(arr, l, m);
    const rightCount = numberOfInversionsDAC(arr, m + 1, r);

    const combineCounter = countLeftInversionInRightSide(arr, l, m, r);

    return leftCount + rightCount + combineCounter;
}

/**
 * 
 * @param {Array<Number>} arr 
 * @param {Number} l Left position
 * @param {Number} m Medium position
 * @param {Number} r Right position
 */
const countLeftInversionInRightSide = (arr, l, m, r) => {
    let inversionsCounter = 0;
    for (let j = l; j <= m; j++) {
        inversionsCounter += countInversionsInArraySegment(arr, m + 1, r, arr[j]);
    }
    return inversionsCounter;
}

const countInversionsInArraySegment = (arr, from, length, value) => {
    let inversionsCounter = 0;
    for (let i = from; i <= length; i++) {
        if (value > arr[i]) {
            inversionsCounter++;
        }
    }
    return inversionsCounter;
}


const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});

process.stdin.setEncoding('utf8');

rl.once('line', line => {
    rl.once('line', line => {
        const arr = line.toString().split(' ').map(v => parseInt(v, 10));
        const result = numberOfInversions(arr);
        console.log(result);
        process.exit();
    });
});