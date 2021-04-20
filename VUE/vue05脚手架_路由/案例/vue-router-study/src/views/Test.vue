<template>
  <div>
    test
    <button @click="handleGo">{{ back }}</button>
    <p>我是query接收到的参数{{ this.$route.query }}</p>
    <p>我是params接收到的参数{{ this.$route.params }}</p>
    <p>我是localStorage获取的参数{{ p1 }},{{ p2 }}</p>
  </div>
</template>
<script>
export default {
  data() {
    console.log("返回");
    return {
      back: "返回",
      p1: localStorage.getItem("p1"),
      p2: localStorage.getItem("p2"),
    };
  },
  methods: {
    handleGo() {
      this.$router.history.go(-1);
    },
  },
  created() {
    //query
    console.log("test组件接收到的参数 " + this.$route.query.canshu1);
    console.log("test组件接收到的参数 " + this.$route.query.canshu2);
    //params
    console.log("test组件接收到的参数-params " + this.$route.params.p1);
    console.log("test组件接收到的参数-params " + this.$route.params.p2);
    var p1 = "",
      p2 = "";
    if (!this.$route.params.p1) {
      p1 = localStorage.getItem("p1");
    } else {
      localStorage.setItem("p1", this.$route.params.p1);
      p1 = localStorage.getItem("p1");
    }
    if (!this.$route.params.p2) {
      p2 = localStorage.getItem("p2");
    } else {
      localStorage.setItem("p2", this.$route.params.p2);
      p2 = localStorage.getItem("p2");
    }
    console.log("p1=", p1, "p2=", p2);
  },
};
</script>

<style>
</style>