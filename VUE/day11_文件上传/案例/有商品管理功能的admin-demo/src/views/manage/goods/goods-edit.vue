<template>
  <div>
    <el-page-header @back="handleBack" content="编辑商品"></el-page-header>
    <el-row>
      <el-col :span="20">
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
          <el-form-item size="mini" prop="zheKou" label="折扣">
            <el-input
              placeholder="请输入"
              clearable
              v-model.trim="addForm.zheKou"
            ></el-input>
          </el-form-item>
          <el-form-item size="mini" prop="goodsTypeId" label="商品类型">
            <el-select
              placeholder="请选择"
              clearable
              v-model.trim="addForm.goodsTypeId"
            >
              <el-option
                v-for="item in goodsTypeList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- label是左侧标题 prop是表单验证对象rules的key -->
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
              v-model="fileListPic"
              action="/file/upload"
              :before-upload="handleBeforeUpload"
              :on-error="handleError"
            >
            </p-upload>
          </el-form-item>
          <el-form-item size="mini" label="商品描述" prop="description">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="addForm.description"
            >
            </el-input>
          </el-form-item>
          <el-form-item size="mini" label="商品备注" prop="remark">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="addForm.remark"
            >
            </el-input>
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
  name: "goods-edit",
  data() {
    //将本页的this对象放到_this中这样在验证器中可是使用
    let _this = this;
    return {
      fileList: [],
      fileListPic: [],
      rules: {
        name: [
          {
            required: true,
            message: "商品名称不可以为空",
          },
        ],
        price: [
          {
            required: true,
            message: "价格不可以为空",
          },
        ],
        description: [
          {
            required: true,
            message: "商品描述不可以为空",
          },
        ],
        goodsTypeId: [
          {
            required: true,
            message: "商品类型不可以为空",
          },
        ],
        //将face的校验增加到代码中
        logo: [
          {
            required: true, //required为true时会自动增加*，并且不与自定义验证冲突
            validator(rules, value, callback) {
              //由于validator中的this对象不是本页面vue对象的实例
              //但是我们的data数据是一个函数，所以我们可以在data中把本页的this赋值给_this
              //这样我们就可以在验证器中拿到本页的fileList
              if (
                _this.fileList.length > 0 &&
                _this.fileList[0].url != undefined
              ) {
                callback();
              } else {
                callback(new Error("请上传一个头像"));
              }
            },
          },
        ],
      },
      addForm: {
        name: "",
        price: "",
        zheKou: "",
        count: 0,
        goodsTypeId: "",
        logo: [],
        pics: [],
        description: "",
        remark: "",
      },
      subLoading: false,
    };
  },
  async created() {
    let id = this.$route.query.id;
    await this.getGoodsTypeAll();
    let res = await this.getGoodsType(id);
    this.addForm = res;
    if (this.addForm.logo != undefined && this.addForm.logo != "") {
      let file = {
        //将数据中的头像放到file对象中
        url: this.addForm.logo,
        //从url中截取文件名
        name: this.addForm.logo.substring(
          this.addForm.logo.lastIndexOf("/") + 1
        ),
      };
      //将设置好的值放到fileList中
      this.fileList = [file];
    }
    if (this.addForm.pics) {
      this.addForm.pics.forEach((item) => {
        let file = {
          //将数据中的头像放到file对象中
          url: item,
          //从url中截取文件名
          name: item.substring(item.lastIndexOf("/") + 1),
        };
        this.fileListPic.push(file);
      });
    }
  },
  computed: {
    ...mapState("goodsModel", ["goodsTypeList"]),
  },
  methods: {
    ...mapActions("goodsModel", ["getGoodsTypeAll", "getGoodsType", "update"]),
    handleBack() {
      this.$router.history.go(-1);
    },
    async handleAdd() {
      let valid = await this.$refs.addForm.validate().catch((err) => err);
      if (valid) {
        this.addForm.pics.length = 0;
        this.fileListPic.forEach((item) => {
          this.addForm.pics.push(item.url);
        });
        this.addForm.logo = this.fileList[0].url;
        console.log(this.addForm);
        this.subLoading = true;
        await this.update(this.addForm);
        this.subLoading = false;
        this.handleBack();
      }
    },
    handleBeforeUpload(file) {
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
        // 但是这里要注意的是，组件内部会自动处理已经传入的fileList，在选择文件的时候就会对fileList增加一个
        // 本地数据，当我们中断上传时，组件内部会自动自行删除fileList，这样就会触发下面的beforeRemove和remove
        return Promise.reject();
      }
    },
    handleError(err) {
      this.$notify({
        title: "提示",
        message: "上传失败",
        type: "error",
      });
    },
  },
};
</script>

<style scoped="scoped" lang="scss">
</style>
