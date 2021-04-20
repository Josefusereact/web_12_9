var h = require('virtual-dom/h');
var diff = require('virtual-dom/diff');
var patch = require('virtual-dom/patch');
var createElement = require('virtual-dom/create-element');
//声明一个计数变量
let count = 0;
let name = '我是原始值';
//通过h函数初始化页面的数据
let initView = function(){
	return h('div',{
		id:"div",
		className:'p-div',
	},[
		count,
		h('br'),
		name,
		h('br'),
		h('button',{
			//绑定点击事件
			onclick(){
				console.log('我是点击事件')
				//让count每次加一
				count++
				name = '我改变了name的值'
				//通过调用initView返回变更的视图虚拟dom
				let viewVdom1 = initView();
				console.log(viewVdom1)
				//对变更的虚拟dom进行比较不同计算
				let d = diff(viewVdom,viewVdom1)
				console.log(d)
				//更新视图实现页面更新
				patch(viewDom,d)
			}
		},'点我计数')
	])
}
//调用函数生成虚拟dom
let viewVdom = initView()
console.log(viewVdom)
//将虚拟dom转化成真实dom
let viewDom = createElement(viewVdom)
console.log(viewDom)
//将dom对象渲染到网页上
document.body.appendChild(viewDom)