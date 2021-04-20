<template>
<div style="height:100px">
  组件2
  <input type="text">
</div>
</template>

<script>
export default {
  name: 'Component2',
  beforeCreate() {
    console.log('创建前2')
  },
  created() {
    console.log('创建完成2')
  },
  beforeMount() {
    console.log('渲染前2')
  },
  mounted() {
    console.log('渲染完成2')
  },
  activated() {
    console.log('缓存之后执行的2')
  }
}
</script>
