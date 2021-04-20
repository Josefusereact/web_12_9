<template>
  <div>
    <h4>定义数组</h4>
    <div class="item1">
      item1
    </div>
    <div class="item2">
      item2
    </div>
    <div class="item3">
      item3
    </div>
    <h4>遍历数组</h4>
    <div class="arr1">
      arr1
    </div>
    <div class="arr2">
      arr2
    </div>
    <div class="arr3">
      arr3
    </div>
  </div>
</template>
<style lang="scss" scoped >
@import "./outside.scss";
$arr:red,green,blue;
$arr1:'arr1','arr2','arr3';
$fontSize:20px;
*{
  font-size:$fontSize;
}
// 从数组中按下标取值，数组是从1开始
// .item1{
//   color: nth($arr, 1 );
// }
// .item2{
//   color: nth($arr, 2 );
// }
// .item3{
//   color: nth($arr, 3 );
// }
$i:1;
$str:'color';
$size:20;
// scss的each循环
/*@each $item in arr{}*/
@each $item in $arr1 {
  /*
     scss的字符串拼接#{常量或变量}值
     如 #{'.'}test会在页面解析成.test
     如$item:'bbb' #{'.'}#{$item}会解析成.bbb
     他常用于将className变成变量。或者在计算函数中拼接字符串和变量
  */
  #{'.'}#{$item}{
    display: inline-block;
    margin: #{$size+40}px;
    width: #{$size+80}px;
    height: 100px;
    background-#{$str}: #eee;
    color:nth($arr, $i);
  }
  $i:$i+1;
}
$index:1;
@each $item in $arr2{
  #{'.'}#{$item}{
    width: $width;
    height: $width;
    line-height: $width;
    border: 1px solid;
    border-radius: 50%;
    color: nth($arr,$index);
  }
  $index:$index+1;
}
</style>