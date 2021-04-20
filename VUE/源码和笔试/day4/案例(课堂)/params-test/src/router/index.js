import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/demo1',
    name: 'Demo1',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "Demo1" */ '../views/Demo1.vue')
  },
  {
    path: '/demo2',
    name: 'Demo2',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "Demo1" */ '../views/Demo2.vue')
  },
  {
    path: '/demo3',
    name: 'Demo3',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "Demo1" */ '../views/Demo3.vue')
  },
  {
    path: '/demo4',
    name: 'Demo4',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "Demo1" */ '../views/Demo4.vue')
  },
  {
    path: '/demo5',
    name: 'Demo5',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "Demo1" */ '../views/Demo5.vue')
  },
  {
    path: '/demo6',
    name: 'Demo6',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "Demo1" */ '../views/Demo6.vue')
  },
  {
    path: '/demo7',
    name: 'Demo7',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "Demo1" */ '../views/Demo7.vue')
  },
  {
    path: '/demo8',
    name: 'Demo8',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "Demo1" */ '../views/Demo8.vue')
  },
  {
    path: '/demo9',
    name: 'Demo9',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "Demo1" */ '../views/Demo9.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
