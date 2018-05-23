
function checkType(arg,type) {
    if ([...arguments].length >=2) {
        return Object.prototype.toString.apply(type).substring(8, -1) === type
    }
    throw error('参数错误')
}

module.export = {
    checkType,
}
