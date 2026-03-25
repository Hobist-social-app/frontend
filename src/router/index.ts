import {createRouter,createWebHistory} from 'vue-router'
import {useAuthStore} from '@/stores/auth'



export const router = createRouter({
    history: createWebHistory(),
    routes:[
        {path: '/login',component:() => import ('@/pages/AuthenticationPage.vue')},
        {path: '/', component:() => import  ('@/pages/HomePage.vue'), meta: {requiresAuth: true}}
    ]
})


//M.G: after this is claude code!!!
router.beforeEach((to,from)=> {
    const auth = useAuthStore()
    if (to.meta.requiresAuth && (!auth.isAuhtenticated || auth.isTokenExpired)){
        auth.logout()
        return '/login'
    }
})