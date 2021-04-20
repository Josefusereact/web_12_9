<template>
  <div>
    <el-page-header @back="handleBack" content="新增用户信息"></el-page-header>
    <el-form :model="addForm" ref="addForm" label-width="auto" :rules="rules">
      <el-form-item size="mini" label="用户名" prop="username">
        <el-input
          clearable
          placeholder="请输入"
          v-model.trim="addForm.username"
        ></el-input>
      </el-form-item>
      <el-form-item size="mini" label="昵称" prop="nickname">
        <el-input
          clearable
          placeholder="请输入"
          v-model.trim="addForm.nickname"
        ></el-input>
      </el-form-item>
      <el-form-item size="mini" label="密码" prop="password">
        <el-input
          clearable
          placeholder="请输入"
          v-model.trim="addForm.password"
        ></el-input>
      </el-form-item>
      <el-form-item size="mini" label="角色" prop="roleId">
        <el-select placeholder="请选择" v-model.trim="addForm.roleId">
          <el-option
            v-for="item in roleList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item size="mini">
        <el-button type="primary" @click="handleSubmit">提交</el-button>
      </el-form-item>
    </el-form>
    {{ addForm }}
    <br />
    <br />
    {{ roleList }}
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "user-test-add",
  data() {
    return {
      addForm: {
        username: "", //用户账号
        nickname: "", //用户昵称
        password: "", //用户密码
        roleId: "", //角色id
      },
      rules: {
        //以username为例子，每一个prop对应的key都是一个数组, 也就是说其实一组输入框可以使用多个校验规则，我们可以对数组追加多个校验对象
        username: [
          { required: true, message: "用户名不可以为空", trigger: "change" },
          //自定义校验规则,自定义校验规则就是在对象中创建一个名为validator的函数
          //他具有三个参数rule，value，callback
          //rule中包含的是当前触发校验事件的表单数据的key以及他的相关描述，不常用，可以不用太理解
          //value就是当前触发这个自定义校验的表单数据的值，也就是这里的value就是addForm.username的值
          //callback是校验完成之后的回调函数，当校验通过需要调用callback()让他执行，
          //如果校验失败则使用callback(new Error('提示内容'))。
          //callback必须被调用，如果不调用就会中断后面的表单验证事件
          //阅读完这里我们将下面的自定义验证增加到表单验证中尝试一下
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
        nickname: [],
        password: [
          { required: true, message: "密码不能为空", trigger: "change" },
          {
            validator(rule, value, callback) {
              if (value.length < 6 || value.length > 8) {
                callback(new Error("密码范围6~8"));
              } else {
                callback();
              }
            },
            trigger: "blur",
          },
        ],
        roleId: [],
      },
    };
  },
  computed: {
    ...mapState("userTestModel", ["roleList"]),
  },
  methods: {
    ...mapActions("userTestModel", ["getRoleList", "saveUser"]),
    handleBack() {
      this.$router.history.go(-1);
    },
    async handleSubmit() {
      let valid = await this.$refs.addForm.validate().catch((e) => e);
      if (valid) {
        await this.saveUser(this.addForm);
        this.$router.push("/user-test");
      } else {
        console.log("表单验证失败");
      }
    },
  },
  async created() {
    await this.getRoleList();
  },
};
</script>

<style>
</style>