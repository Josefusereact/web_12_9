<template>
<a :href="getTo">
  <slot />
</a>
</template>

<script>
export default {
  name: 'router-link',
  props: {
    to: {
      required: true,
      default: '',
      type: String
    }
  },
  computed: {
    // 将router-link中to中的参数拼接#并展示到页面
    //用来通过a标签实现Vue页面的跳转
    getTo() {
      return '/#' + this.to
    }
  }
}
</script>
