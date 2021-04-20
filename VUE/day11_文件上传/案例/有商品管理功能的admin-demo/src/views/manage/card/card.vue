<template>
  <div class="page">
		<p-page-header title="会员卡管理"></p-page-header>
        <el-form inline :model="queryForm">
			<el-form-item size="mini" label="会员卡名称">
				<el-input placeholder="请输入" clearable v-model="queryForm.name"></el-input>
			</el-form-item>
            <el-form-item size="mini" label="会员卡类型">
				<el-select v-model="queryForm.cardTypeId" placeholder="请选择">
                    <el-option
                    v-for="item in cardTypeList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                    </el-option>
                </el-select>
			</el-form-item>
			<el-form-item size="mini">
				<el-button type="primary" :loading="queryLoading" @click="handleClick" icon="el-icon-search">查询</el-button>
			</el-form-item>
			<el-form-item size="mini">
				<el-button type="success" :loading="queryLoading" @click="handleAdd" icon="el-icon-plus">新增</el-button>
			</el-form-item>
      <el-form-item size="mini">
        <el-button type="success" plain  @click="handleAddMultiple" icon="el-icon-plus">批量建卡</el-button>
      </el-form-item>
		</el-form>
        <el-table
			border
			size="mini"
			:data="list">
			<!-- 表格的列对象
				每一个el-table-column代表一列
				label表示table的thead中的th内的内容
				prop代表当前这一列引用的数据是传入的[{key:value,key:value}]哪个key的数据
			 -->
			<el-table-column label="会员卡名称" prop="name"></el-table-column>
			<el-table-column label="会员卡编号" prop="num"></el-table-column>
			<el-table-column label="商品logo" >
				<template v-slot="{row}">
				<el-image style="width: 100px;height: 100px;border-radius:9px" 
						fit="cover" 
						:src="row.logo"
						:preview-src-list="[row.logo]"
						>
					</el-image>
				</template>
				</el-table-column>
			<el-table-column label="会员卡状态" prop="status">
				<template v-slot="{row}">
                    <el-tag v-if="row.status==1" type="success">已发卡</el-tag>
                    <el-tag v-else type="danger">未使用</el-tag>
				</template>
			</el-table-column>
            <el-table-column label="会员卡类型" prop="cardTypeName"></el-table-column>
            <el-table-column label="会员卡备注" prop="remark">
				<template v-slot="{row}">
					<el-popover
						placement="top-start"
						title="备注"
						trigger="hover"
						:content="String(row.remark)">
						<el-button slot="reference">详情</el-button>
					</el-popover>
				</template>
			</el-table-column>
			<el-table-column label="操作" width="300">
				<!--
					这个是el-table-column
				 中通过slot插槽来实现自定义插入数据的写法，
				 通过template嵌套之后可以在v-slot="{row}"拿到每一行的数据
				 row存的就是list中每一行的json对象
				 -->
				<template v-slot="{row}">
					<el-button size="mini" icon="el-icon-edit" @click="handleEdit(row.id)" type="warning">修改</el-button>
					<el-button size="mini" @click="handleRemove(row.id)" icon="el-icon-remove" type="danger">删除</el-button>
					
					<el-button size="mini" v-if="Number(row.status) == 0" icon="el-icon-edit" @click="handleOpenCard(row)" plain type="warning">开卡</el-button>
					<el-button size="mini" v-else icon="el-icon-edit" @click="handleBackCard(row)" plain type="danger">退卡</el-button>
				</template>
			</el-table-column>
		</el-table>
		
		<el-pagination
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange"
			:current-page="page.pno"
			:page-size="page.psize"
			layout="total, sizes, prev, pager, next, jumper"
			:total="page.totalElements">
		</el-pagination>
		<el-dialog
				  title="绑卡"
				  :visible.sync="dialogVisible"
				  width="600px">
		  <el-form ref="dialogForm" :rules="rules" :model="dialogForm">
		    <el-form-item label="卡号">
					<el-tag size="mini">
						{{dialogForm.num}}
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
import UserTable from './user-table.vue'
import {mapState,mapActions} from 'vuex'
export default {
	components:{
		UserTable
	},
    data(){
        return{
            queryForm:{
                name:'',
                cardTypeId:''
            },
			dialogForm:{num:'',userId:''},
            queryLoading:false,
			dialogVisible:false,
			rules:{
					userId:[
						{required:true,message:'请选择要绑卡的用户',trigger:'change'}
					]
				}
        }
    },
    computed:{
        ...mapState('cardModel',['list','page','cardTypeList']),
    },
    methods:{
        ...mapActions('cardModel',['getListForPage',"delete","getCardTypeList","open","back"]),
        	// 点击查询按钮触发的⌚️
			async handleClick(){
				this.queryLoading = true;
				this.queryForm.pno = 1;
				// 这里调用的getListForPage就是在user-model.js中的actions里定义的方法
				//通过mapActions绑定后就能直接调用，之所以这样做是为了把复杂的接口访问过程，拆分到页面外，这样
				//可以让页面内部的逻辑更加清晰并且方便维护
				await this.getListForPage(this.queryForm)
				this.queryLoading = false;
			},
			// 点击分页组件的每页多少条切换时会触发这个回调，参数就是切换的条数
			async handleSizeChange(psize){
				this.queryForm.psize = psize
				this.queryForm.pno = 1;
				// 数据发生变化之后我们重新的调用查询方法
				await this.getListForPage(this.queryForm)
			},
			// 点击分页组件上一页下一页切换页面时触发的回调，参数就是跳到哪一页
			async handleCurrentChange(pno){
				this.queryForm.pno = pno
				// 改变请求的参数重新查询当页的数据
				await this.getListForPage(this.queryForm)
			},
			// 跳转到添加数据的页面
			handleAdd(){
				this.$router.push('/card-add')
			},
			async handleRemove(id){
				// 通过同步化写法调用$confirm方法
				let confirm =await  this.$confirm('正在删除商品','提示',{
					type:'warning'
				}).catch(err => err)
				if(confirm == 'confirm'){
					// 如果点击确定
					//首先调用删除业务
					await this.delete(id)
					//删除业务调用完毕之后我们重新调用一次查询业务，来实现数据的更新
					await this.getListForPage(this.queryForm)
				}
			},
			handleEdit(id){
				this.$router.push({path:'/card-edit', query:{id}});
			},
			handleAddMultiple(){
				this.$router.push("/card-add-multiple");
			},
			async handleBind(){
				//表单验证验证user-table中是否选择了用户，会得到用户的id
				let valid = await this.$refs.dialogForm.validate().catch(err => err)
				if(valid){
					await this.open(this.dialogForm)
					await this.getListForPage(this.queryForm)
					this.dialogVisible = false;
				}
			},
			handleCancel(){
				this.dialogVisible = false;
			},
			//在弹出窗口之前先将本行的卡号放到dialogForm.num中
			async handleOpenCard(row){
				this.dialogForm.num = row.num
				this.dialogVisible = true;
				//this.$nextTick()代表vue下一次渲染时执行，它本身是一个promise嵌套函数
				//这里通过await同步化编写
				await this.$nextTick()
				//该代码会在每次点击handleOpenCard之后的下一次渲染执行用来避免第一次弹窗未初始化时数据为空
				//这行代码表示让user-table执行一次查询用来每次窗口打开时更新数据
				this.$refs.userTable.handleClick()
			},
			async handleBackCard(row){
				let confirm = await this.$confirm(`是否要退卡${row.num}, 是否继续?`, '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).catch(err=>err);
				if(confirm == "confirm"){
					await this.back(row.num);
					this.$message({
						type: 'success',
						message: '删除成功!'
					});
					await this.getListForPage(this.queryForm)
				}
			}
    },
	
    async created(){
        await this.getCardTypeList();
        await this.getListForPage(this.queryForm);
    },
    async activated(){
		await this.getCardTypeList();
		await this.getListForPage(this.queryForm)
	},
}
</script>

<style>

</style>