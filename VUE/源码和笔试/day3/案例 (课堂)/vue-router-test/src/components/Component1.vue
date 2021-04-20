<template>
<div style="height:100px">
  组件1
  <input type="text">
</div>
</template>

<script>
export default {
  name: 'Component1',
  beforeCreate() {
    console.log('创建前1')
  },
  created() {
    console.log('创建完成1')
  },
  beforeMount() {
    console.log('渲染前1')
  },
  mounted() {
    console.log('渲染完成1')
  },
  activated() {
    console.log('缓存之后执行的1')
  }
}
</script>
