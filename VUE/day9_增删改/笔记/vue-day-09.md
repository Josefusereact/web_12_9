# Vue项目实战5

## 今日内容

1. 学习如何编写后台管理系统的增删改查（新增篇）
2. 学习如何编写后台管理系统的增删改查（编辑篇）
3. 学习如何编写后台管理系统的增删改查（删除篇）

## 1.学习如何编写后台管理系统的增删改查（新增篇）

上一节的课程我们学习了后台管理系统的查询流程，今天我们来学习一下新增数据的流程。

### 1.1新增页面的搭建

查看系统管理-用户管理-新增用户， 然后我们在页面中查看有多少元素。然后我们决定实现步骤

1. 在user-test.vue中增加一个增加按钮，按钮增加到form表单的最后一个

   ```vue
   <el-form-item size="mini">
     <el-button icon="el-icon-plus" type="success">增加</el-button>
   </el-form-item>
   ```

2. 对按钮增加一个点击事件@click="handleAdd"

3. 然后我们分析点击增加按钮需要跳页，所以我们需要在test/user-test/文件夹内在创建一个user-test-add.vue页面用来实现增加跳页。

4. 将新建的页面添加到路由中

5. 然后在user-test.vue中新增的点击事件hadleAdd中使用this.$router.push('/user-test-add')跳转到新页面中。（这里分析新增数据时所有数据都是从页面添加的，所以不需要我们对add页面进行传递参数）

6. 然后尝试点击新增按钮做一个测试。这样我们就初步实现了点击跳转到新增页面。

7. 然后我们查看已完成的新增页面，查看内容，分析页面结构分为页面标题栏，表单，提交按钮

8. 我们先来实现页面标题栏这里我们用到了一个element提供的页首组件

   ```vue
   <!-- 组件案例不要原样照抄 -->
   <!-- content为页面标题 @back为返回按钮的点击事件 -->
   <el-page-header @back="handleBack" content="增加用户信息"></el-page-header>
   <script>
     //返回事件的示例
   	handleBack(){
       this.$router.history.go(-1)
     }
   </script>
   ```

9. 然后我们给user-test-add.vue增加一个页首组件并实现返回功能

   ```vue
   <template>
   	<div>
   		<el-page-header @back="handleBack" content="新增用户信息"></el-page-header>
   	</div>
   </template>
   
   <script>
   	export default{
   		name:'user-test-add',
   		methods:{
   			handleBack(){
   				this.$router.history.go(-1)
   			}
   		}
   	}
   </script>
   
   <style>
   </style>
   
   ```

10. 完成此步骤之后再次测试，点击跳到新增页面以及点击新增页面之后返回首页

11. 完成这里之后我们再次参考新增数据的接口文档， 这里我们还没有学习图片上传，所以头像参数我们可以不传，然后我们来查看在新增业务里要提交的有username,password,roleId,nickname

12. 结合接口文档并且这个数据不是接口返回的数据，应该定义data我们要定义到vue文件中，并且这个数据是一个整体的表单对象，我们模仿条件查询时在data中创建一个对象

    ```js
    //增加到代码的合适位置中
    data(){
      return {
        addForm:{
          username:'',//用户账号
          nickname:'',//用户昵称
          password:'',//用户密码
          roleId:''//角色id
        }
      }
    }
    ```

13. 增加完之后我们结合表单组件创建一个表单，这个表单是纵向排列的

    ```vue
    <!-- 将页面改造成如下效果并阅读注释学习form的新属性 -->
    <template>
    	<div>
    		<el-page-header @back="handleBack" content="新增用户信息"></el-page-header>
    		<!-- 
    			model绑定的addForm是为了关联rules中表单验证对象使用的，相当于指定了这个表单要验证的对象是哪个对象
    		  ref相当于对这个表单组件进行命名，我们可以通过this.$refs.addForm来直接拿到这个表单组件。
    			rules代表表单验证对象，绑定了表单验证对象之后就可以在rules中编写校验规则
    			label-width="auto"是让左侧的label可以自适应排列
    		
    		-->
        <el-form :model="addForm" ref="addForm" :rules="rules" label-width="auto">
    			<!-- 
    				label代表表单的标题
    				prop="username"代表用户账号的addForm.username这个值在rules里对应的key也是username，结合rules中定义的key理解
    					
    			-->
          <el-form-item label="用户账号" size="mini" prop="username">
            <!-- v-model绑定了addForm.username并且通过外层嵌套的prop关联到了rules中的username  v-model.trim代表输入的内容前后不允许输入空格-->
    				<el-input clearable placeholder="请输入" v-model.trim="addForm.username"></el-input>
    			</el-form-item>
    			<el-form-item label="用户昵称" size="mini" prop="nickname">
    				<el-input clearable placeholder="请输入" v-model.trim="addForm.nickname"></el-input>
    			</el-form-item>
    			<el-form-item label="用户密码" size="mini" prop="password">
    				<el-input clearable placeholder="请输入" v-model.trim="addForm.password"></el-input>
    			</el-form-item>
    			<el-form-item label="角色" size="mini" prop="roleId">
    				<el-input clearable placeholder="请输入" v-model.trim="addForm.roleId"></el-input>
    			</el-form-item>
    			<el-form-item size="mini">
    				<el-button type="primary">提交</el-button>
    			</el-form-item>
    		</el-form>
    	</div>
    </template>
    
    <script>
    	export default{
    		name:'user-test-add',
    		data(){
    		  return {
    		    addForm:{
    		      username:'',//用户账号
    		      nickname:'',//用户昵称
    		      password:'',//用户密码
    		      roleId:''//角色id
    		    },
            //表单校验对象,表单校验对象rules绑定在form之后会根据每个el-form-item上绑定的prop建立关联关系，如第一行的prop为username，所以这里的username就是用来校验用户账号的
    				rules:{
          		//校验对象的结构是一个数组每个元素有固定写法    
    					username:[
                //这里是校验非空对象的基本写法，required代表是否必填，message是验证不通过时的提示内容，trigger代表通过什么事件触发校验事件（支持input可用的所有事件）
                {required:true,message:'用户名不可以为空',trigger:'change'}
              ],
    					nickname:[],
    					password:[],
    					roleId:[]
    				}
    		  }
    		},
    		methods:{
    			handleBack(){
    				this.$router.history.go(-1)
    			}
    		}
    	}
    </script>
    
    <style>
    </style>
    
    ```

### 1.2表单验证

完成了以上步骤之后我们来具体学习表单验证，将上面的代码整理到页面之后，我们阅读里面的注释，并且做一个实验，这里给出了最基本的表单验证，我们在用户账号的文本框内随便输入一些内容然后删除。这个文本框就会自动变色并将定义的message的内容提示给我们。这个就是最基本的表单验证：非空验证。

下面我们仿照第一个案例将四个属性的非空验证补全。

写法完全一样只需要将message中的提示文字修改即可。

完成了非空验证之后我们在学习一种验证方式叫做自定义验证。

```js
rules:{
	//以username为例子，每一个prop对应的key都是一个数组, 也就是说其实一组输入框可以使用多个校验规则，我们可以对数组追加多个校验对象
  username:[  
    {required:true,message:'用户名不可以为空',trigger:'change'},
    //自定义校验规则,自定义校验规则就是在对象中创建一个名为validator的函数
    //他具有三个参数rule，value，callback
    //rule中包含的是当前触发校验事件的表单数据的key以及他的相关描述，不常用，可以不用太理解
    //value就是当前触发这个自定义校验的表单数据的值，也就是这里的value就是addForm.username的值
    //callback是校验完成之后的回调函数，当校验通过需要调用callback()让他执行，
    //如果校验失败则使用callback(new Error('提示内容'))。
    //callback必须被调用，如果不调用就会中断后面的表单验证事件
    //阅读完这里我们将下面的自定义验证增加到表单验证中尝试一下
    {validator:function(rule,value,callback){
      //下面我们来对表单增加一个校验，要求用户账号必须满足6位以上包含六位
      	if(value.length<6){
          //不满足条件，返回错误信息
          callback(new Error('用户账号不能少于6位'))
        }else{
          //满足条件调用callback让验证通过
          callback()
				}
    },trigger:'change'}
  ],
  nickname:[],
  password:[],
  roleId:[]
}
```

我们将上面示例的自定义部分增加到自己的代码中尝试一下，如果输入内容不到6位就会弹出提示，如果满足条件就会通过。

学习了自定义验证之后我们给密码也加入自定义验证。要求密码的长度只能在6-8位。当作课堂练习。

接下来完成当我们点击提交按钮的时候需要把表单中的数据提交到后台调用接口实现真正的保存到服务器上，那么这里我们要给提交按钮定义一个点击事件@click="handleSubmit"

由于这个事件中我们要进行的是数据交互，所以一定涉及到接口调用，那么为了方便异步语法的处理我们对handleSubmit增加async修饰符然后在函数中输出addForm的内容

```js
async handleSubmit(){
  console.log(this.addForm)
}
```

然后我们点击一下提交按钮，一件神奇的事情出现了，我们虽然定义了表单验证规则，但是在什么页不输入的情况下我们点击提交按钮时表单并没有错误提示，并且我们得到的表单内容是空数据。

空数据是没问题的因为我们什么都没输入，那么这里我们定义的表单验证规则不执行就会带来一个不好的体验，如果对系统不熟悉的人进入页面直接点提交，那就保存了一组空数据。

我们不想这种情况发生，难道要通过原始的if判断再校验一次吗。

当然不用，这里我们可以通过ref得到表单组件内容。

```js
//通过他来进行表单验证一下内容中的addForm均为在el-form上定义的ref="addForm"
this.$refs.addForm.validate()
```

```js
//promis原始写法
this.$refs.addForm.validate()
  .then(res => {
  	//当验证通过时执行这个函数res为true
  })
	.catch(err => {
    //当验证失败时执行这个函数err为false
	})

//await写法,在async修饰的函数中可以使用await语法
async function(){
  //这种写法可以避免嵌套写法带来的阅读困难，res为boolean值，通过为true，不通过为false
  let res = await this.$refs.addForm.validate().catch(err => err);
}
```

所以我们要在点击事件中做如下处理

```js
//将以下部分整理到代码的合适位置
async handleSubmit(){
  //在提交逻辑执行之前先调用手动表单验证
  let valid =await this.$refs.addForm.validate().catch(err => err);
  //验证通过后在执行提交逻辑
  if(valid){
    console.log(this.addForm)
  }
}
```

操作完成之后我们可以尝试在此操作表单内容输入，并通过提交进行校验。看看结果怎么样。

完成以上步骤之后我们在考虑一个问题。

用户账号，用户密码，用户昵称，我们都可以手动在网页中添加，但是用户的角色我们在已经完成的网页中也发现了，并不是手动输入的，因为给用户绑定的角色必须是平台已有的，已有的角色我们通过输入的方式添加是不正确的，因为人是无法直接知道平台有多少角色的。我们需要将角色部分改造成一个可以选择的组件`el-select`

### 1.3下拉选择组件

```vue
<!-- v-model绑定的select会自动存储选中的option的value与原生的htmlselect用法类似 -->
<el-select v-model="value">
  <!-- label是展示在网页上的选项名称 -->
  <el-option label="选项一" value="1"></el-option>
  <el-option label="选项二" value="2"></el-option>
  <el-option label="选项三" value="3"></el-option>
</el-select>
```

在进入新增用户页面的时候就应该展示这个角色选择的下拉框

由于我们只缓存了页面左侧菜单部分的页面，所以新增页面没有被keep-alive组件缓存，那么进入页面时还会执行created函数所以我们要在created生命周期中查询平台的所有角色列表并且角色查询返回的数据和角色的请求要定义在user-test-model.js里

由于角色查询接口函数已经定义完，我们还是先查看接口文档中的角色查询接口然后在api/role-api.js中找到获取角色列表的接口函数getAllRoleList

我们在user-test-model.js中导入getAllRoleList这个函数

```js
import { getAllRoleList } from '../../../api/role-api.js'
```

在state中声明一个roleList

```js
state:{
  roleList:[]//用来存储角色列表
}
```

在mutations中定义setRoleList

```js
mutations:{
  setRoleList(state,roleList){
    state.roleList = roleList
  }
}
```

在actions中添加getRoleList这个名称不可以与导入的接口函数重名

```js
actions:{
  //接口为异步调用所以这里要用async修饰
  async getRoleList({commit}){
    //调用接口函数查询角色列表
    let res = await getAllRoleList()
    if(res.data.code == 200){
      //将返回的数据存到roleList中
      commit('setRoleList',res.data.data.list)
    }
  }
}

```

在user-test-add.vue中引入mapState,mapActions

```js
import {mapState,mapActions} from 'vuex'
```



在user-test-add.vue中的mapState中增加roleList映射

```js
computed:{
  ...mapState('userTestModel',['roleList'])
},
```

在user-test-add.vue中的mapActions中增加getRoleList映射

```js
methods:{
	...mapActions('userTestModel',['getRoleList']),
}
```

在user-test-add.vue中的created中调用getRoleList

```js
async created(){
  await this.getRoleList();
}
```

然后在页面随便的地方输出roleList

```vue
{{roleList}}
```

再次进入页面。如果发现打印了角色列表的数据就说明成功了

接下来我们把roleList展示到表单中

```vue
<el-select clearable v-model="addForm.roleId">
  <!-- 循环roleList将角色的id设置到value中，将角色的名称设置到label中展示到页面 -->
	<el-option v-for="item in roleList"
             :key="item.id"
             :value="item.id"
             :label="item.name">
  </el-option>
</el-select>
```

然后我们在页面中测试，填入一组测试信息，然后点击提交打印addForm，查看数据是否都已经保存到了addForm中。

我们发现了现在的控制台已经输出了表单中填写的信息，并且页成功的绑定了角色的id

### 1.4保存提交

我们已经将增加的逻辑全部实现。只剩下最后一步。

1. 将addForm作为参数通过接口函数将数据保存到服务器中
2. 保存成功之后返回查询页面。

首先我们在浏览一次api接口的新增用户接口，查看一下method，参数以及请求路径，

由于我们已经定义好了新增用户的接口函数，这里我们就找到api/user-api.js的addUser

参数就是addForm对象

然后还是老套路，我们将接口函数放到user-test-model.js中调用，这里由于添加只有成功和失败，我们不需要返回值所以这里只需要在actions中定义insert函数并且滴哦啊用addUser就可以了

```js
//增加addUser到user-test-model.js
import { addUser } from '../../../api/user-api.js'
//在actions中增加insert调用addUser
actions:{
  async insert({},addForm){
    await addUser(addForm)
  }
}
```

然后我们将insert函数通过mapActions绑定到user-test-add.vue中

```js
methods:{
	...mapActions('userTestModel',['getRoleList','insert']),
}
```

然后我们在提交按钮上增加loading动画，具体流程就是定义loading变量然后绑定到loading属性，

这里不做说明直接演示

然后在代码中操作

```js
async handleSubmit(){
  //在提交逻辑执行之前先调用手动表单验证
  let valid = this.$refs.addForm.validate().catch(err => err);
  //验证通过后在执行提交逻辑
  if(valid){
    //让按钮转圈
    this.loading = true;
    //调用insert函数并将参数addForm传入
    await this.insert(this.addForm)
    //取消动画
    this.loading = false;
    //回到查询页面
    this.$router.push('/user-test')
  }

}
```

完成以上步骤之后我们可以回到页面进行测试，随便新增一个用户，并且在查询页面查看结果。

## 2.学习如何编写后台管理系统的增删改查（编辑篇）

学习完新增之后我们接下来学习一下编辑篇

结合系统管理-用户管理页面，我们发现想要修改数据需要在每条数据上添加修改按钮

```vue
<el-button type="warning" size="mini" icon="el-icon-edit">修改</el-button>
```

然后我们点击修改按钮需要跳到一个修改页面，结合做好的模块参考，我们发现修改页面和添加页面其实是一样的页面，并且功能也一样所以我们要做的操作就是创建一个user-test-edit.vue文件，将user-test-add.vue中的内容复制到里面，然后在router/iindex.js中增加修改页面的路由

完成后我们需要对修改按钮绑定事件@click="handleEdit"

```js
handleEdit(){
  this.$router.push('/user-test-edit')
}
```

创建完事件之后我们发现页面可以跳转但是结合系统设置-用户管理菜单我们发现有不一样的地方，我们在结合业务考虑，如果执行的是修改操作，我们应该要知道我要修改的数据原始是什么样的，所以我们在点击跳页的时候应该把数据拿到并展示在修改页面，并且修改页面的标题也需要更改

所以先修改修改页面的标题改成：修改用户信息

然后我们考虑一下我们在学习路由传参数的时候学习到可以通过$router跳转把参数传到对应的页面，并且我们在table-column的template中可以拿到当前点击按钮这一行的数据。这样就可以把这一行的数据都带过去，但是今天我们不用这种做法

因为在真正的开发场景列表展示页的数据一般都不是所有字段都展示的，在详情或者修改页面才能查看到这一条数据的所有字段，所以这里我们在跳转的时候就不能通过table的每一行数据来传入对应的修改页面了。

那么我们通过什么方式来得到我要修改的这行的所有数据呢，一定是通过调用后台的接口拿到的。

关于获取指定数据，我们一般都是通过这条数据的id来查询数据，所以在点击修改跳页的时候，我们要做的就是将点击按钮这一行数据的id传入到修改页面

```vue
<template v-slot="{row}">
  <el-button type="warning" @click="handleEdit(row.id)" size="mini" icon="el-icon-edit">修改</el-button>
</template>
```

```js
handleEdit(id){
  //{id}相当于{id:id},这里我们通过path来中的query来传递参数这样可以保证参数刷新不没
  this.$router.push({path:'/user-test-edit',query:{id}})
}
```

这样操作之后在user-test-edit.vue中的created函数中我们就可以通过this.$route.query.id来得到传入的id

```js
async created(){
  await this.getRoleList();
  let id = this.$route.query.id
  console.log(id)
}
```

在页面中操作跳转测试一下，点击不同数据跳转到修改页面输出的id不一样就对了

下一步就是通过id调用接口查询数据

打开接口文档找到`根据用户id获取用户`

查看这个接口是get方式并且是通过url的param进行传递参数的，然后找到api/user-api.js

找到findUserById参考接口函数的书写方式

将它导入到user-test-model.js中

```js
import { getUserList,addUser,findUserById } from '../../../api/user-api.js'
```

然后我们思考这个查询反回来的数据就是用户数据，但是这个数据相当于addForm中的数据内部都是通过v-model绑定的，所以这种数据不适合定义在model中，所以这个业务的处理我们在model中只调用接口，不将返回值存到state中，那如何将值存到Vue文件的addForm中呢？，actions中的函数是可以设置返回值的并且返回值在调用方法的地方就可以获取，所以这个根据id查询用户信息我们在actions中应该这么定义

```js
actions:{
  async findById({},id){
    let res = await findUserById(id)
    if(res.data.code == 200){
      return res.data.data
    }else{
      return {}
    }
  }
}
```

然后我们在user-test-edit.vue中的mapActions中增加findById方法

```js
methods:{
	...mapActions('userTestModel',['getRoleList','insert','findById']),
}
```

并在created中调用他

```js
async created(){
  await this.getRoleList();
  let id = this.$route.query.id
  console.log(id)
  let addForm = await this.findById(id);
  console.log(addForm)
}
```

再次跳页测试输出，发现能输出用户信息就说明正确，下面我们要把用户信息展示到页面上

最简单的就是将返回的数据直接附给本页的addForm

```js
async created(){
  await this.getRoleList();
  let id = this.$route.query.id
  console.log(id)
  let addForm = await this.findById(id);
  console.log(addForm)
  this.addForm = addForm
}
```

再次测试，我们发现数据已经可以正常展示了。

接下来正常是表单验证部分，由于新增页面已经做了，所以我们要做的下一步就剩提交保存了

所以接下来我们思考如何实现保存。

与新增逻辑一样，依然是要将addForm这个内容通过接口保存到服务器，所以我们还是现在接口文档看一下接口是什么样的

打开`编辑用户`

在接口文档中看完参数和返回值在找到api/user-api.js中的updateUser

我们查看一下并再次复习接口调用

然后将它引入到user-test-model.js中

```js
import { getUserList,addUser,findUserById,updateUser } from '../../../api/user-api.js'
```

然后在user-test-model.js中的actions定义update方法

```js
actions:{
  async update({},addForm){
    await updateUser(addForm)
  }
}
```

然后我们在user-test-edit.vue中的mapActions中将 原来的insert方法改成update因为修改页面提交不需要使用insert

```js
methods:{
	...mapActions('userTestModel',['getRoleList','update','findById']),
}
```

最后一步，我们把handleSubmit方法中调用insert的部分改成调用update

```js
async handleSubmit(){
  //在提交逻辑执行之前先调用手动表单验证
  let valid =await this.$refs.addForm.validate().catch(err => err);
  //验证通过后在执行提交逻辑
  if(valid){
    //让按钮转圈
    this.loading = true;
    //调用update函数并将参数addForm传入
    await this.update(this.addForm)
    //取消动画
    this.loading = false;
    //回到查询页面
    this.$router.push('/user-test')
  }
}
```

完成后保存所有修改，然后我们在页面中测试修改是否好用，随便修改一个除了admin以外的数据，改完之后保存看查询页是否变化，如果变化说明成功

## 3.学习如何编写后台管理系统的增删改查（删除篇）

查询增加和修改我们都搞定了之后接下来就是删除功能

删除按钮在查询页面中已经创建好了，与修改一样，逻辑也与修改类似，我们需要做的就是点击删除按钮是先确定要删除谁所以给按钮绑定事件@click="handleDelete"

并传入row.id这个参数

```vue
<el-button type="danger" @click="handleDelete(row.id)" size="mini">删除</el-button>
```

```js
methods:{
	async handleDelete(id){
    console.log(id)
  }
}
```

完成后点击删除测试打印数据

打印不同的id就说明正确

然后回想过去我们讲过，删除需要有一个询问框所以删除的逻辑是

1. 点击删除按钮确认要删除的数据
2. 弹出询问框
3. 点击确定就执行调用删除接口，并重新调用查询
4. 点击取消什么都不执行

所以我们对handleDelete中追加询问框$confirm这里也用await的形式简化

```js
methods:{
	async handleDelete(id){
    console.log(id)
    let confirm = await this.$confirm('正在删除当前数据，点击确认继续','提交',{type:'warning'}).catch(err => err)
    //当点击确认返回的是confirm点击取消返回的是cancel
    console.log(confirm)
  }
}
```

当确认之后我们就需要调用删除接口了，结合接口文档查看删除接口`根据id删除用户`

我们看到了method是delete 参数id是通过url进行传递的

然后找到api/user-api中找到removeUserById并且查看调用方式

然后将它引入到user-test-modle.js中

```js
import { getUserList,addUser,findUserById,updateUser,removeUserById } from '../../../api/user-api.js'
```

在actions中定义deleteById函数调用删除接口

```js
actions:{
  async deleteById({},id){
    await removeUserById(id)
  }
}
```

在user-test.vue中的mapActions中增加deleteById

```js
...mapActions('userTestModel',['getListForPage','deleteById']),
```

在handleDelete中增加调用删除接口的逻辑

```js
methods:{
	async handleDelete(id){
    console.log(id)
    let confirm = await this.$confirm('正在删除当前数据，点击确认继续','提交',{type:'warning'}).catch(err => err)
    //当点击确认返回的是confirm点击取消返回的是cancel
    console.log(confirm)
    if(confirm=='confirm'){
      //如果点击确认就执行删除功能
      await this.deleteById(id)
      //执行完删除功能之后需要再次调用查询才能看到数据变化
      await this.getListForPage(this.queryForm)
    }
    
  }
}
```

至此删除功能也完美实现。

> 全局总结：
>
> 增删改查没有什么捷径也没有太多技术含量，都是固定流程。所以要多练习，并且熟练记住每个环节的流程，应该要编写的代码。

>
> 所有的vue文件就是视图文件，主要功能用来描述页面，定义一些点击事件，表单验证等。
>
> x x x-mode.js这个文件就是每个模块的业务文件，用来再视图中调用并且通过参数返回值等处理业务。所以这个文件就是用来调用接口处理业务的。
>
> Xxx-api.js这个文件就是用来映射接口文档中的每一个接口的，里面的文件就是按照业务模块的接口文档的特性传递参数定义调用接口的函数，他主要在model中进行调用


## 4.作业：

1. 今天的作业就是通过课堂学习的部分，将用户管理作业模块的增删改查全部写完。
2. 写完这个作业之后我们再写一套，类型管理的商品类型管理的增删改查

注意商品类型的增删改查没有现成的接口函数。具体操作事项如下：

1. 创建页面，在views中的type中的goods-type文件夹创建goods-type.vue和goods-type-model.js以及其他页面
2. model部分的格式仿照用户模块写，一定要注意还要在store/index.js中注册这个模块，具体流程参考增删改查讲解
3. 在api/goods-type-api.js中创建接口函数，仿照user-api.js中的格式写
4. 顺序按照列表，条件查询，分页，增加，修改，删除这个顺序，参考这两天的增删改查流程写。
5. 商品类型模块的路由已经在菜单配置好具体的path点击菜单查看即可



