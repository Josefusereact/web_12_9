//router/index.js
import Index from '@/views/Index.vue'
import Login from "@/views/login"
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const routes = [{
    path: '/',
    name: 'Index',
    component: Index,
    meta: {
        isLogin: true // 添加该字段，表示进入这个路由是需要登录的
    } //路由元
}, {
    path: "/login",
    name: "login",
    component: Login
}, {
    path: '/test',
    name: 'Test',
    component: () => {
        return import(
            /*webpackChunkName:"test"*/
            '../views/Test.vue'
        )
    }
}]
const router = new VueRouter({
    routes
})
export default router