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
