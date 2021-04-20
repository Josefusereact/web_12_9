# WEB前端高级知识04

## 今日内容

1. css预处理器介绍（sass+less简介）
2. sass基础以及sass的使用
3. less基础以及less的使用

## 1.css与处理器介绍

#### 一、什么是CSS预处器

CSS预处理器定义了一种新的语言，其基本思想是，用一种专门的编程语言，为CSS增加了一些编程的特性，将CSS作为目标生成文件，然后开发者就只要使用这种语言进行编码工作。通俗的说，CSS预处理器用一种专门的编程语言，进行Web页面样式设计，然后再编译成正常的CSS文件，以供项目使用。CSS预处理器为CSS增加一些编程的特性，无需考虑浏览器的兼容性问题，例如你可以在CSS中使用变量、简单的逻辑程序、函数等等在编程语言中的一些基本特性，可以让你的CSS更加简洁、适应性更强、可读性更佳，更易于代码的维护等诸多好处。

CSS预处理器技术已经非常的成熟，而且也涌现出了很多种不同的CSS预处理器语言，比如说：Sass（SCSS）、LESS、Stylus、Turbine、Swithch CSS、CSS Cacheer、DT CSS等。如此之多的CSS预处理器，那么“我应该选择哪种CSS预处理器？”也相应成了最近网上的一大热门话题，在Linkedin、Twitter、CSS-Trick、知呼以及各大技术论坛上，很多人为此争论不休。相比过计我们对是否应该使用CSS预处理器的话题而言，这已经是很大的进步了。

到目前为止，在众多优秀的CSS预处理器语言中就属Sass、LESS和Stylus最优秀，讨论的也多，对比的也多。本文将分别从他们产生的背景、安装、使用语法、异同等几个对比之处向你介绍这三款CSS预处理器语言。相信前端开发工程师会做出自己的选择——我要选择哪款CSS预处理器。

#### 二、Sass、LESS背景介绍

为了能更好的了解这三款流行的CSS预处理器，我们先从其背景入手，简单的了解一下各自的背景信息。

1.Sass背景介绍

Sass是对CSS（层叠样式表）的语法的一种扩充，诞生于2007年，最早也是最成熟的一款CSS预处理器语言，它可以使用变量、常量、嵌套、混入、函数等功能，可以更有效有弹性的写出CSS。Sass最后还是会编译出合法的CSS让浏览器使用，也就是说它本身的语法并不太容易让浏览器识别，因为它不是标准的CSS格式，在它的语法内部可以使用动态变量等，所以它更像一种极简单的动态语言。

其实现在的Sass已经有了两套语法规则：一个依旧是用缩进作为分隔符来区分代码块的；另一套规则和CSS一样采用了大括号（｛｝）作为分隔符。后一种语法规则又名SCSS，在Sass3之后的版本都支持这种语法规则。

注：Sass官网地址：[http://sass-lang.com](http://sass-lang.com/)

2.LESS的背景介绍

2009年开源的一个项目，受Sass的影响较大，但又使用CSS的语法，让大部分开发者和设计师更容易上手。LESS提供了多种方式能平滑的将写好的代码转化成标准的CSS代码，在很多流行的框架和工具中已经能经常看到LESS的身影了（例如Twitter的Bootstrap框架就使用了LESS）。

根据维基百科上的介绍，其实LESS是Alexis Sellier受Sass的影响创建的一个开源项目。当时SASS采用了缩进作为分隔符来区分代码块，而不是CSS中广为使用的大括号（｛｝）。为了让CSS现有的用户使用起来更佳方便，Alexis开发了LESS并提供了类似CSS的书写功能。

注：LESS的官网：http://lesscss.org



## 2.SASS基础以及SASS的使用

我们在过去的项目中使用过sass的语法，但是我们只使用了嵌套形式的sass语法来实现让css的代码结构更加简洁

```scss
//sass代码结构
.list{
	color:red;
  .item:{
    font-size:12px
  }
  .item:nth-child(2n){
    background-color:'#eee'
  }
}
```

我们通过这种结构的css代码编写预先体验了一下sass的基本用法，其实sass已经在css的基础上增加了逻辑编程的元素变成了更加自由灵活的样式编程语言。

下面我们通过案例学习一下sass的基本使用

打开案例中的`sass-demo`项目

安装依赖并且运行。

1. 我们访问第一个页面`定义变量`学习其中的变量声明方式，并仿照案例做一些练习。

   1. 定义全局变量的用处，例如为elementui定义[自定义主题](https://element.eleme.cn/#/zh-CN/component/custom-theme)， [在线编辑主题](https://element.eleme.cn/#/zh-CN/theme)

2. 访问`外部引用`学习定义全局css规范的方式，仿照案例自己做一些练习

   1. 练习新建style.scss文件，引用文件并引用变量。

3. 访问`定义数组`学习定义批量生成样式的方式，并做一些练习

   1. 数组下标从1开始

   2. @each 遍历

   3. 获取数组元素nth( 数组名，索引 )

   4. \#{'.'}#{$item} 字符串拼接

   5. 小练习在outside.scss文件中最后一行添加如下数组

      ```scss
      $arr2: 'item1', 'item2','item3';
      ```

   5.并在Array.vue中引入 @import   "./outside.scss";

   6.要求让item1,item2,item3变成圆形

   ```scss
   @each $item in $arr2{
     #{'.'}#{$item}{
       width: 100px;
       height: 100px;
       border-radius: 50%;
       border:1px solid #eee;
       text-align: center;
       line-height: 100px;
     }
   }
   ```

   

4. 访问`定义map`学习scss中map的用法

   1. 使用小括号定义，

   2. 使用map-get函数取值

   3. 练习map➕数组练习

      1. 增加App.vue连接（/map-array），增加路由，增加MapArray.vue页面

      2. 插曲使用build命令生成dist目录的时候需要在vue.config.js文件把publicPath:'',设置成空

         这样做的目的是生成出来的目录引用的跟不会是这样，把路径前面的斜杠去掉，如果不去掉静态也不会打开

         <script src="/js/chunk-vendors.e5f50ab5.js"></script>

      3. MapArray.vue源代码

         ```vue
         <template>
           <div id="map-array">
               <h4>
                   <!-- 回顾使用vue -->
                   <div v-for="(item) in [1,2,3]" :key="item" :class="'item'+item">
                       item{{item}}
                   </div>
                   <!-- 以上的代码会生成 -->
                   <div class="item1"> item1 </div>
                   <div class="item2"> item2 </div>
                   <div class="item3"> item3 </div>
               </h4>
           </div>
         </template>
         
         <script>
         export default {
             name:'map-array',
         }
         </script>
         
         <style lang="scss" scoped>
         $arr:
         (name:'.item1', fontSize: 10px, color:rgb(0, 255, 13)),
         (name:'.item2', fontSize: 20px, color:rgb(24, 51, 138)),
         (name:'.item3', fontSize: 30px, color:rgb(194, 47, 182));
         @each $item in $arr{
             // {nth($arr, $i)}
             #{map-get($item, 'name')}{
                 color:map-get($item, 'color');
                 font-size: map-get($item,'fontSize');
             }
         }
         </style>
         ```

         

5. 访问`定义函数`学习函数的定义方法

   1. @function 定义函数，  @return 返回值

      ```scss
      @function num2px($num){
        @return #{$num}#{'px'}
      }
      ```

   2. 还有一些系统函数random()，nth()等

以上就是sass语法的最基础的常用语法，他还有很多复杂和高级的用法

我们在工作涉及到的时候自行查阅文档学习

文档地址https://sass.bootcss.com/documentation

## 3.LESS基础以及LESS的使用

less的用法与sass无太大差异，仅仅语法的差别，我们两者掌握其一即可

所以less语法我们通过官方文档自行学习

文档地址http://lesscss.cn/

## 4.总结

至于要不要使用css预处理语法以及使用哪种这个在行业内争议其实很大，总结起来就是个凭喜好，不需要计较哪个好坏，我们挑一个顺手的使用即可。如果直接使用css也是可以的，这点在项目开发中除非公司有明确规定，否则按照喜好自行编写即可。由于sass的兼容性以及对css的支持特别好所以我们经常在vue中引入scss文件可以使用css和scss混写。

## 5关于Vue+Vant+rpx2vw的移动端项目案例

该项目在案例中的`demo`中我们可以安装依赖并运行该项目，该项目引入了vant组件库。vant组件库是有赞团队开源的针对移动端的ui框架他在ui上要比antd-mobile更加出色并且小巧轻量可以配合vue快速开发移动端网页。

我们可以运行该项目学习写法。

关于vant框架我们可以参考vant的官方文档自学

文档地址

https://vant-contrib.gitee.io/vant/#/zh-CN/

### 5.1 rpx2vw插件

项目通过postcss的配置文件增加了postcss-plugin-rpx2vw插件，postcss除了帮我们调整css兼容性，而通过该插件我们可以在该项目中改单位。使用rpx尺寸的元素会自动转换成vw单位实现在不同的移动设备上布局自动缩放。打开postcss.config.js

```js
module.exports = {
  plugins:{
    'postcss-preset-env':{},
    'postcss-plugin-rpx2vw':{
      viewportWidth: 750,//定义基准窗口宽度为750px
      viewportUnit: 'vw',//定义生成的尺寸单位为vw
      fontViewportUnit: 'vw',//定义字体生成的尺寸为vw
      unitPrecision: 5,//定义生成的vw保留5位小数
    }
  }
}
```

### 5.2 查看src/views/Home.vue

Ui 设计稿一般以iphone6为基准使用750像素的宽度375✖️2=750，这个2是dpr

使用rpx，单位，会自动帮我们转换。这样不担心其他尺寸的移动端设备屏幕。

### 5.3查看src/views/About.vue

查看登陆案例，看vant框架的组件怎么使用

## 5.面试题讲解下一个笔记