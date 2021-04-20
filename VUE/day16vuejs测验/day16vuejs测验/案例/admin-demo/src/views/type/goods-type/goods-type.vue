<template>
  <div class="page">
    <p-page-header title="商品类型管理"></p-page-header>
    <el-form inline :model="queryForm">
      <el-form-item size="mini" label="商品名称">
        <el-input
          placeholder="请输入"
          clearable
          v-model="queryForm.name"
        ></el-input>
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
      <!-- 表格的列对象
				每一个el-table-column代表一列
				label表示table的thead中的th内的内容
				prop代表当前这一列引用的数据是传入的[{key:value,key:value}]哪个key的数据
			 -->
      <el-table-column label="商品名称" prop="name"></el-table-column>
      <el-table-column label="商品备注" prop="remark"></el-table-column>
      <el-table-column label="上架时间" prop="insertTime">
        <template v-slot="{ row }">
          {{ formatTime(row.insertTime) }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <!--
					这个是el-table-column
				 中通过slot插槽来实现自定义插入数据的写法，
				 通过template嵌套之后可以在v-slot="{row}"拿到每一行的数据
				 row存的就是list中每一行的json对象
				 -->
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
            @click="handleDelete(row.id)"
            icon="el-icon-remove"
            type="danger"
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
  name: "goods-type",
  data() {
    return {
      queryForm: {
        name: "",
        remark: "",
        pno: "1",
        psize: "10",
      },
      queryLoading: false,
    };
  },
  computed: {
    ...mapState("goodsTypeModel", ["list", "page"]),
    formatTime() {
      return (time) => {
        let t = new Date(time);
        return `${t.getFullYear()}-${
          t.getMonth() + 1
        }-${t.getDay()}  ${t.getHours()}:${t.getMinutes()}:${t.getSeconds()}`;
      };
    },
  },
  methods: {
    ...mapActions("goodsTypeModel", ["getListForPage", "deleteById"]),
    async handleSizeChange(psize) {
      this.queryForm.psize = psize;
      this.queryForm.pno = 1;
      await this.getListForPage(this.queryForm);
    },
    async handleCurrentChange(pno) {
      this.queryForm.pno = pno;
      await this.getListForPage(this.queryForm);
    },
    async handleClick() {
      this.queryLoading = true;
      await this.getListForPage(this.queryForm);
      this.queryLoading = false;
    },
    handleAdd() {
      this.$router.push("/goods-type-add");
    },
    handleEdit(id) {
      this.$router.push({ path: "/goods-type-edit", query: { id } });
    },
    async handleDelete(id) {
      let c = await this.$confirm("确认删除该商品吗？", "删除提示", {
        type: "warning",
      }).catch((e) => e);
      if (c == "confirm") {
        await this.deleteById(id);
        await this.getListForPage(this.queryForm);
      }
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