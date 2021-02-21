// 游戏基础逻辑文件
// 移动端尺寸设置
documentWidth = window.screen.availWidth;
gridContainerWidth = .92 * documentWidth;
cellSideLength = .18 * documentWidth;
cellSpace = .04 * documentWidth;

// 获取距离顶部距离
function getPosTop(i, j) {
    return cellSpace + i * (cellSpace + cellSideLength);
}
// 获取距离左侧距离
function getPosLeft(i, j) {
    return cellSpace + j * (cellSpace + cellSideLength);
}

// 设置背景色
function getNumberBackgroundColor(number) {
    switch (number) {
        case 2:
            return "#eee4da";
        case 4:
            return "#f0e0cb";
        case 8:
            return "#f26179";
        case 16:
            return "#f59563";
        case 32:
            return "#f67c5f";
        case 64:
            return "#f65e36";
        case 128:
            return "#edcf72";
        case 256:
            return "#edcc61";
        case 512:
            return "#9c0";
        case 1024:
            return "#3365a5";
        case 2048:
            return "#09c";
        case 4096:
            return "#a6bc";
        case 8192:
            return "#93c";
    }
    return "black";
}

// 设置文字颜色
function getNumberColor(number) {
    if (number <= 4) {
        return "#776e56";
    }
    return "white";
}

// 判断是否没有可用空间
function nospace(board) {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] == 0) {
                return false;
            }
        }
    }
    return true;
}

// 是否能够左移
function canMoveLeft(board) {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] != 0 && j != 0) {
                if (board[i][j - 1] == 0 || board[i][j - 1] == board[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}

function canMoveRight(board) {
    for (var i = 0; i < 4; i++) {
        for (var j = 2; j >= 0; j--) {
            if (board[i][j] != 0 && j != 3) {
                if (board[i][j + 1] == 0 || board[i][j + 1] == board[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}

function canMoveUp(board) {
    for (var i = 0; i < 4; i++)
        for (var j = 0; j < 4; j++)
            if (board[i][j] != 0 && i != 0)
                if (board[i - 1][j] == 0 || board[i - 1][j] == board[i][j])
                    return true;
    return false;
}

function canMoveDown(board) {
    for (var i = 0; i < 4; i++)
        for (var j = 0; j < 4; j++)
            if (board[i][j] != 0 && i != 3)
                if (board[i + 1][j] == 0 || board[i + 1][j] == board[i][j])
                    return true;
    return false;
}


//判断水平方向是否有障碍物
function noBlockHorizontal(row, col1, col2, board) {
    for (var i = col1 + 1; i < col2; i++)
        if (board[row][i] != 0)
            return false;
    return true;
}

//判断竖直方向是否有障碍物 
function noBlockVertical(col, row1, row2, board) {
    for (var i = row1 + 1; i < row2; i++)
        if (board[i][col] != 0)
            return false;
    return true;
}

// 判断全局是否不再可移动 是则gameover
function nomove(board) {
    if (
        canMoveLeft(board) ||
        canMoveRight(board) ||
        canMoveUp(board) ||
        canMoveDown(board)
    ) {
        return false;
    }
    return true;
}