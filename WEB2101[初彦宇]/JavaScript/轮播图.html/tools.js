/**
 * 
 * @param {*} ele 元素
 * 根据标签名获取元素
 */
function getTag(ele) {
    return document.getElementsByTagName(ele);
}
/**
 * 
 * @param {} ele 
 * 根据类名获取元素
 */
function getClass(ele) {
    return document.getElementsByClassName(ele);
}
/**
 * 
 * @param {*} ele 
 * 根据ID获取元素
 */
function getId(ele) {
    return document.getElementById(ele);
}
/**
 * 
 * @param {*} ele 
 * 获取第一个子元素
 */
function fs(ele) {
    return ele.firstElementChild || ele.firstChild;
}
/**
 * 
 * @param {*} ele 
 * 获取最后一个子元素
 */
function ls(ele) {
    return ele.lastElementChild || ele.lastChild;
}
/**
 * 
 * @param {*} ele 
 * 获取下一个兄弟
 */
function ns(ele) {
    return ele.nextElementSibling || ele.nextSibling;
}
/**
 * 
 * @param {*} ele 
 * 获取上一个兄弟
 */
function ps(ele) {
    return ele.previousElementSibling || ele.previousSibling;
}
/**
 * 
 * @param {*} ele 
 * 获取除了自己之外的所有兄弟
 */
function otherSibling(ele) {
    var newArr = [];
    var arr = ele.parentNode.children;
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] !== ele) {
            newArr.push(arr[i]);
        }
    }
    return newArr;
}
/**
 * 
 * 获取scrollTop和获取scrollLeft的方法
 */
function myScroll() {
    return {
        top: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop,
        left: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft
    }
}