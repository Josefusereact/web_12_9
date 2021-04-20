<template>
<div>
  new
  {{formData}}
  <form action="">
    <div>
      用户名
      <input name="username" v-model="formData.username" type="text">
    </div>
    <div>
      密码
      <input name="password" v-model="formData.password" type="text">
    </div>
    <div>
      性别：
      <label for="nan">
        男
        <input id="nan" name="sex" v-model="formData.sex" type="radio" value="1">
      </label>
      <label for="nv">
        女
        <input id="nv" name="sex" v-model="formData.sex" type="radio" value="2">
      </label>
    </div>
  </form>
  <button @click="handleClick">点我</button><br />
  直接取值：{{count}}<br />
  computed取值：{{getCount}}
  <br />
  data中的name：{{name}}
</div>
</template>

<script>
import {
  ref,
  reactive,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  watch,
  computed
} from 'vue'
export default {
  name: 'New',
  data() {
    return {
      name: '我是data中的值'
    }
  },
  created() {
    console.log('created')
  },
  beforeCreate() {
    console.log('beforeCreate')
  },
  //setup函数是vue3新增的一种混合api
  //他可以在setup中动态注册data中的数据
  //computed中的数据，生命周期函数
  //监听函数，以及普通函数
  //Vue实例初始化的时候会自动的执行这个函数并且将
  //注册的内容同步到Vue的实例中。并且他可以混合Vue的原始写法
  //也就是说我们在Vue3中可以通过setup写Vue代码也可以通过原始
  //方式编写代码，同样也可以两种混合编写代码。
  //setup的封装思路与react中的hooks方式开发类似
  //都是函数形式开发的思路
  setup(props, _this) {
    //props代表组件外部传入的参数
    //_this为setup本身的对象
    console.log(props, _this)
    //由于setup是在Vue实例创建前执行所以在这个函数中
    //拿不到Vue组件本身的this
    //所以这里的输出是undefined
    console.log(_this.name)
    //常用的生命周期，这里不可以使用beforeCreate和created，
    //因为setup在beforeCreate前执行
    onBeforeMount(() => {
      console.log('beforeMount')
    })
    onMounted(() => {
      console.log('mounted')
    })
    onBeforeUpdate(() => {
      console.log('beforeUpdate')
    })
    onUpdated(() => {
      console.log('updated')
    })
    //reactive相当于new Proxy对象返回的是响应式数据对象
    //多数的使用场景就是表单对象
    const formData = reactive({
      username: 'admin',
      password: '123456'
    })
    //监听reactive对象
    watch(formData, (v) => {
      console.log('reactive数据的监听formData函数执行')
      console.log(v)
    })
    //声明一个ref对象，ref对象相当于一个单独变量，他的值存在于property.value中
    //他与react中的useState有些相像，let property = ref(值)
    //通过property.value改变值在页面取值也会同时触发变更
    //在页面可以直接通过{{property}}的方式取值
    let count = ref(0);
    console.log(count)
    //监听ref对象
    watch(count, (v) => {
      console.log('ref数据的监听count函数执行')
      console.log(v)
    })
    //在setup函数中定义点击methods中的函数
    //同样通过return绑定到实例上
    const handleClick = (e) => {
      console.log(e)
      console.log(_this.attrs)
      count.value++
    }
    //定义计算属性，通过computed定义的getCount为计算属性
    //他的类型为ComputedRefImpl与ref的类型类似所以也是通过value取值
    //在页面可以通过{{getCount}}直接取值，在js中需要getCount.value
    const getCount = computed(() => {
      return 'count的值为' + count.value
    })
    console.log(getCount)
    return {
      onBeforeMount,
      onMounted,
      onBeforeUpdate,
      onUpdated,
      formData,
      count,
      handleClick,
      getCount
    }
  }
}
</script>

<style scoped>

</style>
