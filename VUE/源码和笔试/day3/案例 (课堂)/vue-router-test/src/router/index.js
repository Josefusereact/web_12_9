import Vue from 'vue'
// 引入我们自己封装的的VueRouter
import VueRouter from './router'
// 使用Vue的use来注册我们的组件
// Vue.use执行会触发./router.js文件中的install方法执行
Vue.use(VueRouter)
//定义路由对象，与真正的VueRouter用法完全一样
const routes = [
  {
    path:'/',
    name:'Index',
    component:() => import('../views/Index.vue')
  },
  {
    path:'/test',
    name:'Test',
    component:() => import('../views/Test.vue')
  }
]
//实例化VueRouter对象并且初始化路由对象
const router = new VueRouter({
  routes
})
// 导出VueRouter对象
export default router;
