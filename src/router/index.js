import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Main',
    component: () => import('@/layouts/MainLayout'),
    children: [
      {
        path: '',
        component: () => import('@/views/Dashboard')
      },
      {
        path: 'summary',
        component: () => import('@/views/Summary')
      },
      {
        path: 'map',
        component: () => import('@/views/Map')
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
