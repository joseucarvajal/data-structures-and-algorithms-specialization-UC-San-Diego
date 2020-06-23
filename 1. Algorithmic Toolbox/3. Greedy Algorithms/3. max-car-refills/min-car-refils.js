const readline = require('readline');


/**
 * You are going to travel to another city that is located 𝑑 miles away from your home city. Your car can travel
 * at most 𝑚 miles on a full tank and you start with a full tank. Along your way, there are gas stations at
 * distances stop1, stop2, . . . , stop𝑛 from your home city. What is the minimum number of refills needed?
 * @param {*} d : distance from home to the destination city
 * @param {*} m : milles car can drive withouth refill
 * @param {*} inputStops : stops from home to the destination city
 */
const minCarRefills = (d, m, inputStops) => {

    if (!Array.isArray(inputStops)) {
        throw new Error('stops should be an array');
    }

    const stops = [...inputStops, d];
    const n = stops.length;
    let currentStop = 0;
    let currentStopPosition = -1;
    let stopsCount = 0;

    //Iterate
    let i = 0;
    while (i < n) {
        if ((stops[i] - currentStop) > m) {
            if (i === currentStopPosition + 1) {
                return -1; //no safe move available
            }
            else {
                //Greedy choice, safe move
                i--;
                currentStopPosition = i; //Reduce problem size
                currentStop = stops[currentStopPosition];
                stopsCount++;
            }
        }
        i++;
    }

    return stopsCount;
}

module.exports = minCarRefills;

process.stdin.setEncoding('utf8');
const rli = readline.createInterface({
    input: process.stdin,
    terminal: false
});


let lineCount = 0;
let d;
let m;
let stops;

rli.on('line', (lineData) => {
    if (lineData !== '\n') {
        if (lineCount === 0) {
            d = parseInt(lineData, 10);
        }
        else if (lineCount === 1) {
            m = parseInt(lineData, 10);
        }
        else if (lineCount === 3) {
            stops = lineData.split(" ").map(v => parseInt(v, 10));
            const result = minCarRefills(d, m, stops);
            console.log(result);
            process.exit();
        }
        lineCount++;
    }
});