import {
	makeVDOM,
	makeRenderTree,
	watcher
} from './util'
var h = require('virtual-dom/h');
var diff = require('virtual-dom/diff');
var patch = require('virtual-dom/patch');
var VText = require('virtual-dom/vnode/vtext');
var createElement = require('virtual-dom/create-element');
//匹配取值表达式
let regx = /{{(.*?)}}/g
//匹配事件参数
let regxFunc = /\((.*?)\)/g
//Vue主对象
export default class Vue{
	//构造函数
	constructor(options) {
		//将当前的vue中的data等内容传入到this对象中
		this.$options = options;
		//观察this对象
		watcher(this)
		let _this = this
		//将Vue实例用代理包裹并返回
		return new Proxy(this,{
			set(target,property,value){
				if(property.indexOf('$')==-1){
					target['_data'][property] = value
				}
				return target[property] = value
			},
			get(target,property){
				return target[property]
			}
		})
	}
	//渲染事件
	$mount(el){
		if(el){
			this.$el = document.querySelector(el)
			if(this.$el){
				//根据当前的网页内容生成虚拟dom
				this.$vdom = makeVDOM(this.$el)
				//根据虚拟dom生成渲染树
				let renderTree = makeRenderTree(this.$vdom,this)
				//根据渲染树和虚拟dom进行diff计算并更新到视图中
				this.$el = patch(this.$el,diff(this.$vdom,renderTree))
				//返回当前vue对象
				return this
			}else{
				throw('请设置正确的根元素')
			}
		}else{
			throw('el is not defined')
		}
	}
} 