import Vue from 'vue'
import VueRouter from 'vue-router'

import ProjectList from '@/views/project/list'
import ProjectCreate from '@/views/project/create'
import ProjectUpdate from '@/views/project/update'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/project/list',
  },
  {
    name: 'ProjectList',
    path: '/project/list',
    component: ProjectList,
  },
  {
    name: 'ProjectCreate',
    path: '/project/list/create',
    component: ProjectCreate,
  },
  {
    name: 'ProjectUpdate',
    path: '/project/list/update',
    component: ProjectUpdate,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
