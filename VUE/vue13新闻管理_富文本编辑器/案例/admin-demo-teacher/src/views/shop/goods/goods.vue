<template>
	<div class="page">
		<p-page-header title="商品管理"></p-page-header>
		<el-form inline :model="queryForm">
			<el-form-item size="mini" label="商品名称">
				<el-input placeholder="请输入" clearable v-model="queryForm.name"></el-input>
			</el-form-item>
			<el-form-item size="mini" label="商品类型">
				<el-select placeholder="请选择" clearable v-model.trim="queryForm.goodsTypeId">
					<el-option v-for="item in goodsTypeList" 
						:key="''+item.id"
						:label="item.name"
						:value="item.id"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item size="mini" label="商品状态">
				<el-select placeholder="请选择" clearable v-model.trim="queryForm.isOnSale">
					<el-option value="1" label="在架"></el-option>
					<el-option value="0" label="下架"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item size="mini">
				<el-button type="primary" :loading="queryLoading" @click="handleClick" icon="el-icon-search">查询</el-button>
			</el-form-item>
			<el-form-item size="mini">
				<el-button type="success"  @click="handleAdd" icon="el-icon-plus">新增</el-button>
			</el-form-item>
		</el-form>
		<el-table
			border
			size="mini"
			:data="list">
			<el-table-column label="商品名称" prop="name"></el-table-column>
			<el-table-column label="商品价格" prop="price"></el-table-column>
			<el-table-column label="商品logo" >
				<template v-slot="{row}">
					<el-image style="width: 100px;height: 100px;border-radius: 9px;" 
						fit="cover" 
						:src="row.logo"
						:preview-src-list="[row.logo]"
						>
					</el-image>
				</template>
			</el-table-column>
			<el-table-column label="商品状态" >
				<template v-slot="{row}">
					<el-tag v-if="row.isOnSale==1" size="small">
						在架
					</el-tag>
					<el-tag v-else type="danger" size="small">
						下架
					</el-tag>
				</template>
			</el-table-column>
			<el-table-column label="商品类型" >
				<template v-slot="{row}">
					<el-tag  size="small">
						{{row.goodsTypeName}}
					</el-tag>
				</template>
			</el-table-column>
			<el-table-column label="商品库存" prop="count">
			</el-table-column>
			<el-table-column label="商品备注" show-overflow-tooltip prop="remark">
			</el-table-column>
			<el-table-column width="300px" label="操作" >
				<template v-slot="{row}">
					<el-button size="mini" v-if="row.isOnSale==0" plain type="success"  @click="handleSetIsOnSale(row)" >上架</el-button>
					<el-button size="mini" v-if="row.isOnSale==1" plain type="danger"  @click="handleSetIsOnSale(row)" >下架</el-button>
					<el-button size="mini" icon="el-icon-edit" @click="handleEdit(row.id)" type="warning">修改</el-button>
					<el-button size="mini" v-if="row.isOnSale==0" @click="handleRemove(row.id)" icon="el-icon-remove" type="danger">删除</el-button>
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
	</div>
</template>

<script>
	// 引入vuex的state和actions的映射对象用来映射store中定义的state和actions
	import { mapState,mapActions } from 'vuex'
	export default{
		// 定义了组件的名称，用来结合keep-alive缓存页面
		name:'goods',
		data(){
			return {
				// 调用查询接口需要的参数
				queryForm:{
					name:'',
					goodsTypeId:'',
					isOnSale:'',
					pno:1,
					psize:10
				},
				// 查询按钮的加载动画开关
				queryLoading:false
			}
		},
		computed:{
			...mapState('goodsModel',['list','page','goodsTypeList']),
			// 格式化日期的计算属性
			formatTime(){
				return function(time){
					let d = new Date(time);
					return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
				}
			}
		},
		// 当第一次打开页面时会执行created生命周期
		async created(){
			await this.getGoodsTypeListAll()
			await this.getListForPage(this.queryForm)
		},
		// 由于本页通过keep-alive进行了缓存，缓存后原有的生命周期不执行，所以通过activated来识别何时进入本页
		async activated(){
			await this.getGoodsTypeListAll()
			await this.getListForPage(this.queryForm)
		},
		methods:{
			...mapActions('goodsModel',['getListForPage','deleteById','getGoodsTypeListAll','setIsOnSale']),
			// 点击查询按钮触发的⌚️
			async handleClick(){
				this.queryLoading = true;
				this.queryForm.pno = 1;
				await this.getListForPage(this.queryForm)
				this.queryLoading = false;
			},
			// 点击分页组件的每页多少条切换时会触发这个回调，参数就是切换的条数
			async handleSizeChange(psize){
				this.queryForm.psize = psize
				this.queryForm.pno = 1;
				await this.getListForPage(this.queryForm)
			},
			// 点击分页组件上一页下一页切换页面时触发的回调，参数就是跳到哪一页
			async handleCurrentChange(pno){
				this.queryForm.pno = pno
				await this.getListForPage(this.queryForm)
			},
			// 跳转到添加数据的页面
			handleAdd(){
				this.$router.push('/goods-add')
			},
			async handleRemove(id){
				// 通过同步化写法调用$confirm方法
				let confirm =await  this.$confirm('正在删除','提示',{
					type:'warning'
				}).catch(err => err)
				if(confirm == 'confirm'){
					// 如果点击确定
					//首先调用删除业务
					await this.deleteById(id)
					//删除业务调用完毕之后我们重新调用一次查询业务，来实现数据的更新
					await this.getListForPage(this.queryForm)
				}
			},
			// 跳转到编辑用户的页面
			handleEdit(id){
				this.$router.push({path:'/goods-edit',query:{id}})
			},
			async handleSetIsOnSale(row){
				let message
				let isOnSale
				
				if(row.isOnSale == 1){
					message = '正在下架当前商品，点击确认继续'
					isOnSale = 0
				}else{
					message = '正在上架当前商品，点击确认继续'
					isOnSale = 1
				}
				let confirm = await this.$confirm(message,"提示",{type:'warning'}).catch(err=>err)
				if(confirm == 'confirm'){
					await this.setIsOnSale({
						id:row.id,
						isOnSale:isOnSale
					})
					await this.getListForPage(this.queryForm)
				}
			}
		}
	}
</script>

<style>
</style>
