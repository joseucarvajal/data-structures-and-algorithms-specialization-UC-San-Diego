const minMoneyCoinsChange = require('./money-change');

describe('money change', () => {
    it('should take 6 coins', () => {
        const change = 28;
        const result = minMoneyCoinsChange(change);
        expect(result).toBe(6);
    });

    it('should take 3 coins', () => {
        const change = 7;
        const result = minMoneyCoinsChange(change);
        expect(result).toBe(3);
    });
});