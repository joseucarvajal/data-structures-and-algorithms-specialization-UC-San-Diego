/*
    Least Common Multiple
*/

const lcm = (a, b) => {
    
    let lcmValue = a*b;
    for(let i = a*b; i >= Math.max(a, b); i--){
        if(i%a == 0 && i%b == 0){
            lcmValue = i;
        }
    }

    return lcmValue;
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
        const lcmValue = lcm(lineData[0], lineData[1]);
        console.log(lcmValue);
        process.exit();
    }
});
