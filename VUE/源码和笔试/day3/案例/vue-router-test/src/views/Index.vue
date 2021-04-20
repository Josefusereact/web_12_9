<template>
<div>
  <h4>
    1.component回忆
  </h4>
  切换组件:
  <label for="zj1">
    <input id="zj1" type="radio" v-model="zj" value="Component1">
    组件1
  </label>
  <label for="zj2">
    <input id="zj2" type="radio" v-model="zj" value="Component2">
    组件2
  </label>
  <component :is="zj" />
  <div>
    <h4>
      2.课堂练习：实现对component增加缓存,和过渡
    </h4>

    <!--
      思路：
        缓存使用keep-alive组件嵌套来实现对当前组件
        所有状态的缓存。
        过渡使用transition组件对其进行嵌套来实现跳页切换
     -->
  </div>
  <router-link to="/test?id=123456">进入下一节</router-link>
</div>
</template>

<script>
// 引入组件
import Component1 from '@/components/Component1'
import Component2 from '@/components/Component2'
export default {
  data() {
    // 设置初始值
    return {
      zj: 'Component1'
    }
  },
  // 将组件注册到当前页面中
  components: {
    Component1,
    Component2
  },
  created() {
    console.log(this.$router)
  },
  methods: {

  },
}
</script>
