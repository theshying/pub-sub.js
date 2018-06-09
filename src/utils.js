
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
module.exports = {
    checkType
}
