var ul = document.getElementsByTagName('ul')[0];
var liArr = ul.children;
var number = document.getElementsByClassName('number')[0];
/* 焦点按钮 */
var span_num = number.children;
var inner = document.querySelector('.inner');
var span_box = document.querySelector('.span_box');
/* 左右按钮 */
var spanArr = span_box.children;
/* 索引 */
var num = 0;
var span_key = 0;
var timer = null;
// 复制第一张
var colLi = liArr[0].cloneNode(true);
console.log(colLi);
ul.appendChild(colLi);

inner.onmouseover = function () {
    clearInterval(timer);
}
inner.onmouseout = function () {
    autoScroll();
}
autoScroll();

function scorllRight() {
    num++;
    // 如果滚动到复制的第一张  瞬移回第一张
    if (num > liArr.length - 1) {
        ul.style.left = '0px';
        // num = 1; 变回1
        num = 1;
    }
    animate(ul, -num * inner.length - 1);
}

// 自动滚动
function autoScroll() {
    timer = setInterval(function () {
        scorllRight();
    }, 1000);
}

// 匀速动画
function animate(ele, target) {
    clearInterval(ele.timer);
    ele.timer = setInterval(function () {
        var step = (target - ele.offsetLeft) > 0 ? 10 : -10;
        if (Math.abs(target - ele.offsetLeft) <= step) {
            clearInterval(ele.timer);
            ele.style.left = target + 'px';
        } else {
            ele.style.left = ele.offsetLeft + step + 'px';
        }
    }, 10);
}