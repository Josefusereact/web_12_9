	<template>
  <div class="page">
		<p-page-header title="商品管理"></p-page-header>
        <el-form inline :model="queryForm">
			<el-form-item size="mini" label="商品名称">
				<el-input placeholder="请输入" clearable v-model="queryForm.name"></el-input>
			</el-form-item>
            <el-form-item size="mini" label="是否上架">
				<el-select v-model="queryForm.isOnSale" placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
			</el-form-item>
			<el-form-item size="mini">
				<el-button type="primary" :loading="queryLoading" @click="handleClick" icon="el-icon-search">查询</el-button>
			</el-form-item>
			<el-form-item size="mini">
				<el-button type="success" :loading="queryLoading" @click="handleAdd" icon="el-icon-plus">新增</el-button>
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
			<el-table-column label="名称" prop="name"></el-table-column>
			<el-table-column label="价格" prop="price"></el-table-column>
			<el-table-column label="商品logo" >
				<template v-slot="{row}">
					<!-- 我们给组件使用行内样式定义一个固定尺寸
					fit:与css属性object-fit用法完全一样，可以设置图片的屏幕拉伸方式
					src:用于存放图片的访问路径
					preview-src-list:存放预览图的数组，必须是数组形式，数组内填写要预览的图片的路径
				-->
				<el-image style="width: 100px;height: 100px;border-radius:9px" 
						fit="cover" 
						:src="row.logo"
						:preview-src-list="[row.logo]"
						>
					</el-image>
				</template>
				</el-table-column>
			<el-table-column label="商品状态" prop="isOnSale">
				<template v-slot="{row}">
                    <el-tag v-if="row.isOnSale==1" type="success">上架</el-tag>
                    <el-tag v-else type="danger">下架</el-tag>
				</template>
			</el-table-column>
            <el-table-column label="商品类型" prop="goodsTypeName"></el-table-column>
            <el-table-column label="库存" prop="count"></el-table-column>
            <el-table-column label="商品备注" prop="remark">
				<template v-slot="{row}">
					<el-popover
						placement="top-start"
						title="备注"
						trigger="hover"
						:content="row.remark">
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
                    <el-button size="mini" v-if="row.isOnSale==1" icon="el-icon-download" type="danger" @click="handleSetSale(row.id,'0')" >下架</el-button>
                    <el-button size="mini" v-else icon="el-icon-upload2" type="success" @click="handleSetSale(row.id,'1')">上架</el-button>
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
import {mapState,mapActions} from 'vuex'
export default {
    data(){
        return{
            queryForm:{
                name:'',
                isOnSale:'',
                goodsTypeId:''
            },
            options: [{
                value: '1',
                label: '在架'
            }, {
                value: '0',
                label: '下架'
            }],
            queryLoading:false
        }
    },
    computed:{
        ...mapState('goodsModel',['list','page','goodsTypeList']),
    },
    methods:{
        ...mapActions('goodsModel',['getListForPage',"delete","setSale"]),
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
				this.$router.push('/goods-add')
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
				this.$router.push({path:'/goods-edit', query:{id}});
			},
			async handleSetSale(id, isOnSale){
				let params = {id, isOnSale};
				await this.setSale(params);
				await this.getListForPage(this.queryForm);
			}
    },
    async created(){
        await this.getListForPage(this.queryForm);
    },
    async activated(){
		await this.getListForPage(this.queryForm)
	},
}
</script>

<style>

</style>