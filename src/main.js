


function Event(option) {
    const {cache} = option;
    let eventList = new Map();
    let emitList = new Map();
    // 在线订阅函数
    function on(type, ...fn){
        let fns = eventList.get(type);
        if (Array.isArray(fns)) {
            eventList.set(type, [...fn].concat(...fns))
        } else{
            eventList.set(type, [...fn])
        }
    }
    //离线订阅函数
    function on_offline(type, ...fn) {
        on(type, ...fn)
        if (cache) {
            if (emitList.has(type)) {
                emitList.get(type).forEach(item => {
                    [...fn].forEach(f => {
                        f(item)
                    })
                })
            }
        } else {
            console.warn('option.cache is not true')
        }
    }
    // 发布函数
    function emit(type, ...msg){
        // if option.cache === true
        if (Boolean(cache)) {
            let currentMsg = [...msg];
            if (emitList.has(type)){
                currentMsg.push(emitList.get(type))
            }
            emitList.set(type,currentMsg)
        }
        let fns = eventList.get(type);
        if (Array.isArray(fns)) {
            fns.forEach(fn => {
                fn(...msg)
            })
        }
    }
    // 取消订阅函数
    function off(type, ...fn){
        let fns = eventList.get(type);
        if (Array.isArray(fns)) {
            if ([...fn].length > 0) {
                let filterFns = fns.filter(item => ![...fn].includes(item));
                eventList.set(type, filterFns);
            } else {
                eventList.set(type, [])
            }
        }
    }
    function once(type, ...fn) {

    }
    return {
        on,
        emit,
        off,
        once,
        on_offline
    }
}

exports.default = Event;

const e = new Event({cache: true})
e.emit('msg', '1111111')
e.on_offline('msg', function() {
    console.log(...arguments)
})


