<template>
<div>
    <el-page-header @back="handleBack" title="新增会员卡"></el-page-header>
    <el-row>
        <el-col :span="6">
            <el-form :model="addForm" :rules="rules" ref="addForm" label-width="auto">
                <el-form-item size="mini" prop="username" label="会员卡名称">
                    <el-input clearable placeholder="请输入" v-model.trim="addForm.name"></el-input>
                </el-form-item>
                <el-form-item size="mini" prop="nickname" label="会员卡类型">
                    <el-select placeholder="请选择" clearable v-model.trim="addForm.cardTypeId">
                        <el-option v-for="item in cardTypeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item size="mini" label="会员卡logo" prop="logo">
                    <p-upload list-type="picture-card" :limit="1" v-model="fileList" action="/file/upload" :before-upload="handleBeforeUpload" :on-error="handleError">
                    </p-upload>
                </el-form-item>
                <el-form-item size="mini" prop="remark" label="会员卡备注">
                    <el-input clearable placeholder="请输入" show-word-limit maxlength="300" type="textarea" v-model.trim="addForm.remark"></el-input>
                </el-form-item>

                <el-form-item size="mini">
                    <el-button @click="handleAdd" type="primary" :loading="subLoading">新增</el-button>
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
                name: "",
                cardTypeId: "",
                logo: "",
                remark: "",
            },
            fileList: [],
            rules: {
                name: [{
                    required: true,
                    message: '请输入会员卡名称'
                }],
                cardTypeId: [{
                    required: true,
                    message: '请选择会员卡类型'
                }],
                logo: [{
                    required: true,
                    validator(rules, value, callback) {
                        if (_this.fileList.length > 0 && _this.fileList[0].url != undefined) {
                            callback()
                        } else {
                            callback(new Error('请上传一个logo'))
                        }

                    }
                }]
            },
        };
    },
    async created() {
        await this.getCardTypeListAll();
    },
    computed: {
        ...mapState("cardModel", ["cardTypeList"]),
    },
    methods: {
        ...mapActions("cardModel", [
            "getCardTypeListAll",
            "insert",
            "findById",
        ]),
        handleBack() {
            this.$router.history.go(-1);
        },
        async handleAdd() {
            let v = await this.$refs.addForm.validate().catch((e) => e);
            if (v) {
                this.addForm.logo = this.fileList[0].url;
                this.subLoading = true;
                await this.insert(this.addForm);
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

<style>
</style>
