<template>
  <div class="page">
    <p-page-header title="商城会员管理"></p-page-header>
    <el-form inline :model="queryForm">
      <el-form-item size="mini" label="会员账号">
        <el-input
          placeholder="请输入"
          clearable
          v-model="queryForm.username"
        ></el-input>
      </el-form-item>
      <el-form-item size="mini" label="会员手机号">
        <el-input
          placeholder="请输入"
          clearable
          v-model="queryForm.phone"
        ></el-input>
      </el-form-item>
      <el-form-item size="mini" label="会员状态">
        <el-select v-model="queryForm.freeze">
          <el-option value="1" label="冻结"></el-option>
          <el-option value="0" label="正常"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item size="mini" label="会员生日">
        <el-date-picker
          v-model="dateArr"
          type="daterange"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          @change="handleDateChange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item size="mini">
        <el-button
          type="primary"
          :loading="queryLoading"
          @click="handleClick"
          icon="el-icon-search"
          >查询</el-button
        >
      </el-form-item>
      <el-form-item size="mini">
        <el-button
          type="success"
          :loading="queryLoading"
          @click="handleAdd"
          icon="el-icon-plus"
          >新增</el-button
        >
      </el-form-item>
    </el-form>
    <el-table border size="mini" :data="list">
      <el-table-column label="账号" prop="username"></el-table-column>
      <el-table-column label="昵称" prop="nickname"></el-table-column>
      <el-table-column label="卡号" prop="cardNumber"></el-table-column>
      <el-table-column label="头像">
        <template v-slot="{ row }">
          <el-image
            style="width: 100px; height: 100px; border-radius: 9px"
            fit="cover"
            :src="row.face"
            :preview-src-list="[row.face]"
          >
          </el-image>
        </template>
      </el-table-column>
      <el-table-column label="会员类型">
        <template v-slot="{ row }">
          <el-tag size="small">
            {{ row.userTypeName }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="会员状态">
        <template v-slot="{ row }">
          <el-tag v-if="row.freeze == 0" size="small"> 正常 </el-tag>
          <el-tag v-else type="danger" size="small"> 冻结 </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="会员生日">
        <template v-slot="{ row }">
          {{ formatTime(row.birthday) }}
        </template>
      </el-table-column>
      <el-table-column label="会员卡号" prop="cardNumber"></el-table-column>
      <el-table-column width="300px" label="操作">
        <template v-slot="{ row }">
          <el-button
            size="mini"
            v-if="row.freeze == 0"
            @click="handleSetFreeze(row)"
            plain
            type="danger"
            >冻结</el-button
          >
          <el-button
            size="mini"
            v-if="row.freeze == 1"
            @click="handleSetFreeze(row)"
            plain
            type="success"
            >解冻</el-button
          >
          <el-button
            size="mini"
            icon="el-icon-edit"
            @click="handleEdit(row.id)"
            type="warning"
            >修改</el-button
          >
          <el-button
            size="mini"
            @click="handleRemove(row.id)"
            icon="el-icon-remove"
            type="danger"
            >删除</el-button
          >
          <el-button
            size="mini"
            @click="handleDetail(row)"
            icon="el-icon-view"
            type="waring"
            >查看</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page.pno"
      :page-size="page.psize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.totalElements"
    >
    </el-pagination>

    <el-dialog
      title="会员信息"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <el-row :gutter="20">
        <el-col :span="6">账号</el-col>
        <el-col :span="8">{{ detailForm.username }}</el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">卡号</el-col>
        <el-col :span="8">{{ detailForm.cardNumber }}</el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">会员类型</el-col>
        <el-col :span="8">{{ detailForm.userTypeName }}</el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">昵称</el-col>
        <el-col :span="8">{{ detailForm.nickname }}</el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">性别</el-col>
        <el-col :span="8">{{ detailForm.sex == 1 ? "男" : "女" }}</el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">手机号</el-col>
        <el-col :span="8">{{ detailForm.phone }}</el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">头像</el-col>
        <el-col :span="8">
          <el-image
            style="width: 100px; height: 100px"
            :src="detailForm.face"
            fit="cover"
          ></el-image>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">会员状态</el-col>
        <el-col :span="8">{{
          detailForm.freeze == 1 ? "冻结" : "正常"
        }}</el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">会员生日</el-col>
        <el-col :span="8">{{ formatTime(detailForm.birthday) }}</el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">创建时间</el-col>
        <el-col :span="8">{{ formatTime(detailForm.insertTime) }}</el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false"
          >确定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
// 引入vuex的state和actions的映射对象用来映射store中定义的state和actions
import { mapState, mapActions } from "vuex";
export default {
  // 定义了组件的名称，用来结合keep-alive缓存页面
  name: "shop-user",
  data() {
    return {
      // 调用查询接口需要的参数
      queryForm: {
        username: "",
        phone: "",
        beginTime: "",
        endTime: "",
        freeze: "",
        pno: 1,
        psize: 10,
      },
      detailForm: {},
      dateArr: [],
      // 查询按钮的加载动画开关
      queryLoading: false,
    };
  },
  computed: {
    // 将vuex中定义的shopUserModel模块的数据加载到本页的计算属性中，这样我们在本页就可以
    // 直接通过this.list和this.page访问到vuex中的数据，这里的数据只能读取不能写入
    ...mapState("shopUserModel", ["list", "page"]),
    // 格式化日期的计算属性
    formatTime() {
      return function (time) {
        let d = new Date(Number(time));
        return `${d.getFullYear()}-${
          d.getMonth() + 1
        }-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
      };
    },
  },
  // 当第一次打开页面时会执行created生命周期
  async created() {
    await this.getListForPage(this.queryForm);
  },
  // 由于本页通过keep-alive进行了缓存，缓存后原有的生命周期不执行，所以通过activated来识别何时进入本页
  async activated() {
    await this.getListForPage(this.queryForm);
  },
  methods: {
    ...mapActions("shopUserModel", [
      "getListForPage",
      "deleteById",
      "setFreeze",
    ]),
    handleDateChange(res) {
      console.log(res);
      if (res != null) {
        this.queryForm.beginTime = res[0];
        this.queryForm.endTime = res[1];
      } else {
        this.queryForm.beginTime = "";
        this.queryForm.endTime = "";
      }
    },
    async handleClick() {
      this.queryLoading = true;
      this.queryForm.pno = 1;
      await this.getListForPage(this.queryForm);
      this.queryLoading = false;
    },
    // 点击分页组件的每页多少条切换时会触发这个回调，参数就是切换的条数
    async handleSizeChange(psize) {
      this.queryForm.psize = psize;
      this.queryForm.pno = 1;
      // 数据发生变化之后我们重新的调用查询方法
      await this.getListForPage(this.queryForm);
    },
    // 点击分页组件上一页下一页切换页面时触发的回调，参数就是跳到哪一页
    async handleCurrentChange(pno) {
      this.queryForm.pno = pno;
      // 改变请求的参数重新查询当页的数据
      await this.getListForPage(this.queryForm);
    },
    // 跳转到添加数据的页面
    handleAdd() {
      this.$router.push("/shop-user-add");
    },
    // 删除数据调用的方法
    async handleRemove(id) {
      // 通过同步化写法调用$confirm方法
      let confirm = await this.$confirm("正在删除", "提示", {
        type: "warning",
      }).catch((err) => err);
      if (confirm == "confirm") {
        // 如果点击确定
        //首先调用删除业务
        await this.deleteById(id);
        //删除业务调用完毕之后我们重新调用一次查询业务，来实现数据的更新
        await this.getListForPage(this.queryForm);
      }
    },
    // 跳转到编辑用户的页面
    handleEdit(id) {
      this.$router.push({ path: "/shop-user-edit", query: { id } });
    },
    async handleSetFreeze(row) {
      let message;
      let freeze;

      if (row.freeze == 1) {
        message = "正在解冻当前会员，点击确认继续";
        freeze = 0;
      } else {
        message = "正在冻结当前会员，点击确认继续";
        freeze = 1;
      }
      let confirm = await this.$confirm(message, "提示", {
        type: "warning",
      }).catch((err) => err);
      if (confirm == "confirm") {
        await this.setFreeze({
          id: row.id,
          freeze: freeze,
        });
        await this.getListForPage(this.queryForm);
      }
    },
    handleDetail(row) {
      this.dialogVisible = true;
      this.detailForm = row;
    },
  },
};
</script>

<style lang="scss">
.el-row {
  margin-bottom: 10px;
  .el-col:first-child {
    text-align: right;
  }
}
</style>
