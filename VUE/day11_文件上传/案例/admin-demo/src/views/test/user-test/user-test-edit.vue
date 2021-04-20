<!-- 将页面改造成如下效果并阅读注释学习form的新属性 -->
<template>
  <div>
    <el-page-header @back="handleBack" content="修改用户信息"></el-page-header>
    <!-- 
			model绑定的addForm是为了关联rules中表单验证对象使用的，相当于指定了这个表单要验证的对象是哪个对象
		  ref相当于对这个表单组件进行命名，我们可以通过this.$refs.addForm来直接拿到这个表单组件。
			rules代表表单验证对象，绑定了表单验证对象之后就可以在rules中编写校验规则
			label-width="auto"是让左侧的label可以自适应排列
		
		-->
    <!-- {{roleList}} -->
    <el-form :model="addForm" ref="addForm" :rules="rules" label-width="auto">
      <!-- 
				label代表表单的标题
				size不多做解释了
				prop="username"代表用户账号的addForm.username这个值在rules里对应的key也是username，结合rules中定义的key理解
					
			-->
      <el-form-item label="用户账号" size="mini" prop="username">
        <!-- v-model绑定了addForm.username并且通过外层嵌套的prop关联到了rules中的username  v-model.trim代表输入的内容前后不允许输入空格-->
        <el-input
          clearable
          placeholder="请输入"
          v-model.trim="addForm.username"
        ></el-input>
      </el-form-item>
      <el-form-item label="用户昵称" size="mini" prop="nickname">
        <el-input
          clearable
          placeholder="请输入"
          v-model.trim="addForm.nickname"
        ></el-input>
      </el-form-item>
      <el-form-item label="用户密码" size="mini" prop="password">
        <el-input
          clearable
          placeholder="请输入"
          v-model.trim="addForm.password"
        ></el-input>
      </el-form-item>
      <el-form-item label="角色" size="mini" prop="roleId">
        <el-select clearable v-model="addForm.roleId">
          <!-- 循环roleList将角色的id设置到value中，将角色的名称设置到label中展示到页面 -->
          <el-option
            v-for="item in roleList"
            :key="item.id"
            :value="item.id"
            :label="item.name"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item size="mini" label="头像" prop="face">
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
      <el-form-item size="mini">
        <el-button type="primary" :loading="loading" @click="handleSubmit"
          >提交</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "user-test-edit",
  data() {
    let _this = this;
    return {
      loading: false,
      addForm: {
        username: "", //用户账号
        nickname: "", //用户昵称
        password: "", //用户密码
        roleId: "", //角色id,
        face: "",
      },
      //表单校验对象,表单校验对象rules绑定在form之后会根据每个el-form-item上绑定的prop建立关联关系，如第一行的prop为username，所以这里的username就是用来校验用户账号的
      rules: {
        //校验对象的结构是一个数组每个元素有固定写法
        username: [
          //这里是校验非空对象的基本写法，required代表是否必填，message是验证不通过时的提示内容，trigger代表通过什么事件触发校验事件（支持input可用的所有事件）
          { required: true, message: "用户名不可以为空", trigger: "change" },
          {
            validator: function (rule, value, callback) {
              //下面我们来对表单增加一个校验，要求用户账号必须满足6位以上包含六位
              if (value.length < 6) {
                //不满足条件，返回错误信息
                callback(new Error("用户账号不能少于6位"));
              } else {
                //满足条件调用callback让验证通过
                callback();
              }
            },
            trigger: "change",
          },
        ],
        nickname: [
          { required: true, message: "昵称不可以为空", trigger: "change" },
        ],
        password: [
          { required: true, message: "密码不可以为空", trigger: "change" },
          {
            validator: function (rule, value, callback) {
              //下面我们来对表单增加一个校验，要求用户账号必须满足6位以上包含六位
              if (value.length < 6 || value.length > 8) {
                //不满足条件，返回错误信息
                callback(new Error("密码的长度只能在6-8位"));
              } else {
                //满足条件调用callback让验证通过
                callback();
              }
            },
            trigger: "change",
          },
        ],
        roleId: [
          { required: true, message: "角色不可以为空", trigger: "change" },
        ],
        face: [
          {
            required: true,
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
      fileList: [],
    };
  },
  computed: {
    ...mapState("userTestModel", ["roleList"]),
  },
  async created() {
    await this.getRoleList();
    let id = this.$route.query.id;
    console.log(id);
    let addForm = await this.findById(id);
    console.log(addForm);
    this.addForm = addForm;
    //当头像已经上传了就设置到fileList中
    if (this.addForm.face != undefined && this.addForm.face != "") {
      let file = {
        //将数据中的头像放到file对象中
        url: this.addForm.face,
        //从url中截取文件名
        name: this.addForm.face.substring(
          this.addForm.face.lastIndexOf("/") + 1
        ),
      };
      //将设置好的值放到fileList中
      this.fileList = [file];
    }
  },
  methods: {
    ...mapActions("userTestModel", ["getRoleList", "update", "findById"]),
    handleBack() {
      this.$router.history.go(-1);
    },
    async handleSubmit() {
      //在提交逻辑执行之前先调用手动表单验证
      let valid = await this.$refs.addForm.validate().catch((err) => err);
      //验证通过后在执行提交逻辑
      if (valid) {
        this.addForm.face = this.fileList[0].url;
        //让按钮转圈
        this.loading = true;
        //调用update函数并将参数addForm传入
        await this.update(this.addForm);
        //取消动画
        this.loading = false;
        //回到查询页面
        this.$router.push("/user-test");
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

<style>
</style>

