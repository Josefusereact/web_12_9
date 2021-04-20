<template>
<div class="home">
  <h4>
    组件传参练习：双向绑定
  </h4>
  <div>
    <!-- 
      玩法：先在子组件中操作文本框触发值的变化，然后结合控制台的打印信息
      理解父子传值整合时又内部组件触发变更的数据流向
      然后在操作下面的文本框改变内部的值再看数据打印信息。理解一下
      当外界的参数改变时的数据流向。双向传参数就是将父传子和子传父结合而成的
     -->
    <son-and-parent v-model="name"/>
    <br>
    子组件中的name的值为:{{name}}<br/>

    先操作上面的文本框再操作我：<br/>
    <input style="width:500px" type="text" v-model="name">
  </div>、
</div>
</template>

<script>
import SonAndParent from '@/components/SonAndParent1'
// 步骤，首先查看本页代码
//然后查看子组件代码。并且查看子组件代码的注释
export default {
  name: 'Demo3',
  components:{
    SonAndParent
  },
  data(){
    return {
      name:'我是父组件传到子组件的参数'
    }
  }
}
</script>
