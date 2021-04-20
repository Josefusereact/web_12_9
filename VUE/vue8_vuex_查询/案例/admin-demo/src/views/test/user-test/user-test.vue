<!--将如下内容粘贴到user-test.vue中 -->
<template>
  <div>
    <p-page-header title="用户管理练习"></p-page-header>
    <el-form :model="queryForm" inline>
      <el-form-item size="mini" label="用户账号">
        <el-input
          placeholder="请输入账号"
          clearable
          v-model="queryForm.username"
        ></el-input>
      </el-form-item>
      <el-form-item size="mini">
        <el-button
          icon="el-icon-search"
          type="primary"
          @click="handleSearch"
          :loading="loading"
          >查询</el-button
        >
      </el-form-item>
    </el-form>
    <!-- 表格组件的练习-->
    <el-table :data="list" size="mini" border>
      <!--昵称非常简单正常使用就可以读取-->
      <el-table-column label="昵称" prop="nickname"></el-table-column>
      <el-table-column label="创建时间" prop="insertTime">
        <template v-slot="{ row }">
          <!-- 将每行的时间传入计算属性并输出-->
          {{ formmatDate(row.insertTime) }}
        </template>
      </el-table-column>
      <el-table-column label="角色名称" prop="roleName">
        <template v-slot="{ row }">
          <el-tag>
            {{ row.roleName }}
          </el-tag>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page.pno"
      :page-size="page.psize"
      :page-sizes="[5, 10, 15, 20]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.totalElements"
    >
    </el-pagination>
  </div>
</template>

<script>
//从vuex对象中引入mapState模块
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      loading: false,
      queryForm: {
        pno: 1, //页号
        psize: 10, //每页多少条
        username: "", //用户账号
      },
    };
  },
  computed: {
    //...为es6解构赋值的写法，意义为将mapState执行并将返回值合并到computed中
    //mapState意义为state的映射对象，mapState(模块名称，['state中的属性','state中的属性'...]),这个意思就是将我们自己定义的user-test-model.js中创建的state中的list加载到本组件的computed中
    ...mapState("userTestModel", ["list", "page"]),
    formmatDate() {
      return function (time) {
        //将时间戳转成日期
        let d = new Date(time);
        return `${d.getFullYear()}-${
          d.getMonth() + 1
        }-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
      };
    },
  },
  name: "user-test",
  methods: {
    ...mapActions("userTestModel", ["getListForPage"]), //定义的点击事件实现内容
    async handleSearch() {
      //先让按钮变成加载中
      this.loading = true;
      //为了防止分页功能导致页号变更，保证每次条件查询都要从第一页开始展示结果
      this.queryForm.pno = 1;
      //然后调用查询接口，这里注意只有通过await修饰代码才会按照同步代码执行。
      //这个写法相当于我们过去通过this.http().then()的嵌套写法的升级版
      await this.getListForPage(this.queryForm);
      //查询完毕后让加载中取消
      this.loading = false;
    },
    //分页组件的psize发生变化会触发并传入psize
    async handleSizeChange(psize) {
      this.queryForm.pno = 1;
      //将每页多少条的值重新设置
      this.queryForm.psize = psize;
      //重新调用查询
      await this.getListForPage(this.queryForm);
    },
    //通过分页组件触发跳页会执行并会传入pno
    async handleCurrentChange(pno) {
      this.queryForm.pno = pno;
      await this.getListForPage(this.queryForm);
    },
  },
  async created() {
    await this.getListForPage(this.queryForm);
  },
  async activated() {
    await this.getListForPage(this.queryForm);
  },
};
</script>

<style>
</style>