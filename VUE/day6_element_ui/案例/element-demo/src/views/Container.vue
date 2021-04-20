<!-- 典型的上左右结构页面布局 -->
<template>
  <div>
    <div class="p-layout">
      <el-header>
          我是标题栏目
      </el-header>
      <el-container>
        <el-aside>
          我是左侧菜单
        </el-aside>
        <el-main>
          我是主体
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
  export default{

  }
</script>

<style lang="scss" scoped="scoped">
  .p-layout{
    .el-header{
      background-color: #666666;
    }
    .el-container{
      height: 600px;
      .el-aside{
        background-color: #888888;
      }
      .el-main{
        background-color: #CCCCCC;
      }
    }
  }
</style>
