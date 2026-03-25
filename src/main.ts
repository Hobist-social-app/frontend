import { createApp } from 'vue'
import {createPinia} from 'pinia'
import './design/loginSignup.css'
import App from './App.vue'
import {router} from '@/router'

const pinia: Pinia=createPinia()

createApp(App)
    .use(pinia)
    .use(router)
    .mount('#app')
