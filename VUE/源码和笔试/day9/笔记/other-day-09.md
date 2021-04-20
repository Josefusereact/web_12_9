# 图表库的学习

我们在工作中经常会涉及到使用图表做统计的场景

在工作中最常用的就是百度的echarts框架所以我们今天就拿echarts做入门学习一下如何使用图表在项目中进行开发。

## 1.介绍

百度echarts的官方网站https://echarts.apache.org/

echarts致力于web项目中数据可视化的解决，他采用canvas+svg的技术实现在html网页中进行像素级别的图像渲染，将数据以各种统计型图表的形式展示到网页中让很多涉及到统计的项目可以更加直观的展示数据

## 2.引入

可以使用html页面引入以及npm引入两种方式

html页面引入需要在官方网站上下载

如果在vue等webpack环境下的项目中直接使用

```sh
npm install echarts -s
```

## 3.上手使用

### 3.1在网页中使用

打开案例中的[hello.html]()

我们阅读代码并且学习如何加载一个图表

我们总结一下用法

分别学习一下常用的三种图表

#### 3.1.1柱状图

打开[bar.html]()

学习一下用法

#### 3.1.2折线图

打开[line.html]()

学习一下折线图用法

#### 3.1.3饼状图

打开[pie.html]()

学习一下饼状图的用法

#### 3.1.4散点图

打开[point.html]()

学习一下三散点图的用法

#### 3.1.5树形图

打开[tree.html]()

学习树形图的用法

### 3.2在vue项目中使用echarts

[官方在打包环境中使用 ECharts](https://echarts.apache.org/zh/tutorial.html#%E5%9C%A8%E6%89%93%E5%8C%85%E7%8E%AF%E5%A2%83%E4%B8%AD%E4%BD%BF%E7%94%A8%20ECharts)

打开案例中的`echarts-test`运行并查看案例，这个就是在脚手架项目中如何使用echarts，在react中使用也是同理

### 3.2.1使用步骤

1. npm安装包

2. 在script标签中引入import * as echarts from "echarts";

3. 在template中创建echarts容器。<div id="main">或<div ref="main">

4. 生命周期`mounted`中加载

   ```js
   var myChart = echarts.init(document.getElementById("main"));
   var chart1 = echarts.init(this.$refs.chart1);
   ```

   

我们可以对这个柱状图增加三种排序来联系一下。



## 4.前瞻与总结

我们通过简单的了解了图表插件已经掌握了如何在html网页中插入图表，echarts可以解决市面上百分之99的图表需求，其他特殊的图表我们也很难能接触到。所以掌握了echarts的用法之后我们便可以直接通过官方案例进行改造就可以了，当工作中遇到图表问题时先访问

https://echarts.apache.org/examples/zh/index.html来查看当前的图表是否有类似的案例然后直接通过案例代码进行修改即可。

下面还有一个更加全面的echarts-demo网站上面收录了工作中可能遇到的接近百分之百的完整案例我们在工作中涉及到图表问题可直接访问如下网站

https://www.makeapie.com/explore.html#sort=rank~timeframe=all~author=all

下面我们进入网站浏览并查看部分案例。

所以遇到图表问题，在官方基本案例掌握的基础上初级前端程序员就可以通过素材库实现特别高端的图表功能。

关于图表我们还可以关注几个框架

### highcharts国内知名图表库

https://www.highcharts.com.cn/demo/highcharts/

### ANTV

关于antv简单介绍一下。这是蚂蚁集团自主研发的国内最高端图表项目，他的功能和实现能力要高于echarts，他包含了几大图表类目，使用起来也不是很复杂，所以如果遇到复杂图表可以选择antv

https://antv.vision/zh

### 关于CANVAS的原理和简单使用

canvas是html5推出的一个在网页中实现图形绘制的标签容器。

他不同于svg他相当于一个画布容器，所有的图形都是基于像素点来进行绘制的，而svg需要进行标签解析形成图形，所以svg相对于canvas来说性能并不高，但是能兼容性和开发难度要小很多。而canvas的出现，将web页面带入了一个新的时代。

也就是说现在的web页面可以通过canvas来实现高性能的css做不到的动画效果，以及可交互的图形页面，最直观的就是js开发游戏。还有一个就是图表绘制的框架。

canvas又经历了一个大幅度的性能提升，canvas后阶段引入了webGL渲染机制，来实现可以在web浏览器中直接调度显卡来驱动页面的绘制，这样就是的canvas从简单的动画和2d图形绘制升级到了可是在网页中实现3d图形的渲染能力。

所以现在优秀的图表库，框架都可以实现在网页中展示复杂的动画效果以及优秀的3d特效。在web应用中还能实现3d游戏的开发。

#### canvas的快速上手

参考案例中的[canvas.html]()

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
  </style>
</head>
<body>
  <!-- 
    canvas自身相当于图片标签
    他的自带的width和height属性是这个画布容器的屋里像素尺寸
    如果使用css的width和height来对他进行了设置
    出了1:1的时候会让这个canvas画布拉伸或者压缩
    因为css改变的是canvas标签的尺寸并不是画布的原始像素尺寸
    
  -->
  <canvas id="c" width="800" height="600"></canvas>
  <script>
    // 实例化绘图对象
    // 抓取canvas标签对象
    let c = document.querySelector('#c')
    // 通过标签对象获取绘图对象,2d代表当前使用的2d绘图对象
    let ctx = c.getContext('2d')
    console.log(ctx)
    // 设置填充颜色,颜色可以写单词，#十六进制，或rgba
    ctx.fillStyle = 'red'
    // 绘制一个100*100像素的矩形
    // 绘制填充矩形
    // 画布的自身坐标规则是左上角是00点
    //向右x自增向下y自增
    //canvas内部的像素规则是按照canvas本身的
    //width和height来决定的和css无关他就是一个单独的
    //图像渲染容器
    //ctx.fillRect(x,y,width,height)
    ctx.fillRect(0,0,100,100)
    //设置helloWorld
    // 配置字号和字体
    ctx.font = '20px 楷体'
    // 设置文字内容和展示位置
    //ctx.fillText(内容,x,y)
    // 文字默认按照上面设置的填充颜色排版
    //文字的坐标基准点和其他图形不同
    //文字是按照他的左下角为基准点定位的
    //所以文字必须向下移动自己的字号大小才能正常
    //按照左上角基准点布局
    // 如果想更改文字的颜色可以使用fillStyle重新设置一次
    ctx.fillStyle = 'blue'
    ctx.fillText('Hello World',100,20)

  </script>
</body>
</html>
```



> 总结
>
> canvas本身就是一个绘图的容器，可以将她理解成一张img图片，所以他自身具备物理像素尺寸，内部绘制的内容都会遵循他的默认物理像素，css调整他不会影响内部的布局和结构，但是会对他造成压缩或者拉伸。
>
> canvas本身可以理解成浏览器渲染的过程，也就是他内部不管画了多少内容，他都是在一张纸上操作所有的像素点，所以他的内部不存在标签节点的结构，所以我们一旦将图画到画布上以后我们就无法在获取到我们已经画完的图的坐标和尺寸了

#### canvas如何实现动画？

刚才我们研究了canvas的最基本的绘制矩形和文字。发现绘制完就和代码没关系了，那么我们一旦画上的画就相当于用彩色铅笔画在了白纸上，擦不掉页也改不了，那么如何使用canvas实现让这些画上的元素动起来？

他的原理和动画的制作是一样的

参考案例中的[canvas1.html]()

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
  </style>
</head>
<body>
  <!-- 
    canvas自身相当于图片标签
    他的自带的width和height属性是这个画布容器的屋里像素尺寸
    如果使用css的width和height来对他进行了设置
    出了1:1的时候会让这个canvas画布拉伸或者压缩
    因为css改变的是canvas标签的尺寸并不是画布的原始像素尺寸
    
  -->
  <h4>
    让当前的红色方块自动的向右运动
  </h4>
  <canvas id="c" width="800" height="600"></canvas>
  <script>
    // 实例化绘图对象
    // 抓取canvas标签对象
    let c = document.querySelector('#c')
    // 通过标签对象获取绘图对象,2d代表当前使用的2d绘图对象
    let ctx = c.getContext('2d')
    // 设置填充颜色,颜色可以写单词，#十六进制，或rgba
    ctx.fillStyle = 'red'
    // 想要实现动画，并且配合当前的canvas的特性
    //我们已知画完的数据我们无法捕捉，但是我们可以
    //手动定义一个对象来当作虚拟的节点进行一个追踪
    let rect = {
      x:0,
      y:0,
      width:100,
      height:100
    }
    //然后我们要定义一个函数来绘制这个对象
    //为了实现动画我们还需要借助一个浏览器的api
    //setInterval()
    setInterval(function(){
      //实现动画一定要做的事就是在每次绘制之前先清除之前的图形
      //ctx.clearRect(x,y,width,height)
      //他基于传入的坐标和宽高可以清除指定画布的区域
      ctx.clearRect(0,0,800,600)
      // 在这里我们需要做的就是不停的向画布绘制这个矩形
      //同时呢根据要求改变他的位置
      ctx.fillRect(rect.x,rect.y,rect.width,rect.height)
      rect.x = rect.x+1;
    },16.7)
  </script>
</body>
</html>
```



了解了画布的动画原理之后结合浏览器的渲染原理我们简单的思考一下他们的共同点，其实浏览器的渲染就相当于我们使用canvasapi绘制一个画布，标签节点就相当于我们做的虚拟对象，浏览器每秒60帧的刷新率就相当于不停的去绘制这个画布所以我们能看到动态的交互效果。

#### Canvas练习

接下来我们做一个canvas的练习，在刚才的基础上实现通过键盘的上下左右控制当前的红色方块移动并且不可以超过边界

根据需求自己在案例中创建网页并实现

知识点：

1. 交互操作，上下左右需要使用html的键盘监听事件

2. 不可以超过边界，就需要在上下左右事件触发的时候

   进行边界的判断