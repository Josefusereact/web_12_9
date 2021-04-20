<template>
  <div>
      <el-page-header @back="handleBack" content="编辑商品类型信息"></el-page-header>
      <el-row>
			<el-col :span="6">
				<el-form 
					:model="addForm" 
					label-width="auto" 
					ref="addForm" 
					:rules="rules">
					<el-form-item size="mini" prop="name" label="类型名称">
						<el-input placeholder="请输入" clearable v-model.trim="addForm.name" ></el-input>
					</el-form-item>
					<el-form-item size="mini" prop="remark" label="备注">
						<el-input placeholder="请输入" clearable v-model.trim="addForm.remark" ></el-input>
					</el-form-item>
					<el-form-item size="mini">
						<el-button  @click="handleAdd" type="primary">提交</el-button>
					</el-form-item>
				</el-form>
			</el-col>
		</el-row>
  </div>
</template>

<script>
import {getGoodsTypeById,updateGoodsType} from '../../../api/goods-type-api'
export default {
    data(){
        return {
            addForm:{
                id:'',//编辑的时候需要id做为条件，因为后台不知道你要更新哪个记录
                name:'',
                remark:''
            },
            //rule  翻译成中文是规则的意思，这里写验证，rules的键是el-form-item标签prop属性的名
            rules:{
                name:[{required:true,message:'账号不可以为空'}]
            }
        }
    },
    methods:{
        async handleAdd(){
            //验证表单成功后才能调用接口
            let isValid = this.$refs.addForm.validate().catch(err => err);
            if(isValid){
                //调用保存接口，并跳转回到查询页面
                await updateGoodsType(this.addForm);
                this.handleBack();
            }

        },
        //后退
        handleBack(){
            this.$router.history.go(-1)
        },
    },
    async created(){
        //一定得等created执行完才能走到mounted钩子，所以要同步执行
        let id = this.$route.query.id;
        let addForm = await getGoodsTypeById(id);
        this.addForm = addForm.data.data;
        //this.addForm.id = addForm.id
        //this.addForm.name = addForm.name
    }
}
</script>

<style>

</style>