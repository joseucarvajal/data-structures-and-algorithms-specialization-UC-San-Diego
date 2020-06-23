const readline = require('readline');

/**
 * Given two sequences 𝑎1, 𝑎2, . . . , 𝑎𝑛 (𝑎𝑖 is the profit per click of the 𝑖-th ad) 
 * and 𝑏1, 𝑏2, . . . , 𝑏𝑛 (𝑏𝑖 is * the average number of clicks per day of the 𝑖-th slot), 
 * we need to partition them into 𝑛 pairs (𝑎𝑖, 𝑏𝑗)
 * such that the sum of their products is maximized.
 * @param {Array<number>} addsProfit Collection of adds revenue
 * @param {Array<number>} slots Collection of slots to allocate adds
 */
const maxAdvertisementRevenue = (addsProfit, slots) => {

    if (!Array.isArray(addsProfit) || !Array.isArray(slots)) {
        throw new Error('ads and slots should be collections');
    }
    else if (addsProfit.length !== slots.length) {
        throw new Error('ads and slots should have the same length');
    }

    let maxRevenue = 0;

    const descSortFn = (a, b) => b - a;

    const adsProfitSorted = [...addsProfit].sort(descSortFn);
    const slotsSorted = [...slots].sort(descSortFn);

    const n = adsProfitSorted.length;
    //Iterate, reduce to a subproblem
    for (let i = 0; i < n; i++) {

        //Make a greedy choide
        maxRevenue = maxRevenue + adsProfitSorted[i] * slotsSorted[i];
    }

    return maxRevenue;
}

module.exports = maxAdvertisementRevenue;

process.stdin.setEncoding('utf8');
const rli = readline.createInterface({
    input: process.stdin,
    terminal: false
});


/**
 * stdin lines counter
 */
lineCount = 0;

/**
 * adds revenue collection
 */
let addsProfit = [];

/**
 * slots colection
 */
let slots = [];

rli.on('line', (lineData) => {
    if (lineData !== '\n') {
        switch (lineCount) {
            case 1:
                addsProfit = lineData.split(' ').map(v => parseInt(v, 10));
                break;
            case 2:
                slots = lineData.split(' ').map(v => parseInt(v, 10));
                const result = maxAdvertisementRevenue(addsProfit, slots);
                console.log(result);
                process.exit();
                break;
        }
        lineCount++;
    }
});

