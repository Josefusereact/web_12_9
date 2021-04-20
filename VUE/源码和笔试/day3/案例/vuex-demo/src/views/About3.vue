<template>
<div>
  <h4>
    通过mapState关联aboutModel1的state并取值
  </h4>
  <div>
    全局的state的name属性：{{globalName}}<br />
    aboutModel1的state的name属性：{{name}}
  </div>
  <h4>
    通过mapGetters关联aboutModel1的getters并取值
  </h4>
  <div>
    aboutModel1的getters的getName：{{getName}}
  </div>

  <h4>
    通过mapMutations关联aboutModel1的mutations并设置值
  </h4>
  <div>
    <button @click="handleSetName">通过commit设置aboutModel1的state的name</button>
  </div>
  <h4>
    通过mapActions关联aboutModel1的actions并设置值
  </h4>
  <div>
    <button @click="handleFetchName">2秒之后设置aboutModel1的name的值</button>
  </div>
</div>
</template>

<script>
// 引入模块About.model
import aboutModel1 from './About.model'
//引入全局的store对象
import store from '@/store'
//引入vuex中的命名模块创建助手
import {
  createNamespacedHelpers
} from 'vuex'
// 如果store中未注册aboutModel1就动态将他注册到store中
if (!store.hasModule('aboutModel1')) {
  store.registerModule('aboutModel1', aboutModel1)
}
// 获取指定映射aboutModel1模块的map系列函数
//通过引入他们，本页面的所有模块默认就会映射到aboutModel1中】
//不需要在mapState以及其他函数中传入模块名
//createNamespacedHelpers这个函数在其他模块也可以使用
//这里仅仅为配合动态注册组件使用，也就是说在本页面中
//也可以不使用createNamespacedHelpers，直接用vuex中的map系列
const {
  mapState,
  mapGetters,
  mapMutations,
  mapActions
} = createNamespacedHelpers('aboutModel1')
export default {
  name: 'About3',
  computed: {
    // 由于全局的state中的name与模块中的name为重名
    //所以这里将全局的state中的name的取值函数换成globalName
    //并且设置到本页面的computed中。
    //可以将mapState(['name'])打印查看为什么这么写
    globalName() {
      return this.$store.state.name
    },
    //将aboutModel1的state中的name映射到本组件的computed中
    ...mapState(['name']),
    //将aboutModel1的getters中的getName映射到本组件的computed中
    ...mapGetters(['getName'])
  },
  methods: {
    // 将aboutModel1的mutations中的setName映射到本组件的methods中
    ...mapMutations(['setName']),
    // 将aboutModel1的actions中的fetchNameNew映射到本组件的methods中
    ...mapActions(['fetchNameNew']),
    handleSetName() {
      this.setName('我是通过mapMutation设置的值' + Math.random())
    },
    handleFetchName() {
      this.fetchNameNew('我是通过mapActions设置的值' + Math.random())
    }
  }
}
</script>
