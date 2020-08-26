
/**
 * The edit distance between two strings is the minimum number of operations (insertions, deletions, and
 * substitutions of symbols) to transform one string into another. It is a measure of similarity of two strings.
 * Edit distance has applications, for example, in computational biology, natural language processing, and spell
 * checking. Your goal in this problem is to compute the edit distance between two strings.
 * Calculates distance between s1 and s2
 * @param {string} s1 
 * @param {string} s2 
 */
const editDistance = (s1, s2) => {
    const dp = [];
    for (let i = 0; i <= s2.length; i++) {
        dp.push(new Array(s1.length + 1).fill(0));
    }

    for (let i = 0; i <= s1.length; i++) {
        dp[0][i] = i;
    }

    for (let i = 0; i <= s2.length; i++) {
        dp[i][0] = i;
    }
    for (let i = 1; i <= s2.length; i++) {
        for (let j = 1; j <= s1.length; j++) {
            if (s1[j - 1] === s2[i - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            }
            else {
                let min = Math.min(dp[i][j - 1], dp[i - 1][j - 1], dp[i - 1][j]);
                dp[i][j] = min + 1;
            }
        }
    }

    return dp[s2.length][s1.length];
}

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});
process.stdin.setEncoding('utf8');
rl.once('line', line => {
    const s1 = line.toString();
    rl.once('line', line => {
        const s2 = line.toString();
        const distance = editDistance(s1, s2);
        console.log(distance);
        process.exit();
    });
});