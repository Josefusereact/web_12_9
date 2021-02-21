var reversedArr = [];
var sourceArr = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16],
    [17, 18, 19, 20]
];
for (var n = 0; n < sourceArr[0].length; n++) {

    reversedArr[n] = [];
    // console.log(reversedArr[n]);

    for (var j = 0; j < sourceArr.length; j++) {

        reversedArr[n][j] = sourceArr[j][n];

    }

}
console.log(JSON.stringify(reversedArr));