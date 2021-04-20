<template>
  <div>
    <h4>编程式路由</h4>
    <!--
      通过router-link的方式返回首页
     -->
    <router-link to="/">
      <button>link方式跳转</button>
    </router-link>
    <button @click="handleRouterToIndex1">$router方式跳转1</button>
    <button @click="handleRouterToIndex2">$router方式跳转2</button>
    <button @click="handleRouterToIndex3">$router方式跳转3</button>
    <button @click="handleRouterToIndex4">history方式跳转</button>
    <h4>
      练习：在项目中定义一个test.vue页面，当前页面实现通过1，2，3的方式跳转到test.vue
      并且在test.vue中通过4种方法返回到当前页面
    </h4>
    <div>
      <button @click="handleGo1">$router方式1 跳转到test.vue</button>
      <button @click="handleGo2">$router方式2 跳转到test.vue2</button>
      <button @click="handleGo3">$router方式3 跳转到test.vue3</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "js-router",
  data() {
    return {};
  },
  created() {
    console.log(this.$router);
  },
  methods: {
    handleRouterToIndex1() {
      this.$router.push("/");
    },
    handleRouterToIndex2() {
      this.$router.push({ path: "/" });
    },
    handleRouterToIndex3() {
      this.$router.push({ name: "index" });
    },
    handleRouterToIndex4() {
      this.$router.history.go(-1);
    },
    handleGo1() {
      this.$router.history.go(-1);
    },
    handleGo2() {
      this.$router.push({
        path: "test",
        query: { canshu1: "a", canshu2: "b" },
      });
    },
    handleGo3() {
      this.$router.push({
        name: "test",
        params: { p1: "a", p2: "b" },
      });
    },
  },
};
</script>

<style>
</style>
