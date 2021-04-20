<template>
  <div>
    <h4>定义函数</h4>
    <div class="item1">
      item1
    </div>
    <div class="item2">
      item2
    </div>
    <div class="item3">
      item3
    </div>
    
  </div>
</template>
<style lang="scss" scoped >
@function num2px($num){
  @return #{$num}#{'px'}
}
.item1{
  font-size: num2px(20);
}
.item2{
  font-size: num2px(40);
}
.item3{
  // 随机数写法，该随机数在每次编译scss时生成
  //所以刷新不会改变
  font-size: num2px(random()*100);
}
</style>