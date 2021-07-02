import Vue from 'vue'
import VueRouter from 'vue-router'
import Welcome from '../views/Welcome.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: Welcome
  },
  {
    path: '/back/login',
    name: 'bLogin',
    component: () => import('../views/back/Login.vue')
  },
  {
    path: '/back/home',
    name: 'bHome',
    component: () => import('../views/back/Home.vue'),
    children: [
      {
        path: '/back/user',
        name: 'bUser',
        component: () => import('../views/back/User.vue')
      },
      {
        path: '/back/goods',
        name: 'bGoods',
        component: () => import('../views/back/Goods.vue')
      },
      {
        path: '/back/order',
        name: 'bOrder',
        component: () => import('../views/back/Order.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'fLogin',
    component: () => import('../views/front/Login.vue')
  },
  {
    path: '/Register',
    name: 'fregister',
    component: () => import('../views/front/Register.vue')
  }
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// router.beforeEach((to, from, next) => {
//   const token = sessionStorage.getItem('token')
//   if (to.path === '/login' && token) {
//     return next('/home')
//   } else if (to.path !== '/login' && !token) {
//     return next('/login')
//   } else {
//     return next()
//   }
// })

export default router
