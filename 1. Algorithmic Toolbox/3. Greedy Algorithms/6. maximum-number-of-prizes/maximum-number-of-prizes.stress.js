const maximumNumberOfPrices = require('./maximum-number-of-prizes');

while (true) {
    const j = parseInt((Math.random() * 1000000000), 10);
    try{
        const result = maximumNumberOfPrices(j);
        console.log(`${j}: ${result.length}`);        
    }
    catch(err){
        console.log('ERRROR: ', j);
        break;
    }
}