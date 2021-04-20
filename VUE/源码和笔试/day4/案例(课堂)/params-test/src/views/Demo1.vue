<template>
<div class="home">
  <h4>
    组件传参练习：子传父
  </h4>
  <div>
    <!-- 当son-to-parent中文本框的值改变时
      就会触发内部的$emit('on-name-change',值)
      并且触发@on-name-change中的handleValueChange执行
      handleValueChange的参数就是值
      只要内部的文本框的值改变，就会触发handleValueChange的执行
      并且外部的name会展示子组件的值，而外部的name改变不会触发
      son-to-parent的name改变，因为他们没有建立参数关系
     -->
    <son-to-parent 
      @on-name-change="handleValueChange"
      @on-password-change="handlePasswordChange"/>
    <br>
    子组件中的name的值为:{{name}}
    <br>
    {{password}}
  </div>
  <h4>
    课堂练习：对子组件增加参数仿照案例再向外传出一个值
  </h4>
</div>
</template>

<script>
import SonToParent from '@/components/SonToParent'
// 步骤，首先查看本页代码
//然后查看子组件代码。并且查看子组件代码的注释
export default {
  name: 'Home',
  components:{
    SonToParent
  },
  data(){
    return {
      name:'我是父组件传到子组件的参数',
      password:'我是父组件的password'
    }
  },
  methods:{
    handleValueChange(v){
      this.name = v
    },
    handlePasswordChange(v){
      console.log(v)
      this.password = v
    }
  }
}
</script>
