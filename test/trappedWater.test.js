const testCases = require('./testCases.json')
const Batiments = require('../Batiments')

test.each(testCases)('algorithm works correctly for %s',(array, result) =>{
    expect(new Batiments(array).trappedWater()).toBe(result)
})