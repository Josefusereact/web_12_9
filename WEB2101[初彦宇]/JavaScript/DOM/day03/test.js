// 查找no所在位置
/* var str = "no zuo no die, no can no bibi";
var i = -1;
while ((i = str.indexOf('no', i + 1)) != -1) {
    console.log('正在查找 no 当前位置: ' + i);
} */

// 自定义四舍五入以及保留小数位数
/* function round(num, d) {
    var num = Math.round(num * (10 ** d));
    return num / (10 ** d);
}
console.log(round(123.456, 2));
console.log(round(234.567, 0));
console.log(round(161, -1));
console.log(round(168, -1)); */


/* 
    题目描述
    如果第二个参数 bUnicode255For1 === true，则所有字符长度为 1
    否则如果字符 Unicode 编码 > 255 则长度为 2
*/
/* function strLength(a, bUnicode255For1) {
    if (bUnicode255For1 === true) {
        var k = 0;
        for (var i = 0; i < a.length; i++) {
            k++;
        }
    } else {
        var k = 0;
        for (var i = 0; i < a.length; i++) {
            if (a.charCodeAt(i) > 255) {
                k += 2;
            } else {
                k += 1;
            }
        }
    }
    return k;
} */
function strLength(a, bUnicode255For1) {
    console.log(a);
    return (bUnicode255For1 === true ? a.length : '') || (function (a, k) {
        for (var i = 0; i < a.length; i++) {
            a.charCodeAt(i) > 255 ? (k += 2) : (k += 1);
        }
        return k;
    })(a, k = 0);
}
var a = 'hello world, 牛客';
strLength(a, false);