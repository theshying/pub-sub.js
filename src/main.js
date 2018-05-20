import { checkType } from './utils.js';



function Event(option) {
    function on(){}
    function emit(){}
    function off(){}
    return {
        on,
        emit,
        off,
    }
}

const e = new Event([])