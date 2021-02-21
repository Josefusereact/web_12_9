function numUpperLower() {
    var arr = [];
    for (var j = 0; j < 10; j++) {
        arr += j;
    }
    for (var i = 0; i < 26; i++) {
        var lower = String.fromCharCode(65 + i);
        var upper = String.fromCharCode(97 + i);
        arr += lower;
        arr += upper;
    }
    return arr;
};