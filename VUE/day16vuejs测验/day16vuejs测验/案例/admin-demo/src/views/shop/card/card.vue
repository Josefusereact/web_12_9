<template>
<div class="page">
    <p-page-header title="会员卡管理"></p-page-header>
    <el-form inline :model="queryForm">
        <el-form-item size="mini" label="会员卡名称">
            <el-input placeholder="请输入" clearable v-model="queryForm.name"></el-input>
        </el-form-item>
        <el-form-item size="mini" label="会员卡编号">
            <el-input placeholder="请输入" clearable v-model="queryForm.num"></el-input>
        </el-form-item>
        <el-form-item size="mini" label="会员卡类型">
            <el-select clearable placeholder="请选择" size="mini" v-model="queryForm.cardTypeId">
                <el-option v-for="opt in cardTypeList" :key="opt.id" :label="opt.name" :value="opt.id"></el-option>
            </el-select>
        </el-form-item>

        <el-form-item size="mini">
            <el-button type="primary" :loading="queryLoading" @click="handleClick" icon="el-icon-search">查询</el-button>
        </el-form-item>
        <el-form-item size="mini">
            <el-button type="success" :loading="queryLoading" @click="handleAdd" icon="el-icon-plus">新增</el-button>
        </el-form-item>
        <el-form-item size="mini">
            <el-button type="success" :loading="queryLoading" @click="handleAddMultiple" icon="el-icon-plus">批量新增</el-button>
        </el-form-item>
    </el-form>

    <el-table border size="mini" :data="list">
        <el-table-column label="会员卡名称" prop="name" width="180px" align="center"></el-table-column>
        <el-table-column label="会员卡编号" prop="num" width="180px" align="center"></el-table-column>
        <el-table-column label="会员卡logo" align="center">
            <template v-slot="{ row }">
            {{row.logo}}
                <el-image style="width: 100px; height: 100px; border-radius: 9px" :fit="fits[2]" :src="row.logo" :preview-src-list="[row.logo]">
                </el-image>
            </template>
        </el-table-column>
        <el-table-column label="会员卡类型" prop="card" width="180px" align="center">
            <template v-slot="{ row }">
                <el-tag size="small">{{ row.cardTypeName }}</el-tag>
            </template>
        </el-table-column>

        <el-table-column label="会员卡状态" width="180px" align="center">
            <template v-slot="{ row }">
                <el-tag size="small" v-if="row.status == 0">未发卡</el-tag>
                <el-tag size="small" v-else type="danger">已发卡</el-tag>
            </template>
        </el-table-column>
        <el-table-column label="会员卡备注" prop="remark" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
            <template v-slot="{ row }">
                <el-button size="mini" @click="openCard(row)" icon="el-icon-remove" type="success" v-if="row.status == 0" plain>开卡</el-button>
                <el-button size="mini" @click="backCard(row)" icon="el-icon-remove" type="danger" v-else plain>退卡</el-button>
                <el-button size="mini" icon="el-icon-edit" @click="handleEdit(row.id)" type="warning">修改</el-button>
                <el-button size="mini" @click="handleDelete(row.id)" icon="el-icon-remove" type="danger">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page.pno" :page-size="page.psize" layout="total, sizes, prev, pager, next, jumper" :total="page.totalElements">
    </el-pagination>

    <el-dialog title="绑卡" :visible.sync="dialogVisible" width="600px">
        <el-form ref="dialogForm" :rules="rules" :model="dialogForm">
            <el-form-item label="卡号">
                <el-tag size="mini">
                    {{ dialogForm.num }}
                </el-tag>
            </el-form-item>
            <el-form-item prop="userId">
                <user-table ref="userTable" v-model="dialogForm.userId"></user-table>
            </el-form-item>
        </el-form>
        <template slot="footer">
            <el-button type="primary" size="mini" @click="handleBind">绑定</el-button>
            <el-button type="defautl" size="mini" @click="handleCancel">取消</el-button>
        </template>
    </el-dialog>
</div>
</template>

<script>
import {
    mapState,
    mapActions
} from "vuex";
import UserTable from "./user-table.vue";
export default {
    name: "shop-user",
    components: {
        UserTable,
    },
    data() {
        return {
            fits: ["fill", "contain", "cover", "none", "scale-down"],
            queryForm: {
                pno: "1",
                psize: "10",
                name: "",
                num: "",
                cardTypeId: "",
            },
            queryLoading: false,
            dialogVisible: false,
            dialogForm: {
                num: "",
                userId: "",
            },
            rules: {
                userId: [{
                    required: true,
                    message: "选择要绑卡的用户",
                    trigger: "change",
                }, ],
            },
        };
    },
    computed: {
        ...mapState("cardModel", ["list", "page", "cardTypeList"]),
        formatTime() {
            return (time) => {
                let t = new Date(Number(time));
                return `${t.getFullYear()}-${
          t.getMonth() + 1
        }-${t.getDay()}  ${t.getHours()}:${t.getMinutes()}:${t.getSeconds()}`;
            };
        },
    },
    methods: {
        ...mapActions("cardModel", [
            "getListForPage",
            "deleteById",
            "getCardTypeListAll",
            "open",
            "back",
        ]),
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
            this.queryForm.pno = 1;
            await this.getListForPage(this.queryForm);
            this.queryLoading = false;
        },
        handleAdd() {
            this.$router.push("/card-add");
        },
        handleAddMultiple() {
            this.$router.push("/card-add-multiple");
        },
        handleEdit(id) {
            this.$router.push({
                path: "/card-edit",
                query: {
                    id,
                },
            });
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
        async openCard(row) {
            this.dialogForm.num = row.num;
            this.dialogVisible = true;
            await this.$nextTick();
            this.$refs.userTable.handleClick();
        },
        async backCard(row) {
            let c = await this.$confirm("确定要退卡号为" + row.num, "退卡提示", {
                confirmButtonText: "确认",
                cancelButtonText: "取消",
                type: "warning",
            }).catch((e) => e);
            if (c == "confirm") {
                await this.back({
                    num: row.num
                });
                await this.getListForPage(this.queryForm);
            }
        },
        async handleBind() {
            let v = await this.$refs.dialogForm.validate().catch((e) => e);
            if (v) {
                await this.open(this.dialogForm);
                await this.getListForPage(this.queryForm);
                this.dialogVisible = false;
            }
        },
        handleCancel() {
            this.dialogVisible = false;
        },
    },
    async created() {
        await this.getCardTypeListAll();
        await this.getListForPage(this.queryForm);
    },
    async activated() {
        await this.getCardTypeListAll();
        await this.getListForPage(this.queryForm);
    },
};
</script>

<style>
</style>
