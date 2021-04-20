<template>
<div class="home">
  <h4>
    组件传参练习：父传子
  </h4>
  <div>
    <input type="text" v-model="name"><br>
    <son :name="name"/>
  </div>
  <h4>
    课堂练习：对子组件增加两个不同类型的参数并输出到子组件中
  </h4>
</div>
</template>

<script>
import Son from '@/components/Son'
// 步骤，首先查看本页代码
//然后查看子组件代码。并且查看子组件代码的注释
export default {
  name: 'Home',
  components:{
    Son
  },
  data(){
    return {
      name:'我是父组件传到子组件的参数'
    }
  }
}
</script>
