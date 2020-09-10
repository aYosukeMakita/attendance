import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Works from '../views/Works.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Works',
    component: Works,
  },
  {
    path: '/users',
    name: 'Users',
    // route level code-splitting
    // this generates a separate chunk (users.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "users" */ '../views/Users.vue'),
  },
]

const router = new VueRouter({
  routes,
})

export default router
