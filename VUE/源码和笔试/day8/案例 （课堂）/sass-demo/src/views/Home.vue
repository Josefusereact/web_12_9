<template>
  <div class="home">
    <h4>sass声明变量</h4>
    <div class="item">
      item
    </div>
    <div class="item1">
      item1
    </div>
  </div>
</template>
<style lang="scss" scoped>
// sass中的变量声明方式为
//$变量名:css的值;
  $color:rgb(71, 71, 164);
  $background:#eee;
  $fontSize:20px;
  .item{
    color:$color;
    background: $background;
    width: 100px;
    height: 100px;
    line-height: 100px;
  }
  .item1{
    color: $color;
    background: $background;
  }
</style>
<script>
// @ is an alias to /src

export default {
  name: 'Home',
 
}
</script>
