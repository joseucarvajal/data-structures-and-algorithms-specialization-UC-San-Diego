/**
 * 
 * @param {Array<Number>} arr 
 */
const maxSubArray = (arr) => {
    return maxSubArrayDAC(arr, 0, arr.length - 1);
}

const maxSubArrayDAC = (arr, l, r) => {
    if (l > r) {
        return [];
    }

    if (l === r) {
        return [arr[l]];
    }

    const midPoint = Math.floor((l + r) / 2);
    const maxSubArrLeft = maxSubArrayDAC(arr, l, midPoint);
    const maxSubArrRight = maxSubArrayDAC(arr, midPoint + 1, r);

    return merge(maxSubArrLeft, maxSubArrRight);
}

/**
 * 
 * @param {Array<Number>} maxSubArrLeft 
 * @param {Array<Number>} maxSubArrRight 
 */
const merge = (maxSubArrLeft, maxSubArrRight) => {
    const sumLeft = maxSubArrLeft.length > 0 ? maxSubArrLeft.reduce((sum, val) => sum += val) : 0;
    const sumRight = maxSubArrRight.length > 0 ? maxSubArrRight.reduce((sum, val) => sum += val) : 0;
    const sumLastLeftRight = maxSubArrLeft.length > 0 ? maxSubArrLeft[maxSubArrLeft.length - 1] + sumRight : maxSubArrRight;
    const sumLeftRight = sumLeft + sumRight;

    const maxSum = Math.max(sumLeft, sumRight, sumLastLeftRight, sumLeftRight);

    switch (maxSum) {
        case sumLeftRight:
            maxSubArrLeft.push(...maxSubArrRight);
            return maxSubArrLeft;

        case sumLastLeftRight:
            let sumArr = [maxSubArrLeft[maxSubArrLeft.length - 1]];
            sumArr.push(maxSubArrRight);
            return sumArr;

        case sumLeft:
            return maxSubArrLeft;

        default:
            return maxSubArrRight;
    }
}

const res = maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]);
console.log(JSON.stringify(res));
let x = 1;