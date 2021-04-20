import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/outside',
    name: 'Home',
    component: () => import('@/views/Outside.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/array',
    name: 'Array',
    component: () => import(/* webpackChunkName: "about" */ '../views/Array.vue')
  },
  {
    path: '/map',
    name: 'Map',
    component: () => import(/* webpackChunkName: "about" */ '../views/Map.vue')
  },
  {
    path: '/map-array',
    name: 'MapArray',
    component:()=>import('../views/MapArray.vue')
  },
  {
    path: '/function',
    name: 'Function',
    component: () => import(/* webpackChunkName: "about" */ '../views/Function.vue')
  }

]

const router = new VueRouter({
  routes
})

export default router
