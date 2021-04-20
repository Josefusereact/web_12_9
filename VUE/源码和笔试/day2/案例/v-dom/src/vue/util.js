import VNode from 'virtual-dom/vnode/vnode'
import VText from 'virtual-dom/vnode/vtext'
var h = require('virtual-dom/h');
var convertHTML = require('html-to-vdom')({
    VNode: VNode,
    VText: VText
});
//保存当前激活的文本框
let activeKey = ''
var diff = require('virtual-dom/diff');
var patch = require('virtual-dom/patch');
//匹配取值表达式
let regx = /{{(.*?)}}/g
//匹配事件参数
let regxFunc = /\((.*?)\)/g
//增加代理函数，用来对监听的数据挂载Proxy对象
const addProxy = (data,vue) => {
	//将data中的对象设置到vue上
	for(let key in data){
		vue[key] = data[key]
	}
	//对data数据进行监听
	let pdata = new Proxy(data,{
		set(target,property,value){
			//设置data数据时同时设置vue对象上对应的属性
			vue[property] = value
			//对data的属性设置值
			target[property] = value
			//重新根据当前的虚拟dom生成渲染树
			let renderTree = makeRenderTree(vue.$vdom,vue)
			//重新更新视图
			vue.$el = patch(vue.$el,diff(vue.$vdom,renderTree))
			//通过activeKey确认当前被激活的文本框是哪个
			let ipt = document.querySelectorAll(`input`)
			for(let item of ipt){
				if(item.key == activeKey){
					item.focus()
				}
			}
			return target[property] = value
		},
		get(target,property){
			return target[property]
		}
	})
	//将当前的代理对象设置到Vue的_data对象上
	vue._data = pdata;
}
//观察者函数
export const watcher = (vue) => {
	let data
	if(vue.$options.data instanceof Function){
		data = vue.$options.data()
	}else if(vue.$options.data instanceof Object){
		data = vue.$options.data
	}
	addProxy(data,vue)
}
//生成虚拟dom的函数
export const makeVDOM = (dom) => {
	let vdom = convertHTML(dom.outerHTML)
	return vdom;
}
//通过虚拟dom生成渲染树的函数
export const makeRenderTree = (vdom,vue) => {
	if(vdom.children&&vdom.children.length>0){
		let arr = []
		for(let item of vdom.children){
			arr.push(makeRenderTree(item,vue))
		}
		return h(vdom.tagName,{
			...vdom.properties
		},arr)
	}else{
		if(vdom.type == "VirtualNode"){
			if(vdom.properties.attributes['v-model']){
				vdom.key = Math.random()
				let valueKey = vdom.properties.attributes['v-model']
				if(vdom.tagName == 'input'){
					if(vdom.properties.key == undefined){
						vdom.properties.key = Math.random()
					}
					// vdom.properties.autofocus = false
					vdom.properties.oninput = function(e){
						activeKey = vdom.properties.key
						vue._data[valueKey] = e.target.value
					}
					
					vdom.properties.value = vue[valueKey]
				}
			}
			return vdom
		}else{
			let matchKeys = vdom.text.match(regx)
			let text = vdom.text
			if(matchKeys){
				matchKeys.forEach(matchKey => {
					Object.keys(vue._data).forEach(key => {
						try{
							let regxKey = new RegExp(key,'g')
								let replaceStr
								if(typeof vue._data[key] == 'string'){
									replaceStr = matchKey.replace(regxKey,"'"+vue._data[key]+"'")
								}else{
									replaceStr = matchKey.replace(regxKey,vue._data[key])
								}
								replaceStr = eval(replaceStr.replace(/{|}/g,''))
								text = text.replace(matchKey,replaceStr)
							
						}catch(e){
							// console.log(e)
							//TODO handle the exception
						}
					})
				})
			}
			return new VText(text)
		}
	} 
}