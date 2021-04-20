<template>
<div>
  <h4>
    1.使用$store对象配合computed在vue中展示state
  </h4>
  <div>
    获取全局部分的state中的name的值：{{name}}
  </div>
  <h4>
    2.使用$store对象配合computed在vue中展示getters
  </h4>
  <div>
    获取全局部分的state中的name的值：{{getName}}
  </div>
  <h4>
    3.使用$store.commit对象调用mutations中的函数
  </h4>
  <div>
    <button @click="handleSetName">点击设置state中的name</button>
  </div>
  <h4>
    4.使用$store.dispatch对象调用actions中的函数
  </h4>
  <div>
    <button @click="handleFetchName">点击异步设置state中的name</button>
  </div>

</div>
</template>

<script>
/**
  Vuex在正常安装之后会在Vue的全局对象this
  中绑定一个$store对象，里面包含Vuex中Store中定义的
  所有信息，这样我们就可以通过$store对象直接的对Vuex中的
  数据按照Vuex的要求进行操作。
 */
export default {
  name: 'Index',
  computed: {
    name() {
      // 通过$store.state可以直接拿到全局对象的state
      //并且获取其中的值
      return this.$store.state.name
    },
    getName() {
      // 通过$store.getters可以直接拿到全局对象中的getters
      //并且获取其中的值
      return this.$store.getters.getName
    }
  },
  methods: {
    handleSetName() {
      // 通过$store.commit可以直接拿到全局对象中的commit
      //并且在Vue中通过commit直接调用全局的mutatioins中的值
      this.$store.commit('setName', '我是通过commit设置的新值' + Math.random())
    },
    handleFetchName() {
      //通过$store.dispatch可以直接拿到全局对象中的dispatch
      //并且在Vue中通过dispatch来直接调用全局的actions中的值
      this.$store.dispatch('fetchName', '我是通过dispatch设置的值' + Math.random())
    }
  }
}
</script>
