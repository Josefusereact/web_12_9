<template>
  <div>
    <el-page-header
      @back="handleBack"
      content="增加优惠券信息"
    ></el-page-header>
    <el-row>
      <el-col :span="24">
        <el-form
          :model="addForm"
          label-width="auto"
          ref="addForm"
          :rules="rules"
        >
          <el-form-item size="mini" prop="name" label="优惠券名称">
            <el-input
              placeholder="请输入"
              clearable
              v-model.trim="addForm.name"
            ></el-input>
          </el-form-item>
          <el-form-item
            size="mini"
            prop="price"
            label="优惠券价格(满减券为减免金额)"
          >
            <el-input
              placeholder="请输入"
              clearable
              v-model.number="addForm.price"
            ></el-input>
          </el-form-item>
          <el-form-item
            size="mini"
            prop="totalPrice"
            label="优惠券实际价值(满减券为门槛价格)"
          >
            <el-input
              placeholder="请输入"
              clearable
              v-model.number="addForm.totalPrice"
            ></el-input>
          </el-form-item>
          <el-form-item size="mini" prop="targetTime" label="到期时间">
            <el-date-picker
              placeholder="请选择日期"
              clearable
              v-model="addForm.targetTime"
              type="date"
              value-format="yyyy-MM-dd"
              format="yyyy-MM-dd"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item size="mini" prop="couponTypeId" label="优惠券类型">
            <el-select
              placeholder="请选择"
              clearable
              v-model.trim="addForm.couponTypeId"
            >
              <el-option
                v-for="item in couponTypeList"
                :key="'' + item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item size="mini" prop="remark" label="优惠券备注">
            <el-input
              show-word-limit
              maxlength="300"
              type="textarea"
              placeholder="请输入"
              clearable
              v-model="addForm.remark"
            ></el-input>
          </el-form-item>
          <el-form-item size="mini" prop="count" label="优惠卷数量">
            <el-input
              placeholder="请输入"
              maxlength="150"
              clearable
              v-model.trim="addForm.count"
            ></el-input>
          </el-form-item>
          <el-form-item size="mini">
            <el-button :loading="subLoading" @click="handleAdd" type="primary"
              >提交</el-button
            >
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "coupon-add-multiple",
  data() {
    let _this = this;
    return {
      rules: {
        name: [
          {
            required: true,
            message: "请输入优惠券名称",
          },
        ],
        price: [
          {
            required: true,
            validator(rules, value, callback) {
              if (value < 0) {
                callback("优惠券price不能为负数");
              } else {
                callback();
              }
            },
          },
        ],
        totalPrice: [
          {
            required: true,
            validator(rules, value, callback) {
              if (value < 0) {
                callback("优惠券的totalPrice不能为负数");
              } else {
                callback();
              }
            },
          },
        ],
        count: [
          {
            required: true,
            validator(rules, value, callback) {
              if (/^\d+|^\d+[.]\d{0,2}/.test(value)) {
                callback();
              } else {
                callback("优惠券的数量应为整数");
              }
            },
          },
        ],
        couponTypeId: [
          {
            required: true,
            message: "请选择优惠券类型",
          },
        ],
        targetTime: [
          {
            required: true,
            message: "到期时间不可以为空",
          },
        ],
      },
      addForm: {
        name: "",
        price: 0,
        couponTypeId: "",
        targetTime: "",
        remark: "",
        totalPrice: 0,
        count: "",
      },
      subLoading: false,
    };
  },
  async created() {
    await this.getCouponTypeListAll();
  },
  computed: {
    ...mapState("couponModel", ["couponTypeList"]),
  },
  methods: {
    ...mapActions("couponModel", ["getCouponTypeListAll", "insertMtp"]),
    handleBack() {
      this.$router.history.go(-1);
    },
    async handleAdd() {
      let valid = await this.$refs.addForm.validate().catch((err) => err);
      if (valid) {
        this.subLoading = true;
        await this.insertMtp(this.addForm);
        this.subLoading = false;
        this.handleBack();
      }
    },
  },
};
</script>

<style scoped="scoped" lang="scss">
</style>
