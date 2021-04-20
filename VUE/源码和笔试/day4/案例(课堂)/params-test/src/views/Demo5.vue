<template>
<div class="home">
  <h4>
    组件传参练习：跨代组件传参
  </h4>
  <div>
    <parent-to-son-deep>
      我是slot的一些内容
      <parent-to-son-deep2>
        <parent-to-son-deep>
            我是slot的一些内容
          </parent-to-son-deep>
      </parent-to-son-deep2>
    </parent-to-son-deep>
    <parent-to-son-deep2>
       <parent-to-son-deep>
          我是slot的一些内容
        </parent-to-son-deep>
    </parent-to-son-deep2>
  </div>
</div>
</template>

<script>
import ParentToSonDeep from '@/components/ParentToSonDeep'
import ParentToSonDeep2 from '@/components/ParentToSonDeep2'
// 步骤，首先查看本页代码
//然后查看子组件代码。并且查看子组件代码的注释
export default {
  name: 'Demo3',
  // 定义祖先参数
  provide:{
    // 这里定义的name就可以在子孙组件中
    //任何组件内部通过inject来提取
    name:'我是祖先组件的参数',
    str:'我是另一个参数'
  },
  components:{
    ParentToSonDeep,
    ParentToSonDeep2
  },
  data(){
    return {
      name:'我是父组件传到子组件的参数',
      count:1
    }
  }
}
</script>
