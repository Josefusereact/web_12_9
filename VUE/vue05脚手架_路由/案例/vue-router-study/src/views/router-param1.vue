<template>
  <div>
    <h4>
      路由传参数1（接参数页面）<button @click="handleGoBack">返回</button>
    </h4>
    <div>
      1.通过query传入的参数:{{queryTitle}}<br/>
      2,通过params传入的参数:{{paramsTitle}}
    </div>
  </div>
</template>

<script>
  export default{
    name:'router-param1',
    data(){
      return {
        queryTitle:'',
        paramsTitle:''
      }
    },
    created(){
      //通过$route数据对象从query中获取参数
      let query = this.$route.query;
      //通过$route数据对象从params中获取参数
      let params = this.$route.params;
      this.queryTitle = query.title;
      this.paramsTitle = params.title
    },
    methods:{
      handleGoBack(){
        // 后退
        this.$router.history.go(-1)
      }
    }

  }
</script>

<style>
</style>
