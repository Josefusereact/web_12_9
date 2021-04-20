<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  methods: {
    goBack() {
      console.log("go back");
    },
  },
};
</script>

<style>
</style>