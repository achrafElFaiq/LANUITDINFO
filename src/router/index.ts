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
      path: '/defis/cookie-cauchemar',
      name: 'cookie-cauchemar',
      component: () => import('../components/CookieCauchemar.vue')
    },
    {
      path: '/defis/captcha-ludique',
      name: 'captcha-ludique',
      component: () => import('../components/CaptchaLudique.vue')
    },
    {
      path: '/defis/mashup-gaming',
      name: 'mashup-gaming',
      component: () => import('../components/MashupGaming.vue')
    },
    {
      path: '/defis/defier-grinch',
      name: 'defier-grinch',
      component: () => import('../components/DefierGrinch.vue')
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