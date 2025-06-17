/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router/auto'
import MainLayout from '@/layouts/MainLayout.vue'
// import { routes } from 'vue-router/auto-routes'
import EmployeeLogin from '@/pages/employee-login.vue'
import HomePage from '@/pages/index.vue'
import adminLogin from '@/pages/admin-login.vue'
import EmployeeStatus from '@/pages/employee-status.vue'

const routes=[
  {
    path:'/',
    component: MainLayout,
    children:[
      {path:'',name:'Home',component: HomePage},
      {path:'employee-login',name:'EmployeeLogin',component:EmployeeLogin},
      {path:'admin-login',name:'AdminLogin',component:adminLogin},
      {path:'employee-status',name:'EmployeeStatus',component:EmployeeStatus}
    ]
  }
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router
