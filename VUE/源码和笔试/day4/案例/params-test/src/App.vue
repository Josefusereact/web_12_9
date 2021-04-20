<template>
<div id="app">
  <div id="nav">
    <router-link to="/">父传子</router-link> |
    <router-link to="/demo1">子传父</router-link>|
    <router-link to="/demo2">双向传参数</router-link>|
    <router-link to="/demo3">双向绑定</router-link>|
    <router-link to="/demo4">多重双向绑定</router-link>|
    <router-link to="/demo5">跨代组件传参数</router-link>|
    <router-link to="/demo6">observable传参</router-link>｜
    <router-link to="/demo7">eventBus传参</router-link>|
    <router-link to="/demo8">海量数据渲染</router-link>|
    <router-link to="/demo9">增量更新</router-link>
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
