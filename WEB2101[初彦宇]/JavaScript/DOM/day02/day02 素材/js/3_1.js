function lottery() {
    // 获取ul下的所有li保存在lis
    var ul = document.querySelector('ul');
    var lis = ul.children;
    // 便利lis中每个li    并给每个li 生成一个随机数
    for (var i = 0, len = lis.length; i < len; i++) {
        while (true) {
            var r = parseInt(Math.random() * len + 1);
            var li = document.querySelector('#queue>li[i="' + r + '"]');
            if (li == null) {
                lis[i].setAttribute('i', r);
                break;
            }
        }
    }
    lis = Array.prototype.slice.call(lis).sort(function (a, b) {
        return a.getAttribute("i") - b.getAttribute("i")
    })
    queue.innerHTML = "";
    for (var i = 0; i < lis.length; i++) {
        queue.appendChild(lis[i]);
    }
}
window.onload = function () {
    lottery()
}