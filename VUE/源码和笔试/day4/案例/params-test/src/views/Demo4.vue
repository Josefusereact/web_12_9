<template>
<div class="home">
  <h4>
    组件传参练习：多重双向绑定
  </h4>
  <div>
  <!-- 
    通过v-bind:canshu.sync的形式修饰的vue的props
    在组件内部可以通过this.$emit('update:canshu','值')
    的形式直接变更当前参数的值，这是另外一种通过vue内部核心库实现的语法糖
    他的思路不同于v-model所有的流程均由vue控制
    我们只需要按照规则设置好就能实现双向绑定了，并且这个双向绑定的
    数据流向遵循子传父，父传子的流程。并且实现了多个双向绑定
  -->
    <son-and-parent :name.sync="name" :count.sync="count"/>
    <br>
    子组件中的name的值为:{{name}}<br/>
    子组件中的count的值为:{{count}}<br/>
    先操作上面的文本框再操作我：<br/>
    <input style="width:500px" type="text" v-model="name"><br>
    <input style="width:500px" type="number" v-model.number="count">
  </div>、
</div>
</template>

<script>
import SonAndParent from '@/components/SonAndParent2'
// 步骤，首先查看本页代码
//然后查看子组件代码。并且查看子组件代码的注释
export default {
  name: 'Demo3',
  components:{
    SonAndParent
  },
  data(){
    return {
      name:'我是父组件传到子组件的参数',
      count:1
    }
  }
}
</script>
