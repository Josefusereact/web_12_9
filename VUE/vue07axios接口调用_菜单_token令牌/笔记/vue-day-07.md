# Vue项目实战3

## 今日内容

1. 部署本地后台服务并学习如何查看接口文档
2. 在axios-demo中引入axios并学习如何通过axios调用接口
3. 在admin-demo中实现登录接口的调用并实现增加菜单的接口调用

## 1.部署本地后台服务并学习如何查看接口文档

### 1.1部署本地后台服务

1. 打开`md`中的shop-service项目，在项目上右键使用命令行打开

2. ```sh
    npm install
   ```

3. ```sh
   npm run start:dev
   ```

4. 当初下以下界面时

   ```sh
   [下午2:22:06] Starting compilation in watch mode...
   
   [下午2:22:10] Found 0 errors. Watching for file changes.
   
   [Nest] 6443   - 2020/10/02 下午2:22:11   [NestFactory] Starting Nest application...
   [Nest] 6443   - 2020/10/02 下午2:22:11   [InstanceLoader] AppModule dependencies initialized +20ms
   [Nest] 6443   - 2020/10/02 下午2:22:11   [InstanceLoader] ApiTestModule dependencies initialized +0ms
   [Nest] 6443   - 2020/10/02 下午2:22:11   [InstanceLoader] AuthModule dependencies initialized +1ms
   [Nest] 6443   - 2020/10/02 下午2:22:11   [InstanceLoader] UserModule dependencies initialized +1ms
   [Nest] 6443   - 2020/10/02 下午2:22:11   [DocumentBuilder] The "setBasePath" method has been deprecated. Now, a global prefix is populated automatically. If you want to ignore it, take a look here: https://docs.nestjs.com/recipes/swagger#global-prefix. Alternatively, you can use "addServer" method to set up multiple different paths.
   [Nest] 6443   - 2020/10/02 下午2:22:12   [RoutesResolver] AppController {/shop-service/v1}: +131ms
   [Nest] 6443   - 2020/10/02 下午2:22:12   [RouterExplorer] Mapped {/shop-service/v1, GET} route +2ms
   [Nest] 6443   - 2020/10/02 下午2:22:12   [RoutesResolver] UserController {/shop-service/v1/user}: +0ms
   [Nest] 6443   - 2020/10/02 下午2:22:12   [RouterExplorer] Mapped {/shop-service/v1/user/login, POST} route +1ms
   [Nest] 6443   - 2020/10/02 下午2:22:12   [RouterExplorer] Mapped {/shop-service/v1/user/login, PUT} route +1ms
   [Nest] 6443   - 2020/10/02 下午2:22:12   [RouterExplorer] Mapped {/shop-service/v1/user/hello, GET} route +1ms
   [Nest] 6443   - 2020/10/02 下午2:22:12   [RouterExplorer] Mapped {/shop-service/v1/user/list, GET} route +1ms
   [Nest] 6443   - 2020/10/02 下午2:22:12   [RouterExplorer] Mapped {/shop-service/v1/user/find/:id, GET} route +0ms
   [Nest] 6443   - 2020/10/02 下午2:22:12   [RouterExplorer] Mapped {/shop-service/v1/user/insert, PUT} route +1ms
   [Nest] 6443   - 2020/10/02 下午2:22:12   [RouterExplorer] Mapped {/shop-service/v1/user/update, PUT} route +1ms
   [Nest] 6443   - 2020/10/02 下午2:22:12   [RouterExplorer] Mapped {/shop-service/v1/user/list/page, GET} route +0ms
   [Nest] 6443   - 2020/10/02 下午2:22:12   [RouterExplorer] Mapped {/shop-service/v1/user/list/page/username, GET} route +1ms
   [Nest] 6443   - 2020/10/02 下午2:22:12   [RoutesResolver] ApiTestController {/shop-service/v1/api-test}: +0ms
   [Nest] 6443   - 2020/10/02 下午2:22:12   [RouterExplorer] Mapped {/shop-service/v1/api-test/get/demo1, GET} route +0ms
   [Nest] 6443   - 2020/10/02 下午2:22:12   [RouterExplorer] Mapped {/shop-service/v1/api-test/get/demo2, GET} route +1ms
   [Nest] 6443   - 2020/10/02 下午2:22:12   [RouterExplorer] Mapped {/shop-service/v1/api-test/post/demo1, POST} route +1ms
   [Nest] 6443   - 2020/10/02 下午2:22:12   [RouterExplorer] Mapped {/shop-service/v1/api-test/post/demo2, POST} route +1ms
   [Nest] 6443   - 2020/10/02 下午2:22:12   [RouterExplorer] Mapped {/shop-service/v1/api-test/path/demo1/username/:username/password/:password, POST} route +0ms
   [Nest] 6443   - 2020/10/02 下午2:22:12   [RouterExplorer] Mapped {/shop-service/v1/api-test/put/demo1, PUT} route +1ms
   [Nest] 6443   - 2020/10/02 下午2:22:12   [RouterExplorer] Mapped {/shop-service/v1/api-test/delete/demo1/id/:id, DELETE} route +0ms
   [Nest] 6443   - 2020/10/02 下午2:22:12   [RouterExplorer] Mapped {/shop-service/v1/api-test/delete/demo2, DELETE} route +1ms
   [Nest] 6443   - 2020/10/02 下午2:22:12   [RouterExplorer] Mapped {/shop-service/v1/api-test/delete/demo3, DELETE} route +0ms
   [Nest] 6443   - 2020/10/02 下午2:22:12   [NestApplication] Nest application successfully started +3ms
   ```

5. 打开http://localhost:3000/api

6. 找到`接口调用练习`部分打开第一个

7. 点击`try it out`

8. 点击`Execute`查看结果

### 1.2什么是接口

刚才我们操作的步骤就是接口调用的步骤。那么什么是接口呢？

前端程序员使用的接口其实是`网络接口`，是服务端对前端提供的一个可以远程执行服务端代码的一个url的入口。

也就是说我们刚才点击`Execute`时发生的事情是我们通过访问了这个地址执行了一个服务端程序猿写的一段代码，这个代码的作用是把一组json数据返回给我们。

> 总结一下：前端的接口就是服务端对前端程序员提供的一种远程调用服务端程序的入口，前端程序员可以通过接口将需要服务端能力才能实现的功能通过ajax请求来实现，这个过程中前端程序猿不必关心后台接口是如何实现的，只需要阅读接口的调用规范，有什么参数，返回的数据是什么样的即可。

__所以我们可以再简单的理解为接口就是一个函数，他可能有参数，可能有返回值，我们不需要知道函数的具体实现过程，只学会如何调用即可。__

### 1.3如何使用接口文档

下面我们回到刚才的后台项目中`接口调用练习`部分的接口来查看每个接口的介绍和功能，并且打开浏览器的控制台，尝试调用接口，并结合控制台的network模块来查看接口的交互数据。

通过每个接口的介绍以及体验在结合我们过去学习的ajax知识我们来总结一下调用接口必备的几个属性。

1. url:就是后台接口地址，我们需要通过接口提供的url才能访问并执行后台接口的代码

2. method:就是请求的方式，我们现在的接口分为get/post/put/delete

   method参数本身并没有实际的功能，是后台程序猿根据具体的业务来定义method的内容，如进行查询操作多数都是get或post，进行编辑或新增操作多数为put，进行的是删除操作就使用delete，这样我们可以通过method首先了解接口的操作行为

3. 参数：接口可能有参数可能没有参数，参数可以通过三个部分进行传输，当method为get时我们一定是采用url路径进行传参数，当method为其他时，我们可以通过path和body进行传参数。具体什么时候使用什么位置传参数也是以后台程序猿为主，前端程序猿只需要按照接口文档的规范调用即可

4. 接口的返回类型，一般系统开发的业务接口后台程序猿都会做一个统一的返回对象其中包含(code/result)为状态码，状态码为200代表请求成功，其他情况均为不同的错误。其次是data，data包含后台接口返回的数据或其他数据内容，再次是(msg/message)代表接口调用结果的文字说明。__这里需要注意的是由这三个数据组成的对象是后台返回的人工封装对象，比如code与http请求的自身状态码无关，正常的系统开发中后台的程序猿会做统一的异常处理，所以调用的接口无论是执行成功还是失败，http请求中的状态码都为200，这里可以打开浏览器的控制台查看。当http的状态码不是200的时候说明后台的服务器存在系统及问题。__

## 2.在axios-demo中引入axios并学习如何通过axios调用接口

经过了刚才的学习我们已经知道了什么是后台的接口，以及接口的简单结构和调用方法，并且我们在过去学习过JQuery的ajax已经对接口调用有了一个简单的了解，这里我们来学习一下在Vue项目中比较重要的http访问对象axios。

### 2.1axios的安装和使用

1. 打开案例中的axios-demo项目，右键使用命令行打开，安装依赖并运行

2. ```sh
   npm install
   ```

3. ```sh
   npm run serve
   ```

4. 打开项目查看项目目录，从main.js阅读今天的项目与以往的一些差别

5. 按照main.js执行顺序参照注释解读如何将axios安装到Vue上

6. 我们打开`axios基础`页面，并点击调用按钮

7. 会看到如下错误

   ```sh
   Access to XMLHttpRequest at 'http://localhost:3000/shop-service/v1/api-test/get/demo1' from origin 'http://192.168.0.108:8080' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
   ```

8. 错误原因是因为我们的前端项目是运行在localhost:8080地址上的，而后台接口运行在localhost:3000地址上，由于两个项目不是一个服务器，被浏览器认为是一个不安全的跨域访问，这样我们就无法正常调用接口了

9. 解决这个问题我们需要在vue.config.js中将注释掉的代码打开，这段代码主要就是解决开发过程中由于前端程序猿和后台程序猿的服务地址不一样产生的跨域问题的。关于什么是反向代理后续的高级课程会做介绍。

   > 反像代理其实就是让前端的接口访问地址仍然写localhost:8080/并且通过本地代理服务器在服务器上悄悄的将地址转发到localhost:3000上这样浏览器认为我们的前端的请求发送地址还是自己8080，所以就不会产生跨域错误了

10. 以上步骤操作完毕之后我们回到Axios.vue中找到点击事件内将注释掉的url打开，将`handleClick`事件的url注释掉

11. 然后在点击第一个调用按钮，查看控制台中，出现了返回数据的打印对象，说明我们的接口已经成功的在项目中调用了

### 2.2 axios的基本使用介绍

[中文官方首页](http://www.axios-js.com)

axios与我们学习过的jQueryAjax实现的是同样的功能，他是一个专门的http访问对象，基于Promise进行封装，所以可以使用async和await语法进行同步化修饰

```js
//这里的this.$http()相当于axios()
//在/src/http/index.js中给Vue原型身上绑定了一个全局对象$http,这个是我们自己定义的
this.$http({
  baseURL:'/shop-service/v1',//接口前缀，当在项目默认配置中配置了baseURL之后就不需要在这里重复写了
  url:'/api-test/get/demo1'//接口地址，默认会在前面拼接baseURL，所以这里请求会被解释为/shop-service/v1/api-test/get/demo1
  method:'get',//请求的method类型
  data:{},//请求的body中的参数，data中的数据会被放到http对象的body中发送，当contentType为application/json或application/x-www-form-urlencoded时就需要使用data设置参数
  params:{},//请求的url中携带的参数，在这里设置的json对象会被解释为?key=value&key=value...拼接到请求路径的最后
  headers:{//这里是在请求中重写header部分参数的，默认可以不使用
    'Content-Type':'application/json'
  }
})
```

我们本次对axios的学习主要就学习以上中必须使用的url，method，data，params等.

下面我们结合axios-demo中的axios基础部分的代码进行具体的学习。

> 总结：完成本页面的学习之后我们能初步的掌握axios调用接口的规范和基本结构，并且要掌握外部引入的方式去调用接口，因为这种方式可以将接口调用的业务逻辑从页面部分抽取出去达到一个解耦的效果（api目录下的js文件），可以增加接口函数的复用率和项目维护性。

完成axios基础之后我们在axios练习页面中把接口调用练习中剩余的接口全部调用一遍，要求使用async和await的方式，并采用外部引入的方式。

练习作为作业：

> 说明，练习需要做的内容就是将基础部分的几个接口按照一样的形式在练习页面中重写一次



## 3. 接口调用实战

1.在admin-demo中实现登录接口的调用

2.实现增加菜单的接口调用

### 3.1启动admin-demo项目实现登录的调用

回顾启动项目步骤，首先打开案例中的admin-demo然后执行`npm install`,`npm run serve`

当项目启动后我们访问http://localhost:8080/#/login

进入登录页面，查看当前页面的代码，我们发现已经定义好了username和password变量

并且给按钮绑定了点击事件。下面我们来确认一下实现步骤

1. 结合过去学的内容对username和password先进行一个非空验证并让输入框具备clearable功能
2. 查看项目结构，发现vue.config.js中已经配置了proxy，并且项目中的http文件夹和api文件夹也已经定义。
3. 查看api/user-api.js在内部已经定义了接口的方法，我们参考之前的学习将接口函数的内容补全。对应要调用的接口在接口文档的用户接口中，我们去查阅接口文档查看method，参数，以及url路径都是什么。现在接口文档中尝试调用接口。然后我们在项目的api/user-api.js中将接口调用方式补全
4. 模仿之前案例，在Login.vue中引入login接口函数，并且在点击事件中调用
5. 根据res.data.code的值进行判断接口调用是否成功，如果code是200就执行跳页跳到Index.vue
6. 如果res.data.code的值不是200就不进行跳页面，并通过之前学习的$notify通知组件将res.data.msg中的内容弹出。
7. *完善用户体验，在data中定义loading属性给登录按钮加上loading状态*
8. 以上按步骤操作就能实现最基本的登录验证

### 3.2导航菜单组件

我们实现了登录验证动作之后，已经可以通过用户登录接口实现登录验证了。登录之后我们来看左侧的菜单部分，如果只是通过这种链接的形式展示是很丑陋的，使用element-ui的导航菜单功能将菜单替换成导航菜单组件。

> 通过代码注释和官方文档的介绍我们以半自学的方式来学习菜单

打开[官方文档](https://element.eleme.cn/#/zh-CN/component/menu)，我们来查看所有导航菜单的示例还有导航菜单的参数和嵌套结构。

我们着重查看一下`el-menu`,  `el-submenu`,   `el-menu-item`

然后我们将案例的Index.vue打开，查看el-aside中的菜单代码，展示一个导航菜单的示例，我们参考代码中的注释熟悉菜单的基本用法。

### 3.3通过接口获取菜单数据并渲染到菜单里

1. 熟悉了导航菜单的用法之后，发现el-menu是通过Vue data中的数据来渲染的。如果是在真正的项目开发中这些数据都是通过当前的用户从服务器获取的真实数据，接下来通过接口获取用户菜单

2. 找到接口文档`用户接口` `/shop-service/v1/user/menu/list`这个接口

3. 查看接口文档发现这个是一个普通的get接口，没有参数，那么我们还是现在页面中调试一下接口。

4. 在try it out中我们发现这个接口不能正常返回数据，结果如下

   ```json
   {
     "code": 401,
     "timestamp": "2020-10-04T08:35:10.611Z",
     "path": "/shop-service/v1/user/menu/list",
     "msg": "Unauthorized"
   }
   ```

5. 在项目开发中401代表授权失败，由于我们的web管理系统都是用用户的，那么用户在登录之后，才能使用服务器的接口获取数据，这是防止非本平台的用户通过获取接口地址之后进行数据盗刷的行为。

6. 所以在正式的系统接口调用中当我们用户登录之后服务器会给用户返回一个登录的凭证，每次用户在调用接口时需要拿着这个凭证才能成功的调用后台的接口。

   1. 具体操作如下，打开用户登录接口，尝试在接口文档中调用

      ```json
      //查看结果发现有一个token属性
      {
        "code": 200,
        "data": {
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsInBhc3N3b3JkIjoiMTIzNDU2Iiwicm9sZUlkIjoiMDAxIiwibmlja25hbWUiOiLnrqHnkIblkZgiLCJmYWNlIjoiIiwiaW5zZXJ0VGltZSI6MTYwMTI5NjEwMjg1NSwiaWF0IjoxNjAxODAwNjczLCJleHAiOjE2MDE4MDQyNzN9.qeK_CusrHJKuaU80iIjd_hVZWOdjsvsJvjaI0skALUI",
          "userInfo": {
            "id": 1,
            "username": "admin",
            "password": "123456",
            "roleId": "001",
            "nickname": "管理员",
            "face": "",
            "insertTime": 1601296102855
          }
        },
        "msg": "登录成功"
      }
      ```

   2. token就是用户登录成功得到的一个令牌，这个令牌可以在后续的接口调用中作为一个通行证使用，只有携带令牌的人才能正常调用接口。那么如何在接口文档中测试需要令牌的接口呢？

   3. 首先自己调用一下登录接口，复制当前的token结果（不要复制笔记中的）。

   4. ![p1](p1.png)

   5. 结合图片我们看到了**Authorize**按钮。点击这个按钮并将当前获得的token粘贴到弹出的输入框中再次点击输入框中的**Authorize**按钮。然后点击**close**按钮关闭弹窗

7. 当我们执行完上面的操作之后再次测试菜单接口

   ```json
   {
     "code": 200,
     "data": {
       "list": [
         {
           "id": "1",
           "name": "系统设置",
           "icon": "el-icon-setting",
           "children": [
             {
               "id": "11",
               "name": "用户管理",
               "icon": "el-icon-user",
               "url": "/user"
             },
             {
               "id": "12",
               "name": "菜单管理",
               "icon": "el-icon-menu",
               "url": "/menu"
             }
           ]
         },
         {
           "id": "2",
           "name": "商城管理",
           "icon": "el-icon-setting",
           "children": [
             {
               "id": "21",
               "name": "商品类型管理",
               "icon": "el-icon-user",
               "url": "/goods-type"
             },
             {
               "id": "22",
               "name": "商品管理",
               "icon": "el-icon-menu",
               "url": "/goods"
             }
           ]
         }
       ]
     },
     "msg": "查询成功"
   }
   ```

8. 就会得到如下这正常返回的结果了。

9. 这个就是在接口文档中解决登录授权的问题。如果这个接口需要携带token的话我们在代码中调用接口就同样需要每次都携带这个token。如何通过代码实现这个登录验证呢？

   1. 回到Login.vue中，当我们做上一个练习时已经实现了用户登录的接口调用，那么我们在登录成功时同样会得到token字符串，那如何让其他的接口也能拿到这个token字符串呢？我们可以通过sessionStorage来将token存储到本地会话中，比如我们在登录成功之后

      ```js
      sessionStorage.token = res.data.data.token
      ```

   2. 然后我们去http/index.js中，由于这个token需要在除了登录接口的每个接口都携带，所以我们就需要在之前介绍的请求拦截器中去做操作了。

   3. 只需要我们将sessionStorage.token的值存储正确之后，我们去http/index.js中将请求拦截器部分的代码打开。

10. 经过以上的操作之后我们就可以在user-api中添加菜单查询接口的调用了。传入url和method两个参数之后我们在Index.vue中引入这个接口函数，并且在created生命周期中调用，至于为什么要在created生命周期中调用是因为created之后data的menuList才能初始化完毕，我们在created中先测试这个接口的返回值是否能正常打印，如果能正常打印之后，我们在打开浏览器的控制台查看network部分来查看这个带有token的接口是如何操作的。

11. 当数据可以正常获取之后我们要做一个操作就是将本地的menuList的数据注释掉，此时页面的菜单应该会消失。然后我们在调用获取菜单的接口的成功回调函数中将code为200时得到的数据赋值给menuList。由于接口数据的格式与本地一样，如果菜单再次出现说明成功。

12. 以上就是通过token调用有授权管理接口的方法

## 作业

通过学习的admin-demo项目中学习的内容，将axios-demo中的菜单改造成导航菜单

