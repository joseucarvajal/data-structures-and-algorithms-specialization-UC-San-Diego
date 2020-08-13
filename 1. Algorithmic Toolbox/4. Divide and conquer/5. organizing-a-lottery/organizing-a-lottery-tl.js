const countPointsInSegments = (points, segments) => {

    //Sort segments non-ascending
    segments = segments.sort((a, b) => {
        return a.a - b.a;
    });

    //console.log(JSON.stringify(segments));

    const pointsCounter = [];
    for (let point of points) {
        pointsCounter.push(countPointInSegments(segments, 0, segments.length - 1, point));
    }

    return pointsCounter;
}

const countPointInSegments = (segments, l, r, point) => {

    if (l > r) {
        return 0;
    }
    if (l === r) {
        return locatePointInSegment(segments[l], point) === 0 ? 1 : 0;
    }

    const m = Math.floor((l + r) / 2);
    const pointLocation = locatePointInSegment(segments[m], point);
    let selfCount = 0;
    if (pointLocation === 0) {
        selfCount = 1;//countPointInAdjacentSegments(segments, m, point);
    }    
    //else if (pointLocation === -1) { //left
    const leftCount = countPointInSegments(segments, l, m - 1, point);
    //}

    //right
    const rightCount = countPointInSegments(segments, m + 1, r, point);

    return selfCount + leftCount + rightCount;
}

const countPointInAdjacentSegments = (segments, m, point) => {
    let segmentsCount = 1;

    //back count
    let i = m - 1;
    let segment = segments[i];
    while (locatePointInSegment(segments[i], point) === 0) {
        segmentsCount++;
        i--;
    }

    //forward count
    i = m + 1;
    while (locatePointInSegment(segments[i], point) === 0) {
        segmentsCount++;
        i++;
    }

    return segmentsCount;
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

module.exports = countPointsInSegments;

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
            /*
            let a, b;
            if (segmentData[0] <= segmentData[1]) {
                a = segmentData[0];
                b = segmentData[1];
            }
            else {
                a = segmentData[1];
                b = segmentData[0];
            }
            */
            segments.push({
                a: segmentData[0],
                b: segmentData[1]
            });
            segmentCount++;
        }
        else {
            const points = line.split(' ').map(v => parseInt(v, 10));
            const result = countPointsInSegments(points, segments);
            for (let value of result) {
                process.stdout.write(`${value} `);
            }
            process.exit();
        }
    });
});