
/**
 * Not working for corner cases
 * @param {Array<{x:Number, y:Number}} points 
 */
const getShortDistance = (points) => {
    points = points.sort((a, b) => a.x - b.x);
    return getShortDistanceDAC(points, 0, points.length - 1);
}

/**
 * 
 * @param {Array<{x:Number, y:Number}} points 
 * @param {Number} l 
 * @param {Number} r 
 */
const getShortDistanceDAC = (points, l, r) => {

    //Base case
    if (l > r) {
        return null;
    }

    if (l === r) {
        return {
            pointA: points[l],
            pointB: null,
            distance: 0
        }
    }

    //Get medium point
    const midPoint = Math.floor((l + r) / 2);

    //Get closest points from left
    const leftResult = getShortDistanceDAC(points, l, midPoint);

    //Get closest points from right
    const rightResult = getShortDistanceDAC(points, midPoint + 1, r);

    //Mix solution
    const result = mergeDistances(leftResult, rightResult);

    return result;
}

/**
 * 
 * @param {{pointA:{x:Number, y:Number}, {pointB:{x:Number, y:Number}, distance:Number}} resultA 
 * @param {{pointA:{x:Number, y:Number}, {pointB:{x:Number, y:Number}, distance:Number}} resultB 
 */
const mergeDistances = (resultA, resultB) => {
    if (resultA === null) {
        return resultB;
    }

    if (resultB === null) {
        return resultA;
    }

    if (resultA.pointB === null && resultB.pointB === null) {
        return getDistanceResult(resultA.pointA, resultB.pointA);
    }

    if (resultA.pointB === null && resultB.pointB !== null) {
        return getShortDistanceThreePoints(resultA.pointA, resultB.pointA, resultB.pointB);
    }

    if (resultB.pointB === null && resultA.pointB !== null) {
        return getShortDistanceThreePoints(resultB.pointA, resultA.pointA, resultA.pointB);
    }

    const distanceAA = getDistance(resultA.pointA, resultB.pointA);
    const distanceAB = getDistance(resultA.pointA, resultB.pointB);
    const distanceBA = getDistance(resultA.pointB, resultB.pointA);
    const distanceBB = getDistance(resultA.pointB, resultB.pointB);

    const minDistance = Math.min(distanceAA, distanceAB, distanceBA, distanceBB, resultA.distance, resultB.distance);
    switch (minDistance) {
        case resultA.distance:
            return resultA;
        case resultB.distance:
            return resultB;
        case distanceAA:
            return {
                pointA: resultA.pointA,
                pointB: resultB.pointA,
                distance: distanceAA
            }
        case distanceAB:
            return {
                pointA: resultA.pointA,
                pointB: resultB.pointB,
                distance: distanceAB
            }
        case distanceBA:
            return {
                pointA: resultA.pointB,
                pointB: resultB.pointA,
                distance: distanceBA
            }
        case distanceBB:
            return {
                pointA: resultA.pointB,
                pointB: resultB.pointB,
                distance: distanceBB
            }
    }
}

/**
 * 
 * @param {{x:Number, y:Number}} pointA 
 * @param {{x:Number, y:Number}} pointB 
 */
const getDistanceResult = (pointA, pointB) => {
    return {
        pointA,
        pointB,
        distance: getDistance(pointA, pointB)
    }
}

/**
 * 
 * @param {{x:Number, y:Number}} pointA 
 * @param {{x:Number, y:Number}} pointB 
 */
const getDistance = (pointA, pointB) => {
    return Math.sqrt(Math.pow(pointA.x - pointB.x, 2) + Math.pow(pointA.y - pointB.y, 2));
}


/**
 * 
 * @param {{x:Number, y:Number}} pointA 
 * @param {{x:Number, y:Number}} pointB 
 * @param {{x:Number, y:Number}} pointC 
 */
const getShortDistanceThreePoints = (pointA, pointB, pointC) => {
    const distanceAB = getDistance(pointA, pointB);
    const distanceAC = getDistance(pointA, pointC);
    const distanceBC = getDistance(pointB, pointC);

    const shortABAC = distanceAB < distanceAC
        ? {
            pointA,
            pointB,
            distance: distanceAB
        }
        : {
            pointA,
            pointB: pointC,
            distance: distanceAC
        };

    const result = distanceBC < shortABAC.distance
        ? {
            pointA: pointB,
            pointB: pointC,
            distance: distanceBC
        }
        : shortABAC;

    return result;
}

/*
const points =
   [ { x: 4, y: 4 },
     { x: -2, y: -2 },
     { x: -3, y: -4 },
     { x: -1, y: 3 },
     { x: 2, y: 3 },
     { x: -4, y: 0 },
     { x: 1, y: 1 },
     { x: -1, y: -1 },
     { x: 3, y: -1 },
     { x: -4, y: 2 },
     { x: -2, y: 4 } ];
const result = getShortDistance(points);
let x = 2;
*/

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});
process.stdin.setEncoding('utf8');
rl.once('line', line => {
    const pointsCount = parseInt(line.toString());
    let lineCount = 0;
    const points = [];
    rl.on('line', lineData => {
        if (lineCount < pointsCount) {
            const pointData = lineData.split(' ').map(v => parseInt(v));
            points.push({
                x: pointData[0],
                y: pointData[1]
            });
            lineCount++;
        }
        if (lineCount === pointsCount) {
            const result = getShortDistance(points);
            console.log(result.distance.toFixed(4));
            process.exit();
        }
    });
});