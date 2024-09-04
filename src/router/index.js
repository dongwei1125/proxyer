import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/project/list',
  },
  {
    name: 'ProjectList',
    path: '/project/list',
    component: () => import('@/views/project/list'),
  },
  {
    name: 'ProjectCreate',
    path: '/project/list/create',
    component: () => import('@/views/project/create'),
  },
  {
    name: 'ProjectUpdate',
    path: '/project/list/update',
    component: () => import('@/views/project/update'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
