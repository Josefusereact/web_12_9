<template>
  <div>
     我是parent-to-son-deep2
     <br>
     我是跟组件的name属性:{{name}}
    <div class="p-slot">
      <slot/>
    </div>
    
  </div>
</template>
<script>
export default {
  name:'parent-to-son-deep2',
    // inject代表从祖先参数中提取定义的name参数
  //只要组件中做如下操作，
  //并且祖先组件中定义了provide中的name的值
  //本页面就相当于在props中已经定义了
  //name参数并且可以直接展示到页面中
  inject:['name'],
  created(){
    console.log(this.name)
  }
}
</script>
<style lang="scss">
  .p-slot{
    border:1px solid 
  }
</style>