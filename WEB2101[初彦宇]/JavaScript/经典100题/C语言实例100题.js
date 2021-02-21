/* 
    -【程序 1】 
    ----题目：有 1 、 2 、 3 、 4 个数字，能组成多少个互不相同且无重复数字的三位数？都是多少？  
*/
/* let list = [1, 2, 3, 4]

function combination(list) {
    let empty = [];
    for (let i = 0; i < list.length; i++) {
        for (let j = 0; j < list.length; j++) {
            for (let k = 0; k < list.length; k++) {
                if (i != j && i != k && j != k) {
                    empty.push(list[i] + '' + list[j] + '' + list[k]);
                }
            }
        }
    }
    return empty.length + '种\n' + empty;
}
console.log(combination(list)); */


/* 
    -【程序 2】 
    ----题目：企业发放的奖金根据利润提成。
    ---------利润 (I) 低于或等于 10 万元时，奖金可提 10% ；
    ---------利润高于 10 万元，低于 20 万元时，低于 10 万元的部分按 10% 提成，高于 10 万元的部分，可可提成 7.5% ； 
    ---------20 万到 40 万之间时，高于 20 万元的部分，可提成 5% ； 
    ---------40 万到 60 万之间时高于 40 万元的部分，可提成 3% ； 
    ---------60 万到 100 万之间时，高于 60 万元的部分，可提成 1.5% ，
    ---------高于 100 万元时，超过 100 万元的部分按 1% 提成，
    ---------从键盘输入当月利润 I ，求应发放奖金总数？
*/

/* 
    i<=10       提成10%
    10-20       <10提10% >10提层7.5%
    20-40       >20提成5%
    40-60       >40提成3%
    60-100      >60提成1.5%
    >100        提成1%
    prompt('enter i:');
    alert('奖金?');
*/

/* function profit(i) {
    if (i < 0) {
        return '你的工资竟然是负数???';
    }
    if (i <= 100000) {
        return '本金为: ' + i + ' 利润为: ' + (i * 0.1)
    }
    if (i < 200000) {
        return '本金为: ' + i + ' 利润为: ' + (100000 * 0.1 + (i - 100000) * 0.075);
    }
    if (i < 400000) {
        return '本金为: ' + i + ' 利润为: ' + (100000 * 0.1 + 100000 * 0.075 + (i - 200000) * 0.05);
    }
    if (i < 600000) {
        return '本金为: ' + i + ' 利润为: ' + (100000 * 0.1 + 100000 * 0.075 + 200000 * 0.05 + (i - 400000) * 0.03);
    }
    if (i < 1000000) {
        return '本金为: ' + i + ' 利润为: ' + (100000 * 0.1 + 100000 * 0.075 + 200000 * 0.05 + 200000 * 0.03 + (i - 600000) * 0.015);
    }
    return '本金为: ' + i + ' 利润为: ' + (100000 * 0.1 + 100000 * 0.075 + 200000 * 0.05 + 200000 * 0.03 + 400000 * 0.015 + (i - 1000000) * 0.01);
};

console.log(profit(prompt('enter i: '))); */


/* 
    -【程序 3 】 
    ----题目：一个整数，它加上 100 后是一个完全平方数，再加上 168 又是一个完全平方数，请问该数是多少？  
    ----完全平方差公式: 189-121
                        a²-b²
                        17**2 - 11**2 ==
                        (17+11)*(17-11)
*/
/* function pow() {
    for (var i = 0; i < 100000; i++) {
        let x = parseInt(Math.sqrt(i + 100)),
            y = parseInt(Math.sqrt(i + 268));
        if ((y ** 2 - x ** 2) == 168) {
            return y ** 2 - 268;
        }
    }
}
console.log(pow()); */


/* 
    -【程序 4 】 
    ----题目：输入某年某月某日，判断这一天是这一年的第几天？ 
*/
/* let year = parseInt(2021);
let month = parseInt(2);
let weekDay = parseInt(10);

if (year % 4 == 0 && year % 100 !== 0 || year % 400 == 0) {
    var md = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    for (var i = 0; i < month - 1; i++) {
        weekDay += md[i];
    }
    console.log(weekDay);
} else {
    var md = [31, 27, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    for (var i = 0; i < month - 1; i++) {
        weekDay += md[i];
    }
    console.log(weekDay);
} */

/* 
    -【程序 5 】 
    ----题目：输入三个整数 x,y,z ，请把这三个数由小到大输出。 
*/
/* var xyz = [68, 88, 56, 12, 34, 45, 89];
for (var i = 0; i < xyz.length; i++) {
    for (var j = 0; j < xyz.length - i; j++) {
        if (xyz[j] > xyz[j + 1]) {
            xyz[j] = xyz[j] ^ xyz[j + 1];
            xyz[j + 1] = xyz[j] ^ xyz[j + 1];
            xyz[j] = xyz[j + 1] ^ xyz[j];
        }
    }
}
console.log(xyz); */

/* 
    -【程序 6 】 
    ----题目：用 * 号输出字母 C 的图案。 
*/

/* console.log("              ** **\n");
console.log("        **\n");
console.log("    **\n");
console.log("  **\n");
console.log(" **\n");
console.log(" **\n");
console.log("  **\n");
console.log("    **\n");
console.log("        **\n");
console.log("              ** **\n"); */


/* 
    -【程序 7 】 
    ----题目：输出特殊图案，请在 c 环境中运行，看一看， Very Beautiful! 
*/
/* var a = 4539,
    b = 3621;
console.log(String.fromCodePoint(b, a, a, a, b));
console.log(String.fromCodePoint(a, b, a, b, a));
console.log(String.fromCodePoint(a, a, b, a, a));
console.log(String.fromCodePoint(a, b, a, b, a));
console.log(String.fromCodePoint(b, a, a, a, b)); */


/* 
    -【程序 8 】 
    ----题目：输出 9*9 口诀。  
*/
/* for (var i = 1; i < 10; i++) {
    var x = '';
    for (var j = 1; j <= i; j++) {
        x += i + ' * ' + j + '= ' + i * j + '\t';
    }
    console.log(x);
} */

/* 
    -【程序 10 】 
    ----题目：打印楼梯，同时在楼梯上方打印两个笑脸。 
*/

/* var smile = '😋',
    square = '⬛⬛';
console.log(smile + smile);
for (var i = 1; i < 11; i++) {
    var stairs = '';
    for (var j = 1; j <= i; j++) {
        stairs += square;
    }
    console.log(stairs);
} */


/* 
    -【程序 11 】 
    ----题目：古典问题：有一对兔子，从出生后第 3 个月起每个月都生一对兔子，小兔子长到第三个月后每个月又生一对兔子，假如兔子都不死，问每个月的兔子总数为多少？ 
*/
/* for (var i = 0, r1 = 0, r2 = 1, sum = 0; i < 12; i++) {
    sum = r1 + r2;
    r1 = r2;
    r2 = sum;
    console.log(r1);
} */
// 递归
/* function rabbit(n) {
    if (n <= 2) {
        return 1;
    }
    return rabbit(n - 1) + rabbit(n - 2);
}
console.log(rabbit(7)); */


/* 
    -【程序 12 】 
    ----题目：判断 101-200 之间有多少个素数，并输出所有素数。 
    1. 程序分析：判断素数的方法：用一个数分别去除 2 到 sqrt( 这个数 ) ，如果能被整除，　　　　　　则表明此数不是素数，反之是素数。  
*/
/* for (var i = 101; i <= 200; i++) {
    for (var j = 2; j < i; j++) {
        // console.log(j);
        if (i % j == 0) {
            break;
        }
    }
    if (j == i) {
        console.log(i + '素数')
    }
} */

/* 
    -【程序 13 】 
    ----题目：打印出所有的“水仙花数”，所谓“水仙花数”是指一个三位数，其各位数字立方和等于该数本身。例如： 153 是一个“水仙花数”，因为 153=1 的三次方＋ 5 的三次方＋ 3 的三次方。 
    ----1. 程序分析：利用 for 循环控制 100-999 个数，每个数分解出个位，十位，百位。
*/
/* for (var i = 100; i <= 999; i++) {
    var b = parseInt(i / 100);
    var s = parseInt(i / 10 % 10);
    var g = parseInt(i % 10);
    if ((b * b * b + s * s * s + g * g * g) == i) {
        console.log(i);
    }
} */
/* function prime(x) {
    var arr = [];
    var y = x;
    while (x > 1) {
        for (var i = 2; i <= x; i++) {
            if (x % i == 0) {
                x /= i;
                arr.push(i + "*");
                break;
            }
        }
    }
    return y + '=' + arr.join('').slice(0, -1);
}
console.log(prime(16)); */