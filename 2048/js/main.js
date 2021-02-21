// 游戏主逻辑文件
// 数组的初始化
var board = new Array();
// 分数初始化
var score = 0;
// 只允许合成一次 用于记录是否已经进行合成一次
var hasConflicted = new Array();

// 支持触控
var startx = 0; // 起始坐标
var starty = 0;
var endx = 0; // 结束坐标   
var endy = 0;

$(document).ready(function () {
    prepareForMobile();
    newgame();
});

// 调用尺寸
function prepareForMobile() {

    if (documentWidth > 500) {
        gridContainerWidth = 500;
        cellSpace = 20;
        cellSideLength = 100;
    }

    $('#grid-container').css('width', gridContainerWidth - 2 * cellSpace);
    $('#grid-container').css('height', gridContainerWidth - 2 * cellSpace);
    $('#grid-container').css('padding', cellSpace);

    $('#grid-container').css('border-radius', .02 * gridContainerWidth);

    $('.grid-cell').css('width', cellSideLength);
    $('.grid-cell').css('height', cellSideLength);
    $('.grid-cell').css('border-radius', .02 * cellSideLength);

}


//初始化模块
function newgame() {
    // 初始化棋盘
    init();
    // 随机生成两个格子内的数字
    generateOneNumber();
    generateOneNumber();
}

function init() {
    // 4 * 4 棋盘 和初始化数字格
    for (var i = 0; i < 4; i++) {
        //定义一个二维数组
        board[i] = new Array();
        // 记录合成
        hasConflicted[i] = new Array();

        for (var j = 0; j < 4; j++) {
            //初始化布局
            var gridCell = $("#grid-cell-" + i + "-" + j);
            //用getPosTop()设置每个格子据顶端的距离
            gridCell.css("top", getPosTop(i, j));
            //通过getPosLeft()设置每个格子距左端的距离
            gridCell.css("left", getPosLeft(i, j));

            //初始化小格子
            board[i][j] = 0;

            hasConflicted[i][j] = false;

        } // inner for end
    } // outer for end

    updateBoardView();

    score = 0;
    $('#score').text(score);
}

//数字初始化函数
function updateBoardView() {
    $(".number-cell").remove();
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            //向棋盘上增加 数字格
            $("#grid-container").append("<div class='number-cell' id='number-cell-" + i + "-" + j + "'></div>");
            var numberCell = $("#number-cell-" + i + "-" + j);
            //如果棋盘格为0，设置数字格高度和长度皆为零
            if (board[i][j] == 0) {
                numberCell.css("width", "0px");
                numberCell.css("height", "0px");
                numberCell.css("top", getPosTop(i, j) + cellSideLength / 2);
                numberCell.css("left", getPosLeft(i, j) + cellSideLength / 2);
            }
            //如果棋盘格高度不为零
            else {
                numberCell.css("width", cellSideLength);
                numberCell.css("height", cellSideLength);
                numberCell.css("top", getPosTop(i, j));
                numberCell.css("left", getPosLeft(i, j));
                numberCell.css("background-color", getNumberBackgroundColor(board[i][j]));
                numberCell.css("color", getNumberColor(board[i][j]));
                numberCell.text(board[i][j]);
            } // if end

            hasConflicted[i][j] = false;
        } // inner for end 
    } // outer for end

    $('.number-cell').css('line-height', cellSideLength + 'px');
    $('.number-cell').css('font-size', .6 * cellSideLength + 'px');
}

function generateOneNumber() {
    if (nospace(board)) {
        return false;
    }

    // 生成一个随即位置的随机数字
    // 1、生成一个随机位置
    // 随即一个X坐标
    var randx = Math.floor(Math.random() * 4);
    // 随即一个Y坐标
    var randy = Math.floor(Math.random() * 4);

    // var times = 0;
    // 定义一个死循环，完成随机生成格子
    while (board[randx][randy] != 0) {
        // 否则重新生成随即位置
        randx = Math.floor(Math.random() * 4);
        randy = Math.floor(Math.random() * 4);

        // times++;
    }

    // 随机一个数字
    var randNumber = Math.random() < 0.5 ? 2 : 4;

    // 在随机位置显示数字
    board[randx][randy] = randNumber;
    showNumberWithAnimation(randx, randy, randNumber);

    return true;
}
//键盘响应交互模块
$(document).keydown(function (e) { //event是keydown事件自带的
    var e = e || window.event;
    var target = e.target || e.srcElement;
    switch (e.keyCode) {
        case 37: // left
            e.preventDefault();
            //moveLeft()方法完成向左移动的运算，结果为bool型,判断是否可以向左移动
            if (moveLeft()) {
                //重新随机生成一个数字
                setTimeout(generateOneNumber(), 100);
                //判断这次移动之后游戏是否结束
                setTimeout(isgameover(), 300);
            }
            break;
        case 38: // up
            e.preventDefault();
            if (moveUp()) {
                setTimeout(generateOneNumber(), 100);
                setTimeout(isgameover(), 300);
            }
            break;
        case 39: // right
            e.preventDefault();
            if (moveRight()) {
                setTimeout(generateOneNumber(), 100);
                setTimeout(isgameover(), 300);
            }
            break;
        case 40: // down
            e.preventDefault();
            if (moveDown()) {
                setTimeout(generateOneNumber(), 100);
                setTimeout(isgameover(), 300);
            }
            break;
        default: // default
            break;
    }
});

// 当事件处理函数被触发时，js自动运行事件函数，
// 并将函数参数列表第一个参数作为 event 封装事件信息 的对象 传入函数中
document.addEventListener('touchstart', function (e) {
    /*  
        当捕捉到touch相关事件时，会执行一个回调函数，那么对于这个回调函数呢，
            默认呢就会传入一个叫做event的参数，event中存储了和这次触摸相关的数据 
    */
    // 向量计算 |endx - startx|
    startx = e.touches[0].pageX;
    starty = e.touches[0].pageY;
});
// 解决Android4.0 19827编号 bug问题
document.addEventListener('touchmove', function (e) {
    e.preventDefault();
});
document.addEventListener('touchend', function (e) {
    endx = e.changedTouches[0].pageX;
    endy = e.changedTouches[0].pageY;

    // 记录向量
    var deltax = endx - startx;
    var deltay = endy - starty;

    if (Math.abs(deltax) < .3 * documentWidth && Math.abs(deltay) < .3 * documentWidth) {
        return;
    }

    // 对deltax和deltay长度进行一个判断
    // 如果deltax大于deltay 说明这次操作是在x轴方向 反之y轴
    // x
    if (Math.abs(deltax) >= Math.abs(deltay)) {

        // 如果deltax>0说明是x轴正方向 反之负方向
        if (deltax > 0) {
            // move right
            if (moveRight()) {
                setTimeout(generateOneNumber(), 100);
                setTimeout(isgameover(), 300);
            }
        } else {
            // move Left
            if (moveLeft()) {
                //重新随机生成一个数字
                setTimeout(generateOneNumber(), 100);
                //判断这次移动之后游戏是否结束
                setTimeout(isgameover(), 300);
            }
        }
    }
    //y
    else {
        // 同理
        if (deltay > 0) {
            // move down
            if (moveDown()) {
                setTimeout(generateOneNumber(), 100);
                setTimeout(isgameover(), 300);
            }
        } else {
            // move up
            if (moveUp()) {
                setTimeout(generateOneNumber(), 100);
                setTimeout(isgameover(), 300);
            }
        }
    }

});

function isgameover() {
    if (nospace(board) && nomove(board)) {
        gameover();
    }
}

function gameover() {
    alert('gameover!');
}

function moveLeft() {
    if (!canMoveLeft(board)) {
        return false;
    }

    // moveLeft
    for (var i = 0; i < 4; i++)
        for (var j = 1; j < 4; j++) { //第一列的数字不可能向左移动
            if (board[i][j] != 0) {
                //(i,j)左侧的元素
                for (var k = 0; k < j; k++) {
                    //落脚位置的是否为空 && 中间没有障碍物
                    if (board[i][k] == 0 && noBlockHorizontal(i, k, j, board)) {
                        //move
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    //落脚位置的数字和本来的数字相等 && 中间没有障碍物
                    else if (board[i][k] == board[i][j] && noBlockHorizontal(i, k, j, board) && !hasConflicted[i][k]) {
                        //move
                        showMoveAnimation(i, j, i, k);
                        //add
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        // add score
                        score += board[i][k];
                        updateScore(score);

                        hasConflicted[i][k] = true;
                        continue;
                    }
                }
            }
        }
    // updateBoardView();
    setTimeout('updateBoardView()', 200);
    return true;
}

function moveRight() { //更多地细节信息
    //判断格子是否能够向右移动
    if (!canMoveRight(board))
        return false;

    //真正的moveRight函数//标准
    for (var i = 0; i < 4; i++)
        for (var j = 2; j >= 0; j--) { //最后一列的数字不可能向右移动
            if (board[i][j] != 0) {
                //(i,j)右侧的元素
                for (var k = 3; k > j; k--) {
                    //落脚位置的是否为空 && 中间没有障碍物
                    if (board[i][k] == 0 && noBlockHorizontal(i, j, k, board)) {
                        //move
                        showMoveAnimation(i, j, i, k);
                        console.log(i, j);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        console.log(i, k);
                        continue;
                    }
                    //落脚位置的数字和本来的数字相等 && 中间没有障碍物
                    else if (board[i][k] == board[i][j] && noBlockHorizontal(i, j, k, board) && !hasConflicted[i][k]) {
                        //move
                        showMoveAnimation(i, j, i, k);

                        //add
                        board[i][k] += board[i][j];
                        board[i][j] = 0;

                        // add score
                        score += board[i][k];
                        updateScore(score);

                        hasConflicted[i][k] = true;
                        continue;
                    }
                }
            }
        }
    setTimeout("updateBoardView()", 200);
    return true;
}

function moveUp() { //更多地细节信息
    //判断格子是否能够向上移动
    if (!canMoveUp(board)) {
        return false;
    }

    //真正的moveUp函数//标准
    for (var j = 0; j < 4; j++)
        for (var i = 1; i < 4; i++) { //第一行的数字不可能向上移动
            if (board[i][j] != 0) {
                //(i,j)上面的元素
                for (var k = 0; k < i; k++) {
                    //落脚位置的是否为空 && 中间没有障碍物
                    if (board[k][j] == 0 && noBlockVertical(j, k, i, board)) {
                        //move
                        showMoveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    //落脚位置的数字和本来的数字相等 && 中间没有障碍物
                    else if (board[k][j] == board[i][j] && noBlockVertical(j, k, i, board) && !hasConflicted[k][j]) {
                        //move
                        showMoveAnimation(i, j, k, j);

                        //add
                        board[k][j] += board[i][j];
                        board[i][j] = 0;

                        // add score
                        score += board[i][k];
                        updateScore(score);

                        hasConflicted[k][j] = true;
                        continue;
                    }
                }
            }
        }
    setTimeout("updateBoardView()", 200);
    return true;
}

function moveDown() { //更多地细节信息
    //判断格子是否能够向下移动
    if (!canMoveDown(board)) {
        return false;
    }

    //真正的moveDown函数//标准
    for (var j = 0; j < 4; j++)
        for (var i = 2; i >= 0; i--) { //最后一行的数字不可能向下移动
            if (board[i][j] != 0) {
                //(i,j)上面的元素
                for (var k = 3; k > i; k--) {
                    //落脚位置的是否为空 && 中间没有障碍物
                    if (board[k][j] == 0 && noBlockVertical(j, i, k, board)) {
                        //move
                        showMoveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    //落脚位置的数字和本来的数字相等 && 中间没有障碍物
                    else if (board[k][j] == board[i][j] && noBlockVertical(j, i, k, board) && !hasConflicted[k][j]) {
                        //move
                        showMoveAnimation(i, j, k, j);

                        //add
                        board[k][j] += board[i][j];
                        board[i][j] = 0;

                        // add score
                        score += board[i][k];
                        updateScore(score);

                        hasConflicted[k][j] = true;
                        continue;
                    }
                }
            }
        }
    setTimeout("updateBoardView()", 200);
    return true;
}