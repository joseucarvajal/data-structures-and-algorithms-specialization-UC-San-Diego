const calculatePointInSegmentsCountNaive = (segments, points) => {

    const pointsCounter = [];
    for (let point of points) {
        pointsCounter.push(0);
        for (let segment of segments) {
            if (segment.a <= point && point <= segment.b) {
                pointsCounter[pointsCounter.length - 1]++;
            }
        }
    }

    return pointsCounter;
}


const calculatePointInSegmentsCount = require('./organizing-a-lottery');
while (true) {
    const n = Math.floor(Math.random() * 10000);
    const segments = [];
    const points = [];
    const maxPoint = 10000;
    for (let i = 0; i < n; i++) {
        let a = Math.floor(Math.random() * maxPoint); 
        let b = Math.floor(Math.random() * maxPoint); 
        if(b < a){
            const tmp = a;
            a = b;
            b = tmp;
        }
        segments.push({a, b});
        points.push(Math.floor(Math.random() * maxPoint))
    }

    let date = new Date();
    console.log('fast STARTS n', n, date.getHours(), date.getMinutes(), date.getSeconds());
    const result = calculatePointInSegmentsCount(segments, points);
    date = new Date();
    console.log('fast END', date.getHours(), date.getMinutes(), date.getSeconds());    
    
    const resultNaive = calculatePointInSegmentsCountNaive(segments, points);
    date = new Date();
    console.log('naive END', date.getHours(), date.getMinutes(), date.getSeconds());    

    if (resultNaive.toString() !== result.toString()) {
        console.log('ERROR');
        console.log('points', points.toString());
        console.log('segments', JSON.stringify(segments));
        console.log('naive', resultNaive.toString());
        console.log('DAC  ', result.toString());
        console.log('-----------TEST CASE--------------');
        console.log(`${segments.length} ${n}`);
        for(let segment of segments){            
            console.log(`${segment.a} ${segment.b}`);
        }
        console.log(points.join(' '));
        break;
    }
    else {
        console.log('OK');
    }

}