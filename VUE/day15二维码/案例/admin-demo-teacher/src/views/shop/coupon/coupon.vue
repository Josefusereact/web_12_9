<template>
  <div class="page">
    <p-page-header title="优惠券管理"></p-page-header>
    <el-form inline :model="queryForm">
      <el-form-item size="mini" label="优惠券名称">
        <el-input
          placeholder="请输入"
          clearable
          v-model="queryForm.name"
        ></el-input>
      </el-form-item>
      <el-form-item size="mini" label="优惠券类型">
        <el-select
          placeholder="请选择"
          clearable
          v-model.trim="queryForm.couponTypeId"
        >
          <el-option
            v-for="item in couponTypeList"
            :key="'' + item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
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
        <el-button type="success" @click="handleAdd" icon="el-icon-plus"
          >新增</el-button
        >
      </el-form-item>
      <el-form-item size="mini">
        <el-button type="success" @click="handleAddMultiple" icon="el-icon-plus"
          >批量新增</el-button
        >
      </el-form-item>
    </el-form>
    <el-table border size="mini" :data="list">
      <el-table-column label="优惠券id" prop="id"></el-table-column>
      <el-table-column label="优惠券名称" prop="name"></el-table-column>
      <el-table-column label="优惠券类型">
        <template v-slot="{ row }">
          <el-tag size="small">
            {{ row.couponTypeName }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="到期时间" prop="name">
        <template v-slot="{ row }">
          <el-tag size="mini">
            {{ formatTime(row.targetTime) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="优惠券备注" show-overflow-tooltip prop="remark">
      </el-table-column>
      <el-table-column width="300px" label="操作">
        <template v-slot="{ row }">
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
            icon="el-icon-edit"
            plain
            @click="handlePeviewQrcode(row)"
            type="warning"
            >查看二维码</el-button
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

    <el-dialog title="二维码查看" width="280px" :visible.sync="dialogVisible">
      <canvas id="canvas" ref="canvas" width="200px"></canvas>
    </el-dialog>
  </div>
</template>

<script>
import qrcode from "qrcode";
// 引入vuex的state和actions的映射对象用来映射store中定义的state和actions
import { mapState, mapActions } from "vuex";
export default {
  // 定义了组件的名称，用来结合keep-alive缓存页面
  name: "goods",
  data() {
    return {
      // 调用查询接口需要的参数
      queryForm: {
        name: "",
        couponTypeId: "",
        isOnSale: "",
        pno: 1,
        psize: 10,
      },
      // 查询按钮的加载动画开关
      queryLoading: false,
      //二维码信息的表单对象
      dialogForm: {
        info: "",
      },
      dialogVisible: false,
    };
  },
  computed: {
    ...mapState("couponModel", ["list", "page", "couponTypeList"]),
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
    await this.getCouponTypeListAll();
    await this.getListForPage(this.queryForm);
  },
  // 由于本页通过keep-alive进行了缓存，缓存后原有的生命周期不执行，所以通过activated来识别何时进入本页
  async activated() {
    await this.getCouponTypeListAll();
    await this.getListForPage(this.queryForm);
  },
  methods: {
    ...mapActions("couponModel", [
      "getListForPage",
      "deleteById",
      "getCouponTypeListAll",
      "setIsOnSale",
    ]),
    // 点击查询按钮触发的⌚️
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
      await this.getListForPage(this.queryForm);
    },
    // 点击分页组件上一页下一页切换页面时触发的回调，参数就是跳到哪一页
    async handleCurrentChange(pno) {
      this.queryForm.pno = pno;
      await this.getListForPage(this.queryForm);
    },
    // 跳转到添加数据的页面
    handleAdd() {
      this.$router.push("/coupon-add");
    },
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
      this.$router.push({ path: "/coupon-edit", query: { id } });
    },
    async handleSetIsOnSale(row) {
      let message;
      let isOnSale;

      if (row.isOnSale == 1) {
        message = "正在下架当前优惠券，点击确认继续";
        isOnSale = 0;
      } else {
        message = "正在上架当前优惠券，点击确认继续";
        isOnSale = 1;
      }
      let confirm = await this.$confirm(message, "提示", {
        type: "warning",
      }).catch((err) => err);
      if (confirm == "confirm") {
        await this.setIsOnSale({
          id: row.id,
          isOnSale: isOnSale,
        });
        await this.getListForPage(this.queryForm);
      }
    },
    handleAddMultiple() {
      this.$router.push("/coupon-add-multiple");
    },
    async handlePeviewQrcode(row) {
      this.dialogForm.info = JSON.stringify(row);
      this.dialogVisible = true;
      //让后面的代码在下一次渲染时执行
      await this.$nextTick();
      //创建二维码
      qrcode.toCanvas(
        document.getElementById("canvas"),
        this.dialogForm.info,
        (res) => {
          console.log(res);
        }
      );
    },
  },
};
</script>

<style>
</style>
