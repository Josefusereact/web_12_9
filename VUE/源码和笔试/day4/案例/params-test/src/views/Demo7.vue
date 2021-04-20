<template>
<div class="home">
  <h4>
    组件传参练习：eventBus传参数
  </h4>
  <div>
    <event-bus  ></event-bus>
    <event-bus2  ></event-bus2>
  </div>
</div>
</template>

<script>
import {state} from '../store'
import EventBus from '@/components/EventBus'
import EventBus2 from '@/components/EventBus2'
// 步骤，首先查看本页代码
//然后查看子组件代码。并且查看子组件代码的注释
export default {
  name: 'Demo3',
  components:{
    EventBus,
    EventBus2
  },
  
}
</script>
