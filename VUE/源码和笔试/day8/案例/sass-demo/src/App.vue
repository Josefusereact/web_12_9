<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">定义变量</router-link> |
      <router-link to="/outside">外部引用</router-link> |
      <router-link to="/array">定义数组</router-link> |
      <router-link to="/map">定义map</router-link> |
      <router-link to="/map-array">定义map➕数组练习</router-link> |
      <router-link to="/function">定义函数</router-link> 
    </div>
    <router-view/>
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
