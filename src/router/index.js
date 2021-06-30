import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: {
      name: 'Login'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
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
