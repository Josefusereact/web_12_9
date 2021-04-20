<template>
<div class="home">
  <h4>
    组件传参练习：observable传参数
  </h4>
  <div>
    <observable  ></observable>
    <observable2  ></observable2>
    <input type="text" style="width:500px" v-model="name">
  </div>
</div>
</template>

<script>
import {state} from '../store'
import Observable from '@/components/Observable'
import Observable2 from '@/components/Observable'
// 步骤，首先查看本页代码
//然后查看子组件代码。并且查看子组件代码的注释
export default {
  name: 'Demo3',
  components:{
    Observable,
    Observable2
  },
  computed:{
    // 通过双向绑定的computed来绑定state
    name:{
      set(v){
        state.name = v
      },
      get(){
        return state.name
      }
    }
  }
}
</script>
