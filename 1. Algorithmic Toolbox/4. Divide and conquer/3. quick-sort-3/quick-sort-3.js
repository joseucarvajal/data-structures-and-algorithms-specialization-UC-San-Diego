const readline = require('readline');

const quickSort3 = (arr, l, r) => {
    if (l >= r) {
        return;
    }

    const indxObj = partition3(arr, l, r);
    quickSort3(arr, l, indxObj.eqIndx - 1);
    quickSort3(arr, indxObj.gtIndx, r);
}

/**
 * 
 * @param {*} arr 
 * @param {*} l >= 0
 * @param {*} r 
 */
const partition3 = (arr, l, r) => {
    const randIndx = Math.floor(Math.random() * (r - l)) + l;
    const x = arr[randIndx];

    const lt = [];
    const eq = [];
    const gt = [];

    for (let low = l; low <= r; low++) {
        if (arr[low] < x) {
            lt.push(arr[low]);
        }
        else if (arr[low] === x) {
            eq.push(arr[low]);
        }
        else {
            gt.push(arr[low]);
        }
    }

    let i = l;
    for (let lte of lt) {
        arr[i] = lte;
        i++;
    }
    const eqIndx = i;
    for (let eqe of eq) {
        arr[i] = eqe;
        i++;
    }
    const gtIndx = i;
    for (let gte of gt) {
        arr[i] = gte;
        i++;
    }

    return {
        eqIndx,
        gtIndx
    };
}

const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});

process.stdin.setEncoding('utf8');

rl.once('line', line => {
    rl.once('line', line => {
        const arr = line.toString().split(' ').map(v => parseInt(v, 10));
        quickSort3(arr, 0, arr.length - 1);
        for (let value of arr) {
            process.stdout.write(`${value} `);
        }
        process.exit();
    });
});