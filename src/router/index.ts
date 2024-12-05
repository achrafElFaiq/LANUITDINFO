import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/application',
      name: 'application',
      component: () => import('../views/Application.vue')
    },
    {
      path: '/defis',
      name: 'defis',
      component: () => import('../views/Defis.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/About.vue')
    },
    {
      path: '/donate',
      name: 'donate',
      component: () => import('../views/Donate.vue')
    }
  ]
})

export default router