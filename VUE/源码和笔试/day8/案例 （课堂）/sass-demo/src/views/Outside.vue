<template>
  <div>
    <h4>外部引入</h4>
    <div class="item">
      item
    </div>
  </div>
</template>
<style lang="scss" >
//该方式可以将外部定义好的scss变量直接引入
//本页可以直接使用
//这种方式常用于在开发项目的时候定义全局的样式规范
@import "./outside.scss";
@import "./style.scss";
.item{
  color:$color;
  background: $background;
  width: $width;
  height: $height;
  line-height: 100px;
  font-size: $fontSize;
}

</style>