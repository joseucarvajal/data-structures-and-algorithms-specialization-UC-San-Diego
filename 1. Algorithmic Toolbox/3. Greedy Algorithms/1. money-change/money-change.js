const readline = require('readline');

/**
 * find the minimum number of coins needed to change the input value
 * (an integer) into coins with denominations 1, 5, and 10.
 * @param {*} change 
 */
const minMoneyCoinsChange = (change) => {

    const denominations = [10, 5, 1];

    //Iterate
    let i = 0;
    let count = 0;
    while(change !== 0){
        
        //Safe move
        count = count + parseInt(change / denominations[i], 10);

        //Reduce to a sub-problem
        change = change % denominations[i];
        i++;
    }

    return count;
}

module.exports = minMoneyCoinsChange;

process.stdin.setEncoding('utf8');
const rli = readline.createInterface({
    input: process.stdin,
    terminal: false
});


rli.on('line', (line) => {
    if (line !== '\n') {
        const lineData = parseInt(line, 10);
        const result = minMoneyCoinsChange(lineData);
        console.log(result);
        process.exit();
    }
});