# React基础练习

## 1.回顾vue学习初期的table增删改查

1. 回顾我们过去用vue做过的增删改查的案例
2. 打开[table.html]()查看并然后我们将查询实现

## 2.查询

1. 查看当前的数据state中的list

2. 使用map循环将当前的部分混合jsx输出到tbody中首先展示序号和操作中的按钮

3. 代码如下(这里采用map循环返回一个数组，数组中采用将返回值编程jsx标签的形式输出到页面)

   ```jsx
   {
     this.state.list.map((item,index) => {
       return (
         <tr key={item.id}>
           <td>{index}</td>
           <td></td>
           <td></td>
           <td></td>
           <td></td>
           <td>
             <button>
               修改
             </button>
             <button>
               删除
             </button>
           </td>
         </tr>
       )
     })
   }
   ```

4. 然后我们将每一列的数据一一提取到页面形成查询页面需要的效果

   ```jsx
   {
     this.state.list.map((item,index) => {
       return (
         <tr key={item.id}>
           <td>{index}</td>
           <td>{item.name}</td>
           <td>{item.phone}</td>
           <td>{item.email}</td>
           <td>{item.birthday}</td>
           <td>
             <button>
               修改
             </button>
             <button>
               删除
             </button>
           </td>
         </tr>
       )
     })
   }
   ```

   为什么要return一对小括号

   其实 加与不加是没有问题。当前用的是 jsx ，需要经过 babel-react 过的,它的原理是因为

   ```jsx
   return <div></div>
   ```

   最终会被babel-react 转换成 类似

   ```js
   return createElement('div')
   ```

5. 然后思考一下将手机号码中间四位隐藏编程****如何实现

6. 由于react中没有computed计算属性，但是我们可以使用定义函数的方式模拟计算属性

7. 在App对象中定义一个makePhone函数

   ```js
   makePhone(phone){
     console.log(phone)
     return phone
   }
   ```

8. 将函数在jsx部分调用

   ```jsx
   //这里只截取phone代码的部分自行寻找替换
   <td>{this.makePhone(item.phone)}</td>
   ```

9. 当前代码增加之后我们的页面不会有任何变化，但是控制台会输出每一行的phone这样我们就可以在展示的过程中使用makePhone进行手机号码处理了

10. 处理逻辑如下（还是老办法）

    ```js
    makePhone(phone){
      console.log(phone)
      let str = phone.substring(0,2)+'****'+phone.substring(7)
      return str
    }
    ```

11. 到此查询页面处理完毕

## 3.新增

   1. 首先给新增按钮加一个点击事件,然后定义一个点击事件

      ```jsx
      <button onClick={(event)=>{this.handleAdd(event)}}>新增</button>
      handleAdd(){
        console.log(123)
      }
      ```

   2. 新增需要一个状态来给最后一行增加一个空行，并且新增状态下需要隐藏我们的新增按钮, 在state中增加一个isInsert:false,并且在handleAdd函数中将它设置成true

      ```js
       handleAdd(){
         this.setState({
           isInsert:true
         })
       }
      ```

   4. 接下来我们先实现切换按钮的显示和隐藏，这里我们通过条件渲染的形式改造将新增按钮的代码改造成如下效果

      ```jsx
      {
        this.state.isInsert == false?
          <button onClick={(event)=>{this.handleAdd(event)}}>新增</button>
          :
        ''
      }
      ```

   5. 这样当我们点击新增按钮时新增按钮就会消失

   6. 接下来我让表格的最后一行新增一个可输入的行,改造handleAdd

      ```js
      handleAdd(){
        let list = this.state.list
        list.push({
          id:'a'+new Date().getTime(),
          name:'',
          phone:'',
          email:'',
          birthday:''
        })
        this.setState({
          isInsert:true,
          list:list
        })
      }
      ```

   7. 测试点击按钮会新增行，把新增行的内容改造成可输入的文本框，并且还需要将修改和删除按钮改造成确认和取消

   8. 首先是文本框部分,以name为例子

      ```jsx
      {
        this.state.isInsert == true && index == this.state.list.length-1 ? 
          <input />
          :
        item.name
      }
      ```

   9. 改造后如下

      ```jsx
      {
        this.state.list.map((item,index) => {
          return (
            <tr key={item.id}>
              <td>{index}</td>
              <td>
                {
                  this.state.isInsert == true && index == this.state.list.length-1 ? 
                    <input />
                    :
                  item.name
                }
              </td>
              <td>
                {
                  this.state.isInsert == true && index == this.state.list.length-1 ? 
                    <input />
                    :
                  this.makePhone(item.phone)
                }  
              </td>
              <td>
                {
                  this.state.isInsert == true && index == this.state.list.length-1 ? 
                    <input />
                    :
                  item.email
                } 
              </td>
              <td>
                {
                  this.state.isInsert == true && index == this.state.list.length-1 ? 
                    <input />
                    :
                  item.birthday
                } 
              </td>
              <td>
                <button>
                  修改
                </button>
                <button>
                  删除
                </button>
              </td>
            </tr>
          )
        })
      }
      ```

   10. 接下来是按钮部分

       ```jsx
       <td>
         {
           this.state.isInsert == true 
           && index == this.state.list.length-1?
             <div>
               <button>
                 确认
               </button>
               <button>
                 取消
               </button>
             </div>
             :
             <div>
       
             <button>
               修改
             </button>
             <button>
               删除
             </button>
           </div>
         }
       
       </td>
       ```

   11. 解决输入问题后，现在的文本框只是死的没有绑定数据，我们需要对input绑定value和onChange事件来双向绑定数据

   12. 首先将list输出到页面的下方{JSON.stringify(this.state.list)}

   13. 然后我们参考name部分的改造将下面的所有部分都改造一致

       ```jsx
       //将input绑定item.name并定义输入事件，传入事件对象以及index
       <input 
         value={item.name}
         onChange={(e)=>{
           this.handleNameChange(e,index)
         }}
         />
       //定义的修改姓名函数如下
       handleNameChange(e,index){
         console.log(e,index)
       	//获取当前的数组  
         let list = this.state.list
         //更改当前行的name的值
         list[index].name = e.target.value
         //更新页面
         this.setState({
           list
         })
       }
       ```

   14. 全部改造完毕如下效果

       ```jsx
       <!DOCTYPE html>
       <html>
         <head>
           <meta charset="utf-8" />
           <title></title>
         </head>
         <body>
           <div id="app"></div>
           <script src="https://cdn.staticfile.org/react/16.4.0/umd/react.development.js"></script>
           <script src="https://cdn.staticfile.org/react-dom/16.4.0/umd/react-dom.development.js"></script>
           <!-- 生产环境中不建议使用 -->
           <script src="https://cdn.staticfile.org/babel-standalone/6.26.0/babel.min.js"></script>
           <script type="text/babel">
             class App extends React.Component {
               constructor(props) {
                 super(props);
                 this.state = {
                   list:[
       							{
       								id:'a001',
       								name:'阳顶天',
       								phone:'17388889887',
       								email:'xxx@xxx.com',
       								birthday:'20xx-0x-0x'
       							},
       							{
       								id:'a002',
       								name:'杨逍',
       								phone:'17388889888',
       								email:'xxx@xxx.com',
       								birthday:'20xx-0x-0x'
       							},
       							{
       								id:'a003',
       								name:'张无忌',
       								phone:'17388889889',
       								email:'xxx@xxx.com',
       								birthday:'20xx-0x-0x'
       							},
       							{
       								id:'a004',
       								name:'张三丰',
       								phone:'17388889880',
       								email:'xxx@xxx.com',
       								birthday:'20xx-0x-0x'
       							}
                   ],
                   isInsert:false
                 };
               }
               makePhone(phone){
                 console.log(phone)
                 let str = phone.substring(0,2)+'****'+phone.substring(7)
                 return str
               }
               handleAdd(){
                 let list = this.state.list
                 list.push({
                   id:'a'+new Date().getTime(),
                   name:'',
                   phone:'',
                   email:'',
                   birthday:''
                 })
                 this.setState({
                   isInsert:true,
                   list:list
                 })
               }
               handleNameChange(e,index){
                 console.log(e,index)
                 let list = this.state.list
                 list[index].name = e.target.value
                 this.setState({
                   list
                 })
               }
               handlePhoneChange(e,index){
                 console.log(e,index)
                 let list = this.state.list
                 list[index].phone = e.target.value
                 this.setState({
                   list
                 })
               }
               handleEmailChange(e,index){
                 console.log(e,index)
                 let list = this.state.list
                 list[index].email = e.target.value
                 this.setState({
                   list
                 })
               }
               handleBirthdayChange(e,index){
                 console.log(e,index)
                 let list = this.state.list
                 list[index].birthday = e.target.value
                 this.setState({
                   list
                 })
               }
               // render相当于vue中的template模版部分在这里通过return返回一个jsx模版
               //模版要求有且只有一个根结点
               render() {
                 return (
                   <div>
                     <h4>table练习</h4>
                     {
                       this.state.isInsert == false?
                       <button onClick={(event)=>{this.handleAdd(event)}}>新增</button>
                       :
                       ''
                     }
                     
                     <table border="1">
                       <thead>
                         <tr>
                           <th>序号</th>
                           <th>姓名</th>
                           <th>电话</th>
                           <th>邮箱</th>
                           <th>生日</th>
                           <th>操作</th>
                         </tr>
                       </thead>
                       <tbody>
                         {
                           this.state.list.map((item,index) => {
                             return (
                               <tr key={item.id}>
                                 <td>{index}</td>
                                 <td>
                                   {
                                     this.state.isInsert == true && index == this.state.list.length-1 ? 
                                     <input 
                                       value={item.name}
                                       onChange={(e)=>{
                                         this.handleNameChange(e,index)
                                       }}
                                      />
                                     :
                                     item.name
                                   }
                                 </td>
                                 <td>
                                   {
                                     this.state.isInsert == true && index == this.state.list.length-1 ? 
                                     <input 
                                       value={item.phone}
                                       onChange={(e)=>{
                                         this.handlePhoneChange(e,index)
                                       }}
                                      />
                                     :
                                     this.makePhone(item.phone)
                                   }  
                                 </td>
                                 <td>
                                   {
                                     this.state.isInsert == true && index == this.state.list.length-1 ? 
                                     <input 
                                       value={item.email}
                                       onChange={(e)=>{
                                         this.handleEmailChange(e,index)
                                       }}
                                      />
                                     :
                                     item.email
                                   } 
                                 </td>
                                 <td>
                                   {
                                     this.state.isInsert == true && index == this.state.list.length-1 ? 
                                     <input 
                                       value={item.birthday}
                                       onChange={(e)=>{
                                         this.handleBirthdayChange(e,index)
                                       }}
                                      />
                                     :
                                     item.birthday
                                   } 
                                 </td>
                                 <td>
                                   {
                                     this.state.isInsert == true 
                                       && index == this.state.list.length-1?
                                       <div>
                                         <button>
                                           确认
                                         </button>
                                         <button>
                                           取消
                                         </button>
                                       </div>
                                       :
                                       <div>
                                         
                                         <button>
                                           修改
                                         </button>
                                         <button>
                                           删除
                                         </button>
                                       </div>
                                   }
                                   
                                 </td>
                               </tr>
                             )
                           })
                         }
                       </tbody>
                     </table>
                     {JSON.stringify(this.state.list)}
                   </div>
                 );
               }
             }
             ReactDOM.render(
               <div>
                 <App />
               </div>,
               document.querySelector("#app")
             );
           </script>
         </body>
       </html>
       
       ```

   14. 对比无误之后输入的数据可以绑定到新增行的数据中

## 4.保存

   1. 接下来我们要对数据进行保存，实际上就是相当于变更状态

   2. 给确认按钮绑定事件onClick={()=>{this.handleAddConfirm()}}，并创建函数，新增只需要变更状态即可

      ```js
      handleAddConfirm(){
        this.setState({
          isInsert:false
        })
      }
      ```

   3. 然后是取消给取消按钮绑定事件onClick={()=>{this.handleAddCancel()}}

      ```js
      handleAddCancel(){
      	//获取list  
        let list = this.state.list
        //删除最后一行
        list.pop()
        //更新页面变更状态
        this.setState({
          isInsert:false,
          list
        })
      }
      ```

## 5.修改

1. 接下来是修改，回顾我们过去的操作回忆，修改其实就是给每一个数组的内容增加一个状态

2. 我们在componentWillMount这个生命周期中去处理当前的list给它们每一个加上isUpdate：false

   ```jsx
   componentWillMount(){
     console.log(123)
     let list = this.state.list;
     this.setState({
       list:list.map(item => {
         item.isUpdate = false
         return item
       })
     })
   }
   ```

3. 然后我们给每一个修改按钮增加一个点击事件,然后点击查看状态是否变更

   ```js
   <button onClick={() => this.handleEdit(index)}>
     修改
   </button>
   handleEdit(index){
     let list = this.state.list;
     list[index].isUpdate = true
     this.setState({
       list
     })
   }
   ```

4. 每行的状态变更之后我们还是在原来的表格部分根据修改的状态在做判断，这个判断由于不能使用if-else所以我们采用在三元表达式中嵌套三元表达式

   ```jsx
   //以name为例子，剩余全部改成如下样子
   {
     this.state.isInsert == true && index == this.state.list.length-1 ? 
       <input 
         value={item.name}
         onChange={(e)=>{
           this.handleNameChange(e,index)
         }}
         />
       :
     (
       item.isUpdate == true?
       <input 
         value={item.name}
         onChange={(e)=>{
           this.handleNameChange(e,index)
         }}
         />
       :
       item.name
     )
   
   }
   ```

5. 然后我们改造按钮部分

   ```jsx
   {
     this.state.isInsert == true 
     && index == this.state.list.length-1?
       <div>
         <button onClick={()=>{this.handleAddConfirm()}}>
           确认
         </button>
         <button onClick={()=>{this.handleAddCancel()}}>
           取消
         </button>
       </div>
       :
     (
       item.isUpdate == true?
       <div>
         <button >
           确认
         </button>
         <button >
           取消
         </button>
       </div>
       :
       <div>
         <button onClick={() => this.handleEdit(index)}>
           修改
         </button>
         <button>
           删除
         </button>
       </div>
     )
   
   }
   ```

6. 改造完毕我们点击修改测试一下是否按钮和文本框全部变更，发现可用代表成功。我们在处理修改和取消之前还要在点击修改的按钮时创建一个对象保存当前行的数据。

7. 在state对象中追加temp:{}属性，然后在点击修改按钮的函数中我们将当前行数据复制一份交给temp，一定要使用复制，防止引用类型数据联动

   ```jsx
   handleEdit(index){
             let list = this.state.list;
             list[index].isUpdate = true
             //存储当前的原始数据
             this.setState({
               list,
               //++++++++++++++++++++++一定要深拷贝
               temp:{...list[index]}
             })
           }
   ```

   

8. 然后我们给确认按钮和取消按钮分别绑定两个事件handleEditConfirm和handleEditCancel

   ```jsx
    <button onClick={() => {
       this.handleEditConfirm(index)
     }}>
     确认
   </button>
   <button  onClick={() => {
       this.handleEditCancel(index)
     }}>
     取消
   </button>
    handleEditConfirm(index){
      console.log(index)
    }
   handleEditCancel(index){
     console.log(index)
   }
   ```

9. 首先我们完成修改的确认，确认就是变更当前行的状态，所以我们改造handleEditConfirm如下

   ```js
   handleEditConfirm(index){
     console.log(index)
     let list = this.state.list
     list[index].isUpdate = false
     this.setState({
       list
     })
   }
   ```

10. 取消的逻辑是将当前行的数据换回点击修改时的原始数据，所以我们需要把原始数据复制给当前行然后更新页面

    ```js
    handleEditCancel(index){
      console.log(index)
      //获取当前的list
      let list = this.state.list
      //将原始数据temp复制给list[index]
      list[index] = {...this.state.temp}
      //将状态设置成不修改
      list[index].isUpdate = false
      this.setState({
        list
      })
    }
    ```

11. 到这里修改逻辑就完成了

12. 接下来我们完成删除逻辑，首先给删除按钮增加点击事件handleDelete

    ```jsx
    <button onClick={() => this.handleRemove(index)}>
      删除
    </button>
    ```

13. 然后我们在点击事件中做逻辑处理

    ```js
    handleRemove(index){
      let res = window.confirm('确认删除吗？')
      if(res){
        //得到当前的list
        let list  = this.state.list
        //删除一个
        list.splice(index,1)
        //更新页面
        this.setState({
          list
        })
      }
    }
    ```

14. 到此我们便通过react的基础语法完成了我们学习vue时候做的第一个比较复杂的练习，对比一下发现代码量和复杂度都要比vue的项目要高，这是正确的，因为react相对于vue是更加原始更加偏向底层的，所以在框架中几乎没有便捷的语法糖，整个逻辑和开发模式都需要开发者自己构建按照自己的思路更自由的编写代码而不需要受语法的束缚，这也带来了react的上手难度更高，对初学者更不友好的效果了

## 2.在create-react-app中使用react

### 2.1creact-react-app的安装和使用

create-react-app是一个类似于@vue/cli的快速开发脚手架，他集成了很多快捷功能，方便我们快速的构建前端react项目。使用方式如下

1. 在命令行中输入 `npm -v`确保npm的版本在6以上如果不是6以上的执行`npm -g i npm`来执行npm的更新

2. 快速创建create-react-app项目

   ```sh
   #首先在今天的案例文件夹上右键打开控制台，然后在命令行中输入如下指令
   #npm init react-app {项目名称}这样npm会自动下载脚手架模版并初始化项目
   npm init react-app my-app
   ```

3. 项目创建完毕之后的结构是这样的

   ```sh
   my-app
   ├── README.md
   ├── node_modules
   ├── package.json
   ├── .gitignore
   ├── public #静态目录，项目的html模版文件夹
   │   ├── favicon.ico
   │   ├── index.html
   │   └── manifest.json
   └── src
       ├── App.css #App.js的样式文件
       ├── App.js #根组件相当于App.vue
       ├── App.test.js #App.js的测试用例
       ├── index.css #index.js的样式文件
       ├── index.js #入口文件，相当于vue项目中的main.js
       ├── logo.svg
       └── serviceWorker.js #这个文件暂时无用
   ```

4. 然后我们做如下改造，将App.js的后缀改成jsx

5. 用命令行打开项目路径输入`npm start`

启动成功之后我们简单的了解一下react的项目结构发现很多地方和vue的脚手架类似，每一个文件就是一个组件，每个组件的样式单独是一个css文件。

我们将这个项目改造成我们更加熟悉的样子

### 2.2 修改好的脚手架

打开react-study项目，并启动他然后我们查看文件目录发现文件目录和以前做的vue项目类似，并且在这个项目中使用了components文件夹来存放了三个组件。

我们在进入项目内部看一下

```jsx
//发现组件都是以这种形式使用的，这种写法叫做函数式组件，
import React from 'react'
function Left(props){
	return (
		<div className="left">
			{props.name}
		</div>
	)
}
export default Left
```

> 函数式组件的注意事项
>
> 1. 函数式组件在项目开发中由于书写代码量要少于class形式的，所以应用更加广泛
> 2. 函数式组件中不需要使用this对象来在{}引用值，
> 3. 函数式组件本身就相当于构造函数所以props直接在函数的参数中
> 4. 函数式组件中可以配合hook来实现不通过state对象来更加优雅的设置值
> 5. 函数式组件只需要引入React对象，不需要将它放在函数中使用

了解完函数形式组件之后我们再查看一下App.jsx学习一下在react中使用css设置样式的方式，由于react本身并没有style标签所以无法在文件内部直接编写css样式，所以他提供了两种css样式设置方式，一种是全局引用，就是将编写好的css文件通过import的形式直接引入到App.jsx或者其他的某个jsx文件中这种方式就能将样式应用到html标签上，只要名称一一对应就可以，不过这种样式定义相当于vue文件中的在style标签内部直接编写的效果，他是全局应用的，所以只要使用了全局样式的引入，任何jsx页面的内容都会应用这个样式。

另外提供了一个局部引用的方式类似于vue的scoped效果，这种方式参考Left.jsx文件中的样式设置

## 总结：

今天我们学习了什么是react，以及react的基本语法，这里我们更多的练习了class方式的react，最后我们又学习了函数式组件的react，明天我们会围绕脚手架+函数式组件来学习react，由于react发展期经历了这两个阶段所以我们以后还是有机会遇到通过class方式使用的react项目，所以需要学习class的写法