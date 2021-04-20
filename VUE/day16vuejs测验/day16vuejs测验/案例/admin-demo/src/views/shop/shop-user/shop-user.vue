<template>
<div class="page">
    <p-page-header title="商城会员管理"></p-page-header>
    <el-form inline :model="queryForm">
        <el-form-item size="mini" label="会员昵称">
            <el-input placeholder="请输入" clearable v-model="queryForm.nickname"></el-input>
        </el-form-item>
        <el-form-item size="mini" label="会员手机号">
            <el-input placeholder="请输入" clearable v-model="queryForm.phone"></el-input>
        </el-form-item>
        <el-form-item size="mini" label="是否冻结">
            <el-select v-model="queryForm.freeze" clearable placeholder="请选择冻结情况">
                <el-option label="冻结" value="1"></el-option>
                <el-option label="未冻结" value="0"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item size="mini" label="日期">
            <el-date-picker clearable v-model="dateArr" type="daterange" align="right" unlink-panels format="yyyy-MM-dd" value-format="yyyy-MM-dd" @change="handleDateChange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
            </el-date-picker>
        </el-form-item>
        <el-form-item size="mini">
            <el-button type="primary" :loading="queryLoading" @click="handleClick" icon="el-icon-search">查询</el-button>
        </el-form-item>
        <el-form-item size="mini">
            <el-button type="success" :loading="queryLoading" @click="handleAdd" icon="el-icon-plus">新增</el-button>
        </el-form-item>
    </el-form>

    <el-table border size="mini" :data="list">
        <el-table-column label="会员名称" prop="username" width="180px" align="center"></el-table-column>
        <el-table-column label="会员昵称" prop="nickname" width="180px" align="center"></el-table-column>
        <el-table-column label="头像" align="center">
            <template v-slot="{ row }">
                <el-image style="width: 100px; height: 100px; border-radius: 9px" :fit="fits[2]" :src="row.face" :preview-src-list="[row.face]">
                </el-image>
            </template>
        </el-table-column>
        <el-table-column label="会员类型" width="180px" align="center">
            <template v-slot="{ row }">
                <el-tag size="small">
                    {{ row.userTypeName }}
                </el-tag>
            </template>
        </el-table-column>
        <el-table-column label="会员状态" width="180px" align="center">
            <template v-slot="{ row }">
                <el-tag size="small" v-if="row.freeze == 0">正常</el-tag>
                <el-tag size="small" v-else>冻结</el-tag>
            </template>
        </el-table-column>
        <el-table-column label="会员生日" prop="birthday" align="center">
            <template v-slot="{ row }">
                {{ formatTime(row.birthday) }}
            </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
            <template v-slot="{ row }">
                <el-button size="mini" @click="handleSetFreeze(row)" icon="el-icon-remove" type="danger" v-if="row.freeze == 0" plain>冻结</el-button>
                <el-button size="mini" @click="handleSetFreeze(row)" icon="el-icon-remove" type="success" v-else plain>解冻</el-button>
                <el-button size="mini" icon="el-icon-edit" @click="handleEdit(row.id)" type="warning">修改</el-button>
                <el-button size="mini" @click="handleDelete(row.id)" icon="el-icon-remove" type="danger">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page.pno" :page-size="page.psize" layout="total, sizes, prev, pager, next, jumper" :total="page.totalElements">
    </el-pagination>
</div>
</template>

<script>
import {
    mapState,
    mapActions
} from "vuex";
export default {
    name: "shop-user",
    data() {
        return {
            pickerOptions: {
                shortcuts: [{
                        text: "最近一周",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit("pick", [start, end]);
                        },
                    },
                    {
                        text: "最近一个月",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit("pick", [start, end]);
                        },
                    },
                    {
                        text: "最近三个月",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit("pick", [start, end]);
                        },
                    },
                ],
            },
            dateArr: [],
            fits: ["fill", "contain", "cover", "none", "scale-down"],
            queryForm: {
                pno: "1",
                psize: "10",
                username: "",
                phone: "",
                freeze: "",
                beginTime: "",
                endTime: "",
                hasCard: "",
            },
            queryLoading: false,
        };
    },
    computed: {
        ...mapState("shopUserModel", ["list", "page"]),
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
        ...mapActions("shopUserModel", [
            "getListForPage",
            "deleteById",
            "setStateFreeze",
        ]),
        async handleSizeChange(psize) {
            this.queryForm.psize = psize;
            this.queryForm.pno = 1;
            await this.getListForPage(this.queryForm);
        },
        handleDateChange(res) {
            console.log(res);
            if (res != null) {
                this.queryForm.beginTime = res[0];
                this.queryForm.endTime = res[1];
            } else {
                this.queryForm.beginTime = "";
                this.queryForm.endTime = "";
            }
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
            this.$router.push("/shop-user-add");
        },
        handleEdit(id) {
            this.$router.push({
                path: "/shop-user-edit",
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
        async handleSetFreeze(row) {
            let freeze, message, prompt;
            if (row.freeze == 0) {
                message = "您确定要冻结此会员吗？";
                prompt = "冻结提示";
                freeze = 1;
            } else {
                message = "您确定要解冻此会员吗？";
                prompt = "解冻提示";
                freeze = 0;
            }
            let c = await this.$confirm(message, prompt, {
                type: "warning",
            }).catch((e) => e);
            if (c == "confirm") {
                await this.setStateFreeze({
                    id: row.id,
                    freeze: freeze,
                });
                await this.getListForPage(this.queryForm);
            }
        },
    },
    async created() {
        await this.getListForPage(this.queryForm);
    },
    async activated() {
        await this.getListForPage(this.queryForm);
    },
};
</script>

<style>
</style>
