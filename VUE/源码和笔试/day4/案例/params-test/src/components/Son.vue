<template>
  <div>
    <h4>
      我是儿子组件
    </h4>
    <div>
      我是从父亲传过来的name的值:{{name}}
    </div>
  </div>
</template>
<script>
export default {
  name:'Son',
  props:{
    // 定义Son组件被使用时可传入的参数
    name:{
      required:false,
      default:'',
      type:String
    }
  },
  watch:{
    name(v){
      console.log(v)
      // 看到这里时打开下面的注释
      //然后查看结果，发现在父亲传入的参数改变时
      //子组件可以监听到父亲参数的变化执行变更，但是在
      //子组件中修改name参数的值只能改变子组件中展示的效果
      //父组件上的参数name不会因此而改变
      //并且Vue其实是不允许对props中定义的参数进行赋值操作的
      //这会引起他的警告
      // this.name = '123'
    }
  }
}
</script>