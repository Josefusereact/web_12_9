<template>
  <div>
    我是event-bus1组件 <br>
    收到的消息：{{msg}} <br>
    <textarea name="" id="" cols="30" rows="10"
      v-model="message"
    ></textarea><br>
    <button @click="handleSendMsg">发送</button>
  </div>
</template>
<script>
//引入的eventBus相当于vue的对象所以可以直接使用
//$on和$emit
//由于Vue不同的组件间的on和emit
//是独立自治的所以我们直接借用一个
//新的vue全局对象所有的消息通知都使用
//eventBus这个对象来处理
//这样就能保证所有定义的on的函数都在一个对象上
import eventBus from '@/eventBus'

export default {
  name:'event-bus',
  data(){
    return {
      message:'我是发出的消息',
      msg:'我是收到的消息'
    }
  },
  created(){
    //定义监听函数bus1，这样在通过eventBus.$emit('bus1')
    //的时候就会触发这个函数执行并且可以获得传入的参数
    eventBus.$on('bus1',msg => {
      console.log(msg)
      this.msg = msg
    })
  },
  methods:{
    handleSendMsg(){
      //通过eventBus.$emit('bus2',this.message)
      //促使其他函数中定义的eventBus.$on('bus2')
      //执行来实现消息发送
      eventBus.$emit('bus2',this.message)
    }
  }
}
</script>