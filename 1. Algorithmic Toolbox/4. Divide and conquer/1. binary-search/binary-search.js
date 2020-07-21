
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});

process.stdin.setEncoding('utf8');
rl.once('line', line => {
    const arr = line.toString().split(' ').slice(1).map(v => BigInt(v));

    rl.once('line', line => {
        const keys = line.toString().split(' ').slice(1).map(v => BigInt(v));
        const result = [];

        for (let key of keys) {
            result.push(binarySearch(arr, key));
        }

        for (let value of result) {
            process.stdout.write(`${value} `);
        }

        process.exit();
    })
});

function binarySearch(arr = [], x) {
    let start = 0;
    let end = arr.length - 1;
    while (start <= end) {
        let mid = Math.floor((start + end) / 2);
        if (arr[mid] === x) {
            return mid;
        }
        else if (arr[mid] < x) {
            start = mid + 1;
        }
        else {
            end = mid - 1;
        }
    }

    return -1;
}

module.exports = binarySearch;