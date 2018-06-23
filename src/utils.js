
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
         console.log(msg)
    }

module.exports = {
    checkType,
    isFun,
    log
}
