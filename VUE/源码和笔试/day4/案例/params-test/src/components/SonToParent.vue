<template>
  <div>
    <h4>
      我是子组件
    </h4>
    <div>
      <input type="text" v-model="name" @input="handleValueChange">
    </div>
  </div>
</template>
<script>
export default {
  name:'son-to-parent',
  data(){
    return {
      name:'我是子组件的值'
    }
  },
  methods:{
    handleValueChange(){
      this.$emit('on-name-change',this.name)
    }
  }
}
</script>