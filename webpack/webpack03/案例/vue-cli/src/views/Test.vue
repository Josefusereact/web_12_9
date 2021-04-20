<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/test' }">test</el-breadcrumb-item>
    </el-breadcrumb>
    Test组件 显示state中的count
    {{ this.$store.state.count }}
    <div>
      <i class="el-icon-edit"></i>
      <i class="el-icon-share"></i>
      <i class="el-icon-delete"></i>
      <el-button type="promary" icon="el-icon-search">搜索</el-button>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>