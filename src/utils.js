
 /**
  * 类型判断函数
  * @param {*} arg 
  * @param {*} type 
  */
 function checkType (arg, type)  {
    if ([...arguments].length >= 2) {
        let proType =  Object.prototype.toString.apply(arg);
        return proType.substring(8, proType.length-1).toLowerCase() === type.toLowerCase()
    }
}

  /**
     * 判断是否为一个函数
     * @param {*} cb 
     */
    function isFun(cb) {
        return checkType(cb, 'function')
    }

    /**
     * 日志打印
     * @param {*} msg 
     */
     function log(msg) {
         console.log(msg)
    }

    /**
     * warn
     */
    function warn(msg) {
        console.warn(msg)
    }

    /**
     * error
     */
    function error(msg) {
        console.error(msg)
    }
module.exports = {
    checkType,
    isFun,
    log,
    warn,
    error
}
