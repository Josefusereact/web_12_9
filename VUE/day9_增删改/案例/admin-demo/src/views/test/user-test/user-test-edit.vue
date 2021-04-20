<template>
  <div>
    <el-page-header @back="handleBack" content="编辑用户信息"></el-page-header>
    <!-- 
			model绑定的addForm是为了关联rules中表单验证对象使用的，相当于指定了这个表单要验证的对象是哪个对象
		  ref相当于对这个表单组件进行命名，我们可以通过this.$refs.addForm来直接拿到这个表单组件。
			rules代表表单验证对象，绑定了表单验证对象之后就可以在rules中编写校验规则
			label-width="auto"是让左侧的label可以自适应排列
		
		-->
    <el-form :model="addForm" ref="addForm" :rules="rules" label-width="auto">
      <!-- 
				label代表表单的标题
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
        <el-select v-model="addForm.roleId" placeholder="请选择">
          <el-option
            v-for="item in roleList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item size="mini">
        <el-button type="primary" @click="handleSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "user-test-edit",
  data() {
    return {
      addForm: {
        username: "", //用户账号
        nickname: "", //用户昵称
        password: "", //用户密码
        roleId: "", //角色id
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
        nickname: [],
        password: [
          { required: true, message: "密码不可以为空", trigger: "change" },
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
  async created() {
    await this.getRoleList();
    let id = this.$route.query.id;
    console.log("拿到传来的id准备调接口查询", id);
    let form = await this.getUserById(id); //根据用户编号查询该条用户信息记录
    this.addForm = form; //把查询出来的对象赋值给data中的addForm这样，数据准备好了，mounted就可以渲染数据到template中
  },
  computed: {
    ...mapState("userTestModel", ["roleList"]),
  },
  methods: {
    //第一个参数是你vuex注册的那个名字，第二个参数，是你要用actions中定义的哪个方法
    //因为方法太多你要按需引入，把方法的名字用字符串的方式填上
    ...mapActions("userTestModel", ["getUserById", "getRoleList", "update"]),
    handleBack() {
      this.$router.history.go(-1);
    },
    async handleSubmit() {
      let valid = await this.$refs.addForm.validate().catch((e) => e);
      if (valid) {
        await this.update(this.addForm);
        //更新完成后再跳转
        this.$router.push("/user-test");
      }
    },
  },
};
</script>

<style></style>
