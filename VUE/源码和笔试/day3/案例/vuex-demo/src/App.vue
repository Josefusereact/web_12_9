<template>
<div id="app">
  <div id="nav">
    <router-link to="/">全局基本使用</router-link> |
    <router-link to="/about">module数据的基本调用</router-link> |
    <router-link to="/about1">map系列函数操作全局模块</router-link>|
    <router-link to="/about2">map系列函数操作命名模块</router-link> |
    <router-link to="/about3">模块动态注册</router-link>｜
    <router-link to="/about4">vuex原理</router-link>

  </div>
  <router-view />
</div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
