import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import UserList from '../views/UserList.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'UserList',
    component: UserList,
  },
  {
    path: '/users/:userId/histories',
    name: 'UserHistory',
    component: () => import('../views/UserHistory.vue'),
  },
]

const router = new VueRouter({
  routes,
})

export default router
