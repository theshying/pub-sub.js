


function Event(option) {
    let eventList = new Map()
    // 订阅函数
    function on(type, ...fn){
        let fns = eventList.get(type);
        if (Array.isArray(fns)) {
            eventList.set(type, [...fn].concat(...fns))
        } else{
            eventList.set(type, [...fn])
        }
    }
    // 发布函数
    function emit(type, ...msg){
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
    return {
        on,
        emit,
        off,
    }
}

exports.default = Event;
