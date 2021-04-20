<template>
	<div>
		<el-page-header @back="handleBack" content="编辑会员卡信息"></el-page-header>
		<el-row>
			<el-col :span="24">
				<el-form 
					:model="addForm" 
					label-width="auto" 
					ref="addForm" 
					:rules="rules">
					<el-form-item size="mini" prop="name" label="会员卡名称">
						<el-input placeholder="请输入" clearable v-model.trim="addForm.name" ></el-input>
					</el-form-item>
					<el-form-item size="mini" prop="cardTypeId" label="会员卡类型">
						<el-select placeholder="请选择" clearable v-model.trim="addForm.cardTypeId">
							<el-option v-for="item in cardTypeList" 
								:key="''+item.id"
								:label="item.name"
								:value="item.id"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item size="mini" label="会员卡logo" prop="logo">
						<p-upload list-type="picture-card" :limit="1"
							 v-model="fileList"
							 action="/file/upload"
							 :before-upload="handleBeforeUpload"
							 :on-error="handleError">
						</p-upload>
					</el-form-item>
					<el-form-item size="mini" prop="remark" label="会员卡备注">
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
		name:'card-add',
		data(){
			let _this = this;
			return {
				rules:{
					name:[{
						required:true,
						message:'请输入会员卡名称'
					}],
					cardTypeId:[{
						required:true,
						message:'请选择会员卡类型'
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
					}]
				},
				fileList:[],
				addForm:{
					name:"",
					cardTypeId:"",
					logo:"",
					remark:"",
				},
				subLoading:false
			}
		},
		async created(){
			await this.getCardTypeListAll()
			let id = this.$route.query.id
			this.addForm = await this.findById(id)
			this.fileList = [
				{
					name:this.addForm.logo.substring(this.addForm.logo.lastIndexOf('/')+1),
					url:this.addForm.logo
				}
			]
		},
		computed:{
			...mapState('cardModel',['cardTypeList'])
		},
		methods:{
			...mapActions('cardModel',['getCardTypeListAll','update','findById']),
			handleBack(){
				this.$router.history.go(-1)
			},
			async handleAdd(){
				let valid = await this.$refs.addForm.validate().catch(err => err);
				if(valid){
					//将头像
					this.addForm.logo = this.fileList[0].url
					this.subLoading = true
					await this.update(this.addForm)
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
					message:'上传会员卡图片失败',
					type:'error'
				})
			}
		}
	}
</script>

<style scoped="scoped" lang="scss">
</style>
