/* 1. 案例（需求）如下：

计算合同到期时间：

    创建Date对象保存员工入职日期：：如2012-6-30
    合同有效期3年，求合同到期时间？
    合同到期前，需要提前一个月续签。但如果提前一个月的续签时间刚好是周末，则需要提前到上一个周五。求续签时间？ */
/* // 入职时间
var hiredate = new Date("2012-06-30");
// 劳务合同到期时间
var enddate = new Date(hiredate);
enddate.setFullYear(
    enddate.getFullYear() + 3
);
// 到期提前一个月通知
var renewdate = new Date(enddate);
renewdate.setMonth(
    renewdate.getMonth() - 1
);
// 如果通知时间是周末 则提前到上一周五
if (renewdate.getDay() == 6) {
    renewdate.setDate(
        renewdate.getDate() - 1
    );
} else if (renewdate.getDate() == 0) {
    renewdate.setDate(
        renewdate.getDate() - 2
    );
}
// 在续签前一周发出通知
var alertDate = new Date(renewdate);
alertDate.setDate(
    alertDate.getDate() - 7
);
console.log(hiredate,
    enddate,
    renewdate,
    alertDate); */


/* 计算当前日期后N个工作日的日期 */
/* var now = new Date();
var days = 10;
for (var i = 0; i < days; i++) {
    // if(now.getDay()==5){
    //     now.setDate(now.getDate()+2);
    // }else if(now.getDay()==6){
    //     now.setDate(now.getDate()+1);
    // }
    // now.setDate(now.getDate()+1);

    //简写
    now.setDate(now.getDate() + (now.getDay() == 5 ? 3 : now.getDay() == 6 ? 2 : 1));
}
console.log(now.toLocaleDateString()); */

/* 自定义format方法，格式化日期 */
/* function format(date) {
    var year = date.getFullYear(); // 获取年份
    var month = date.getMonth(); // 获取月份
    var day = date.getDay(); // 获取星期
    var mDay = date.getDate(); // 获取本月份第几天
    var hours = date.getHours(); // 获取小时
    var minutes = date.getMinutes(); // 获取分钟
    var seconds = date.getSeconds(); // 获取秒
    var am = hours < 12 ? '上午' : '下午';
    // hours = hours < 12 ? hours : hours - 12;
    return year + '年' + month + '月' + mDay + '日 ' + '星期' + day + ' ' + am + hours + '时 ' + minutes + '分 ' + seconds + '秒';

}
console.log(format(new Date())); */