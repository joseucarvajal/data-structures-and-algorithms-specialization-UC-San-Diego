/*
    Task. Given two integers 𝑛 and 𝑚, output 𝐹𝑛 mod 𝑚 (that is, the remainder of 𝐹𝑛 when divided by 𝑚).+

    Input Format. The input consists of two integers 𝑛 and 𝑚 given on the same line (separated by a space).

    Constraints. 1 ≤ 𝑛 ≤ 1014, 2 ≤ 𝑚 ≤ 103.

    Output Format. Output 𝐹𝑛 mod 𝑚.
*/

const fiboNModM = (n, m) => {

    let fn = BigInt(0);
    let prev = BigInt(1);
    let tmp = BigInt(0);

    for (let i = 0; i < n; i++) {
        tmp = fn;
        fn = prev + fn;
        prev = tmp;
    }

    return Number(fn % BigInt(m));
}
exports.fiboNModM = fiboNModM;

const readline = require('readline');
process.stdin.setEncoding('utf8');
const rli = readline.createInterface({
    input: process.stdin,
    terminal: false
});

rli.on('line', (line) => {
    if (line !== '\n') {
        const lineData = line.split(' ').map(v => parseInt(v, 10));
        const lcmValue = fiboNModM(lineData[0], lineData[1]);
        console.log(lcmValue);
        process.exit();
    }
});
