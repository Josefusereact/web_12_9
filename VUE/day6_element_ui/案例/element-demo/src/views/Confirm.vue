<template>
  <div>
    <el-button @click="handleShowNotify">
        点我弹出提示</el-button>
  </div>
</template>

<script>
  export default{
    methods:{
      async handleShowNotify(){
        let res =await this.$confirm("我是内容","我是标题")
          .catch(err => err)
        console.log(res)
        //confirm的经典用法
        // this.$confirm('您有一份100元现金红包','系统提示',{
        //   type:'error',//success / info / warning / error
        //   showClose:true,//true/false 是否右上角的关闭按钮
        //   showCancelButton:true,//默认为true是否显示取消按钮
        //   showConfirmButton:true,//默认为true是否显示确认按钮
        //   cancelButtonText:'关闭',//取消按钮的文本，取消按钮的文本
        //   confirmButtonText:'保存',//确认按钮的文本，确认按钮的文本
        // }).then(res => {
        //   console.log(res)
        //   //点击确认时的回调，res为confirm
        // }).catch(err=>{
        //   console.log(err)
        //   //点击取消时的回调，err为cancel
        // })
        // async 配合 await的同步化写法
        
      }
    }
  }
</script>

<style>
</style>
