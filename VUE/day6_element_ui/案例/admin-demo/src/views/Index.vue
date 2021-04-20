<template>
  <div class="p-index">
    <el-container class="p-el-container">
      <el-header>
        <el-row>
          <el-col :span="20"
            >后台管理系统训练 欢迎{{ this.$route.params.username }}登陆
          </el-col>
          <el-col :span="4">
            <el-dropdown split-button type="primary" @command="handleCommand">
              选项
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside>
          <ul>
            <li>
              <router-link to="/test1"> 跳转到Test1.vue </router-link>
            </li>
            <li>
              <router-link to="/test2"> 跳转到Test2.vue </router-link>
            </li>
          </ul>
        </el-aside>
        <el-main> </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  created() {
    console.log(this.$route.params.username);
    console.log(this.$route.params.password);
  },
  methods: {
    handleCommand(command) {
      switch (command) {
        case "logout": {
          sessionStorage.removeItem("username");
          this.$router.push({ path: "/login" });
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped="scoped">
.p-index {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  .p-el-container {
    height: 100%;
    .el-header {
      background-color: #666666;
      line-height: 60px;
      color: #fff;
    }
    .el-aside {
      background-color: #888888;
    }
    .el-main {
      background-color: #cccccc;
    }
  }
}
</style>
