<template>
<div>
  <h4>
    vuex原理
  </h4>
  <div>
    state中的name的值为:{{name}}<br>
    <button @click="handleSetName">点我设置name的值</button>
  </div>
</div>
</template>

<script>
import Vue from 'vue'
// 通过Vue.observable返回的对象相当于
//被Vue的观察者观察过之后的对象，
//所以Vue可以感知到他的变更，并且在computed中进行对应的处理。
//Vuex就是基于这个简单的api做成了复杂的store对象。
const state = Vue.observable({
  name: '我是state中的name'
})
const setName = (state, name) => {
  state.name = name
}
export default {
  name: 'About4',
  computed: {
    name() {
      return state.name
    }
  },
  methods: {
    handleSetName() {
      setName(state, '我是state的新值' + Math.random())
    }
  }
}
</script>
