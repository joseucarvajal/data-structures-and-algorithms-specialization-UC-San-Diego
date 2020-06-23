const minCarRefills = require('./min-car-refils');

describe('mix-car-refils.iterative.js tests', () => {
    it('should return 2 min car refills', ()=> {
        const d = 950;
        const m = 400;
        const routes = [200, 375, 550, 750];
        const result = minCarRefills(d, m, routes);
        expect(result).toBe(2);
    });

    it('should thrown no path at the end, return -1', ()=> {
        const d = 1950;
        const m = 400;
        const routes = [200, 375, 550, 750];        
        expect(minCarRefills(d, m, routes)).toBe(-1);
    });

    it('should thrown no path at the begining, return -1', ()=> {
        const d = 1950;
        const m = 400;
        const routes = [700, 375, 550, 750];
        expect(minCarRefills(d, m, routes)).toBe(-1);
    });
});