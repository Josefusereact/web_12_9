<template>
<div>
  <h4>
    通过mapState关联全局的state并取值
  </h4>
  <div>
    全局的state的name属性：{{name}}
  </div>
  <h4>
    通过mapGetters关联全局的getters并取值
  </h4>
  <div>
    全局的getters的getName：{{getName}}
  </div>

  <h4>
    通过mapMutations关联全局的mutations并设置值
  </h4>
  <div>
    <button @click="handleSetName">通过commit设置全局的state的name</button>
  </div>
  <h4>
    通过mapActions关联全局的actions并设置值
  </h4>
  <div>
    <button @click="handleFetchName">2秒之后设置name的值</button>
  </div>
</div>
</template>

<script>
import {
  mapState,
  mapGetters,
  mapMutations,
  mapActions
} from 'vuex'
export default {
  name: 'About1',
  computed: {
    // 将全局的state中的name属性映射到本组件的computed中
    ...mapState(['name']),
    //将全局的getters中的getName映射到本组件的computed中
    ...mapGetters(['getName'])
  },
  methods: {
    // 将全局的mutations中的setName映射到本组件的methods中
    ...mapMutations(['setName']),
    // 将全局的actions中的fetchName映射到本组件的methods中
    ...mapActions(['fetchName']),
    handleSetName() {
      this.setName('我是通过mapMutation设置的值' + Math.random())
    },
    handleFetchName() {
      this.fetchName('我是通过mapActions设置的值' + Math.random())
    }
  }
}
</script>
