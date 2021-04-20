<template>
  <div>
    我是组件observable2<br>
    这是共享的参数name:{{getName}}
  </div>
</template>
<script>
import {state} from '../store'
export default {
  name:'observable2',
  computed:{
    getName(){
      return state.name
    }
  }
}
</script>