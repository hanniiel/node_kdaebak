import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Group from '../views/Group.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/idol',
    name: 'Idol',
    component: () => import(/* webpackChunkName: "about" */ '../views/Idol.vue')
  },
  {
    path: '/group',
    name: 'Group',
    component: Group
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: 'active',
})

export default router
