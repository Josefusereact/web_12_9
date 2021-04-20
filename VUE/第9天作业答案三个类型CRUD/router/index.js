import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import Login from '../views/Login.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index,
		children:[
			{
				path:'/user',
				name:'user',
				component:() => import('../views/system/user/user.vue'),
			},
			{
				path:'/user-add',
				name:'user-add',
				component:() => import('../views/system/user/user-add.vue'),
			},
			{
				path:'/user-edit',
				name:'user-edit',
				component:() => import('../views/system/user/user-edit.vue'),
			},
			{
				path:'/menu',
				name:'menu',
				component:() => import('../views/system/menu/menu.vue'),
			},
			{
				path:'/menu-add',
				name:'menu-add',
				component:() => import('../views/system/menu/menu-add.vue'),
			},
			{
				path:'/menu-edit',
				name:'menu-edit',
				component:() => import('../views/system/menu/menu-edit.vue'),
			},
			{
				path:'/menu-add-child',
				name:'menu-add-child',
				component:() => import('../views/system/menu/menu-add-child.vue'),
			},
			{
				path:'/menu-edit-child',
				name:'menu-edit-child',
				component:() => import('../views/system/menu/menu-edit-child.vue'),
			},
			{
				path:'/role',
				name:'role',
				component:() => import('../views/system/role/role.vue'),
			},
			{
				path:'/role-add',
				name:'role-add',
				component:() => import('../views/system/role/role-add.vue'),
			},
			{
				path:'/role-edit',
				name:'role-edit',
				component:() => import('../views/system/role/role-edit.vue'),
			},
			{
				path:'/role-menu',
				name:'role-menu',
				component:() => import('../views/system/role/role-menu.vue'),
			},
			{
				path:'/test-user',
				name:'test-user',
				component:() => import('../views/test/user/test-user.vue'),
			},
			{
				path:'/user-test',
				name:'user-test',
				component:() => import('../views/test/user-test/user-test.vue'),
			},
			{
				path:'/user-test-add',
				name:'user-test-add',
				component:() => import('../views/test/user-test/user-test-add.vue'),
			},
			{
				path:'/user-test-edit',
				name:'user-test-edit',
				component:() => import('../views/test/user-test/user-test-edit.vue'),
			},
			{
				path:'/goods-type',
				name:'goods-type',
				component:()=>import('../views/type/goods-type/goods-type.vue')
			},
			{
				path:'/goods-type-web2003',
				name:'goods-type-web2003',
				component:()=>import('../views/test/goods-type-web2003/goods-type-web2003.vue')
			},
			{
				path:'/goods-type-add-web2003',
				name:'goods-type-add-web2003',
				component:()=>import('../views/test/goods-type-web2003/goods-type-add-web2003.vue')
			},
			{
				path:'/goods-type-edit-web2003',
				name:'goods-type-edit-web2003',
				component:()=>import('../views/test/goods-type-web2003/goods-type-edit-web2003.vue')
			},
			//优惠券管理
			{
				path:'/coupon-type',
				name:'coupon-type',
				component:()=>import('../views/type/coupon-type/coupon-type.vue')
			},
			{
				path:'/coupon-type-add',
				name:'coupon-type-add',
				component:()=>import('../views/type/coupon-type/coupon-type-add.vue')
			},
			{
				path:'/coupon-type-edit',
				name:'coupon-type-edit',
				component:()=>import('../views/type/coupon-type/coupon-type-edit.vue')
			},
			//商城会员管理
			{
				path:'/user-type',
				name:'user-type',
				component:()=>import('../views/type/user-type/user-type.vue')
			},
			{
				path:'/user-type-add',
				name:'user-type-add',
				component:()=>import('../views/type/user-type/user-type-add.vue')
			},
			{
				path:'/user-type-edit',
				name:'user-type-edit',
				component:()=>import('../views/type/user-type/user-type-edit.vue')
			},
			//卡类型管理
			{
				path:'/card-type',
				name:'card-type',
				component:()=>import('../views/type/card-type/card-type.vue')
			},
			{
				path:'/card-type-add',
				name:'card-type-add',
				component:()=>import('../views/type/card-type/card-type-add.vue')
			},
			{
				path:'/card-type-edit',
				name:'card-type-edit',
				component:()=>import('../views/type/card-type/card-type-edit.vue')
			},
		]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

export default router
