<template>
  <div>
    <el-button @click="handleShowNotify">
        点我弹出提示</el-button>
  </div>
</template>

<script>
  export default{
    methods:{
      handleShowNotify(){
        this.$notify({
          type:'warning',
          title:'提示',
          message:'<a href="#">我是一个通知</a>',
          position:'bottom-left',
          dangerouslyUseHTMLString:true
        })
      }
    }
  }
</script>

<style>
</style>
