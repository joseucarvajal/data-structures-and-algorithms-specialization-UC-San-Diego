/**
 * Minimum coin change problem applying dynamic programming
 * @param {Number} money 
 * @param {Array<Number>} coins 
 * @returns {Number}
 */
function changeAmount(money, coins) {
    const dp = new Array(money + 1);
    dp[0] = 0;
    let minChanges = Number.MAX_VALUE;
    for (let i = 1; i <= money; i++) {
        minChanges = Number.MAX_VALUE;
        for (coin of coins) {
            if (i === coin) {
                minChanges = 1;
                break;
            }
            if (coin < i) {
                const changeCoinsCount = dp[i - coin] + 1;
                minChanges = Math.min(minChanges, changeCoinsCount);
            }
        }
        dp[i] = minChanges;
    }
    return dp[money];
}

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});
process.stdin.setEncoding('utf8');
rl.once('line', line => {
    const amount = parseInt(line.toString());
    const minChanges = changeAmount(amount, [1, 3, 4]);
    console.log(minChanges);
    process.exit();
});