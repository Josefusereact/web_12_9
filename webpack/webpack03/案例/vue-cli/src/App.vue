<template>
  <div>
    <el-container>
      <el-header>
        <el-row>
          <el-col :span="20">
            <my-header :biaoti="myHeaderBiaoTi"></my-header>
          </el-col>
          <el-col :span="4" align="center">
            <el-row type="flex" justify="center" align="middle">
              <el-avatar
                src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                size="small"
              ></el-avatar>
              <el-dropdown split-button type="primary" @click="handleClick">
                欢迎您{{ username }}登录
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-row>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-row class="tac">
            <el-col :span="24">
              <el-menu
                router="true"
                default-active="2"
                default-openeds="[1-4,1-5]"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b"
              >
                <el-submenu index="1">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>导航一</span>
                  </template>
                  <el-menu-item-group>
                    <template slot="title">分组一</template>
                    <el-menu-item index="/">首页</el-menu-item>
                    <el-menu-item index="/test">TEST</el-menu-item>
                  </el-menu-item-group>
                  <el-menu-item-group title="分组2">
                    <el-menu-item index="1-3">选项3</el-menu-item>
                  </el-menu-item-group>
                  <el-submenu index="1-4">
                    <template slot="title">选项4</template>
                    <el-menu-item index="1-4-1">选项1</el-menu-item>
                    <el-menu-item index="1-4-2">选项2</el-menu-item>
                    <el-menu-item index="1-4-3">选项3</el-menu-item>
                    <el-menu-item index="1-4-4">选项4</el-menu-item>
                  </el-submenu>
                  <el-submenu index="1-5">
                    <template slot="title">选项5</template>
                    <el-menu-item index="1-5-1">选项1</el-menu-item>
                    <el-menu-item index="1-5-2">选项2</el-menu-item>
                    <el-menu-item index="1-5-3">选项3</el-menu-item>
                    <el-menu-item index="1-5-4">选项4</el-menu-item>
                  </el-submenu>
                </el-submenu>
                <el-menu-item index="2">
                  <i class="el-icon-menu"></i>
                  <span slot="title">导航二</span>
                </el-menu-item>
                <el-menu-item index="3" disabled>
                  <i class="el-icon-document"></i>
                  <span slot="title">导航三</span>
                </el-menu-item>
                <el-menu-item index="4">
                  <i class="el-icon-setting"></i>
                  <span slot="title">导航四</span>
                </el-menu-item>
              </el-menu>
            </el-col>
          </el-row>
        </el-aside>
        <el-main>
          <router-link to="/">首页Index</router-link>
          <router-link to="/test">测试页Test</router-link>
          <el-button v-on:click="handleClick" ref="btn"
            >点击{{ count }}次</el-button
          >
          <el-button v-on:click="handleClickForVuex"
            >点击+1给vuex的state</el-button
          >
          <router-view></router-view>
        </el-main>
        <el-backtop
          target=".page-component__scroll .el-scrollbar__wrap"
          :bottom="100"
        >
          <div
            style="
               {
                height: 100%;
                width: 100%;
                background-color: #f2f5f6;
                box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
                text-align: center;
                line-height: 40px;
                color: #1989fa;
              }
            "
          >
            UP
          </div>
        </el-backtop>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  /* components: {
                      MyHeader,
                   }, */
  data() {
    return {
      count: 0,
      myHeaderBiaoTi: "论坛后台管理系统",
      username: "Avrida",
    };
  },
  methods: {
    handleClickForVuex() {
      this.$store.commit("increment");
    },
    handleClick() {
      this.count++;
      this.$nextTick(() => {
        console.log("DOM:", this.$refs.btn.innerText);
      });
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
  beforeMount() {
    console.log(`装载前（渲染前）: ${this.count}`);
  },
  mounted() {
    console.log("元素渲染完毕，装载完毕", this.count);
  },
  beforeUpdate() {
    console.log("组件更新前", this.count);
  },
  updated() {
    console.log("组件更新", this.count);
    console.log("DOM-update:", this.$refs.btn.innerText);
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

.el-header,
.el-footer {
  background-color: #333;
  color: #b3c0d1;
  /* text-align: center; */
  line-height: 60px;
}

.el-aside {
  background-color: #333;
  color: #d3dce6;
  /* text-align: center; */
  /* line-height: 200px; */
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  /* text-align: center; */
  /* line-height: 160px; */
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
