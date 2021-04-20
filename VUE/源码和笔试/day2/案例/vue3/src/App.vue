<template>
<div>
  <h4>Vue3初体验</h4>
  <a href="#" @click="handleClick('Index')">
    传统写法
  </a>｜
  <a href="#" @click="handleClick('New')">
    Vue3体验
  </a>
  <div>
    <component :is="componentName"></component>
  </div>
</div>
</template>

<script>
import Index from './components/Index'
import New from './components/New'
export default {
  name: 'App',

  data() {
    return {
      componentName: 'Index'
    }
  },
  components: {
    Index,
    New
  },
  methods: {
    handleClick(name) {
      this.componentName = name
    }
  }

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
