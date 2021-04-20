<template>
<div class="home">
  <h4>
    组件传参练习：双向传参数
  </h4>
  <div>
    <!-- 
      玩法：先在子组件中操作文本框触发值的变化，然后结合控制台的打印信息
      理解父子传值整合时由内部组件触发变更的数据流向
      然后在操作下面的文本框改变内部的值再看数据打印信息。理解一下
      当外界的参数改变时的数据流向。双向传参数就是将父传子和子传父结合而成的
     -->
    <son-and-parent 
      :name="name" 
      @on-name-change="handleNameChange"/>
    <br>
    子组件中的name的值为:{{name}}<br/>

    先操作上面的文本框再操作我：<br/>
    <input style="width:500px" type="text" v-model="name">
  </div>、
</div>
</template>

<script>
import SonAndParent from '@/components/SonAndParent'
// 步骤，首先查看本页代码
//然后查看子组件代码。并且查看子组件代码的注释
export default {
  name: 'Demo2',
  components:{
    SonAndParent
  },
  data(){
    return {
      name:'我是父组件传到子组件的参数'
    }
  },
  methods:{
    // 当内部的input的值变化时就会触发他执行
    handleNameChange(v){
      console.log('子组件传到父组件的name的值：',v)
      // 将新的值设置给父组件的name实现从子组件传入父组件
      this.name = v
    }
  }
}
</script>
