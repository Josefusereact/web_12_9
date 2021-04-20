import Vue from '@/vue'
let vm = new Vue({
	data(){
		return {
			inputStr:'name',
			aaa:'1111'
		}
	}
}).$mount('#app')
console.log(vm)
// setTimeout(()=>{
// 	vm.aaa = 'dsdfsdf'
// },1000)
