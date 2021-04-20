<template>
<div>
    <el-page-header @back="handleBack" title="编辑商城会员"></el-page-header>
    <el-row>
        <el-col :span="6">
            <el-form :model="addForm" :rules="rules" ref="addForm" label-width="auto">
                <el-form-item size="mini" prop="username" label="会员名称">
                    <el-input clearable placeholder="请输入" v-model.trim="addForm.username"></el-input>
                </el-form-item>
                <el-form-item size="mini" prop="nickname" label="会员昵称">
                    <el-input clearable placeholder="请输入" v-model.trim="addForm.nickname" type="textarea"></el-input>
                </el-form-item>
                <el-form-item size="mini" prop="password" label="会员密码">
                    <el-input clearable placeholder="请输入" v-model.trim="addForm.password"></el-input>
                </el-form-item>
                <el-form-item size="mini" prop="phone" label="会员手机号">
                    <el-input clearable placeholder="请输入" v-model.trim="addForm.phone"></el-input>
                </el-form-item>
                <el-form-item size="mini" prop="sex" label="会员性别">
                    <el-select v-model.trim="addForm.sex" clearable placeholder="请选择性别">
                        <el-option label="男" value="1"></el-option>
                        <el-option label="女" value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item size="mini" prop="birthday" label="会员生日">
                    <el-date-picker clearable v-model="addForm.birthday" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item size="mini" label="头像" prop="face">
                    <p-upload list-type="picture-card" :limit="1" v-model="fileList" action="/file/upload" :before-upload="handleBeforeUpload" :on-error="handleError">
                    </p-upload>
                </el-form-item>

                <el-form-item size="mini">
                    <el-button @click="handleAdd" type="primary" :loading="subLoading">修改</el-button>
                    <el-button @click="queryEdit" type="primary" :loading="subLoading">获取</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</div>
</template>

<script>
import {
    mapState,
    mapActions
} from "vuex";
export default {
    name: "shop-user-edit",
    data() {
        let _this = this;
        return {
            date: "",
            subLoading: false,
            addForm: {
                username: "",
                password: "",
                nickname: "",
                birthday: "",
                phone: "",
                sex: "",
                face: "",
            },
            fileList: [],
            rules: {
                username: [{
                    required: true,
                    message: "会员名称不能为空",
                }, ],
                nickname: [{
                    required: true,
                    message: "会员昵称不能为空",
                }, ],
                phone: [{
                    required: true,
                    message: "会员手机号不能为空",
                }, ],
                phone: [{
                    required: true,
                    message: "会员手机号不能为空",
                }, ],
                phone: [{
                    required: true,
                    message: "会员手机号不能为空",
                }, ],
                sex: [{
                    required: true,
                    message: "会员性别不能为空",
                }, ],
                birthday: [{
                    required: true,
                    message: "会员生日不能为空",
                }, ],
                password: [{
                    required: true,
                    message: "会员密码不能为空",
                }, ],
                face: [{
                    required: true,
                    validator(rules, value, callback) {
                        if (
                            _this.fileList.length > 0 &&
                            _this.fileList[0].url != undefined
                        ) {
                            callback();
                        } else {
                            callback(new Error("请至少上传一张会员头像"));
                        }
                    },
                }, ],
            },
        };
    },
    components: {
        ...mapState("shopUserModel", ["userTypeList"]),
    },
    async created() {
        let id = this.$route.query.id;
        await this.getUserTypeListAll();
        this.addForm = await this.findById(id);
        let d = new Date(Number(this.addForm.birthday));
        this.addForm.birthday = `${d.getFullYear()}-${
      d.getMonth() + 1
    }-${d.getDate()}`;
        if (this.addForm.face != undefined && this.addForm.face != "") {
            let file = {
                url: this.addForm.face,
                name: this.addForm.face.substring(
                    this.addForm.face.lastIndexOf("/") + 1
                ),
            };
            this.fileList = [file];
        }
    },
    methods: {
        ...mapActions("shopUserModel", [
            "getUserTypeListAll",
            "update",
            "findById",
        ]),
        queryEdit() {
            console.log(this.$route.query.id);
        },
        handleBack() {
            this.$router.history.go(-1);
        },
        async handleAdd() {
            let v = await this.$refs.addForm.validate().catch((e) => e);
            if (v) {
                this.addForm.face = this.fileList[0].url;
                this.subLoading = true;
                await this.update(this.addForm);
                this.subLoading = false;
                this.handleBack();
            }
        },
        handleBeforeUpload(file) {
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
