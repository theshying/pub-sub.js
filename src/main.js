function Event(option) {
    let { cache } = option
    let eventList = new Map();
    let emitList = new Map();
    // 在线订阅函数
    function on(type, ...fn) {
        let fns = eventList.get(type);
        if (Array.isArray(fns)) {
            eventList.set(type, [...fn].concat(...fns))
        } else {
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
    function emit(type, ...msg) {
        // if option.cache === true
        let currentMsg = [...msg];
        if (Boolean(cache)) {
            if (emitList.has(type)) {
                currentMsg.push(emitList.get(type))
            }
            emitList.set(type, currentMsg)
        }
        let fns = eventList.get(type);
        if (Array.isArray(fns)) {
            fns.forEach(fn => {
                currentMsg.forEach(msg => {
                    fn(msg)
                })
            })
        }
    }
    // 取消订阅函数
    function off(type, ...fn) {
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
    // 获取订阅事件列表
    function get_event_list() {
        return eventList
    }
    function get_emit_list() {
        return emitList
    }
    return {
        on,
        emit,
        off,
        on_offline,
        get_emit_list,
        get_event_list
    }
}

exports.default = Event;

const e = new Event({});


// console.log('Basic usage===')
// e.on('msg', function (arg) { console.log(arg) })
// e.emit('msg', 'hello')
// console.log('Basic usage===')



// console.log('Multiple on function')
// e.on('msg', function(arg) {
//     console.log(`fun1:${arg}`)
// }, function(arg) {
//     console.log(`fun2:${arg}`)
// })
// e.emit('msg', 'hello')
// console.log('Multiple on function')


// console.log('Multiple emit msg')
// e.on('msg', function(arg) {
//     console.log(`fun1:${arg}`)
// })
// e.emit('msg', 'hello1', 'hello2')

// console.log('Multiple emit msg')

