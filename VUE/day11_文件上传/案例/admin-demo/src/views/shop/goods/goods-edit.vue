<template>
  <div>
    <el-page-header @back="handleBack" content="编辑商品信息"></el-page-header>
    <el-row>
      <el-col :span="24">
        <el-form
          :model="addForm"
          label-width="auto"
          ref="addForm"
          :rules="rules"
        >
          <el-form-item size="mini" prop="name" label="商品名称">
            <el-input
              placeholder="请输入"
              clearable
              v-model.trim="addForm.name"
            ></el-input>
          </el-form-item>
          <el-form-item size="mini" prop="price" label="商品价格">
            <el-input
              placeholder="请输入"
              clearable
              v-model.trim="addForm.price"
            ></el-input>
          </el-form-item>
          <el-form-item size="mini" prop="count" label="商品库存">
            <el-input
              placeholder="请输入"
              clearable
              v-model.trim="addForm.count"
            ></el-input>
          </el-form-item>
          <el-form-item size="mini" prop="zheKou" label="商品折扣">
            <el-input
              placeholder="请输入"
              clearable
              v-model.trim="addForm.zheKou"
            ></el-input>
          </el-form-item>
          <el-form-item label="商品类型" prop="goodsTypeId">
            <el-select
              v-model="addForm.goodsTypeId"
              placeholder="选择商品类型"
              size="mini"
            >
              <el-option label="请选择" value=""></el-option>
              <el-option
                v-for="goodsType in goodsTypeList"
                :label="goodsType.name"
                :value="goodsType.id"
                :key="goodsType.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item size="mini" label="商品logo" prop="logo">
            <p-upload
              list-type="picture-card"
              :limit="1"
              v-model="fileList"
              action="/file/upload"
              :before-upload="handleBeforeUpload"
              :on-error="handleError"
            >
            </p-upload>
          </el-form-item>
          <el-form-item size="mini" label="商品图片" prop="pics">
            <p-upload
              list-type="picture-card"
              :limit="3"
              v-model="fileList1"
              action="/file/upload"
              :before-upload="handleBeforeUpload"
              :on-error="handleError"
            >
            </p-upload>
          </el-form-item>
          <el-form-item size="mini" label="描述" prop="description">
            <el-input v-model="addForm.description" type="textarea"></el-input>
          </el-form-item>
          <el-form-item size="mini" label="备注" prop="remark">
            <el-input v-model="addForm.remark" type="textarea"></el-input>
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
import { mapState, mapActions } from "vuex";
export default {
  data() {
    let that = this;
    return {
      addForm: {
        // id: 1,
        name: "",
        price: "",
        zheKou: "",
        goodsTypeId: "",
        count: "",
        isOnSale: "",
        logo: "",
        pics: "",
        description: "",
        remark: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入商品名称", trigger: "change" },
        ],
        price: [
          { required: true, message: "请输入商品价格", trigger: "change" },
          {
            validator: function (rules, value, callback) {
              // 34.56   89.00,    7
              if (/(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/.test(value)) {
                callback();
              } else {
                callback(new Error("您输入的不是数字，如果是小数请保留两位"));
              }
            },
          },
        ],
        zheKou: [
          { required: true, message: "请输入商品折扣", trigger: "change" },
          {
            validator: function (rules, value, callback) {
              if (/(^[1-9]$|^10$)/.test(value)) {
                callback();
              } else {
                callback(new Error("请输入1-10之间的数字"));
              }
            },
          },
        ],
        count: [
          { required: true, message: "请输入商品库存", trigger: "change" },
        ],
        goodsTypeId: [
          { required: true, message: "请输入商品类型", trigger: "change" },
        ],
        description: [
          { required: true, message: "请输入商品描述", trigger: "change" },
        ],
        logo: [
          {
            validator(rules, value, callback) {
              //注意this指向, fileList数组放的是图片logo
              if (
                that.fileList.length > 0 &&
                that.fileList[0].url != undefined
              ) {
                callback();
              } else {
                callback(new Error("请上传一个商品logo"));
              }
            },
          },
        ],
        pics: [
          {
            validator(rules, value, callback) {
              //注意this指向，fileList数组放的是图片
              if (
                that.fileList1.length > 0 &&
                that.fileList1[0].url != undefined
              ) {
                callback();
              } else {
                callback(new Error("青最少上传一张商品图片"));
              }
            },
          },
        ],
      },
      subLoading: false,
      fileList: [], //上传商品图片logo的数组，不是logo
      fileList1: [], //上传商品图片的数组
    };
  },
  computed: {
    ...mapState("goodsModel", ["goodsTypeList"]),
  },
  methods: {
    ...mapActions("goodsModel", [
      "getGoodsTypeList",
      "updateGoods",
      "loadGoodsById",
    ]),
    handleBack() {
      this.$router.history.go(-1);
    },
    async handleAdd() {
      //点击提交按钮的时候验证表单
      let isValid = await this.$refs.addForm.validate().catch((e) => e);
      console.log(isValid);
      if (isValid) {
        this.addForm.logo = this.fileList[0].url;
        //因为pics是数组，需要给他一个新的数组，vue才能监视他的变化
        this.addForm.pics = this.fileList1.map((item) => {
          return item.url;
        });
        await this.updateGoods(this.addForm);
        this.handleBack();
      }
    },
    handleBeforeUpload(file) {
      //+++++++++++
      // 判断当前的文件类型如果不是这些类型的文件就弹出错误提示并中断上传操作
      if (
        !(
          file.name.indexOf("png") != -1 ||
          file.name.indexOf("jpg") != -1 ||
          file.name.indexOf("jpeg") != -1 ||
          file.name.indexOf("gif") != -1
        )
      ) {
        this.$notify({
          title: "提示",
          message: "只能上传图片格式的文件",
          type: "error",
        });
        // 通过return Promise.reject()可以实现中断上传操作，不在触发上传的函数
        // 注意组件内部会自动处理已经传入的fileList，在选择文件的时候就会对fileList增加一个
        // 本地数据，当我们中断上传时，组件内部会自动自行删除fileList，这样就会触发下面的beforeRemove和remove
        return Promise.reject();
      }
    },
    handleError(err) {
      //+++++++++++++++
      this.$notify({
        title: "提示",
        message: "上传失败",
        type: "error",
      });
    },
  },
  async created() {
    await this.getGoodsTypeList();
    let id = this.$route.query.id;
    this.addForm = await this.loadGoodsById(id);
    if (this.addForm.logo) {
      let obj = {
        name: this.addForm.logo.substring(
          this.addForm.logo.lastIndexOf("/") + 1
        ),
        url: this.addForm.logo,
      };
      this.fileList = [obj];
    }
    if (this.addForm.pics.length != 0) {
      this.fileList1 = this.addForm.pics.map((item) => {
        return {
          name: item.substring(item.lastIndexOf("/") + 1),
          url: item,
        };
      });
    }
  },
};
</script>

<style>
</style>