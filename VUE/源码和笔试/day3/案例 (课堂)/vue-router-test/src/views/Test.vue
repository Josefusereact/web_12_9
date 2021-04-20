<template>
<div>
  <h4>
    路由的实现
  </h4>
  <div>
    我是接到的id：{{id}}
  </div>
</div>
</template>

<script>
export default {
  created() {
    let id = this.$route.query.id
    this.id = id
  },
  data() {
    return {
      id: ''
    }
  }
}
</script>
