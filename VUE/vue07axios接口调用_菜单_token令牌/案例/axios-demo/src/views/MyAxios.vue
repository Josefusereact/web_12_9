<template>
  <div>
    <el-button @click="handleAjax"> 在vue单文件中使用axios </el-button>
  </div>
</template>

<script>
import axios from "axios";
import md5 from "md5";

export default {
  methods: {
    handleAjax() {
      console.log(md5("123456"));
      axios({
        method: "POST",
        url: "http://localhost:8080/shop-service/v1/api-test/get/demo2",
        params: {
          username: "admin",
          password: "123456",
        },
      })
        .then((response) => {
          console.log("服务器端返回的值", response);
        })
        .catch((error) => {
          console.log("出错了", error);
        });
    },
  },
};
</script>

<style>
</style>