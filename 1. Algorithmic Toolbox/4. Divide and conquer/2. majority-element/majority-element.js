const readline = require('readline');

/**
 * Majority rule is a decision rule that selects the alternative which has a majority,
 * that is, more than half the votes.
 * Given a sequence of elements 𝑎1, 𝑎2, . . . , 𝑎𝑛, you would like to check whether
 * it contains an element that appears more than 𝑛/2 times.
 * @param {Array<Number>} elements 
 */
const findMajorityElement = (elements) => {
    const result = findMajorityElementDAC(elements, 0, elements.length - 1);
    if (result.length === 0) {
        return 0;
    }

    if (result[1] > Math.floor(elements.length / 2)) {
        return 1;
    }

    return 0;
}

/**
 * 
 * @param {Array<Number>} elements 
 * @param {Number} left left most index inside the array
 * @param {Number} right right most index inside the array
 */
const findMajorityElementDAC = (elements, left, right) => {
    if (left === right) { //1 element
        return [elements[left], 1]; //0: most repeated value | 1: ocurrences counter
    }

    let medium = Math.floor((right + left) / 2);

    let leftSide = findMajorityElementDAC(elements, left, medium);
    let rightSide = findMajorityElementDAC(elements, medium + 1, right);
    
    //returns an array [0: most repeated value, 1: ocurrences counter]
    return merge(leftSide, rightSide, elements, left, medium, right);
}

/**
 * Returns array [0: most repeated value, 1: ocurrences counter]
 * @param {Array<Number>} leftArray [0: most repeated value, 1: ocurrences counter] left side
 * @param {Array<Number>} rightArray [0: most repeated value, 1: ocurrences counter] right side
 * @param {Array<Number>} elements 
 * @param {Number} left 
 * @param {Number} medium 
 * @param {Number} right 
 */
const merge = (leftSide, rightSide, elements, left, medium, right) => {
    let ocurrences = 0;
    if (leftSide.length === 0) {
        ocurrences = countOcurrences(elements, left, medium, rightSide[0]);
        return [rightSide[0], rightSide[1] + ocurrences];
    }

    if (rightSide.length === 0) {
        ocurrences = countOcurrences(elements, medium + 1, right, leftSide[0]);
        return [leftSide[0], leftSide[1] + ocurrences];
    }

    if (leftSide[0] === rightSide[0]) {
        return [leftSide[0], leftSide[1] + rightSide[1]];
    }

    //each side has different values    
    if (leftSide[1] > rightSide[1]) {
        ocurrences = countOcurrences(elements, medium + 1, right, leftSide[0]);
        return [leftSide[0], leftSide[1] + ocurrences];
    }

    ocurrences = countOcurrences(elements, left, medium, rightSide[0]);    
    return [rightSide[0], rightSide[1] + ocurrences];
}

const countOcurrences = (arr, from, to, key) => {
    let ocurrences = 0;
    for (let i = from; i <= to; i++) {
        if (arr[i] === key) {
            ocurrences++;
        }
    }
    return ocurrences;
}

module.exports = findMajorityElement;

const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});

process.stdin.setEncoding('utf8');
rl.once('line', line => {
    rl.once('line', line => {
        const arr = line.toString().split(' ').map(v => parseInt(v, 10));
        const result = findMajorityElement(arr);
        console.log(result);
        process.exit();
    });
});