const maxAdvertisementRevenue = require('./max-advertisement-revenue');

describe('maximum advertisement revenue', () => {

    it('Should return expected revenue equals to 897', () => {
        const addsRevenue = [23];
        const slots = [39];

        const result = maxAdvertisementRevenue(addsRevenue, slots);

        expect(result).toBe(897);
    });

    it('Should return expected revenue equals to 23', () => {
        const addsRevenue = [1, 3, -5];
        const slots = [-2, 4, 1];

        const result = maxAdvertisementRevenue(addsRevenue, slots);

        expect(result).toBe(23);
    });

});