const utils = require('./utils')
const _emitList = Symbol('_emitList');
const _eventList = Symbol('_eventList');
const _debug = Symbol('_debug');
/**
 * 事件订阅发布
 * @param {Object} option 
 */

class event_bus {
    constructor(option) {
        // 调式模式
        this[_debug] = option ? option.debug || false : false
        console.log(this[_debug])
        // 事件订阅队列
        this[_eventList] = new Map();
        // 事件发布队列
        this[_emitList] = new Map();
    }

    /**
     * 注册回调函数
     * @param {*} type 注册主题
     * @param {Function} cb  回调函数
     * @param {Boolean} flag  true:向函数队列头插入
     * @param {Boolean} offline  true:支持离线消息
     */
    on(type, cb, flag, offline) {
        if (utils.isFun(cb)) {
            if (this[_eventList].has(type)) {
                let fns = this[_eventList].get(type)
                // flag为true,则向前插入
                if (flag) {
                    this[_eventList].set(type, [cb].concat(fns));
                } else {
                   this[_eventList].set(type, fns.concat([cb]));
                }
            } else {
                this[_eventList].set(type, [cb])
            }
            // 如果是离线订阅，则执行缓存的emit list
            if (offline) {
                if (this[_emitList].has(type)) {
                    let msgList = this[_emitList].get(type)
                    // 异步执行，防止阻塞订阅
                    setTimeout(() => {
                        msgList.forEach(msg => {
                            cb(msg)
                        })
                    }, 0)
                }
            }
            this[_debug] && utils.log(`${type} register a handler `)
        }
    }

    /**
     * 注册回调函数，只回调一次
     * @param {*} type 注册主题
     * @param {Function} cb  回调函数
     * @param {*} flag  true:向函数队列头插入
     */
    once(type, cb, flag) {
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
    emit(type, ...msg) {
        let msgList = [...msg];
        // 缓存发布记录
        if (this[_emitList].has(type)) {
            let msgs = this[_emitList].get(type);
            this[_emitList].set(type, msgs.concat(msgList))
        } else {
            this[_emitList].set(type, [...msg])
        }
        // 执行回调函数
        if (this[_eventList].has(type)) {
            let fns = this[_eventList].get(type);
            fns.forEach(fn => {
                fn.call(this, ...msg);
                this[_debug] && utils.log(`emit ${msg}`);
            })
            return;
        }
        this[_debug] && utils.log(`${type} emit a message `)
    }

    /**
     * 取消订阅函数
     * @param {*} 事件主题 
     * @param {*} 回调函数
     */
    off(type, ...fn) {
        if (this[_eventList].has(type)) {
            if ([...fn].length === 0) {
                this[_eventList].set(type, []);
                return;
            } else {
                let fns = this[_eventList].get(type).filter(item => [...fn].indexOf(item) === -1);
                this[_eventList].set(type, fns);
                return
            }
        }
    }

    /**
     * 获取事件订阅列表
     */
    eventList() {
        return this[_eventList]
    }

    /**
     * 获取事件发布列表
     */
    emitList() {
        return this[_eventList]
    }

  }

module.exports = event_bus