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
    path: '/backend/login',
    name: 'bLogin',
    component: () => import('../views/back/Login.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    children: [
      {
        path: '/userlist',
        name: 'UserList',
        component: () => import('../views/UserList.vue')
      },
      {
        path: '/goodslist',
        name: 'GoodsList',
        component: () => import('../views/GoodsList.vue')
      }
    ]
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
