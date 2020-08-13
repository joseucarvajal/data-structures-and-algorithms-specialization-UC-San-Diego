let previousSegmentResults = [];

/**
 * NOT PASSED :(  ... yet :)
 *
 You are organizing an online lottery. To participate, a person bets on a single
 * integer. You then draw several ranges of consecutive integers at random.
 * A participant’s payoff then is proportional to the number of ranges that
 * contain the participant’s number minus the number of ranges that does not
 * contain it. You need an efficient algorithm for computing the payoffs for all
 * participants. A naive way to do this is to simply scan, for all participants, the
 * list of all ranges. However, you lottery is very popular: you have thousands
 * of participants and thousands of ranges. For this reason, you cannot afford
 * a slow naive algorithm. segments 
 * 
 * You are given a set of points on a line and a set of segments on a line. The goal is to compute, for
 * each point, the number of segments that contain this point.
 * 
 * @param {*} segments 
 * @param {*} points 
 */
const calculatePointInSegmentsCount = (segments, points) => {

    //Initialize memoized hash for points counter
    const pointSegmentCountHash = {};
    for (let point of points) {
        pointSegmentCountHash[point] = 0;
    }
    
    //Remove repeated points
    let sortedPoints = [];
    Object.keys(pointSegmentCountHash).forEach(k => sortedPoints.push(parseInt(k)));
    
    //Sort points non-descending order    
    sortedPoints.sort((a, b) => a - b);
    
    //Sort segments non-descending order
    segments.sort((a, b) => {
        if (a.a === b.a) {
            return a.b - b.b;
        }
        
        return a.a - b.a;
    });
    
    let previousSegment = undefined;
    for (let segment of segments) {
        if (previousSegment && previousSegment.a === segment.a && previousSegment.b === segment.b) {
            for (let point of previousSegmentResults) {
                pointSegmentCountHash[point]++;
            }
            continue;
        }
        
        previousSegmentResults = [];
        countPointsInSegment(sortedPoints, 0, sortedPoints.length - 1, segment, pointSegmentCountHash);
        previousSegment = segment; //Memoize previous segment
    }
    
    const pointsCounter = [];
    for (let point of points) {
        pointsCounter.push(pointSegmentCountHash[point]);
    }

    return pointsCounter;
}

const countPointsInSegment = (points, l, r, segment, pointSegmentCountHash) => {
    if (l > r) {
        return;
    }

    const m = Math.floor((l + r) / 2);
    const pointInSegmentLocation = locatePointInSegment(segment, points[m]);

    if (pointInSegmentLocation === 0) {
        pointSegmentCountHash[points[m]]++;
        previousSegmentResults.push(points[m]);
        countAdjacentPointsInSegment(segment, m, points, pointSegmentCountHash);
    }
    else if (pointInSegmentLocation === 1) {
        countPointsInSegment(points, l, m - 1, segment, pointSegmentCountHash);
    }
    else {
        countPointsInSegment(points, m + 1, r, segment, pointSegmentCountHash);
    }
}

const countAdjacentPointsInSegment = (segment, m, points, pointSegmentCountHash) => {

    //Right scan for another matching points
    let i = m + 1;
    while (locatePointInSegment(segment, points[i]) === 0) {
        pointSegmentCountHash[points[i]]++;
        previousSegmentResults.push(points[i]);
        i++;
    }

    //Left scan for another matching points
    i = m - 1;
    while (locatePointInSegment(segment, points[i]) === 0) {
        pointSegmentCountHash[points[i]]++;
        previousSegmentResults.push(points[i]);
        i--;
    }
}

const locatePointInSegment = (segment, point) => {
    if (segment === undefined) {
        return -1;
    }

    if (segment.a <= point && point <= segment.b) {
        return 0;
    }

    if (point > segment.b) {
        return 1;
    }

    return -1;
}

module.exports = calculatePointInSegmentsCount;

/*
const segments = [{ a: 5, b: 9 }, { a: 1, b: 7 }, { a: 2, b: 3 }, { a: 4, b: 6 }];
const points = [4, 3, 7, 3];
const result = calculatePointInSegmentsCount(segments, points);
const x = 1;
*/

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});
process.stdin.setEncoding('utf8');
rl.once('line', line => {
    const lineData = line.toString().split(' ').map(v => parseInt(v, 10));
    const nSegments = lineData[0];
    let segmentCount = 0;
    const segments = [];
    rl.on('line', line => {
        if (segmentCount < nSegments) {
            const segmentData = line.split(' ').map(v => parseInt(v, 10));
            segments.push({
                a: segmentData[0],
                b: segmentData[1]
            });
            segmentCount++;
        }
        else {
            const points = line.split(' ').map(v => parseInt(v, 10));
            const result = calculatePointInSegmentsCount(segments, points);
            for (let value of result) {
                process.stdout.write(`${value} `);
            }
            process.exit();
        }
    });
});