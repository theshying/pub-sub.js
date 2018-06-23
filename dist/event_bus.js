(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.eventBus = factory());
}(this, (function () { 'use strict';

/**
 * 类型判断函数
 * @param {*} arg 
 * @param {*} type 
 */
function checkType(arg, type) {
    if ([].concat(Array.prototype.slice.call(arguments)).length >= 2) {
        var proType = Object.prototype.toString.apply(arg);
        return proType.substring(8, proType.length - 1).toLowerCase() === type.toLowerCase();
    }
}

/**
   * 判断是否为一个函数
   * @param {*} cb 
   */
function isFun(cb) {
    if (checkType(cb, 'function')) {
        return true;
    } else {
        throw new Error('rguments callBack accept a Function');
    }
}

/**
 * 日志打印
 * @param {*} msg 
 */
function log(msg) {
    console.log(msg);
}

var utils = {
    checkType: checkType,
    isFun: isFun,
    log: log
};

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }


var _emitList = Symbol('_emitList');
var _eventList = Symbol('_eventList');
var _debug = Symbol('_debug');
/**
 * 事件订阅发布
 * @param {Object} option 
 */

var event_bus = function () {
    function event_bus(option) {
        _classCallCheck(this, event_bus);

        // 调式模式
        this[_debug] = option ? option.debug || false : false;
        console.log(this[_debug]);
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


    _createClass(event_bus, [{
        key: 'on',
        value: function on(type, cb, flag, offline) {
            if (utils.isFun(cb)) {
                if (this[_eventList].has(type)) {
                    var fns = this[_eventList].get(type);
                    // flag为true,则向前插入
                    if (flag) {
                        this[_eventList].set(type, [cb].concat(fns));
                    } else {
                        this[_eventList].set(type, fns.concat([cb]));
                    }
                } else {
                    this[_eventList].set(type, [cb]);
                }
                // 如果是离线订阅，则执行缓存的emit list
                if (offline) {
                    if (this[_emitList].has(type)) {
                        var msgList = this[_emitList].get(type);
                        // 异步执行，防止阻塞订阅
                        setTimeout(function () {
                            msgList.forEach(function (msg) {
                                cb(msg);
                            });
                        }, 0);
                    }
                }
                this[_debug] && utils.log(type + ' register a handler ');
            }
        }

        /**
         * 注册回调函数，只回调一次
         * @param {*} type 注册主题
         * @param {Function} cb  回调函数
         * @param {*} flag  true:向函数队列头插入
         */

    }, {
        key: 'once',
        value: function once(type, cb, flag) {
            var temp = function temp() {
                cb.apply(undefined, arguments);
                this.off(type, temp);
            };
            this.on(type, temp, false);
        }
        /**
        * 事件发布函数
        * @param {*} type 事件主题 
        * @param {*} msg  发布消息
        */

    }, {
        key: 'emit',
        value: function emit(type) {
            var _this = this;

            for (var _len = arguments.length, msg = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                msg[_key - 1] = arguments[_key];
            }

            var msgList = [].concat(msg);
            // 缓存发布记录
            if (this[_emitList].has(type)) {
                var msgs = this[_emitList].get(type);
                this[_emitList].set(type, msgs.concat(msgList));
            } else {
                this[_emitList].set(type, [].concat(msg));
            }
            // 执行回调函数
            if (this[_eventList].has(type)) {
                var fns = this[_eventList].get(type);
                fns.forEach(function (fn) {
                    fn.call.apply(fn, [_this].concat(msg));
                    _this[_debug] && utils.log('emit ' + msg);
                });
                return;
            }
            this[_debug] && utils.log(type + ' emit a message ');
        }

        /**
         * 取消订阅函数
         * @param {*} 事件主题 
         * @param {*} 回调函数
         */

    }, {
        key: 'off',
        value: function off(type) {
            for (var _len2 = arguments.length, fn = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                fn[_key2 - 1] = arguments[_key2];
            }

            if (this[_eventList].has(type)) {
                if ([].concat(fn).length === 0) {
                    this[_eventList].set(type, []);
                    return;
                } else {
                    var fns = this[_eventList].get(type).filter(function (item) {
                        return [].concat(fn).indexOf(item) === -1;
                    });
                    this[_eventList].set(type, fns);
                    return;
                }
            }
        }

        /**
         * 获取事件订阅列表
         */

    }, {
        key: 'eventList',
        value: function eventList() {
            return this[_eventList];
        }

        /**
         * 获取事件发布列表
         */

    }, {
        key: 'emitList',
        value: function emitList() {
            return this[_eventList];
        }
    }]);

    return event_bus;
}();

var main = event_bus;

return main;

})));
//# sourceMappingURL=event_bus.js.map
