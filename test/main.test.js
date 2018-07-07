const expect = require('chai').expect;
const event = require('../src/main.js')

describe('main.js', function () {
    describe('|--on', function () {
        const e = new event({})
        var i = 0;
        const handler = (msg) => {
            i += msg
        }
        const handlerFirst = (msg) => {
            i += msg + "first"
        }
        const eventList = e.eventList();
        it('on(type)', function () {
            e.on('test1', handler)
            expect(eventList.get('test1').length).to.be.equal(1);
            expect(eventList.get('test1')[0].name).to.be.equal('handler');

            e.on('test1', handler)
            expect(eventList.get('test1').length).to.be.equal(2);
            expect(eventList.get('test1')[1].name).to.be.equal('handler');
        })

        it('on(type, online, flag)', function () {
            e.on('test1', handlerFirst, true, false);
            expect(eventList.get('test1').length).to.be.equal(3);
            expect(eventList.get('test1')[2].name).to.be.equal('handlerFirst');
            expect(eventList.get('test1')[0].name).not.to.equal('handlerFirst');

            e.on('test1', handlerFirst, true, true);
            expect(eventList.get('test1').length).to.be.equal(4);
            expect(eventList.get('test1')[0].name).to.be.equal('handlerFirst');

            e.on('test1', handler, false, false);
            expect(eventList.get('test1').length).to.be.equal(5);
            expect(eventList.get('test1')[4].name).to.be.equal('handler');

            e.on('test1', handler, false, true);
            expect(eventList.get('test1').length).to.be.equal(6);
            expect(eventList.get('test1')[0].name).to.be.equal('handler');

        })

    })
    describe('|--emit', function () {
        const e = new event({})
        var i = 0;
        const handler = (msg) => {
            i += msg
        }
        const handlerFirst = (msg) => {
            i += msg + "first"
        }
        const eventList = e.eventList();
        const emittList = e.emitList();
        it('emit(type, msg)', function () {
            e.on('test1', handler);
            e.on('test2', handler);
            e.emit('test1', 10);
            expect(emittList.get('test1').length).to.be.equal(1)
            expect(emittList.get('test1')[0]).to.be.equal(10)
            expect(i).to.be.equal(10);
            e.emit('test1', 'theshy');
            expect(emittList.get('test1').length).to.be.equal(2)
            expect(emittList.get('test1')[1]).to.be.equal('theshy')
            expect(i).to.be.equal('10theshy');
            
            e.emit('test1', 'theshy','test111');
            expect(emittList.get('test1').length).to.be.equal(4)
            expect(emittList.get('test1')[3]).to.be.equal('test111')
            expect(i).to.be.equal('10theshytheshytest111');
        })
    })

    describe('|--once', function () {
        const e = new event({})
        var i = 0;
        const handler = (msg) => {
            i += msg
        }
        const handlerFirst = (msg) => {
            i += msg + "first"
        }
        const eventList = e.eventList();
        it('once(type,cb)', function () {
            e.once('test1', handler)
            e.emit('test1', 999);
            e.emit('test1', 999);
            e.emit('test1', 999);
            expect(i).to.be.equal(999)
            expect(eventList.get('test1').length).to.be.equal(0)


            e.once('test2', handler)
            e.once('test2', handlerFirst)
            e.emit('test2', 999);
            e.emit('test2', 999);
            e.emit('test2', 999);
            expect(i).to.be.equal('1998999first')
            expect(eventList.get('test1').length).to.be.equal(0)

        })

        it('once(type, cb, online, flag)', function () {
            e.once('test3', handler, true, false);
            e.emit('test3','xu')
            e.emit('test3','xu')
            e.emit('test3','xu')
            e.emit('test3','xu')
            expect(i).to.be.equal('1998999firstxu')
            expect(eventList.get('test3').length).to.be.equal(0)
        })

    })

    describe('|--off', function () {
        const e = new event({})
        var i = 0;
        const handler = (msg) => {
            i += msg
        }
        const handlerFirst = (msg) => {
            i += msg + "first"
        }
        const eventList = e.eventList();
        it('off(type,cb)', function () {
            e.on('test1', handler)
            e.on('test1', handler, true, false)
            e.on('test1', handler)
            e.on('test1', handler, true, false)
            expect(eventList.get('test1').length).to.be.equal(4)
            e.off('test1')
            expect(eventList.get('test1').length).to.be.equal(0)

            e.on('test1', handler)
            e.on('test1', handlerFirst)
            expect(eventList.get('test1').length).to.be.equal(2)
            e.off('test1', handler, handlerFirst)
            expect(eventList.get('test1').length).to.be.equal(0)



            e.on('test1', handler)
            e.on('test1', handlerFirst)
            expect(eventList.get('test1').length).to.be.equal(2)
            e.off('test1', handler)
            expect(eventList.get('test1').length).to.be.equal(1)
     

        })

    })
})