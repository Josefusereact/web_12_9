<template>
<div>
  <h4>Vue3初体验</h4>
  <ol>
    <li>
      <h4>v-model体验</h4>
      <input type="text" v-model="str">
      {{str}}
    </li>
    <li>
      <h4>点击事件</h4>
      <button @click="handleClick">点我</button>
      {{count}}
    </li>
  </ol>
</div>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      count: 0,
      str: ''
    }
  },
  methods: {
    handleClick() {
      this.count++
    }
  }

}
</script>

<style>
</style>
