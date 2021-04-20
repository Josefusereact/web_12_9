<template>
  <div>
    <h4>
      我是子组件
    </h4>
    <div>
      <input type="text" v-model="name" @input="handleValueChange">
      <br>
      <input type="text" v-model="password">
    </div>
  </div>
</template>
<script>
export default {
  name:'son-to-parent',
  data(){
    return {
      name:'我是子组件的值',
      password:'我是默认密码'
    }
  },
  watch:{
    password(v){
      this.$emit('on-password-change',v)
    }
  },
  methods:{
    handleValueChange(){
      this.$emit('on-name-change',this.name)
    }
  }
}
</script>