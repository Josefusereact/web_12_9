import useModel from  '@/model/user-model'
import '@/index.css'
import '@/index.scss'
console.log(useModel)
const name = 'hello webpack'
console.log(name)
let d = new Promise((resolve,reject) => {
	setTimeout(()=>{
		resolve('hello')
	},1000)
})
d.then(res => {
	console.log(res)
})
const arr = [1,2]
arr.map(item => {
	console.log(item)
})