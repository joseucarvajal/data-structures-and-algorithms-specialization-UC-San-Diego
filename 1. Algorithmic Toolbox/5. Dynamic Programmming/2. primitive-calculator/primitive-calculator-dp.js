
/**
 * You are given a primitive calculator that can perform the following three operations with
 * the current number 𝑥: multiply 𝑥 by 2, multiply 𝑥 by 3, or add 1 to 𝑥. Your goal is given a
 * positive integer 𝑛, find the minimum number of operations needed to obtain the number 𝑛
 * starting from the number 1.
 * @param {Number} amount 
 */
const primitiveCalculator = (amount) => {

    const dp = [[1], [1, 2], [1, 3]]; // For values: 1, 2, 3

    let lengthMap = {};
    let length3 = Number.MAX_VALUE;
    let length2 = Number.MAX_VALUE;
    let length1 = Number.MAX_VALUE;
    let dpIndex;

    let value;
    for (let i = 3; i < amount; i++) { //Starting from i = 3 which is actually the value = 4

        value = i + 1; //Real value to save in dp is current index + 1 = i + 1

        lengthMap = {};
        length3 = Number.MAX_VALUE;
        length2 = Number.MAX_VALUE;
        ength1 = Number.MAX_VALUE;

        if (value % 3 === 0) { //Hash result for mult 3
            dpIndex = value / 3 - 1;
            length3 = dp[dpIndex].length;
            lengthMap[length3] = {
                dpi: dpIndex,
                newVal: value
            };
        }
        if (value % 2 === 0) { //Hash result for mult 2
            dpIndex = value / 2 - 1;
            length2 = dp[dpIndex].length;
            lengthMap[length2] = {
                dpi: dpIndex,
                newVal: value
            };
        }

        dpIndex = value - 1 - 1; //Hash result for add 1
        length1 = dp[dpIndex].length;
        lengthMap[length1] = {
            dpi: dpIndex,
            newVal: i + 1
        };

        const minLength = Math.min(length3, length2, length1);

        dp[i] = [...dp[lengthMap[minLength].dpi], lengthMap[minLength].newVal];
    }

    return dp[amount - 1];
}


const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});
process.stdin.setEncoding('utf8');
rl.once('line', line => {
    const amount = parseInt(line.toString());
    const minOperations = primitiveCalculator(amount);
    console.log(minOperations.length - 1);
    for (let value of minOperations) {
        process.stdout.write(`${value} `);
    }
    process.exit();
});