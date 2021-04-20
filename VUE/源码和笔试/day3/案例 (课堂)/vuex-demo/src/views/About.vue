<template>
<div>
  <h4>
    1.引用aboutModel模块中的state属性的值
  </h4>
  <div>
    <!--由于globalName是共享的全局state所以在第一个模块
      中如果变更了name的值那么这里globalName也会变为同一个值
     -->
    全局的store中的name值：{{globalName}}<br />
    aboutModel中的name值：{{name}}
  </div>
  <h4>
    2.引用aboutModel模块中的getters属性的值
  </h4>
  <div>
    {{getName}}
  </div>
  <h4>
    3.通过模块中的mutations对aboutModel中的name的值进行更改
  </h4>
  <div>
    <button @click="handleSetName">点我改变aboutModel中的值</button>
  </div>
  <h4>
    4.使用$store.dispatch对象调用actions中的函数
  </h4>
  <div>
    <button @click="handleFetchName">一秒之后让name的值改变</button>
  </div>
</div>
</template>

<script>
export default {
  name: 'About',
  created(){
    console.log(this.$store)
  },
  computed: {
    globalName() {
      //获取全局store中的值
      return this.$store.state.name
    },
    name() {
      // 在全局的$store中，模块的state会被自动注入到
      //全局的state.模块注册名称中
      //可以通过this.$store.state.模块名称.模块中的state中的key
      //来进行取值
      return this.$store.state.aboutModel.name
    },
    getName() {
      //在$store中模块的getters会被注册到$store.getters中
      //与state不同的是模块的getters的key会被注册为
      //模块名/getters中的函数名
      //所以获取模块中的getters的值需要编写为
      //this.$store.getters['模块名/getters中的函数名']
      return this.$store.getters['aboutModel/getName']
    },

  },
  methods: {
    handleSetName() {
      //使用commit调用全局mutations和模块的api语法完全一样
      //不同的是当调用的mutations为模块中的函数时
      //要把第一个参数的函数名变更为 模块名/函数名
      //如：this.$store.$commit('模块名/函数名','传入的参数')
      this.$store.commit('aboutModel/setName', '我是通过commit调用mutations设置的aboutModel中的name' + Math.random())
    },
    handleFetchName() {
      //使用dispatch调用模块中的actions
      //与commit的方式完全一样
      //this.$store.dispatch('模块名/函数名','参数')
      this.$store.dispatch('aboutModel/fetchNameNew', '我是通过dispatch调用fetchNameNew改变aboutModel中的name' + Math.random())

    }
  }
}
</script>
