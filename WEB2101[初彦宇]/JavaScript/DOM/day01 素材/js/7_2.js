// window.onload = function () {
//     /* 奇数行变色 */
//     let table = data;
//     let tbody = table.getElementsByTagName('tbody')[0];
//     console.log(tbody);
//     let trs = tbody.getElementsByTagName('tr');
//     for (let i = 0, len = trs.length; i < len; i++) {
//         if (i % 2 == 0) {
//             trs[i].style.background = '#fdf';
//         }
//     }
// }
// /* 购物车 */
// function calc(btn) {

//     var span = btn.innerHTML == '-' ? btn.nextElementSibling :
//         btn.previousElementSibling;

//     var n = parseInt(span.innerHTML);

//     span.innerHTML = btn.innerHTML == '+' ? ++n :
//         n == 1 ? 1 : --n;


//     /* 小计 */
//     var price = parseFloat(btn.parentNode.previousElementSibling.innerHTML.slice(1));
//     var sub = price * n;
//     btn.parentNode.nextElementSibling.innerHTML = '&yen;' + sub.toFixed(2);

//     /* 总计 */
//     var tds = data.getElementsByTagName('tbody')[0].getElementsByTagName('td');
//     for (var i = 3, sum = 0; i < tds.length; i += 4) {
//         sum += parseFloat(tds[i].innerHTML.slice(1));
//         console.log(tds.length);
//     }

//     var tfoot = data.getElementsByTagName('tfoot')[0];
//     tfoot.getElementsByTagName('td')[1].innerHTML = '&yen;' + sum.toFixed(2);

// }


window.onload = function () {
    var table = document.getElementById('data');
    var tbody = table.lastChild.previousElementSibling.previousElementSibling;
    var trs = tbody.children;
    for (var i = 0; i < trs.length; i++) {
        console.log(trs[i]);
        if (i % 2 == 0) {
            trs[i].style.background = "#fdf";
        }
    }
}


// 购物车
function calc(btn) {
    var span = btn.innerHTML == '+' ? btn.previousElementSibling : btn.nextElementSibling;
    var n = parseInt(span.innerHTML);
    span.innerHTML = btn.innerHTML == '+' ? ++n :
        n == 1 ? 1 : --n;

    // 小计
    var price = parseFloat(btn.parentNode.previousElementSibling.innerHTML.slice(1));
    var sub = price * n;
    btn.parentNode.nextElementSibling.innerHTML = '&yen;' + sub.toFixed(2);

    // 总计
    // 获取tfoot
    var tds = btn.parentNode.parentNode.parentNode.getElementsByTagName('td');
    for (var sum = 0, i = 3; i < tds.length; i += 4) {
        sum += parseFloat(tds[i].innerHTML.slice(1));
    }
    btn.parentNode.parentNode.parentNode.nextElementSibling.firstElementChild.lastElementChild.innerHTML = '&yen;' + sum.toFixed(2);
}