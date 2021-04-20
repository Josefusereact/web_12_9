<template>
  <div>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  created() {
    if (!sessionStorage.getItem("username")) {
      this.$router.push({ name: "Login", params: { msg: "您还没登陆！" } });
    }
  },
};
</script>
<style lang="scss">
</style>
