# Vue基础4

## 今日内容

1. Vue的过渡+动画
2. Vue的observable响应对象
3. Vue的component动态组件
4. 组件大练习：实现一个confirm组件

## 1.Vue的过渡+动画

我们在学习css3的时候学习过transition来实现元素的状态过渡动画，而Vue框架也为开发者提供了在Vue中结合数据操作使用的过渡动画。

> 首先理解一下什么叫过渡

首先打开案例中的[transition.html](/md/day4/案例/transition.html)运行代码并查看代码

通过以上案例我们了解到了transition过渡的特点：

1. 过渡是点对点的，只有开始和结束两个状态。
2. transition会自动补充从开始到结束的动画化的过程。

了解了过渡的特点之后我们来学习一下Vue中的transition过渡

### 1.1 vue中的transition组件

Vue提供了一个可以管理组件状态过渡的组件`<transition></transition>`他可以实现任何元素的进入和离开过渡。最常用的方式是通过`v-if `和` v-show `驱动组件的进入和离开的过渡。

#### 1.1.1 通过name属性添加过渡动画名字

transition组件自带name属性加入设置了name="过渡名称"默认值为 `v`,   他同时代表我们要定义的class样式的前缀,下面会讲到如何定义动画。

<transition/> 组件的写法：

```html
<transition name="fade"></transition>
```

我们会给 <transition/> 组件添加一个属性name，我们取名为fade。

然后呢，然后怎样才会有动画效果呢， <transition/> 组件什么时候才能起作用

#### 1.1.2 动画生效

Vue提供的 <transition/> 组件，会在下列四种情况下起作用：

1. 条件渲染（使用v-if）
2. 条件展示（使用了v-show）
3. 动态组件
4. 组件根节点

在上述的任意一种情况发生的时候（比如：v-show的值为true切换成false的时候），我们可以给 <transition/> 组件包含的节点元素添加entering/leaving过渡动画效果。

#### 1.1.3 过渡原理分析

当一个被 <transition/> 组件包含的节点出现了以上的4种情况的任意一种的时候，Vue自动去样式表中找目标元素是否应用了 CSS 过渡或动画，如果是，在恰当的时机添加/删除 CSS 类名。

所谓的：“在恰当的时机添加/删除 CSS 类名”，默认的前缀是v，在进入/离开的过渡中，定义的样式会有 6 个 class 切换。

1. `v-enter`：定义进入过渡的开始状态。在元素被插入之前生效，在元素被插入之后的下一帧移除。
2. `v-enter-active`：定义进入过渡生效时的状态。在整个进入过渡的阶段中应用，在元素被插入之前生效，在过渡/动画完成之后移除。这个类可以被用来定义进入过渡的过程时间，延迟和曲线函数。
3. `v-enter-to`：**2.1.8 版及以上**定义进入过渡的结束状态。在元素被插入之后下一帧生效 (与此同时 `v-enter` 被移除)，在过渡/动画完成之后移除。
4. `v-leave`：定义离开过渡的开始状态。在离开过渡被触发时立刻生效，下一帧被移除。
5. `v-leave-active`：定义离开过渡生效时的状态。在整个离开过渡的阶段中应用，在离开过渡被触发时立刻生效，在过渡/动画完成之后移除。这个类可以被用来定义离开过渡的过程时间，延迟和曲线函数。
6. `v-leave-to`：**2.1.8 版及以上**定义离开过渡的结束状态。在离开过渡被触发之后下一帧生效 (与此同时 `v-leave` 被删除)，在过渡/动画完成之后移除。

> 简单的说6个class在过渡执行的顺序
>
> 你要的名字-enter       进入前效果
> 你要的名字-enter-active   进入的过渡时间和函数
> 你要的名字-enter-to     进入后效果
> 你要的名字-leave       离开前效果
> 你要的名字-leave-active   离开的过渡时间和函数
> 你要的名字-leave-to     离开后效果

![transition](assets/transition.png)

> __重要提示：对于这些在过渡中切换的类名来说，如果你使用一个没有名字的 `<transition>`，则 `v-` 是这些类名的默认前缀。如果你使用了 `<transition name="my-transition">`，那么 `v-enter` 会替换为 `my-transition-enter`。__



注意这个例子,消失的样式不显示蓝色，因为样式一瞬间就换下去了，除非给元素加自己的样式

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
		<style type="text/css">
			/* 
        p{
          background-color: #409EFF;
        }
      */
			.fade-enter, .fade-leave-to{
				background-color: red;
			}
			.fade-enter-to, .fade-leave{
				background-color: #409EFF;
			}
			.fade-enter-active, .fade-leave-active{
				transition: all 2s;
			}
		</style>
	</head>
	<body>
		<div id="app">
			<button type="button" @click="handleClick">切换</button>
			<transition name="fade">
				<p v-if="show">hello</p>
			</transition>
		</div>
		<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js" type="text/javascript" charset="utf-8"></script>
		<script type="text/javascript">
			new Vue({
			    data(){
			      return {
			        show:false
			      }
			    },
			    methods:{
			      handleClick(){
			        this.show = !this.show;
			      }
			    }
			  }).$mount('#app')
		</script>
	</body>
</html>
```

官网的例子

```vue
<style>
  /*
  	在show属性切换true和false的时候
  */
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
<div id="app"> 
  <!-- 
    通过点击按钮来实现被transition包裹的元素的动态显示和隐藏
  -->
  <button @clcik="handleClick">
    切换
  </button>
  <!-- 定义了一个名为fade的过渡动画，transition执行时会自动寻找fade-enter等过渡流程的class取执行过渡动画 -->
  <transtion name="fade">
  	<p v-if="show">hello</p>
  </transtion>
</div>
<script>
	new Vue({
    data(){
      return {
        show:false
      }
    },
    methods:{
      handleClick(){
        this.show = !this.show;
      }
    }
  }).$mount('#app')
</script>
```

结合以上代码我们在案例中深入学习一下

打开案例中的[transition1.html](/md/day4/案例/transition1.html)运行并阅读代码，完成课堂练习

> vue过度流程的描述
>
> 当transition嵌套了一个切换显示隐藏的vue中的组件之后
>
> 在他的内部的元素如果发生了显示或者隐藏的切换
>
> transition组件就会按照顺序
>
> 如：显示时
>
> 1. 对元素包裹一个html标签，并且先给这个标签插入[name]-enter样式
> 2. 瞬间就改成[name]-enter-active用来给元素增加过度效果
> 3. 同时在对元素增加[name]-enter-to来实现给元素定义过度结束的样式
> 4. 三个步骤结束之后transition就会清空这个套在外面的元素，内部展示结果样式
>
> 隐藏时
>
> 1. 对元素包裹一个html标签，并且先给这个标签插入[name]-leave样式
> 2. 瞬间就改成[name]-leave-active用来给元素增加过度效果
> 3. 同时在对元素增加[name]-leave-to来实现给元素定义过度结束的样式
> 4. 三个步骤结束之后transition就会清空这个套在外面的元素，内部展示结果样式

> 注意事项：
>
> 1. 带-active的样式一定要定义在当前过渡样式的最上方（他并不会引发错误，但在复杂的生产环境中容易引起错误）
> 2. 被切换的内容一定要包裹在transition内部并且通过v-if或者v-show来修饰
> 3. 在transition中可以加入属性appear="true"来让过渡动画在第一次渲染就执行

#### 1.1.2通过css动画的过渡方式

上面我们学习了过渡的六个样式，但是维护一个过渡需要这么多的状态比较困难并且想要实现复杂的动画也很难，所以我们继续学习通过css动画的方式实现过渡

使用css动画的方式执行过渡我们就不在需要维护六个状态了只需要将v-enter-active和v-leave-active定义即可

具体的操作我们直接上案例

打开案例中的[transition2.html](/md/day4/案例/transition2.html)运行并阅读代码，完成课堂练习

至此我们变学会了两种方式使用Vue的transition动画

> 由于过度在生产中使用场景并不是很多所以我们只学习最常用的两种方式，其他的动画方式请参考Vue的官方文档

## 2.Vue的observable响应对象

随着组件的细化，就会遇到多组件状态共享的情况， Vuex当然可以解决这类问题，不过就像 Vuex官方文档所说的，如果应用不够大，为避免代码繁琐冗余，最好不要使用它，今天我们介绍的是 vue.js 2.6 新增加的 Observable API ，通过使用这个 api 我们可以应对一些简单的跨组件数据状态共享的情况。那么observable响应对象又是做什么使用的呢

我们参考一个实际案例首先体会一下他的应用场景。

打开[observable.html](/md/day4/案例/observable.html)预览实际案例

查看完案例之后我们要记住几个要点：

1. Vue虽然可以通过全局js变量来存储数据但是无法通过值的改变触发不同组件同时产生变化
2. 在computed中是不能对非Vue绑定的数据进行监听的

那么我们在通过另一个案例来实现对当前案例的改造，并学习如何使用Vue.observable的用法

打开[observable1.html](/md/day4/案例/observable1.html)预览实际案例

结合了第二个案例我们了解到了

1. observable对象相当于声明在Vue实例外的data属性，并且所有的Vue对象和组件都可以共享
2. computed可以像data一样的方式对observable进行监听
3. 也就是说observable对象可以用于兄弟组件间通信的桥梁
4. 同时observable的实现方案也是今后我们要学习的Vuex状态管理框架的地基理论

## 3.Vue的component动态组件

### 3.1前言

我们最近学习了Vue的自定义组件，并且已经可以成功的创建自定义组件并且进行很多的复杂操作，包括子传父，父传子，父子双向绑定。Vue中还提供了一种动态组件的渲染方式通过`component`组件进行操作

### 3.2什么是*<*component*>*

*<*component*>*是由Vue提供的一个公共组件，它相当于一个组件的容器。

当我们有一个需求通过点击菜单切换不同页面时在过去的html开发中我们经常采用a标签使用href属性进行html网页的跳转，但是这种方式每次都会重新加载一次网页静态资源，在Vue中我们可以通过动态组件来实现类似跳页的效果，他是我们今后要学习的VueRouter路由框架的核心实现原理，也是单页应用的核心基础支撑。

### 3.3component组件的使用

> 首先来了解一下如何使用component

与Vue.component不同的是，动态组件component是一个全局组件

```vue
<!-- 使用方式 -->
<component is="组件"></component>
```

下面我们来结合案例体验一下component组件的基本用法

课后看官网的例子：[动态组件官方示例.html](动态组件官方示例.html)

打开案例中的[component.html](component.html)运行并查看代码

**案例中的练习题:实现一个多层嵌套的动态组件**

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
		<style type="text/css">
			#app{
				background-color: #67C23A;
				height: 300px;
			}
			.p-menu{
				padding: 0;
				background-color: #ca4d3d;
			}
			.p-menu li{
				list-style: none;
				display: inline-block;
			}
			#inner{
				height: 200px;
				background-color: yellow;
			}
		</style>
	</head>
	<body>
		<div id="app">
			<menu-new v-model="menuName"></menu-new>
			<div id="inner">
				<component :is="menuName"></component>
			</div>
			
		</div>
		<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js" type="text/javascript" charset="utf-8"></script>
		<script type="text/javascript">
			Vue.component('p-menu',{
				props:{
					value:{
						type:String,
						default(){
							return 'page-one'
						},
						required:false
					}
				},
				model:{
					// 将v-model的值绑定到value属性上
					prop:'value',
					// 监听change-value事件通过该事件自动改变v-model绑定的值
					event:'change-value'
				},
				template:`
					<ul class="p-menu">
						<li>
							<button @click="handleClick('page-one')">
								page-one
							</button>
						</li>
						<li>
							<button @click="handleClick('page-two')">
								page-two
							</button>
						</li>
						<li>
							<button @click="handleClick('page-three')">
								page-three
							</button>
						</li>
					</ul>
				`,
				methods:{
					handleClick(value){
						console.log(value)
						// 通过emit通知model中的事件去改变值
						this.$emit('change-value',value)
					}
				}
			})
			Vue.component('page-one',{
				template:`<div class="page-one">我是page-one</div>`
			})
			Vue.component('page-two',{
				template:`<div class="page-two">我是page-two</div>`
			})
			Vue.component('page-three',{
				template:`<div class="page-three">我是page-three</div>`
			})
			Vue.component('p-one',{
				template:`
					<div>
						<div>我是p-one</div>
						<p-menu v-model="checkedMenu"></p-menu>
						<component :is="checkedMenu"></component>
					</div>
				`,
				data(){
					return {
						checkedMenu:'page-one'
					}
				}
			})
			Vue.component('p-two',{
				template:`
					<div>我是p-two</div>
				`
			})
			Vue.component('menu-new',{
				props:{
					value:{
						type:String,
						default(){
							return ''
						},
						required:false
					}
				},
				model:{
					prop:'value',
					event:'change-value'
				},
				template:`
					<div class="menu-new">
						<button @click="handleClick('p-one')">页面1</button>
						<button @click="handleClick('p-two')">页面2</button>
					</div>
				`,
				methods:{
					handleClick(value){
						this.$emit('change-value',value)
					}
				}
			})
			new Vue({
				data(){
					return {
						menuName:'p-one'
					}
				},
			}).$mount('#app')
		</script>
	</body>
</html>

```



> 小总结：
>
> 1. 动态组件相当于自定义组件的容器，在is确认之后传入的组件名是谁component就相当于谁
> 2. 动态组件可以当作子页面的容器使用，在明天的课程中我们学习的VueRouter就是基于动态组件进行实现的

### 3.4keep-alive在component中的使用*（作为了解学习）

当我们学会了如何使用动态组件来实现模拟跳页之后我们再来分析一个场景，当我们在浏览器中进行上网操作时会同时打开多个网页，网页只会同时展示一个窗口给我们，但是我们可以通过切换浏览器上方的标签页栏目来切换我们已经打开的页面。这个过程和我们在Vue中通过component实现跳页的性质类似，但是有个本质的区别，比如我们打开某一个网页做了一个输入操作，中途我们又打开了其他网页，这时我们再回到之前输入一半的网页中我们之前的输入会被保留。那么我们再vue中切换组件如何实现这个功能呢，下面我们来结合示例体验一下。

首先打开案例中的[component1.html](/md/day4/案例/component1.html)并且在切换三个页面时尝试在文本框中输入内容。

我们会发现当我们在切换三个页面并对每个页面的input进行输入之后再回到当前页面之前输入的内容就不见了。

如果想实现页面的缓存我们需要结合一个组件就是`keep-alive`组件

keep-alive组件是Vue提供的一个对动态组件进行缓存的一个全局公共组件，被他嵌套的component会缓存当前组件的所有状态，并且被keep-alive嵌套的component中引用的组件在第一次加载完成之后生命周期中的beforeCreate,created,beforeMount,mounted回调函数便不会继续执行取而代之的是生命周期会增加一个activated回调我们通过示例来查看keep-alive的使用

在案例中打开[component2.html](/md/day4/案例/component2.html)运行并查看代码

> 总结：在学习了keep-alive的使用案例之后我们总结一下keep-alive的一些特点
>
> 1. 在被keep-alive包裹的component组件默认会被缓存，我们可以通过include来指定哪个组件被缓存这样没有填入include属性中的组件不会被缓存。
> 2. 被缓存的组件只有第一次加载时会执行完整的生命周期，之后每次打开便只执行activated回调
> 3. 被缓存的组件会记录上一次组件打开时的操作和状态
> 4. 没有被缓存的组件不具备activated生命周期函数

## 4.组件实战：实现一个confirm组件

### 4.1 浏览器默认的询问窗什么样

打开[confirm.html](/md/day4/案例/confirm.html)

查看代码之后我们总结confirm以下特点

1. 弹出形式的
2. 有询问内容
3. 可以选择是否同意
4. 选择后有对应的标识来确定当前用户的选择

结合基本功能我们在按照市面上主流的询问框对其扩展一些需求

1. 有标题，可以展示系统提示还是其他提示
2. 右上角有关闭按钮关闭也代表取消
3. 有背景遮罩

下面我们需要结合需求来设计confirm

### 4.2 准备组件代码

> 下面我们来确定confirm的样式

在确认组件功能之后我们要确定组件的展示样式，由于时间关系我提供了一个组件的模版样式，方便所有人能实现统一效果。

打开[confirm1.html](/md/day4/案例/confirm1.html)并阅读代码

该文件为准备好的样式文件

### 4.3 封装组件

> 下面我们来将当前的html代码封装成一个vue组件

实现步骤：

1. 打开[confirm2.html](/md/day4/案例/confirm2.html)
2. 在head标签中引入confirm.css文件
3. 创建自定义组件`p-confirm`并将[confirm1.html](/md/day4/案例/confirm1.html)中confirm的html代码部分粘贴到p-confirm的template选项中。
4. 将自定义组件p-confirm引入html中查看是否可以渲染。显示出confirm后说明成功。

### 4.4 实现组件的开关

1. 涉及到开关就需要参数控制，所以我们需要给组件定义一个开关属性
   1. 由于组件的开关不光要决定组件内部是否展示，还要让组件外部时刻保持知道组件当前是否打开
   2. 所以这个属性应该是双向绑定的，那么我们需要对组件定义一个双向绑定的变量
2. 在组件内部声明props并创建第一个参数show（类型是boolean，默认值是false，非必填）
3. 在组件内部创建model选项prop绑定show，event定义为change-show
4. 在template上对最外层div绑定v-if=“show”,如果此时页面为空白说明成功。
5. 在网页中创建一个button标签并绑定点击事件handleClick,随便打印信息测试点击事件是否生效
6. 在Vue实例中创建data属性show:false,并在p-confirm上绑定v-model=“show”
7. 在handleClick事件中设置this.show = !this.show代表切换组件的展示，点击按钮测试组件是否打开，打开代表成功，至此通过按钮打开confirm已经实现，但是由于confirm有遮罩层所以网页中的按钮就无法再点击了。
8. 这里开始实现关闭confirm的动作，参考样式，当点击右上角的&times;和取消按钮时我们应该关闭当前窗口
9. 所以现在对组件内部的p-close 和 取消按钮绑定点击事件handleClose,想要关闭窗口的话需要让show属性变成false，由于show属性是v-model进行的双向绑定想要改变show的值需要调用model中的event来设置值，所以我们在handleClose中调用this.$emit('change-show',false)来实现让show参数变成false
10. 完成以上操作后点击取消和&times;来测试一下关闭是否好用，能实现关闭代表成功。到此第一个功能已经完美实现

### 4.5 实现在打开和关闭时创建过渡动画

1. 在p-confirm中的template内部最外层嵌套一个transition标签name="fade"表示淡入淡出过渡

2. 在style中定义.fade-enter-active和.fade-leave-active

3. 在style中定义@keyframes fade-in{from{opacity:0}to{opacity:1}}动画

4. fade-enter-active和fade-leave-active中调用动画

   1. 设置animation-name:fade-in;animation-duration:.3s;
   2. 在fade-leave-active中追加animation-direction: reverse;

5. 为了展示效果更加友好我们对p-confirm追加一个css动画

   1. ```css
      .p-confirm{
        animation-name: slide-in;
        animation-duration: .3s;
      }
      @keyframes slide-in{
        from{opacity: 0; transform: translateY(-30px);}
        to{opacity: 1; transform: translateY(0px);}
      }
      ```

   2. 在style中添加如下代码对p-confirm的本体增加一个初始动画

6. 至此我们的过渡动画便添加完毕了

### 4.6 实现对confirm中传入提示参数

1. 首先我们分析需要变更成动态参数的必要两个位置，confirm的标题和confirm的内容，所以我们在组件的props中创建title和content两个参数,字符串类型非必填，默认值为''
2. 将两个参数引用到对应的位置，这时我们在外部的Vue对象中同样声明title和content两个属性，用来对组件传入参数，并且引用到组件上。再观察结果，content内容变更说明成功
3. 再分析，我们如果可以对按钮的提示文字进行修改组件就更加的有好了，所以我们在对确认和取消两个按钮进行改造，在props中创建confirmButtonText(非必填，字符串类型，默认为“确认”),和cancelButtonText(非必填，字符串类型，默认值为“取消”)，这样改造的话如果我们不改造两个参数他的默认值还是确认和取消，如果有特殊需求需要对按钮改名我们对应的传入参数就可以了
4. 接下来我们测试这两个参数是否生效，将按钮改成保存和关闭

### 4.7 实现事件

1. 我们现在已经实现了confirm的基本打开关闭，参数传入和动画效果
2. 下面我们来实现一下confirm的确认和取消的两个事件反馈
3. 首先对确认和取消按钮绑定事件handleConfirm和handleClose由于我们已经绑定了关闭事件所以只需要对确认按钮绑定点击事件handleConfirm,然后我们分析，当我们点击确认和取消按钮都需要关闭confirm组件。所以在handleConfirm中也需要调用this.$emit('change-show',false)来让confirm关闭
4. 然后我们分析两个事件都需要对外界通知所以我们可以在点击确认和取消时在组件上对外绑定一个回调函数，我们可以定义两个事件一个confirm，一个close，在handleConfirm函数中增加一个this.$emit('confirm'),在handleClose中增加一个this.$emit('close')
5. 事件绑定之后我们在组件上创建@confirm和@close并在外部Vue对象中定义handleConfirm和handleClose来监听当前两个事件并在事件中打印两个信息console.log('confirm')和console.log('close')
6. 我们在页面中测试两个事件的监听是否生效，如果分别打印confirm和cancel说明成功

> 完成以上操作我们的confirm自定义组件就算初步的完成了
>
> 参考答案在[confirm2答案.html](/md/day4/案例/confirm2答案.html)中

