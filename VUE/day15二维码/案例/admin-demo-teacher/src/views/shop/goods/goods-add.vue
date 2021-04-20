<template>
	<div>
		<el-page-header @back="handleBack" content="增加商品信息"></el-page-header>
		<el-row>
			<el-col :span="24">
				<el-form 
					:model="addForm" 
					label-width="auto" 
					ref="addForm" 
					:rules="rules">
					<el-form-item size="mini" prop="name" label="商品名称">
						<el-input placeholder="请输入" clearable v-model.trim="addForm.name" ></el-input>
					</el-form-item>
					<el-form-item size="mini" prop="price" label="商品价格">
						<el-input placeholder="请输入" clearable v-model.number="addForm.price" ></el-input>
					</el-form-item>
					<el-form-item size="mini" prop="count" label="商品库存">
						<el-input placeholder="请输入" clearable v-model.number="addForm.count" ></el-input>
					</el-form-item>
					<el-form-item size="mini" prop="zheKou" label="商品折扣">
						<el-input placeholder="请输入" clearable v-model.number="addForm.zheKou" ></el-input>
					</el-form-item>
					<el-form-item size="mini" prop="goodsTypeId" label="商品类型">
						<el-select placeholder="请选择" clearable v-model.trim="addForm.goodsTypeId">
							<el-option v-for="item in goodsTypeList" 
								:key="''+item.id"
								:label="item.name"
								:value="item.id"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item size="mini" label="商品logo" prop="logo">
						<p-upload list-type="picture-card" :limit="1"
							 v-model="fileList"
							 action="/file/upload"
							 :before-upload="handleBeforeUpload"
							 :on-error="handleError">
						</p-upload>
					</el-form-item>
					<el-form-item size="mini" label="商品图片" prop="pics">
						<p-upload list-type="picture-card" :limit="3"
							 v-model="fileList1"
							 action="/file/upload"
							 :before-upload="handleBeforeUpload"
							 :on-error="handleError1">
						</p-upload>
					</el-form-item>
					<el-form-item size="mini" prop="description" label="商品描述">
						<el-input show-word-limit maxlength="300"  type="textarea" placeholder="请输入" clearable v-model.number="addForm.description" ></el-input>
					</el-form-item>
					<el-form-item size="mini" prop="remark" label="商品备注">
						<el-input show-word-limit maxlength="300" type="textarea" placeholder="请输入" clearable v-model.number="addForm.remark" ></el-input>
					</el-form-item>
					<el-form-item size="mini">
						<el-button :loading="subLoading" @click="handleAdd" type="primary">提交</el-button>
					</el-form-item>
				</el-form>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import { mapActions,mapState } from 'vuex';
	export default{
		name:'goods-add',
		data(){
			let _this = this;
			return {
				rules:{
					name:[{
						required:true,
						message:'请输入商品名称'
					}],
					price:[{
						required:true,
						validator(rules,value,callback){
							if(value<0){
								callback('商品价格不能为负数')
							}else{
								callback()
							}
						}
					}],
					count:[{
						required:true,
						validator(rules,value,callback){
							if(value<0){
								callback('库存不能为负数')
							}else{
								callback()
							}
						}
					}],
					zheKou:[{
						required:true,
						validator(rules,value,callback){
							if(value<1||value>10){
								callback('商品折扣只能在1-10之间')
							}else{
								callback()
							}
						}
					}],
					goodsTypeId:[{
						required:true,
						message:'请选择商品类型'
					}],
					logo:[{
						required:true,
						validator(rules,value,callback){
							
							if(_this.fileList.length>0&&_this.fileList[0].url!=undefined){
								callback()
							}else{
								callback(new Error('请上传一个logo'))
							}
							
						}
					}],
					pics:[{
						required:true,
						validator(rules,value,callback){
							//由于validator中的this对象不是本页面vue对象的实例
							//但是我们的data数据是一个函数，所以我们可以在data中把本页的this赋值给_this
							//这样我们就可以在验证器中拿到本页的fileList
							if(_this.fileList1.length>0){
								callback()
							}else{
								callback(new Error('请上至少上传一个商品图片'))
							}
						}
					}],
					description:[
						{
							required:true,
							message:'请输入商品描述'
						}
					]
				},
				fileList:[],
				fileList1:[],
				addForm:{
					name:"",
					price:0,
					zheKou:10,
					goodsTypeId:"",
					description: "",
					logo:"",
					pics:[],
					remark:"",
					count:0
				},
				subLoading:false
			}
		},
		async created(){
			await this.getGoodsTypeListAll()
		},
		computed:{
			...mapState('goodsModel',['goodsTypeList'])
		},
		methods:{
			...mapActions('goodsModel',['getGoodsTypeListAll','insert']),
			handleBack(){
				this.$router.history.go(-1)
			},
			async handleAdd(){
				let valid = await this.$refs.addForm.validate().catch(err => err);
				if(valid){
					//将头像
					this.addForm.logo = this.fileList[0].url
					this.addForm.pics = this.fileList1.map(item => {
						return item.url
					})
					this.subLoading = true
					await this.insert(this.addForm)
					this.subLoading = false
					this.handleBack()
				}
			},
			handleBeforeUpload(file){
				// 判断当前的文件类型如果不是这些类型的文件就弹出错误提示并中断上传操作
				if(!(file.name.indexOf('png') != -1
						 ||file.name.indexOf('jpg') != -1
						 ||file.name.indexOf('jpeg') != -1
						 ||file.name.indexOf('gif') != -1)){
					this.$notify({
						title:'提示',
						message:'只能上传图片格式的文件',
						type:'error'
					})
					// 通过return Promise.reject()可以实现中断上传操作，不在触发上传的函数
					// 但是这里要注意的是，组件内部会自动处理已经传入的fileList，在选择文件的时候就会对fileList增加一个
					// 本地数据，当我们中断上传时，组件内部会自动自行删除fileList，这样就会触发下面的beforeRemove和remove
					return Promise.reject()
				}
			},
			handleError(err){
				this.$notify({
					title:'提示',
					message:'上传logo失败',
					type:'error'
				})
			},
			handleError1(err){
				this.$notify({
					title:'提示',
					message:'上传商品图片失败',
					type:'error'
				})
			}
		}
	}
</script>

<style scoped="scoped" lang="scss">
</style>
