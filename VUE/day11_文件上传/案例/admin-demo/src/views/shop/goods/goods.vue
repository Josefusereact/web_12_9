<template>
  <div>
    <el-form :inline="true" :model="queryForm" class="demo-form-inline">
      <el-form-item label="商品名称">
        <el-input
          v-model="queryForm.name"
          placeholder="请输入商品名称"
          size="mini"
        ></el-input>
      </el-form-item>
      <el-form-item label="商品类型">
        <el-select
          v-model="queryForm.goodsTypeId"
          placeholder="选择商品类型"
          size="mini"
        >
          <el-option label="请选择" value=""></el-option>
          <el-option
            :label="goodsType.name"
            :value="goodsType.id"
            v-for="goodsType in goodsTypeList"
            :key="goodsType.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品状态">
        <el-select
          v-model="queryForm.isOnSale"
          placeholder="选择是否上架"
          size="mini"
        >
          <el-option label="请选择" value=""></el-option>
          <el-option label="上架" value="1"></el-option>
          <el-option label="下架" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch" size="mini"
          >查询</el-button
        >
        <el-button type="danger" @click="handleClickAdd" size="mini"
          >添加商品</el-button
        >
      </el-form-item>
    </el-form>

    <el-table :data="list" border style="width: 100%">
      <el-table-column
        fixed
        prop="name"
        label="商品名称"
        width="150"
        align="center"
      >
      </el-table-column>
      <el-table-column prop="price" label="商品单价" width="120" align="center">
      </el-table-column>
      <el-table-column prop="logo" label="商品logo" width="125" align="center">
        <template v-slot="{ row }">
          <el-image
            style="width: 100px; height: 100px; border-radius: 9px"
            :src="row.logo"
            fit="fit"
            :preview-src-list="[row.logo]"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column
        prop="isOnSale"
        label="商品状态"
        width="120"
        align="center"
      >
        <template v-slot="{ row }">
          <el-tag v-if="row.isOnSale == 1">上架</el-tag>
          <el-tag type="info" v-else>下架</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="goodsTypeName"
        label="商品类型"
        width="300"
        align="center"
      >
      </el-table-column>
      <el-table-column prop="count" label="库存" width="120"> </el-table-column>
      <el-table-column prop="remark" label="备注" width="120">
        <template v-slot="{ row }">
          {{ remarkShortShow(row.remark) }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="180" align="center">
        <template v-slot="{ row }">
          <el-button
            v-if="row.isOnSale == 1"
            type="text"
            size="small"
            @click="upOrDown(row.id, 0)"
            >下架</el-button
          >
          <el-button v-else type="text" @click="upOrDown(row.id, 1)"
            >上架</el-button
          >

          <el-button type="text" @click="handleEdit(row.id)">编辑</el-button>
          <el-button @click="handleDelete(row.id)" type="text" size="small"
            >删除</el-button
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
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      //查询条件表单的数据
      queryForm: {
        pno: 1,
        psize: 10,
        name: "",
        isOnSale: "",
        goodsTypeId: "",
      },
    };
  },
  computed: {
    //在计算属性中扩展数据
    ...mapState("goodsModel", ["list", "page", "goodsTypeList"]),
    remarkShortShow() {
      return (remark) => {
        return remark.length <= 6 ? remark : remark.substring(0, 6) + "...";
      };
    },
  },
  methods: {
    //在methods中扩展函数
    ...mapActions("goodsModel", [
      "getListForPage",
      "getGoodsTypeList",
      "deleteGoods",
      "isOnSale",
    ]),
    async handleSearch() {
      await this.getListForPage(this.queryForm);
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
    handleClickAdd() {
      this.$router.push("/goods-add");
    },
    async upOrDown(id, isOnSale) {
      //第二个参数是1，或者是0
      let isConfirm = await this.$confirm(
        "你想" + (isOnSale == 1 ? "上架" : "下架") + "吗",
        {
          type: "warning",
        }
      );
      if (isConfirm == "confirm") {
        await this.isOnSale({ id, isOnSale });
        await this.getListForPage(this.queryForm);
      }
    },
    handleEdit(id) {
      this.$router.push({ path: "/goods-edit", query: { id } });
    },
    async handleDelete(id) {
      let isConfirm = await this.$confirm("你删不删！", {
        type: "warning",
      });
      if (isConfirm == "confirm") {
        await this.deleteGoods(id);
        await this.getListForPage(this.queryForm);
      }
    },
  },
  async created() {
    await this.getListForPage(this.queryForm);
    //商品类型的数据也在加载数据的时候准备出来
    await this.getGoodsTypeList();
  },
};
</script>

<style>
</style>