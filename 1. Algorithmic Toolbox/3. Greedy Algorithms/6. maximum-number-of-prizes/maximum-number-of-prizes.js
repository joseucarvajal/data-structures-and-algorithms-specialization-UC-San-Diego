const readline = require('readline');

/**
 * You are organizing a funny competition for children. As a prize fund you have 𝑛
 * candies. You would like to use these candies for top 𝑘 places in a competition
 * with a natural restriction that a higher place gets a larger number of candies.
 * To make as many children happy as possible, you are going to find the largest
 * value of 𝑘 for which it is possible.
 * @param {number} n Amount of candies
 */

const maximumNumberOfPrices = (n) => {

    if (n < 1) {
        return [];
    }

    const prices = [];
    let i = 1;
    while (n >= 2 * i + 1) { // iterate
        prices.push(i); // safe move
        n = n - i; // smaller problem
        i++;
    }

    if (n > 0) {
        prices.push(n);
    }

    return prices;
}

module.exports = maximumNumberOfPrices;

process.stdin.setEncoding('utf8');
const rli = readline.createInterface({
    input: process.stdin,
    terminal: false
});

rli.on('line', (lineData) => {
    if (lineData !== '\n') {
        const n = parseInt(lineData, 10);
        const summands = maximumNumberOfPrices(n);

        console.log(summands.length);
        for (let value of summands) {
            process.stdout.write(`${value} `);
        }

        process.exit();
    }
});