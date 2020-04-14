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
  {
    path: '/github',
    beforeEnter () {
      location.href = "https://github.com/infinityc2/Covid-Tracker"
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
