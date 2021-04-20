<template>
  <div>
    <el-page-header @back="handleBack" title="编辑卡类型"></el-page-header>
    <el-row>
      <el-col :span="6">
        <el-form
          :model="addForm"
          :rules="rules"
          ref="addForm"
          label-width="auto"
        >
          <el-form-item size="mini" prop="name" label="卡类型名称">
            <el-input
              clearable
              placeholder="请输入"
              v-model.trim="addForm.name"
            ></el-input>
          </el-form-item>
          <el-form-item size="mini" prop="remark" label="卡类型备注">
            <el-input
              clearable
              placeholder="请输入"
              v-model.trim="addForm.remark"
              type="textarea"
            ></el-input>
          </el-form-item>
          <el-form-item size="mini" prop="remark" label="卡名称缩写">
            <el-input
              clearable
              placeholder="请输入"
              v-model.trim="addForm.bm"
              type="textarea"
            ></el-input>
          </el-form-item>

          <el-form-item size="mini">
            <el-button @click="handleAdd" type="primary" :loading="subLoading"
              >修改</el-button
            >
            <el-button @click="queryEdit" type="primary" :loading="subLoading"
              >获取</el-button
            >
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "card-type-edit",
  data() {
    return {
      subLoading: false,
      addForm: {
        name: "",
        remark: "",
      },
      rules: {
        name: [
          {
            required: true,
            message: "卡名称不能为空",
          },
        ],
        remark: [
          {
            required: true,
            message: "卡备注不能为空",
          },
        ],
        bm: [
          {
            required: true,
            message: "卡备注不能为空",
          },
        ],
      },
    };
  },
  async created() {
    let id = this.$route.query.id;
    this.addForm = await this.findById(id);
  },
  methods: {
    ...mapActions("cardTypeModel", ["update", "findById"]),
    queryEdit() {
      console.log(this.$route.query.id);
    },
    handleBack() {
      this.$router.history.go(-1);
    },
    async handleAdd() {
      let v = await this.$refs.addForm.validate().catch((e) => e);
      if (v) {
        this.subLoading = true;
        await this.update(this.addForm);
        this.subLoading = false;
        this.handleBack();
      }
    },
  },
};
</script>

<style>
</style>