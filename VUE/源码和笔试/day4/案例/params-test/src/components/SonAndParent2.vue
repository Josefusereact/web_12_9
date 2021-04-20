<template>
  <div>
    <h4>
      我是子组件
    </h4>
    name:<input type="text" style="width:500px" @input="handleNameChange" :value="name">
    <br>
    count:<input type="number" style="width:500px" @input="handleCountChange" :value="count">
    
  </div>
</template>
<script>
export default {
  name:'son-and-parent',
  props:{
    name:{
      required:true,
      type:String
    },
    count:{
      required:true,
      type:Number
    }
  },
  watch:{
    name(v){
      console.log('父组件将this.name赋值之后子组件的参数变化为：',v)
    },
    count(v){
      console.log('父组件将this.count赋值之后子组件的参数变化为：',v)
    },
  },
  methods:{
    handleNameChange(event){
      // 由于这里的name是外部传入的数据
      //而input事件是input输入时产生变化时触发的
      //这里的name是父传子的参数并不能跟input的值的变化
      //实现自己变化。所以我们应该通过event来获取值的变化
      //可以根据两个值对比
      let oldValue = this.name;
      console.log('name参数的值',oldValue)
      let newValue = event.target.value;
      console.log('input每次的值',newValue)
      //将newValue通过子传父的方式反到外部
      this.$emit('update:name',newValue)
    },
    handleCountChange(event){
      // 由于这里的name是外部传入的数据
      //而input事件是input输入时产生变化时触发的
      //这里的name是父传子的参数并不能跟input的值的变化
      //实现自己变化。所以我们应该通过event来获取值的变化
      //可以根据两个值对比
      let oldValue = this.count;
      console.log('count参数的值',oldValue)
      let newValue = event.target.value;
      console.log('input每次的值',newValue)
      //将newValue通过子传父的方式反到外部
      this.$emit('update:count',Number(newValue))
    }
  }
}
</script>