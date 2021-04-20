<template>

  <div>
    <!-- 
      eventBuss主要使用一个空的Vue对象来借用其内部的
      $on和$emit来实现组件的参数共享
      阅读代码找到下面的eventBus定义的文件查看文件内容
    -->
    我是event-bus2组件 <br>
    收到的消息：{{msg}} <br>
    <textarea name="" id="" cols="30" rows="10"
      v-model="message"
    ></textarea><br>
    <button @click="handleSendMsg">发送</button>
  </div>
</template>
<script>
//引入的eventBus相当于vue的对象所以可以直接使用$on和$emit
//由于Vue不同的组件间的on和emit是独立自治的所以我们直接借用一个
//新的vue全局对象所有的消息通知都使用eventBus这个对象来处理
//这样就能保证所有定义的on的函数都在一个对象上
import eventBus from '@/eventBus'

export default {
  name:'event-bus2',
  data(){
    return {
      message:'我是发出的消息',
      msg:'我是收到的消息'
    }
  },
  created(){
    eventBus.$on('bus2',msg => {
      console.log(msg)
      this.msg = msg
    })
  },
  methods:{
    handleSendMsg(){
      eventBus.$emit('bus1',this.message)
    }
  }
}
</script>