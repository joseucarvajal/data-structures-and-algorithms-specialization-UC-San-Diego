
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

    const segmentsSortFn = (a, b) => {
        if (a.a < b.a) {
            return -1;
        }
        else if (a.a === b.a) {
            return (b.b - b.a) - (a.b - a.a); //long distance first
        } else {
            return 1;
        }
    };
    const sortedSegments = [...segmentsCollection].sort(segmentsSortFn);    

    const minimumVisits = [];
    const n = sortedSegments.length;
    for (let i = 0; i < n; i++) {
        let j = sortedSegments[i].a;
        if(sortedSegments[i].visited === true){
            continue;
        }
        while (j <= sortedSegments[i].b) {

            let nextSegmentIndx = i;
            let isJEndPoint = false;
            while (nextSegmentIndx < n && (j >= sortedSegments[nextSegmentIndx].a && j <= sortedSegments[nextSegmentIndx].b)) {
                if (j === sortedSegments[nextSegmentIndx].b) {
                    isJEndPoint = true;
                }
                nextSegmentIndx++;
            }            

            const visitedSegments = [];
            if (isJEndPoint && nextSegmentIndx > i) {
                for (let k = i; k < nextSegmentIndx; k++) {
                    if (k < n && sortedSegments[k].visited === false) {
                        sortedSegments[k].visited = true;
                        visitedSegments.push(k);
                    }
                }
                if (visitedSegments.length > 0) {
                    minimumVisits.push(j);
                }
            }

            j++;
        }
    }

    return minimumVisits;
}

module.exports = collectSignatures;

//collectSignatures([{a:94, b:95, visited:false}, {a:79, b:81, visited:false}]);

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