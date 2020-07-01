const readline = require('readline');

/**
 * As the last question of a successful interview, your boss gives you a few pieces of paper
 * with numbers on it and asks you to compose a largest number from these numbers. The
 * resulting number is going to be your salary, so you are very much interested in maximizing
 * this number.
 * @param {Array<number>} parts Parts of salary. i.e. [3, 35, 754]
 */
const maximumSalary = (parts) => {
    if (!Array.isArray(parts)) {
        throw new Error('parts must be an array');
    }

    let maxSalary = '';
    const partsCopy = [...parts];
    let greatestNumIndx = 0;
    while (partsCopy.length > 0) {

        //Greedy safe choice
        greatestNumIndx = partsCopy.reduce((gIndx, v, i) => isGreaterThan(v, partsCopy[gIndx]) ? i : gIndx, 0);
        maxSalary += partsCopy[greatestNumIndx];

        //Reduce to a sub-problem
        partsCopy.splice(greatestNumIndx, 1);
    }

    return maxSalary;
}

/**
 * Check wheter concat(n1, n2) is a greater number than concat(n2, n1)
 * @param {number} n1 
 * @param {number} n2 
 */
function isGreaterThan(n1, n2) {
    return parseInt(`${n1}${n2}`) > parseInt(`${n2}${n1}`);
}


process.stdin.setEncoding('utf8');
const rli = readline.createInterface({
    input: process.stdin,
    terminal: false
});

let lineCount = 0;
rli.on('line', (lineData) => {
    if (lineData !== '\n') {
        if(lineCount === 1){
            let parts = lineData.split(' ').map(v => parseInt(v, 10));
            let maxSalary = maximumSalary(parts);
            console.log(maxSalary);
            process.exit();
        }

        lineCount++;
    }
});