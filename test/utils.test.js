const expect = require('chai').expect;
const utils = require('../src/utils.js')

describe('utils', function() {
    describe('checkType', function() {
        it('check Array', function() {
            expect(utils.checkType([],'array')).to.be.equal(true)
        })
        it('check Object', function() {
            expect(utils.checkType({},'object')).to.be.equal(true)
        })
        it('check Function', function() {
            expect(utils.checkType(() => {},'function')).to.be.equal(true)
        })
        it('check String', function() {
            expect(utils.checkType('string','string')).to.be.equal(true)
        })
        it('check Number', function() {
            expect(utils.checkType(111,'Number')).to.be.equal(true)
        })
        it('check Null', function() {
            expect(utils.checkType(null,'null')).to.be.equal(true)
        })
        it('check undefined', function() {
            expect(utils.checkType(undefined,'undefined')).to.be.equal(true)
        })
        it('check 1+2', function() {
            expect(utils.checkType(1+2,'number')).to.be.equal(true)
        })
        it('check 1+2', function() {
            expect(utils.checkType('1+2','string')).to.be.equal(true)
        })
        it('check boolean', function() {
            expect(utils.checkType(1 === 2,'boolean')).to.be.equal(true)
        })
     
    })
})