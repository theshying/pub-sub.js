const utils = require('./utils')

/**
 * 事件订阅发布
 * @param {Object} option 
 */
function _Event(option) {
    // 调式模式
    this._debug = option.debug
    this._online = true
    this._eventList = new Map();
    this._emitList = new Map();

    /**
     * 注册回调函数
     * @param {*} type 注册主题
     * @param {Function} cb  回调函数
     * @param {Boolean} flag  true:向函数队列头插入
     * @param {Boolean} offline  true:支持离线消息
     */
    function on(type, cb, flag, offline) {
        if (isFun(cb)) {
            if (_eventList.has(type)) {
                let fns = _eventList.get(type)
                // flag为true,则向前插入
                if (flag) {
                    _eventList.set(type, [cb].concat(fns));
                } else {
                    _eventList.set(type, fns.concat([cb]));
                }
            } else {
                _eventList.set(type, [cb])
            }
            // 如果是离线订阅，则执行缓存的emit list
            if (offline) {
                if (_emitList.has(type)) {
                    let msgList = _emitList.get(type)
                    msgList.forEach(msg => {
                        cb(msg)
                    })
                }
            }
            _log(`${type} register a handler `)
        }
    }
    /**
     * 注册回调函数，只回调一次
     * @param {*} type 注册主题
     * @param {Function} cb  回调函数
     * @param {*} flag  true:向函数队列头插入
     */
    function once(type, cb, flag) {
        let temp = function () {
            cb(...arguments);
            this.off(type, temp)
        }
        this.on(type, temp, false)
    }

    /**
     * 事件发布函数
     * @param {*} type 事件主题 
     * @param {*} msg  发布消息
     */
    function emit(type, ...msg) {
        let msgList = [...msg];
        // 缓存发布记录
        if (_emitList.has(type)) {
            let msgs = _emitList.get(type);
            _emitList.set(type, msgs.concat(msgList))
        } else {
            _emitList.set(type, [...msg])
        }
        // 执行回调函数
        if (_eventList.has(type)) {
            let fns = _eventList.get(type);
            fns.forEach(fn => {
                fn.call(this, ...msg);
                _log(`emit ${msg}`);
            })
            return;
        }
    }

    /**
     * 取消订阅函数
     * @param {*} 事件主题 
     * @param {*} 回调函数
     */
    function off(type, fn) {
        if (_eventList.has(type)) {
            let fns = _eventList.get(type).filter(item => item !== fn);
            _eventList.set(type, fns);

        }
    }

    /**
     * 获取事件订阅列表
     */
    function eventList() {
        return _eventList
    }

    /**
     * 获取事件发布列表
     */
    function _emitList() {
        return _eventList
    }

    /**
     * 判断是否为一个函数
     * @param {*} cb 
     */
    function isFun(cb) {
        if (utils.checkType(cb, 'function')) {
            return true;
        } else {
            throw new Error('rguments callBack accept a Function');
        }

    }

    /**
     * 日志打印
     * @param {*} msg 
     */
    function _log(msg) {
        if (this._debug) {
            console.info(msg)
        }
    }
    return {
        on,
        emit,
        off,
        once,
    }
}

exports.default = _Event({});
