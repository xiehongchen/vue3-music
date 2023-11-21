import { RouteRecordRaw } from "vue-router"

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/discovery',
    name: 'home',
    children: [
      {
        path: '/discovery',
        name: 'discovery',
        component: () => import('@/views/discovery/index.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  }
]

export default routes