
const readline = require('readline');
/**
 * You are responsible for collecting signatures from all tenants of a certain building.
 * For each tenant, you know a period of time when he or she is at home. 
 * You would like to collect all signatures by visiting the building as few times as possible.
 * The mathematical model for this problem is the following. You are given a set
 * of segments on a line and your goal is to mark as few points on a line as possible
 * so that each segment contains at least one marked point.
 * @param {Array<{a:number, b:number, visited:boolean}>} segmentsCollection Collection of segments, each segment has
 * a: initial point, b: end point, visited: bool
 */
const collectSignatures = (segmentsCollection) => {
    if (!Array.isArray(segmentsCollection)) {
        throw new Error('Segments must be a collection');
    }

    const segmentsSortFn = (a, b) => a.b - b.b;
    const sortedSegments = [...segmentsCollection].sort(segmentsSortFn);

    const minimumVisits = [];
    const n = sortedSegments.length;
    for (let i = 0; i < n; i++) {
        if (sortedSegments[i].visited === true) {
            continue;
        }

        let nextI = i;
        const innerSegmentsIndx = [];
        while (nextI < n
            && sortedSegments[i].b >= sortedSegments[nextI].a
            && sortedSegments[i].a <= sortedSegments[nextI].b) {
            innerSegmentsIndx.push(nextI);
            nextI++;
        }

        if (innerSegmentsIndx.length > 0) {
            for (let j = 0; j < innerSegmentsIndx.length; j++) {
                const currentSegment = sortedSegments[innerSegmentsIndx[j]];
                if (currentSegment.visited === false) {
                    const visitedSegmentsIndx = [];
                    let nextJ = j + 1;
                    while (nextJ < innerSegmentsIndx.length
                        && currentSegment.b >= sortedSegments[innerSegmentsIndx[nextJ]].a
                        && currentSegment.b <= sortedSegments[innerSegmentsIndx[nextJ]].b
                        && sortedSegments[innerSegmentsIndx[nextJ]].visited === false) {

                        sortedSegments[innerSegmentsIndx[nextJ]].visited = true;
                        visitedSegmentsIndx.push(innerSegmentsIndx[nextJ]);
                        nextJ++;
                    }
                    currentSegment.visited = true;
                    sortedSegments[i].visited = true;
                    minimumVisits.push(currentSegment.b);
                }
            }
        }
        else {
            minimumVisits.push(sortedSegments[i].b);
            sortedSegments[i].visited = true;
        }
    }

    return minimumVisits;
}

module.exports = collectSignatures;

process.stdin.setEncoding('utf8');
const rli = readline.createInterface({
    input: process.stdin,
    terminal: false
});


/**
 * stdin lines counter
 */
let lineCount = 0;

let n;

const segments = [];

rli.on('line', (lineData) => {
    if (lineData !== '\n') {
        if (lineCount === 0) {
            n = parseInt(lineData, 10);
        }
        else if (lineCount <= n) {
            const segment = lineData.split(' ').map(v => parseInt(v, 10));
            segments.push({
                a: segment[0],
                b: segment[1],
                visited: false
            });
        }

        if (lineCount === n) {
            const minVisitsCollection = collectSignatures(segments);
            console.log(minVisitsCollection.length);
            let output = '';
            for (let i = 0; i < minVisitsCollection.length; i++) {
                if (i < minVisitsCollection.length - 1) {
                    output += `${minVisitsCollection[i]} `;
                }
                else {
                    output += minVisitsCollection[i];
                }
            }
            console.log(output);
            process.exit();
        }
        lineCount++;
    }
});