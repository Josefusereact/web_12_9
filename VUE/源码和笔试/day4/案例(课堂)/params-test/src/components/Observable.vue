<template>
  <div>
    我是组件observable<br>
    这是共享的参数name:{{getName}}
    <br>
    {{getAge}}
  </div>
</template>
<script>
import {state} from '../store'
export default {
  name:'observable',
  computed:{
    getName(){
      return state.name
    },
    getAge(){
      return state.age
    }
  }
}
</script>