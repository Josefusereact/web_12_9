function calc() {
    var now = new Date();
    var target = new Date("2021-01-30 18:56:00");
    var s = parseInt((target - now) / 1000);
    var h = fn(parseInt(s / 3600));
    var m = fn(parseInt((s % 3600) / 60));
    s = fn(s % 60);
    var span = document.querySelector('#time');
    if (s < '00') {
        span.innerHTML = '00:00:00';
    } else {
        // span.innerHTML = (h < 10 ? "0" + h : h) + ':' + (m < 10 ? '0' + m : m) + ':' + (parseInt(s) < 10 ? '0' + s : s);
        span.innerHTML = span.innerHTML.indexOf(":") == -1 ?
            (h + ':' + m + ':' + s) :
            (h + ' ' + m + ' ' + s);
    }
}

var timer = setInterval(calc, 500);

function toggle(btn) {
    if (timer != null) {
        clearInterval(timer);
        timer = null;
        btn.innerHTML = '开始倒计时';
    } else {
        timer = setInterval(calc, 1000);
        btn.innerHTML = '停止倒计时';
    }
}

function fn(num) {
    return num < 10 ? '0' + num : num;
}