/*
    Task. Given two integers 𝑛 and 𝑚, output 𝐹𝑛 mod 𝑚 (that is, the remainder of 𝐹𝑛 when divided by 𝑚).+

    Input Format. The input consists of two integers 𝑛 and 𝑚 given on the same line (separated by a space).

    Constraints. 1 ≤ 𝑛 ≤ 1014, 2 ≤ 𝑚 ≤ 103.
    
    Output Format. Output 𝐹𝑛 mod 𝑚.
*/


const lcm = (a, b) => {

    const gcd = (a, b) => {

        if (a === 0) {
            return b;
        }
    
        if (b === 0) {
            return a;
        }
    
        return gcd(b, a % b);
    }

    if (a === 0 || b === 0) {
        return 0;
    }

    return (a * b) / gcd(a, b);
}
exports.lcm = lcm;

const readline = require('readline');
process.stdin.setEncoding('utf8');
const rli = readline.createInterface({
    input: process.stdin,
    terminal: false
});

rli.on('line', (line) => {
    if (line !== '\n') {
        const lineData = line.split(' ').map(v => parseInt(v, 10));
        const gcdValue = lcm(lineData[0], lineData[1]);
        console.log(gcdValue);
        process.exit();
    }
});
