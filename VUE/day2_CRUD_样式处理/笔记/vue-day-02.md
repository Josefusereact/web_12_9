# Vue入门2

## 今日内容

1. Vue基础整合
2. vue的class绑定
3. vue的style绑定
4. 本节相关面试题

## 1.Vue基础整合

### 1.1table综合练习

#### 1.1.1v-for实现table渲染

1. 打开课堂案例中的[table.html](/md/day2/案例/table.html)
2. 根据提示将list的数据渲染到table表格中
3. 答案在[table1.html](/md/day2/案例/table1.html)

#### 1.1.2通过computed计算属性将用户数据中的电话号码中间四位替换成`****`

这里涉及到computed的高级用法，computed中创建的函数默认只能将制定的data属性加工并返回，默认用法中无法通过传入参数来实现该功能，本节介绍computed可传参数的方式来批量处理数据的扩展

```vue
<!-- computed传入参数的指定用法 -->
<div>
  {{format('xxx')}}
</div>
<script>
  new Vue({
		computed:{
      format(){
        //computed中的返回值可以是一个函数,当计算属性需要传入参数时就采用这种写法，可以将计算属性的参数通过该function的参数捕获到
        return function(arg){
          return arg+'xxx'
        }
      }
    }
  })
</script>

```

接下来打开课堂案例中的[table1.html](/md/day2/案例/table1.html)

并通过提示完成将手机号码转换的例子

答案在[table2.html](/md/day2/案例/table2.html)

```js
computed:{
					//格式化手机号码的函数
					formatPhone(){
						//当前formatPhone在使用中传入了参数，参数是每条数据的手机号码
						//所以我们可以在当前函数中处理原始手机号码
						return function(phone){
							//将手机号码中间四位通过字符串处理替换并返回实现在页面中展示1xx****xxxx
							let pre = phone.substring(0,3)
							let last = phone.substring(7)
							return pre+'****'+last
						}
					},
            //生日转换函数
					formatBirthday(){
						return function(birthday){
							console.log(birthday)
							let birthdayArr = birthday.split('-')
							return `
								${birthdayArr[0]}年${birthdayArr[1]}月
								${birthdayArr[2]}日
							`
						}
					}
}
```



#### 1.1.3通过点击增加按钮实现给表格增加一行数据

> 思路：
>
> ​	由于Vue是以数据为核心驱动页面的框架，操作是对当前表格的数据数组新增一个元素这样在页面中就会对应的渲染出数组新增的数据

我们先预览一下[table3.html](/md/day2/案例/table3.html)先体验一下新增流程。

然后我们根据操作得到的结论分析成以下实现步骤

实现步骤：

1. 先实现点击新增按钮后增加一行数据

   1. 第一步在新增按钮上添加点击事件
   2. 在点击事件中执创建一个json对象，对象的属性要和每行的对象属性一一对应
   3. 给对象生成一个唯一的id
   4. 将对象插入到list的最后

2. 此时点击按钮时会新增一行但是无法输入：

   注意事项：当点击新增后只要没有取消或者保存的情况下就不应该继续新增所以要给新增按钮隐藏起来

   1. 在data中声明一个布尔类型的isInsert属性用来判断当前是否正在添加数据

   2. 给新增按钮增加判断这了可以使用v-show来做切换，当`isInsert==true`时隐藏新增按钮

   3. 当点击新增事件的时候在将对象插入list后需要将isInsert设置为true到此为止我们实现了点击新增时隐藏了新增按钮，在新增一条记录时应该有两个选择，一个是`保存`数据一个是`取消`新增

   4. 所以我们要在`操作`那一列做处理当点击新增时新增行最后的按钮应该是`保存`和`取消`

   5. 给最后一列增加v-if判断当isInsert==true并且当前行的index为list.length-1时右侧的`修改`和`删除`按钮应该变成`保存`和`取消`

   6. 最后一步操作，对每行除了序号的列做判断，增加v-if判断当isInsert==true并且当前行的index为list.length-1时新增行的每一列应该展示输入框而不是空数据

      ```vue
      //关键代码
      //定义新增动作标记
      isInsert:false,
      //新增按钮
      <button v-show="isInsert == false" @click="handleClick">新增</button>
      //新增事件
      handleInsertClick(){
        let row = {id:"id"+new Date().getTime(),name:'',phone:'',email:'',birthday:''};
        this.list.push(row);
        this.isInsert = true;
      }
      //展示数据的判断
      <td>
        <div v-if="isInsert == true && index == list.length-1">
          <button @click="handleSave">保存</button>
      		<button @click="handleCancel">取消</button>
      	</div>
      	<div v-else>
        	<button >修改</button>
      		<button >删除</button>
      	</div>
      </td>
      ```

      

3. 完成第二步之后点击新增按钮会出现一行输入框，右侧的按钮会变成`保存`和`取消`，但是我们输入框输入的数据要和当前行绑定，所以这里需要用到v-model

   1. 将除了序号的每一列的input标签通过v-model绑定当前行当前列的数据也就是item.属性名
   2. 完成后我们为`保存`和`取消`按钮，分别行定点击事件 handleSave和handleCancel
   3. 首先处理保存事件，当点击保存事件时我们先打印list的数据查看v-model绑定的数据是否进入了list
   4. 发现新数据绑定成功之后， 再将isInsert设置为false至此便完成了新增保存的操作
   5. 然后我们处理`取消`按钮的事件，当我们点击取消时就代表我们不添加当前数据了所以取消事件中我们应该做的操作就是将list的最后一行删除并且将isInsert设置为false

至此新增的实现步骤分析完毕，我们打开案例中的[table2.html](/md/day2/案例/table2.html)进行实际的实现

```vue
//关键代码
//为每一列添加可编辑的文本框，先用户名举例，其他以此类推
<div v-if="index==list.length-1&&isInsert==true">
  <input type="text" v-model="item.name">
</div>
<div v-else>
  {{item.name}}
</div>
//保存事件
handleSave(){
	this.isInsert = false;
}
<button @click="handleSave">保存</button>
//取消事件
handleCancel(){
  this.isInsert = false;
  this.list.pop();
}
<button @click="handleCancel">取消</button>
```



#### 1.1.4修改功能

通过点击修改按钮对表格的每一行数据进行修改

与新增时一样我们先打开[table4.html](/md/day2/案例/table4.html)来体验一下修改的流程

然后分析一下实现修改的步骤

步骤：

1. 首先要对修改按钮增加点击事件handleUpdate

2. 由于每行都存在修改按钮我们绑定的事件也就是批量绑定的事件所以我们要在事件中确认当前事件要操作的是哪行的数据

3. 所以我们需要对handleUpdate事件传入参数(item)这样在handleUpdate事件执行的时候对应的item代表的就是我们所要更改的行的数据

4. 目标行确定了，我们发现仍然存在问题我们需要让点击修改按钮这一行的数据变成可编辑状态才可以修改

5. 这样的话效仿新增也需要新增一个状态开关，但是对于修改来说一个状态开关是不够的因为我们在编辑某一行的同时也可以点击到其它行的`修改`按钮，所以我们需要对数组中的每一行数据都追加一个isUpdate属性

6. 由于在开发中list这种数据一般都是服务端传输来的数据，本身一定不会有状态开关，所以这种情况我们不能直接在list中每一行追加这个属性，而是在Vue的生命周期中去操作

7. 我们假设list来自于其他地方不可以更改原始字段，所以我们在created的函数中对list进行重写,循环list对每个元素追加一个isUpdate = false的属性,注意：vue对数据的观察是默认根据初始化的数据结构来观察的，如果初始化的数据是数组或者对象，他就只观察默认声明的，数组或者对象的初始化属性，后追加的属性就不会被观察，操作后追加的属性也不会让视图更新，所以如果想后追加属性，一定要将原来定义的对象，复制成新的对象，或者使用this.$forceUpdate()强制视图更新

   [map和forEach的区别](https://www.jb51.net/article/134411.htm)

   ```js
   created() {
     this.list = this.list.map(item => {
       item.isUpdate = false
       return {...item};
     })
   }
   ```

   

8. 这样我们在handleUpdate事件中输出参数item时会发现有isUpdate属性

9. 接下来就是对每行的列增加判断, 因为是编辑状态，按钮也需要变化，是`保存`和`取消`

   ```vue
   <div v-else-if="item.isUpdate == true">
     <input type="text" v-model="item.name">
   </div>
   <div v-else-if="item.isUpdate == true">
     <button @click="handleUpdateSave(item)">保存</button>
     <button @click="handleUpdateCancel(item)">取消</button>
   </div>
   ```

   

10. 当某一行的状态为正在修改时我们应该在原有判断的基础上追加v-else-if来判断item.isUpdate为true时展示绑定当前数据的input标签那么我们在handleUpdate事件中只需要将当前item的isUpdate属性设置为true就可以了，**这里需要注意的是改完isUpdate之后需要对原数组的list做一次复制来实现页面的更新**

    ```js
    this.list = [...this.list]
    ```

11. 可输入行为搞定之后下一步 就是按钮，同理当当前行的isUpdate为true时我们要也要展示`保存`和`取消`按钮并且为保存和取消按钮绑定handleUpdateSave和handleUpdateCancel两个点击事件，由于要保存和取消后要把可编辑状态去掉所以我们也要对事件在html标签上将item传入

12. 下一步是实现修改数据的保存,由于编辑的输入框已经绑定了item的数据，所以保存事件只需要将item的isUpdate属性设置回false取消编辑状态就可以实现保存,

    <del>我们可以对handleUpdateSave增加一个index参数来使用this.$set(this.list,index,对应的值)来实现指定对vue中数组或json对象的更改</del>

13. 到了取消后我们发现一个问题如果与保存按钮做一样的操作，那么点击取消确实可以解除编辑状态，但是我们改动的数据也随着保存了，所以我们涉及到一个任务就是取消时要恢复点击修改时的初始数据，实现步骤如下
    1. 首先在点击修改时我们就应该将当前行的数据复制到一个临时变量中

    2. 那么我们就应该在data中声明一个temp变量来存

    3. 点击修改按钮执行handleUpdate时我们将参数中的item存到temp中，但是这个操作不能使用

       ```js
       temp = item
       ```

       因为item是对象通过等号只是引用传递并不是复制，这里我们使用es6的一种对象浅拷贝的方式temp = {...item}来存初始数据，这样即使item变更了temp也不会改变

       ```js
       handleUpdate(item){
         item.isUpdate = true;
         temp = {...item}
       }
       ```

       

    4. 这时我们在handleUpdateCancel取消事件中我们将temp中的数据的每一个属性设置回item中这里不能通过复制或创建新对象的方式对item设置值，这样会导致数据的绑定关系失效从而无法更新页面，同理在保存事件handleUpdateSave中也要清空temp数据

       ```js
       //保存更新
       handleUpdateSave(item){
         this.temp = '';
         item.isUpdate = false;
       }
       //取消更新
       handleUpdateCancel(item){
         item.isUpdate = false;
         item.name = this.temp.name;
         item.phone = this.temp.phone;
         item.birthday = this.temp.birthday;
         item.email = this.temp.email;
       }
       ```

       

至此我们的修改操作也完美的完成了，下面我们打开[table3.html](/md/day2/案例/table3.html)案例来实地的实现一下



#### 1.1.5实现对指定行数据的删除

可以参考最终效果[table5.html](/md/day2/案例/table5.html)先体验一下删除效果

然后考虑实现步骤

步骤：

1. 删除与修改一样每一行都有删除按钮，所以第一步就是创建一个传入当前行对象的点击事件handleRemove
2. 然后在点击事件中我们就可以获取到当前行的数据，想要把它从表格中删除只需要从数组中把这个元素删除就可以了所以我们想到了用数组的splice方法
3. splice(index【从第几个开始删除】,count【删除几个数据】)的api有这两个参数，那么我们传入的item数据就没有用了，有一个更简单的方式拿到当前数据的位置就是把v-for循环时的index传入所以我们把handleRemove的参数改成index
4. 在handleRemove执行this.list.splice(index,1),这样便实现了删除
5. 进一步的改造：删除在软件开发中是一项风险极高的操作，所以涉及到删除的内容不可以直接删除必须有一个询问，在这里我们用window.confirm这个最简单的方式来实现询问,如果点击确定就进行删除操作

至此所有的增删改查流程就完成了

我们在[table4.html](/md/day2/案例/table4.html)案例中进行实际的实现操作吧

```js
//关键代码
//按钮
<button @click="handleRemove(index)">删除</button>
//事件绑定
handleRemove(index){
  let res = window.confirm('正在删除当前数据，点击确定继续')
  if(res){
    this.list.splice(index,1)
  }
}
```



#### 1.1.6完成修改功能后引发的bug

在完成以上操作后点我们会发现我们自己新增的数据是无法修改的，这是因为我们在做新增操作时没有对新增的数据设置isUpdate属性所以完成1.1.5之后我们还要在handleClick的方法中将新增的对象加入isUpdate:false初始值

这才完美～

## 2.Vue的Class绑定

Vue的class绑定与普通属性绑定的方式一样v-bind:class=""或者:class=""绑定class主要用于通过Vue改变html元素的样式时，由于Vue中采用非dom操作的方式去操作html对象，所以在变更html样式时也可以直接通过数据绑定的形式进行变更，Vue绑定Class主要有`对象方式`和`数组方式`两种

### 2.1对象绑定方式

对象绑定方式为通过v-bind方式把一个json对象

> {className:boolean值...}

格式的数据绑定到class上，通过boolean的值决定当前的className是否绑定到元素的标签上，由此我们可以通过操作json对象中className的值来动态的决定当前的className是否添加到元素上

> 提示：Class的绑定不会覆盖原生属性定义的class，会追加到当前class属性的最后。所以如果当前的标签已经定义了默认的class的值，我们不必担心通过v-bind绑定的class样式会将原有样式写没

下面我们看两种绑定class的实际代码写法

#### 第一种

```vue
<!-- 直接写入标签内 -->
<div class="btn" v-bind:class="{active:true,clearfix:false}">
  内容
</div>
<!-- 输出结果为 -->
<div class="btn active">
  内容
</div>
```

#### 第二种

```vue
<!-- 通过data中的对象绑定 -->
<div id="app">
  <!-- btnClass必须是data中的对象必须是json对象，只有通过v-bind方式才能绑定变量 -->
  <div class="btn" v-bind:class="btnClass">
    内容
  </div>
</div>
<script>
	new Vue({
    data(){
      return {
        //由于clearfix的结果为true所以会对div追加一个clearfix的className
        btnClass:{
          active:false,
          clearfix:true
        }
      }
    }
  })
</script>
<!-- 输出结果 -->
<div class="btn clearfix">
  内容
</div>
```

> 下面我们参考案例中的代码进行实际操作

打开案例文件夹中的[class.html](/md/day2/案例/class.html)文件运行并查阅代码，我们结合代码注释并做一下课堂练习

### 2.2数组绑定方式

数组绑定方式的格式为v-bind:class="['className1','className2',...]"，在数组中包含的className就会被追加到当前的标签上，其他与对象绑定的原理一致依然存在两种方式一种是直接写在标签上，一种是声明到data里

```vue
<!-- 直接绑定方式-->
<div class="btn" v-bind:class="['active','clearfix']">
  内容
</div>
<!-- 输出结果-->
<div class="btn active clearfix">
  内容
</div>
```

```vue
<!-- 通过data中的对象绑定 -->
<div id="app">
  <!-- btnClass必须是data中的对象必须是Array对象，只有通过v-bind方式才能绑定变量 -->
  <div class="btn" v-bind:class="btnClass">
    内容
  </div>
</div>
<script>
	new Vue({
    data(){
      return {
        btnClass:['active','clearfix']
      }
    }
  })
</script>
<!-- 输出结果 -->
<div class="btn active clearfix">
  内容
</div>
```

> 下面我们参考案例中的代码进行实际操作

打开案例文件夹中的[class1.html](/md/day2/案例/class1.html)文件运行并查阅代码，我们结合代码注释并做一下课堂练习

> 总结：在生产中我们更多的会使用通过data声明对象去绑定class的方式来操作，所以直接写入到标签上的学习方式只作为了解性学习即可，Json和Array两种绑定方式按照个人习惯以及适合的场景选择性使用

## 3.Style绑定

上一节我们学习了如何动态的绑定class的方式来操作样式，但是class能做到的是点到点的变化，无法实现状态的跟踪和阻断，也就是说如果我们有一个需求想让div随着range的值改变大小，那就无法通过动态切换class的方式来改变div的大小，因为class只有两种情况一种是绑定了一种是没绑定，所以这时我们变需要更改元素的css属性来实现动态的改变元素，传统的方式是获取dom对象通过style来操作，但是Vue中不建议直接操作dom对象这样会破坏渲染性能，所以Vue又提供了一套style的绑定方式

> 小贴士，绑定style同样有对象和数组两种方式，但是数组方式不利于优雅的完成样式的维护，所以我们只需要学习对象绑定style的方式即可

```vue
<!-- 通过data中的对象绑定 -->
<div id="app">
  <!-- btnStyle必须是data中的属性且类型为Json，只有通过v-bind方式才能绑定变量 -->
  <div class="btn" :style="btnStyle">
    内容
  </div>
</div>
<script>
	new Vue({
    data(){
      return {
        btnStyle:{
        	width:'100px',
          height:'100px',
          color:'red'
        }
      }
    }
  })
</script>
<!-- 输出结果 -->

{
 	width:100px;
  height:100px;
  color:red
}
<div class="btn">
  内容
</div>
```

> 下面我们参考案例中的代码进行实际操作

打开案例文件夹中的[style.html](/md/day2/案例/style.html)文件运行并查阅代码，我们结合代码注释并做一下课堂练习

## 相关面试题

### 1.绑定class的数组用法

```js
1.对象方法v-bind:class="{'orange':isRipe, 'green':isNotRipe}”
2.数组方法v-bind:class="[class1,class2]"
3.行内v-bind:style="{color:color,fontSize:fontSize+'px'}”
```



## 作业

1. 将上午的table练习，从table.html开始做，全做到这个文件中。不要参考代码，参考笔记中的步骤从头到尾。
2. 将练习再拖稿做一遍。

