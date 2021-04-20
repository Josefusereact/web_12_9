import Vue from 'vue'
import App from './App.vue'
// 导入路由对象
import router from  './router'
Vue.config.productionTip = false

let vm = new Vue({
  // 将路由对象注册到vue上
  router,
  render: h => h(App),
}).$mount('#app')
console.log(vm)