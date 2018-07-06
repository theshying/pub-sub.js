const expect = require('chai').expect;
const event = require('../src/main.js')

const e = new event({})
describe('main.js', function() {
    describe('|--on', function() {
        it('params type is String', function() {
            e.on('test1', function str(){})
            expect(e.eventList().get('test1').length).to.be.equal(1)
        })
        it('params type is Number', function() {
            e.on(1, function num(){})
            expect(e.eventList().get(1).length).to.be.equal(1)
        })
        it('params type is Boolean', function() {
            e.on(true, function boo(){})
            expect(e.eventList().get(true).length).to.be.equal(1)
        })
        it('params type is Expression', function() {
            e.on(4*4, function expression(){})
            expect(e.eventList().get(4*4).length).to.be.equal(1)
        })

        it('params type is Null', function() {
            e.on(null, function expression(){})
            expect(e.eventList().get(null).length).to.be.equal(1)
        })

        it('params type is Undefined', function() {
            e.on(undefined, function expression(){})
            expect(e.eventList().get(undefined).length).to.be.equal(1)
        })
       
        //TODO:: type为函数或者对象这种引用类型的值，Map无法get
        it('same type be mutitle registed', function () {
            e.on('test1', function str1() { })
            expect(e.eventList().get('test1').length).to.be.equal(2)
        })
        it('registed in head of event_list', function() {
            e.on('test1', function first() {return 'xxx'}, true,true);
            expect(e.eventList().get('test1').length).to.be.equal(3)
            expect(e.eventList().get('test1')[0].toString()).to.be.equal('function first() {return \'xxx\'}')
        })
    })
})