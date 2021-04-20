# Vue高级3

## 今日内容

1. vue-router原理
2. vuex附加学习以及vuex原理
3. computed番外篇

### 1.vue-router原理

### 1.1复习动态组件

我们在vue的初始课程中学习了动态组件`component`并且大概了解了动态组件的原理。下面我们首先复习一下什么是动态组件。

打开今天案例中的vue-router-test项目，安装依赖并且运行

然后打开首页访问第一个菜单`动态组件`

然后结合页面查看代码,并完成练习。

> 总结：
>
> 结合代码我们复习组件component，并着重回忆他的参数is。is使用的是注册组件的name来动态的寻找当前的component标签渲染哪个属性，is也可以传入当前组件的对象本身。
>
> component的实现方式正好和我们使用的router-view效果相当。他就是封装路由组件的一个基础

### 1.2路由切换路径的原理

回忆了component组件之后我们已经能实现初步的跳页功能呢了。下面我们要实现的就是在跳页的基础上切换浏览器的路径。

首先回想一下，当我们切换浏览器路径的时候其实相当于使用location.href或者a标签进行了跳页操作，正常切换浏览器的url路径之后html的页面就会发生改变。

但是这种情况是传统html开发时候使用的跳页方式，我们在vue中开发的都是单页面应用。这个时候我们如果变更了浏览器的url是不希望让他进行跳页操作的。

需要什么手段能既改变浏览器的url又不让html页面切换呢。这时我们想到了锚点操作。

过去我们在学习a标签的时候学习过可以通过带#的url跳转实现在网页内部进行页面滚动。

下面我们打开案例中与vue-router-test平级的

[href.html]()

文件进行锚点的回顾学习。

回顾了锚点学习之后我们又离自己封装vue-router更近了一步。

到目前为止我们掌握了通过js切换动态组件来实现跳页并且又掌握了通过动态切换url实现浏览器的路径变化但是页面不向外部跳转。

下面我们要实现最后一个能力就是实现对浏览器路径变化的监听

### 1.3hashChange的使用

我们刚才学习了动态组件和锚点，思考一下光通过这两个东西是无法完美实现vue-router功能的。因为我们如果通过js跳页的话可以通过js触发事件时去加载目标页面的组件，并且同时改变浏览器的url模拟跳页效果，但是我们如果是通过a标签或者router-link标签直接更改浏览器的url是无法触发component组件自动切换的，所以我们需要有一个功能，他来帮我们监听浏览器的url实时变化，根据变化来实现页面跳转。这个功能就是：

window.onhashchange

```js
window.onhashchange = function(event){
  console.log(event)
}
```

我们打开案例文件夹中的`hash.html`

查看代码并学习这个api函数。

学习之后我们发现这个函数非常简单，并且只要定义了他之后浏览器的#部分的url发生变化就会触发这个监听。

那么我们便可以通过劫持这个变更来做对component的动态组件的渲染了。这样再结合上面的两个原理我们就能完美的实现一个vue-router了。

### 1.4VueRouter的实现

我们今天不需要自己一步一步去编写实现代码，具体通过1.1到1.3的原理结合起来如何实现VueRouter的答案其实就在vue-router-test中。这个项目并没有使用vue-router框架。他的页面跳转路由注册全部是基于这些原理手动实现的，也就是说 vue-router-test本身就是对vue-router的一个仿真。我们现在打开项目的router文件夹来具体的学习一下他的写法。

从main.js开始阅读代码来学习vue-router是如何封装的。

读完所有注释后回到这里。

我们总结一下。

> 总结：
>
> 其实VueRouter整体的功能非常的简单，可以通过少量的代码实现他的大部分功能。这里我们通过这个实际例子就可以彻底理解VueRouter的封装理念，但是VueRouter真正的框架远不止这些功能，一旦了解了原理之后我们需要自己去VueRouter的官方文档中自行学习他的其他功能，以便于在工作中继续提升自己。

https://router.vuejs.org/zh/

上面是VueRouter的官方文档，我们以后还需要自行学习他的路由守卫，路由的高级用法。这些内容在文档中有详细的介绍。

## 2.vuex附加学习以及vuex原理

### 2.1Vuex的基本使用

我们在项目开发中直接运用了Vuex的模块拆分功能来实现了业务拆分，并没有从基础开始学习Vuex，所以今天我们首先开始学习一下Vuex的基本使用方式。

#### 2.1.1安装

```sh
npm i vuex -s
```

来将vuex安装。

然后通常是在项目的src目录下创建一个store文件夹，并且在文件夹内部创建index.js文件

```js
//store/index.js
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
//初始化Vuex的仓库对象Store，用来配置基础数据
//Store中传入的对象是全局的store对象，可以在任何模块中使用
const store = new Vuex.Store({
  state:{
    name:''
  },
  mutations:{
    setName(state,name){
      state.name = name
    }
  },
  getters:{
    getName(state){
      return `name的值是：${state}`
    }
  },
  actions:{
    async fetchName({commit},data){
      commit('setName',data)
      //延迟两秒执行的函数
      await (() => {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve();
          }, 2000);
        })
      })()
    }
  }
})
export default store;
```

然后 在main.js中做如下操作

```js
//main.js
import Vue from 'vue'
import App from './App.vue'
import router from './router'
//引入store对象
import store from './store'
Vue.config.productionTip = false

new Vue({
  //将store对象设置到Vue实例上
  store,
  router,
  render: h => h(App)
}).$mount('#app')

```

#### 2.1.2store的全局基本使用方式

打开案例中的vuex-demo项目，并且运行，然后我们在启动页面中访问菜单中的`全局基本使用`

打开页面按照页面操作，按照代码注释查看代码并逐行学习。

> 总结：
>
> 学习之后我们发现了，原来Vuex在全局存在一个$store对象，并且我们可以通过$store对象来直接操作Vuex中的数据，不过我们默认操作的都是在store/index.js中定义的全局的store中的数据，并不是我们平时用的业务模块拆分后的数据。

所以下面我们来学习如何通过$store调用模块的数据

#### 2.1.3通过$store对象调用vuex中module中的数据

打开案例菜单中的`module数据的基本调用`页面

查看页面的内容对比第一个模块的内容。

查看内部的代码以及注释。

> 总结：
>
> 我们发现同样可以通过$store对象直接操作store中的命名模块的内容。只是在取值和赋值的步骤增加了模块名来指定调用哪个模块的内容。
>
> 使用模块拆分之后可以让全局的通用业务和小模块中的业务进行一个完全的拆分，隔离，这样可以实现让代码维护更加方便。
>
> 定义模块时一定要使用namespaced:true来设置模块为命名模块。
>
> 我们以上学习的两种方式才是vuex的最基本的使用。
>
> 接下来我们学习vuex更高级的用法。

### 2.2Vuex的高级用法

#### 2.2.1通过mapState,mapGetters,mapMutations,mapActions来调用全局模块

打开案例项目中的第三个模块`map系列函数操作全局模块`

阅读代码并按照注释学习。并对比之前的例子

这个部分就是我们在项目中一直在用的开发模式。

> 总结：
>
> 通过了学习map系列的这个模块我们发现使用map系列的函数主要是为了简化代码。因为使用$store操作数据时要写很多的逻辑并且要定义函数和computed中的属性。这样代码量会变大，而使用了map系列之后我们无需关注store直接操作映射的结果就可以了，这样就让我们的store操作更加简洁。

#### 2.2.2通过mapState,mapGetters,mapMutations,mapActions来调用自定义命名模块

我们之前已经通过$store尝试过调用自己注册的命名模块的数据了。并且我们在项目开发中一直都在操作的部分就是注册命名模块并且对命名模块进行操作，使用的方式与本节讲解的内容完全一样。所以我们快速的学习一下当前章节的知识。

打开案例中的`map系列函数操作命名模块`菜单

快速学习。

> 总结：
>
> 通过学习了本章节内容，我们回顾了之前做项目开发时使用的model注册方式以及使用方式。这里演示了在一个页面中使用不同模块中重名state的处理办法，可以将mapState的结果改成新的key设置到computed上。
>
> 还需要注意的是我们在每个Vue文件中都可以使用任何模块的store数据，也就是store按照模块定义的model数据也是可以复用的。
>
> 最后要注意的一点就是map系列获取全局store模块是不需要传入第一个参数的，
>
> 当映射命名模块时需要将模块的名称填入第一个参数，第二个参数一定是数组，里面要映射的就是对应模块中的函数或属性的名称。

#### 2.2.3命名模块的动态注册

学习完传统的这些使用方式之后我们学习一下动态注册。

我们在正常使用store的模块分文件进行业务模块注册时。传统的情况都会写在store中去注册这些业务模块。但是如果项目中的业务模块特别多并且复杂，涉及到的项目构建体积也需要我们进行优化

这时如果所有的模块都注册到store文件中，在store/index.js中直接import模块内容时，项目在构建的时候会将所有的代码都打包进store的js文件中，这样就导致如果业务复杂打包会产生一个特别大的单js文件，这样在项目访问时加载单文件就会慢。所以我们应该将模块在store外部动态注册。所以就衍生出了动态注册的方式。

查看案例中的`模块动态注册`

我们通过阅读源代码以及注释来学习。

> 总结，通过学习了本页面的内容我们了解到了可以在Vue文件加载的时候动态注册store的模块，这样可以将store的业务部分在打包时与Vue页面的文件整合到一起这样不会导致所有业务代码都被打入store的核心文件中，这样可以优化项目的加载速度。
>
> 另一点需要注意的就是createNamespacedHelpers可以创建map系列函数来指定模块进行映射，这样如果在页面中只使用某个模块可以通过这种方式来省略在map的时候多一个参数的部分

### 2.3vuex的原理

学习了这么多vuex的内容之后我们也了解了vuex其实有这么多使用方式，他的具体所有使用方式其实还有很多，与vue的router一样。我们需要自己去vuex的官方文档中进行学习

https://vuex.vuejs.org/zh/guide/

下面我们通过简单的案例学习一下Vuex的基本原理。

Vuex是基于Vue.observable来实现他的复杂功能的。

所以我们可以通过Vue.observable来简单实现一个state。

关于Vue.observable的介绍参考vue的官方文档

下面查看一下案例中的`vuex原理`的代码和注释来简单查看 一下Vuex中state的实现。

## 3.computed番外篇

过去我们学习了computed的基本用法，但是我隐瞒了一个computed的高级用法，之前没有介绍是因为在不熟悉框架并且基础不扎实的时候如果学习会导致与data属性用混，所以今天我们着重介绍一下computed的最后一种使用方式。

`双向绑定`

也就是说computed的计算属性不光可以实现对data进行扩展取值，我们可以在computed中创建一个属性同时具备赋值和取值功能。

请查看案例文件夹中的[computed.html]()

> 总结：
>
> 学习完这个功能之后要掌握computed也是具备双向绑定这个功能的，并且computed中的变量并不是只读的，也就是说我们在面试中如果涉及到computed的用法还需要知道他可以将属性写为set，get的形式。
>
> 并且还需要记住一点也就是重点部分

#### 重点：

computed与watch的区别与共同点。

computed与watch都可以监听Vue实例中具备响应数据能力的属性，如data，props，Vue.observable的数据等。

不同的是computed可以将其定义的属性函数的return的结果输出到网页上，也可以在其他的函数中直接使用。而watch函数中定义的函数只能在监听属性变化的过程中做一些逻辑处理（这个模式相当于一个代理，通过watch代理了被监听属性的一些业务或者功能）不可以直接在网页中作为值去引用。

computed中的return的值默认会在内存中缓存结果，在每次有监听的值的数据发生变化时他才会重新计算，其他值改变时不会触发函数的重新调用，会直接返回结果。

