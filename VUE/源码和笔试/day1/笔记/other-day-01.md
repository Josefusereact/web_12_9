# Vue高级

## 今日内容：

1. vue数据绑定原理
2. Object.defineProperty
3. vue仿真

## 1.Vue的数据绑定原理

我们首先打开案例中的[ model.html]()

来回顾复习一下vue的一些特性。

回顾完案例之后我们在打开另一个案例来回顾一下vue中的数据特性

首先我们打开案例中的[vue.html]()

然后操作里面的案例并且分析结果。

> 总结：
>
> 当前案例分析之后我们发现了在vue2.x中我们定义的数组如果修改其中自带的元素可以实现页面更新，如果修改数组长度外的值，当使用v-model绑定时仍然能实现自动更新，但是当我们通过this.arr[index]这种方式直接设置值的时候页面不会更新。使用对象的结果一致。

这时我们回顾一下vue对data的介绍：

### [data](https://cn.vuejs.org/v2/api/#data)

- **类型**：`Object | Function`

- **限制**：组件的定义只接受 `function`。

- **详细**：

  Vue 实例的数据对象。Vue 将会递归将 data 的 property 转换为 getter/setter，从而让 data 的 property 能够响应数据变化。**对象必须是纯粹的对象 (含有零个或多个的 key/value 对)**：浏览器 API 创建的原生对象，原型上的 property 会被忽略。大概来说，data 应该只能是数据 - 不推荐观察拥有状态行为的对象。

  一旦观察过，你就无法在根数据对象上添加响应式 property。因此推荐在创建实例之前，就声明所有的根级响应式 property。

  实例创建之后，可以通过 `vm.$data` 访问原始数据对象。Vue 实例也代理了 data 对象上所有的 property，因此访问 `vm.a` 等价于访问 `vm.$data.a`。

  以 `_` 或 `$` 开头的 property **不会**被 Vue 实例代理，因为它们可能和 Vue 内置的 property、API 方法冲突。你可以使用例如 `vm.$data._property` 的方式访问这些 property。

  当一个**组件**被定义，`data` 必须声明为返回一个初始数据对象的函数，因为组件可能被用来创建多个实例。如果 `data` 仍然是一个纯粹的对象，则所有的实例将**共享引用**同一个数据对象！通过提供 `data` 函数，每次创建一个新实例后，我们能够调用 `data` 函数，从而返回初始数据的一个全新副本数据对象。

  如果需要，可以通过将 `vm.$data` 传入 `JSON.parse(JSON.stringify(...))` 得到深拷贝的原始数据对象。

- **示例**：

  ```
  var data = { a: 1 }
  
  // 直接创建一个实例
  var vm = new Vue({
    data: data
  })
  vm.a // => 1
  vm.$data === data // => true
  
  // Vue.extend() 中 data 必须是函数
  var Component = Vue.extend({
    data: function () {
      return { a: 1 }
    }
  })
  ```

  注意，如果你为 `data` property 使用了箭头函数，则 `this` 不会指向这个组件的实例，不过你仍然可以将其实例作为函数的第一个参数来访问。

  ```
  data: vm => ({ a: vm.myProp })
  ```

- **参考**：[深入响应式原理](https://cn.vuejs.org/v2/guide/reactivity.html)

读完这个之后我们再来参考`深入响应式原理`中说到的内容

# 深入响应式原理

现在是时候深入一下了！Vue 最独特的特性之一，是其非侵入性的响应式系统。数据模型仅仅是普通的 JavaScript 对象。而当你修改它们时，视图会进行更新。这使得状态管理非常简单直接，不过理解其工作原理同样重要，这样你可以避开一些常见的问题。在这个章节，我们将研究一下 Vue 响应式系统的底层的细节。

## [如何追踪变化](https://cn.vuejs.org/v2/guide/reactivity.html#如何追踪变化)

当你把一个普通的 JavaScript 对象传入 Vue 实例作为 `data` 选项，Vue 将遍历此对象所有的 property，并使用 [`Object.defineProperty`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) 把这些 property 全部转为 [getter/setter](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Working_with_Objects#定义_getters_与_setters)。`Object.defineProperty` 是 ES5 中一个无法 shim 的特性，这也就是 Vue 不支持 IE8 以及更低版本浏览器的原因。

这些 getter/setter 对用户来说是不可见的，但是在内部它们让 Vue 能够追踪依赖，在 property 被访问和修改时通知变更。这里需要注意的是不同浏览器在控制台打印数据对象时对 getter/setter 的格式化并不同，所以建议安装 [vue-devtools](https://github.com/vuejs/vue-devtools) 来获取对检查数据更加友好的用户界面。

每个组件实例都对应一个 **watcher** 实例，它会在组件渲染的过程中把“接触”过的数据 property 记录为依赖。之后当依赖项的 setter 触发时，会通知 watcher，从而使它关联的组件重新渲染。

![data](https://cn.vuejs.org/images/data.png)

## [检测变化的注意事项](https://cn.vuejs.org/v2/guide/reactivity.html#检测变化的注意事项)

由于 JavaScript 的限制，Vue **不能检测**数组和对象的变化。尽管如此我们还是有一些办法来回避这些限制并保证它们的响应性。

### [对于对象](https://cn.vuejs.org/v2/guide/reactivity.html#对于对象)

Vue 无法检测 property 的添加或移除。由于 Vue 会在初始化实例时对 property 执行 getter/setter 转化，所以 property 必须在 `data` 对象上存在才能让 Vue 将它转换为响应式的。例如：

```
var vm = new Vue({
  data:{
    a:1
  }
})

// `vm.a` 是响应式的

vm.b = 2
// `vm.b` 是非响应式的
```

对于已经创建的实例，Vue 不允许动态添加根级别的响应式 property。但是，可以使用 `Vue.set(object, propertyName, value)` 方法向嵌套对象添加响应式 property。例如，对于：

```
Vue.set(vm.someObject, 'b', 2)
```

您还可以使用 `vm.$set` 实例方法，这也是全局 `Vue.set` 方法的别名：

```
this.$set(this.someObject,'b',2)
```

有时你可能需要为已有对象赋值多个新 property，比如使用 `Object.assign()` 或 `_.extend()`。但是，这样添加到对象上的新 property 不会触发更新。在这种情况下，你应该用原对象与要混合进去的对象的 property 一起创建一个新的对象。

```
// 代替 `Object.assign(this.someObject, { a: 1, b: 2 })`
this.someObject = Object.assign({}, this.someObject, { a: 1, b: 2 })
```

### [对于数组](https://cn.vuejs.org/v2/guide/reactivity.html#对于数组)

Vue 不能检测以下数组的变动：

1. 当你利用索引直接设置一个数组项时，例如：`vm.items[indexOfItem] = newValue`
2. 当你修改数组的长度时，例如：`vm.items.length = newLength`

举个例子：

```
var vm = new Vue({
  data: {
    items: ['a', 'b', 'c']
  }
})
vm.items[1] = 'x' // 不是响应性的
vm.items.length = 2 // 不是响应性的
```

为了解决第一类问题，以下两种方式都可以实现和 `vm.items[indexOfItem] = newValue` 相同的效果，同时也将在响应式系统内触发状态更新：

```
// Vue.set
Vue.set(vm.items, indexOfItem, newValue)
// Array.prototype.splice
vm.items.splice(indexOfItem, 1, newValue)
```

你也可以使用 [`vm.$set`](https://cn.vuejs.org/v2/api/#vm-set) 实例方法，该方法是全局方法 `Vue.set` 的一个别名：

```
vm.$set(vm.items, indexOfItem, newValue)
```

为了解决第二类问题，你可以使用 `splice`：

```
vm.items.splice(newLength)
```

## [声明响应式 property](https://cn.vuejs.org/v2/guide/reactivity.html#声明响应式-property)

由于 Vue 不允许动态添加根级响应式 property，所以你必须在初始化实例前声明所有根级响应式 property，哪怕只是一个空值：

```
var vm = new Vue({
  data: {
    // 声明 message 为一个空值字符串
    message: ''
  },
  template: '<div>{{ message }}</div>'
})
// 之后设置 `message`
vm.message = 'Hello!'
```

如果你未在 `data` 选项中声明 `message`，Vue 将警告你渲染函数正在试图访问不存在的 property。

这样的限制在背后是有其技术原因的，它消除了在依赖项跟踪系统中的一类边界情况，也使 Vue 实例能更好地配合类型检查系统工作。但与此同时在代码可维护性方面也有一点重要的考虑：`data` 对象就像组件状态的结构 (schema)。提前声明所有的响应式 property，可以让组件代码在未来修改或给其他开发人员阅读时更易于理解。

## [异步更新队列](https://cn.vuejs.org/v2/guide/reactivity.html#异步更新队列)

可能你还没有注意到，Vue 在更新 DOM 时是**异步**执行的。只要侦听到数据变化，Vue 将开启一个队列，并缓冲在同一事件循环中发生的所有数据变更。如果同一个 watcher 被多次触发，只会被推入到队列中一次。这种在缓冲时去除重复数据对于避免不必要的计算和 DOM 操作是非常重要的。然后，在下一个的事件循环“tick”中，Vue 刷新队列并执行实际 (已去重的) 工作。Vue 在内部对异步队列尝试使用原生的 `Promise.then`、`MutationObserver` 和 `setImmediate`，如果执行环境不支持，则会采用 `setTimeout(fn, 0)` 代替。

例如，当你设置 `vm.someData = 'new value'`，该组件不会立即重新渲染。当刷新队列时，组件会在下一个事件循环“tick”中更新。多数情况我们不需要关心这个过程，但是如果你想基于更新后的 DOM 状态来做点什么，这就可能会有些棘手。虽然 Vue.js 通常鼓励开发人员使用“数据驱动”的方式思考，避免直接接触 DOM，但是有时我们必须要这么做。为了在数据变化之后等待 Vue 完成更新 DOM，可以在数据变化之后立即使用 `Vue.nextTick(callback)`。这样回调函数将在 DOM 更新完成后被调用。例如：

```
<div id="example">{{message}}</div>
var vm = new Vue({
  el: '#example',
  data: {
    message: '123'
  }
})
vm.message = 'new message' // 更改数据
vm.$el.textContent === 'new message' // false
Vue.nextTick(function () {
  vm.$el.textContent === 'new message' // true
})
```

在组件内使用 `vm.$nextTick()` 实例方法特别方便，因为它不需要全局 `Vue`，并且回调函数中的 `this` 将自动绑定到当前的 Vue 实例上：

```
Vue.component('example', {
  template: '<span>{{ message }}</span>',
  data: function () {
    return {
      message: '未更新'
    }
  },
  methods: {
    updateMessage: function () {
      this.message = '已更新'
      console.log(this.$el.textContent) // => '未更新'
      this.$nextTick(function () {
        console.log(this.$el.textContent) // => '已更新'
      })
    }
  }
})
```

因为 `$nextTick()` 返回一个 `Promise` 对象，所以你可以使用新的 [ES2017 async/await](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function) 语法完成相同的事情：

```
methods: {
  updateMessage: async function () {
    this.message = '已更新'
    console.log(this.$el.textContent) // => '未更新'
    await this.$nextTick()
    console.log(this.$el.textContent) // => '已更新'
  }
}
```

大概阅读了以上的内容之后我们现在要学习一下vue的数据绑定核心原理Object.defineProperty

## 2.Object.defineProperty的使用

### 2.1函数的简介

`**Object.defineProperty()**` 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象。

**备注：**应当直接在 [`Object`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object) 构造器对象上调用此方法，而不是在任意一个 `Object` 类型的实例上调用。

### 2.2最简单的示例

首先自己创建一个html文件实现如下代码 

```js
//新建一个html静态页面在js部分编写
var obj = {}
Object.defineProperty(obj,'name',{
  value:'我是name',//设置obj中name属性的默认值
  writable:false//设置当前属性是否可写入
})
console.log(obj.name)
obj.name = "新的名字"
console.log(obj.name)
```

#### 2.2.1Object.defineProperty的详细说明

```js
//Object.defineProperty(对象变量,对象的key,配置信息)
//设置了之后他就可以实时监控这个对象的指定key的赋值和取值事件，并且可以设置对象属性是否可写，默认值等其他功能
Object.defineProperty(obj,'name',{
  configurable:true,//当且仅当该属性的 configurable 键值为 true 时，该属性的描述符才能够被改变，同时该属性也能从对应的对象上被删除。默认为 false。
  enumerable:true,//当且仅当该属性的 enumerable 键值为 true 时，该属性才会出现在对象的枚举属性中。默认为 false
  value:'name',//该属性对应的值。可以是任何有效的 JavaScript 值（数值，对象，函数等）。默认为 undefined。。
  writable:true,//当且仅当该属性的 writable 键值为 true 时，属性的值，也就是上面的 value，才能被赋值运算符改变。默认为 false。
  get(){
    return '值'
  },//属性的 getter 函数，如果没有 getter，则为 undefined。当访问该属性时，会调用此函数。执行时不传入任何参数，但是会传入 this 对象（由于继承关系，这里的this并不一定是定义该属性的对象）。该函数的返回值会被用作属性的值。默认为 undefined。get和value两者不可以同时存在
  set(v){
    console.log(v)
  }//属性的 setter 函数，如果没有 setter，则为 undefined。当属性值被修改时，会调用此函数。该方法接受一个参数（也就是被赋予的新值），会传入赋值时的 this 对象。默认为 undefined。
})
```

#### 2.2.2 基本配置信息示例

首先我们学习一下configurable和enumerable

打开案例中的[demo1.html]()

> 总结：
>
> configurable设置为false之后这个对象被定义的属性就不可以被删除也不可以修改.
>
> enumerable设置为false之后这个对象定义的属性不可以被Object.keys(obj)枚举

然后我们来研究一下value和writable以及set和get

打开案例中的[demo2.html]()

> 总结：
>
> 学习完demo2.html我们总结一下value是默认值。writable主要用途为设置是否可写。value和writable是一对，get和set是一对，他们不能并存。使用了get和set之后value和writable就不能使用了。

接下来打开案例中的[demo3.html]()

我们着重学习一下get和set的用法这个是Object.defineProperty的核心

> 总结：
>
> Object.defineProperty这个函数可以监听对象并且对对象的指定属性进行监听，这样我们可以通过拦截set和get做一些监听类的处理。一定要注意不要在set方法里操作被监听的属性本身，这样会造成死循环。

#### 2.2.3监听input的标签的示例

我们接下来打开案例中的[demo4.html]()

来体验一下通过Obejct.definProperty来实现的模拟双向绑定的效果

> 总结，通过学习了刚才的案例我们已经能理解vue中为什么能通过数据的值的改变就动态触发页面改变了。

### 3.vue仿真

打开案例中的[index.html]()

我们根据代码的整体流程学习一下如何通过原生js实现一个vue

> 总结：
>
> 我们通过仿真vue的案例学习之后总结一下vue的工作流程
>
> 1. vue是将监听绑定到了一个中间对象上来实现监听data中值的数据的
> 2. 我们之所以能通过this直接引用data中的变量是因为在监听函数第一次观察data的时候直接将他们同步挂在到了_data和vue实例子本身上
> 3. vue并不是通过直接操作dom对象来实现值的更新的，而是通过在初始化的时候将当前的html部分用json对象生成了一个虚拟的dom树，在渲染时根据值的不同来重新的生成dom树进行页面更新的
> 4. eval的说明，eval可以执行字符串的js代码，这样可以帮助我们实现在网页中定义一些动态的js逻辑。
> 5. 以上的流程是我们根据vue的框架分析出来并加以实现，并不是vue真正的源码