//router/index.js
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
    path: '/button',
    name: 'Button',
    // 异步引入的方式
    component: () => {
      return import(
        /*webpackChunkName:button*/
        '../views/Button.vue'
      )
    }
  },
  {
    path: '/input',
    name: 'Input',
    // 异步引入的方式
    component: () => {
      return import('../views/Input.vue')
    }
  },
  {
    path: '/notify',
    name: 'Notify',
    // 异步引入的方式
    component: () => {
      return import('../views/Notify.vue')
    }
  },
  {
    path: '/confirm',
    name: 'Confirm',
    // 异步引入的方式
    component: () => {
      return import('../views/Confirm.vue')
    }
  },
  {
    path: '/container',
    name: 'Container',
    // 异步引入的方式
    component: () => {
      return import('../views/Container.vue')
    }
  },
  {
    path: '/form',
    name: 'Form',
    // 异步引入的方式
    component: () => {
      return import('../views/Form.vue')
    }
  },
]

const router = new VueRouter({
  routes
})

export default router
