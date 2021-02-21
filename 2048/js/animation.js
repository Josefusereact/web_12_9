// 游戏动画逻辑文件

//数字生成动画
function showNumberWithAnimation(randx, randy, randNumber) {
    //获取当前数字格
    var numberCell = $("#number-cell-" + randx + "-" + randy);
    //设置当前数字格的背景色、前景色和数字值
    numberCell.css("background-color", getNumberBackgroundColor(randNumber));
    numberCell.css("color", getNumberColor(randNumber));
    numberCell.text(randNumber);
    //设置当前数字格的动画
    numberCell.animate({
        width: cellSideLength,
        height: cellSideLength,
        top: getPosTop(randx, randy),
        left: getPosLeft(randx, randy)
    }, 50)

}

//数字格移动动画
function showMoveAnimation(fromx, fromy, tox, toy) {
    //获取当前数字格元素
    var numberCell = $("#number-cell-" + fromx + "-" + fromy);
    numberCell.animate({
        top: getPosTop(tox, toy),
        left: getPosLeft(tox, toy)
    }, 200);
}

// 更新页面分数
function updateScore(score) {
    $('#score').text(score);
}