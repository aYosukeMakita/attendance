import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import User from '../views/User.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'User',
    component: User,
  },
  {
    path: '/users/add',
    name: 'UserAdd',
    component: () => import('../views/UserAdd.vue'),
  },
  {
    path: '/users/:userId/histories',
    name: 'UserHistory',
    component: () => import('../views/UserHistory.vue'),
  },
  {
    path: '/histories',
    name: 'History',
    // route level code-splitting
    // this generates a separate chunk (users.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "history" */ '../views/History.vue'),
  },
]

const router = new VueRouter({
  routes,
})

export default router
