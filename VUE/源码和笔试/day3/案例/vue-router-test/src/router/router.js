//引入路由容器router-view组件
import RouterView from '@/components/RouterView.vue'
//引入router-link路由跳转组件
import RouterLink from '@/components/RouterLink.vue'
//引入路由的响应式对象，通过Vue.observable封装来实现
//在vue对象中可以全局监听到他的变化
import {router} from './data'
//定义VueRouter对象并导出他
//他在new VueRouter()的时候执行
export default class VueRouter{
  constructor({routes}){
    //将new VueRouter()时候传入的路由配置信息
    //传入router对象的routes中
    router.routes = routes
  }
}
//定义VueRouter对象的install方法
//当执行Vue.use(VueRouter)的时候执行
//所以他会比new VueRouter()先执行
VueRouter.install = (Vue) => {
  //将路由的router-view注册为全局组件作为路由页面的容器
  Vue.component(RouterView.name,RouterView)
  //将路由的router-link注册为全局组件作为路由跳转的对象
  Vue.component(RouterLink.name,RouterLink)
  //将$router和$route对象植入到每个vue对象中
  //这样可以在每个Vue的对象中使用this.$router
  //以及this.$route。这里由于是简易封装所以只实现了query和path
  //没有实现params和name的跳转方式
  Vue.mixin({
    computed:{
      $router(){
        return router
      },
      $route(){
        return router.$route
      }
    }
  })
  //第一次访问项目时候如果浏览器的路径中没有#
  //就将页面跳转到/#/来初始化hash路由的初始路径
  //这里就是为什么当我们访问vue的项目时他会自动对url添加#/
  if(location.href.indexOf('#') == -1){
    location.href = '/#/'
  }else{
    // 如果url中有#我们就把#后面的第一个/开始截取
    //用来保存到router对象的path中作为页面的初始path
    router.path = location.href.substring(location.href.indexOf('#')+1)
  }
  //监听url路径的变化，当url路径触发变化的时候
  //我们就将router的path变更为新的路径
  window.onhashchange = (e) => {
    // 当router.path的值变更时会触发
    //RouterView中的computed函数重新计算
    //导致compoent动态组件重新的渲染，来实现跳页
    //详情请跳转到components/RouterView.vue中查看
    if(e.newURL.indexOf('#')!= -1){
      router.path = e.newURL.substring(e.newURL.indexOf('#')+1) 
    }
  }
}

