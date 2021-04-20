# Vue项目实战8

## 今日内容

1. 讲解昨天作业遇到的问题
2. 完成批量创建会员卡功能。
3. 完成会员卡开卡功能。
4. 作业1:完成退卡流程，在商城会员中增加会员卡卡号的展示
5. 完成优惠券模块的增删改查

## 1.讲解昨天作业遇到的问题

仍然通过成品改造的方式实现会员卡的增删改查。

着重讲解作业中遇到的问题

## 2.完成批量创建会员卡功能。

完成了会员卡模块的增删改查之后我们来考虑扩展功能。

会员卡和商品不同商品有库存功能，会员卡一张卡就只有一个号码

所以会员卡和人是一对一的。

这时我们如果一张一张添加会员卡就比较麻烦了，所以我们希望可以批量创建会员卡。

> 具体操作

1. 在查询页面的增加按钮后面创建一个批量添加按钮

   ```vue
   <el-form-item size="mini">
     <el-button type="success" plain  @click="handleAddMultiple" icon="el-icon-plus">批量建卡</el-button>
   </el-form-item>
   ```

   

2. 新建card-add-multiple.vue并添加到router/index.js中，对批量创建按钮增加点击事件跳转到card-add-multiple.vue中

3. 找到接口文档中批量增加的接口查看并测试，然后在api/card-api.js中创建接口函数

   ```js
   export const insertCardMultiple = (addForm) => {
   	return api.http({
   		url:'/card/insert/multiple',
   		method:'put',
   		data:addForm
   	})
   }
   ```

4. 在card-model.js中导入insertCardMultiple，并在actions中创建业务函数insertMultiple

   ```js
   async insertMultiple({},addForm){
     await insertCardMultiple(addForm)
   }
   ```

5. 我们查看接口参数发现与新增很像只是多了一条参数count所以我们直接将新增页面复制到card-add-multiple.vue中

6. 在表单中增加一个输入count的地方

7. 增加表单验证，要求count不得超过100不能小于1还必须是整数

8. 在card-add-multiple.vue的mapAction中增加insertMultiple映射接口函数

9. 把新增提交的insert改成insertMultiple

10. 测试完成的功能。

## 3.完成会员卡开卡功能。

所谓开卡是将指定的卡发给指定的用户，下面是开发流程

开卡是把当前的这个会员卡送给了一个会员，这个会员就有了这张卡，这个卡就不能给别的会员开了，并且开了卡的会员也不能再开别的卡了

接下来在开卡时把卡的状态变成已经开卡，并且给对应开卡的用户设置这个卡号

1. 首先在修改和删除按钮的位置绑定一个新的按钮`开卡`,并创建点击事件handleOpenCard，将整行数据传入

   ```vue
   <el-button size="mini" icon="el-icon-edit" @click="handleOpenCard(row)" plain type="warning">开卡</el-button>
   ```

2. 这次开卡由于涉及到选择用户，所以我们换一种形式去做，以往我们都是跳页，这次我们采用弹出dialog的形式来做。我们学习一下[dialog组件](https://element.eleme.cn/#/zh-CN/component/dialog)

   ```vue
   <!--
   	el-dialog组件主要是提供的功能就是用户可编辑的弹出页面
   	title dialog的标题
     visible.sync="dialogVisible"代表当前弹窗的展示和隐藏
   	width为宽度使用css单位设置
   -->
   <el-dialog
     title="提示"
     :visible.sync="dialogVisible"
     width="30%">
     
     内容
   </el-dialog>
   ```

3. 首先我们定义一个dialogVisible属性默认为false然后将下面的代码粘贴到项目中，el-dialog不用单独定义vue文件，代码的位置就放到项目template的底部

   sync修饰符[官方解释](https://cn.vuejs.org/v2/guide/components-custom-events.html#sync-修饰符)

   [深入理解vue 修饰符sync【 vue sync修饰符示例】](https://blog.csdn.net/Future1994/article/details/115252583)

   ```vue
   <el-dialog
   		  title="绑卡"
   		  :visible.sync="dialogVisible"
   		  width="400px">
     <el-form label-width="auto">
       <el-form-item label="卡号">
         xxxxx
       </el-form-item>
     </el-form>
     <template slot="footer">
   <el-button type="primary" size="mini" @click="handleBind">绑定</el-button>
   <el-button type="defautl" size="mini" @click="handleCancel">取消</el-button>
     </template>
   </el-dialog>
   ```

4. 在handleOpenCard中设置dialogVisible为true然后测试是否能弹出。

5. 将handleBind和handleCancel两个方法定义到methods中

   ```js
   handleBind(){
     this.dialogVisible = false;
   },
     handleCancel(){
       this.dialogVisible = false;
     }
   ```

6. 然后我们考虑应该在弹出提示框时首先展示要绑定的卡号，然后展示要绑定的人的列表。 我们分析一下要绑定的人应该是还没有绑定过卡的，所以我们找到商城会员的查询接口有一个参数叫hasCard， 我们展示当前的卡号和未绑定卡号的用户列表

7. 首先将会员卡号展示出来

8. 在card.vue组件的data中定义一个dialogForm:{num:'',userId:''}

   ```js
   //在弹出窗口之前先将本行的卡号放到dialogForm.num中
   handleOpenCard(row){
     this.dialogForm.num = row.num
     this.dialogVisible = true;
   },
   ```

   

   ```vue
   
   <el-dialog
   		  title="绑卡"
   		  :visible.sync="dialogVisible"
   		  width="600px">
     <el-form label-width="auto" :model="dialogForm">
       <el-form-item label="卡号">
         {{dialogForm.num}}
       </el-form-item>
     </el-form>
     <template slot="footer">
   <el-button type="primary" size="mini" @click="handleBind">绑定</el-button>
   <el-button type="defautl" size="mini" @click="handleCancel">取消</el-button>
     </template>
   </el-dialog>
   ```

9. 先测试弹出是否能展示卡号，卡号展示完毕之后我们新建一个文件user-table.vue在同一目录下，目的是要在el-dialog对话框中显示用户列表。

   ```vue
   <template>
   	<div class="page">
   		<el-form inline :model="queryForm">
   			<el-form-item size="mini" >
   				<el-input placeholder="请输入手机号" clearable v-model="queryForm.phone"></el-input>
   			</el-form-item>
   			<el-form-item size="mini">
   				<el-button type="primary" :loading="queryLoading" @click="handleClick" icon="el-icon-search">查询</el-button>
   			</el-form-item>
   		</el-form>
   		<el-table
   			border
   			ref="table"
   			size="mini"
   			@select="handleSelect"
   			@select-all="handleSelectAll"
   			@row-click="handleRowClick"
   			:data="list">
   			<!-- 复选框组件 -->
   			<el-table-column
   				type="selection"
   				width="55">
   			</el-table-column>
   			<el-table-column label="账号" prop="username"></el-table-column>
   			<el-table-column label="昵称" prop="nickname"></el-table-column>
   			<el-table-column label="手机" prop="phone"></el-table-column>
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
   		props:{
   			'user-id':{
   				type:String,
   				required:true,
   				default(){
   					return ''
   				}
   			}
   		},
   		// 双向绑定user-id属性用于对外通信
   		model:{
   			event:'change-id',
   			prop:'user-id'
   		},
   		name:'user-table',
   		data(){
   			return {
   				// 调用查询接口需要的参数
   				queryForm:{
   					hasCard:0,
   					phone:'',
   					freeze:0,
   					pno:1,
   					psize:5
   				},
   				queryLoading:false
   			}
   		},
   		computed:{
   			...mapState('shopUserModel',['list','page']),
   			// 格式化日期的计算属性
   			formatTime(){
   				return function(time){
   					let d = new Date(Number(time));
   					return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
   				}
   			}
   		},
   		// 当第一次打开页面时会执行created生命周期
   		async created(){
   			await this.getListForPage(this.queryForm)
   		},
   		methods:{
   			...mapActions('shopUserModel',['getListForPage','deleteById','setFreeze']),
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
   				// 数据发生变化之后我们重新的调用查询方法
   				await this.getListForPage(this.queryForm)
   			},
   			// 点击分页组件上一页下一页切换页面时触发的回调，参数就是跳到哪一页
   			async handleCurrentChange(pno){
   				this.queryForm.pno = pno
   				// 改变请求的参数重新查询当页的数据
   				await this.getListForPage(this.queryForm)
   			},
   			// 点击复选框时触发
   			handleSelect(selection,row){
   				//清除所有选择
   				this.$refs.table.clearSelection()
   				//设置当前行选中，用于实现单选
   				this.$refs.table.toggleRowSelection(row)
   				//返回当前选中的用户id
   				this.$emit('change-id',row.id+'')
   			},
   			// 点击全选按钮时执行清空，不允许多选
   			handleSelectAll(selection){
   				this.$refs.table.clearSelection()
   				this.$emit('change-id','')
   			},
   			// 点击每行非复选框位置时触发与handleSelect逻辑一样
   			handleRowClick(row){
   				this.$refs.table.clearSelection()
   				this.$refs.table.toggleRowSelection(row)
   				this.$emit('change-id',row.id+'')
   			}
   		}
   	}
   </script>
   
   <style>
   </style>
   
   ```

10. 创建完毕后在会员卡管理(card.vue)这样引用

    ```vue
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
    				<el-select placeholder="请选择" clearable v-model.trim="queryForm.cardTypeId">
    					<el-option v-for="item in cardTypeList" 
    						:key="''+item.id"
    						:label="item.name"
    						:value="item.id"></el-option>
    				</el-select>
    			</el-form-item>
    			<el-form-item size="mini">
    				<el-button type="primary" :loading="queryLoading" @click="handleClick" icon="el-icon-search">查询</el-button>
    			</el-form-item>
    			<el-form-item size="mini">
    				<el-button type="success"  @click="handleAdd" icon="el-icon-plus">新增</el-button>
    			</el-form-item>
    			<el-form-item size="mini">
    				<el-button type="success" plain  @click="handleAddMultiple" icon="el-icon-plus">批量建卡</el-button>
    			</el-form-item>
    		</el-form>
        
    		<el-table
    			border
    			size="mini"
    			:data="list">
    			<el-table-column label="会员卡名称" prop="name"></el-table-column>
    			<el-table-column label="会员卡编号" prop="num"></el-table-column>
    			<el-table-column label="会员卡logo" >
    				<template v-slot="{row}">
    					<el-image style="width: 100px;height: 100px;border-radius: 9px;" 
    						fit="cover" 
    						:src="row.logo"
    						:preview-src-list="[row.logo]"
    						>
    					</el-image>
    				</template>
    			</el-table-column>
    			<el-table-column label="会员卡状态" >
    				<template v-slot="{row}">
    					<el-tag v-if="row.status==0" size="small">
    						未使用
    					</el-tag>
    					<el-tag v-else type="danger" size="small">
    						已发卡
    					</el-tag>
    				</template>
    			</el-table-column>
    			<el-table-column label="会员卡类型" >
    				<template v-slot="{row}">
    					<el-tag  size="small">
    						{{row.cardTypeName}}
    					</el-tag>
    				</template>
    			</el-table-column>
    			</el-table-column>
    			<el-table-column label="会员卡备注" show-overflow-tooltip prop="remark">
    			</el-table-column>
    			<el-table-column width="300px" label="操作" >
    				<template v-slot="{row}">
    					<el-button size="mini" icon="el-icon-edit" @click="handleOpenCard(row)" plain type="warning">开卡</el-button>
    					<el-button size="mini" icon="el-icon-edit" @click="handleEdit(row.id)" type="warning">修改</el-button>
    					<el-button size="mini" @click="handleRemove(row.id)" icon="el-icon-remove" type="danger">删除</el-button>
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
              	  <!-- begin ++++++++++++++++++++++++++++++++++ -->
    					<user-table ref="userTable" v-model="dialogForm.userId"></user-table>
    							<!-- end ++++++++++++++++++++++++++++++++++ -->
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
    	// 引入vuex的state和actions的映射对象用来映射store中定义的state和actions
    	import { mapState,mapActions } from 'vuex'
    	export default{
    		// 定义了组件的名称，用来结合keep-alive缓存页面
    		name:'card',
    		components:{
    			UserTable
    		},
    		data(){
    			return {
    				// 调用查询接口需要的参数
    				queryForm:{
    					name:'',
    					cardTypeId:'',
    					num:'',
    					pno:1,
    					psize:10
    				},
    				dialogVisible:false,
    				// 查询按钮的加载动画开关
    				queryLoading:false,
    				dialogForm:{
    					num:'',
    					userId:''
    				},
    				rules:{
    					userId:[
    						{required:true,message:'请选择要绑卡的用户',trigger:'change'}
    					]
    				}
    			}
    		},
    		computed:{
    			...mapState('cardModel',['list','page','cardTypeList']),
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
    			await this.getCardTypeListAll()
    			await this.getListForPage(this.queryForm)
    		},
    		// 由于本页通过keep-alive进行了缓存，缓存后原有的生命周期不执行，所以通过activated来识别何时进入本页
    		async activated(){
    			await this.getCardTypeListAll()
    			await this.getListForPage(this.queryForm)
    		},
    		methods:{
    			...mapActions('cardModel',['getListForPage','deleteById','getCardTypeListAll','open']),
    			// 点击查询按钮触发的
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
    				this.$router.push('/card-add')
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
    			handleEdit(id){
    				this.$router.push({path:'/card-edit',query:{id}})
    			},
    			handleAddMultiple(){
    				this.$router.push('/card-add-multiple')
    			},
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
    			//点击dialog中的提交时触发的事件
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
    			}
    		}
    	}
    </script>
    
    <style>
    </style>
    
    ```

11. 操作完毕后我们来在页面中实验效果，并阅读两个页面的代码和注释

12. 全部吸收后下一步我们来调用开卡接口查看会员卡接口中的开卡，然后定义接口函数

    ```js
    ///card-api.js中增加
    export const openCard = (params) => {
    	return api.http({
    		url:'/card/open/card',
    		method:'get',
    		params
    	})
    }
    ```

13. 在card-model.js中增加并引入  openCard

    ```js
    async open({},params){
      await openCard(params)
    }
    ```

14. 将open添加到card.vue的mapActions中

    ```js
    ...mapActions('cardModel',['getListForPage',"delete","getCardTypeList","open"]),
    ```

    

15. ```js
    //点击dialog中的提交时触发的事件
    async handleBind(){
      //表单验证验证user-table中是否选择了用户，会得到用户的id
      let valid = await this.$refs.dialogForm.validate().catch(err => err)
      if(valid){
        //调用开卡
        await this.open(this.dialogForm)
        //重新查询
        await this.getListForPage(this.queryForm)
        //关闭dialog
        this.dialogVisible = false;
      }
    },
    ```

16. 尝试测试开卡是否好使

17. 已经绑定的会员卡不需要有绑卡按钮，做判断不显示按钮


## 5作业1:完成退卡流程，在商城会员中增加会员卡卡号的展示

1.完成退卡流程要求：

1. 完成退卡流程需要给每行卡增加退卡按钮，这时需要判断，使用status字段判断。
2. 已经开卡的数据应该展示退卡按钮，未开卡的数据只展示开卡按钮
3. 退卡不需要选择用户所以不需要展示dialog，但是需要弹出confirm确认框，类似删除逻辑
4. 退卡成功后数据状态恢复为未使用，并展示开卡按钮
5. 在商城会员中的列表页面增加一开卡会员的卡号展示，未开卡会员展示空数据，卡号通过el-tag包裹展示
6. 商城会员中已开卡会员要求展示查看会员卡按钮，点击按钮通过dialog自定义提示框展示这个会员的会员卡详情数据。根据会员卡编号查询卡信息的接口在会员卡接口中已提供

## 5.作业2：完成优惠券模块的增删改查

完成优惠券模块的增删改查