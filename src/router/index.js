import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/list',
  },
  {
    name: 'List',
    path: '/list',
    component: () => import('@/views/list'),
  },
  {
    name: 'Create',
    path: '/list/create',
    component: () => import('@/views/create'),
  },
  {
    name: 'Update',
    path: '/list/update',
    component: () => import('@/views/update'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
