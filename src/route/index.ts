import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import login from '@/login.vue'

const routes: Array<RouteRecordRaw> = [
    {
        
            path: '/login',
            name: 'login',
            component: login
          
    }
]
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
 })
export default router