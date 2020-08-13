const calculatePointInSegmentsCount = (segments, points) => {
    
    
    /*
    //Remove duplicate segments
    let nonDuplicateSegments = [];
    const hashElements = {};
    let key;
    for(let segment of segments){
        key = `${segment.a.toString()},${segment.b.toString()}`;
        if(hashElements[key] === undefined){
            nonDuplicateSegments.push(segment);
            hashElements[key] = true;
        }
    }
    */
       
    //Sort segments non-ascending
    segments = segments.sort((a, b) =>  a.a - b.a);

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

    const m = Math.floor((r + l) / 2);
    const pointLocation = locatePointInSegment(segments[m], point);
    if (pointLocation === 0) {
        return countPointInAdjacentSegments(segments, m, point);
    }
    else if (pointLocation === -1) { //left
        return countPointInSegments(segments, l, m, point);
    }
    
    //right
    return countPointInSegments(segments, m + 1, r, point);    
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
    if(segment === undefined){
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