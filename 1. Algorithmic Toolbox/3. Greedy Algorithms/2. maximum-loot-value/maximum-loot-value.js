const readline = require('readline');


/**
 * find the most valuable combination of items assuming that 
 * any fraction of a loot item can be put into the bag.
 * @param {*} items: Items collection [{v:v1, w:w1}, ... {v:vi, w:wi}... {v:v(n-1), w:w(n-1)}] with length n
 * @param {*} w: maximum knapsack weight/capacity
 */
const maxLootValue = (items, w) => {

    if (!Array.isArray(items)) {
        throw new Error('items should be an array');
    }

    const itemsValueCompareFn = (itemA, itemB) => {
        const valueA = (itemA.v / itemA.w);
        const valueB = (itemB.v / itemB.w);

        //if A > B, a goes first
        return valueB - valueA;
    };

    //Sort input items
    const sortedItems = [...items].sort(itemsValueCompareFn);

    //Iterate
    const n = sortedItems.length;
    let maxValue = 0;
    let i = 0;
    while (w > 0 && i < n) {

        if (w > sortedItems[i].w) {
            //Greedy choice
            maxValue = maxValue + sortedItems[i].v;

            //Reduce problem size
            w = w - sortedItems[i].w;
        }
        else {
            //Greedy choice
            maxValue = maxValue + (sortedItems[i].v / sortedItems[i].w) * w;

            //Reduce problem size
            w = 0;
        }
        i++;
    }

    return maxValue;
}

module.exports = maxLootValue;

process.stdin.setEncoding('utf8');
const rli = readline.createInterface({
    input: process.stdin,
    terminal: false
});


/**
 * knapsack weight
 */
let w;

/**
 * Input items count
 */
let itemsCount = 0;

/**
 * Array of {v, w} objects
 * v: items value
 * w: items weight
 */
const items = [];

/**
 * Input line counter
 */
let lineCount = 0;

rli.on('line', (lineData) => {
    if (lineData !== '\n') {
        if (lineCount === 0) {
            const inputArray = lineData.split(' ');
            itemsCount = parseInt(inputArray[0], 10);
            w = parseInt(inputArray[1], 10);
            lineCount++;
        }
        else if (itemsCount > 0) {
            const inputArray = lineData.split(' ');
            items.push({
                v: parseInt(inputArray[0], 10),
                w: parseInt(inputArray[1], 10),
            });
            itemsCount--;

            if (itemsCount === 0) {
                const result = maxLootValue(items, w);
                console.log(result);
                process.exit();
            }
        }
    }
});