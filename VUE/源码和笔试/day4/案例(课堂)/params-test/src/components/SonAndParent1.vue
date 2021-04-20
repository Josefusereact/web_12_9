<template>
  <div>
    <h4>
      我是子组件
    </h4>
    <!-- 因为name是父组件传入的参数props中的内容
      所以这里不可以直接对input绑定v-model因为v-model
      会重写name属性而name在props中是只读的这样违反了Vue数据流的规定
      所以这里通过对input单向绑定一个value属性。
     -->
    <input 
      type="text" 
      style="width:500px" 
      @input="handleValueChange" 
      :value="name">
  </div>
</template>
<script>
export default {
  name:'son-and-parent',
  props:{
    name:{
      required:true,
      type:String
    }
  },
  watch:{
    name(v){
      console.log('父组件将this.name赋值之后子组件的参数变化为：',v)
    }
  },
  model:{
    //v-model本身并无实体参数，prop代表v-model中的值绑定到name参数上
    prop:'name',
    //自定义函数this.$emit('change-name',值)就会直接修改v-model的值
    event:'change-name'
  },
  methods:{
    handleValueChange(event){
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
      this.$emit('change-name',newValue)
    }
  }
}
</script>