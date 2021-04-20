<template>
<div>
  <h4>
    通过mapState关联aboutModel的state并取值
  </h4>
  <div>
    全局的state的name属性：{{globalName}}<br />
    aboutModel的state的name属性：{{name}}
  </div>
  <h4>
    通过mapGetters关联aboutModel的getters并取值
  </h4>
  <div>
    aboutModel的getters的getName：{{getName}}
  </div>

  <h4>
    通过mapMutations关联aboutModel的mutations并设置值
  </h4>
  <div>
    <button @click="handleSetName">通过commit设置aboutModel的state的name</button>
  </div>
  <h4>
    通过mapActions关联aboutModel的actions并设置值
  </h4>
  <div>
    <button @click="handleFetchName">2秒之后设置aboutModel的name的值</button>
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

console.log(mapState(['name']).name)
export default {
  name: 'About2',
  computed: {
    // 由于全局的state中的name与模块中的name为重名
    //所以这里将全局的state中的name的取值函数换成globalName
    //并且设置到本页面的computed中。
    //可以将mapState(['name'])打印查看为什么这么写
    globalName: mapState(['name']).name,
    //将aboutModel的state中的name映射到本组件的computed中
    ...mapState('aboutModel', ['name']),
    //将aboutModel的getters中的getName映射到本组件的computed中
    ...mapGetters('aboutModel', ['getName'])
  },
  methods: {
    // 将aboutModel的mutations中的setName映射到本组件的methods中
    ...mapMutations('aboutModel', ['setName']),
    // 将aboutModel的actions中的fetchNameNew映射到本组件的methods中
    ...mapActions('aboutModel', ['fetchNameNew']),
    handleSetName() {
      this.setName('我是通过mapMutation设置的值' + Math.random())
    },
    handleFetchName() {
      this.fetchNameNew('我是通过mapActions设置的值' + Math.random())
    }
  }
}
</script>
