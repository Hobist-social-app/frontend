import { createApp } from 'vue'
import {createPinia,type Pinia} from 'pinia'
import App from './App.vue'
import {router} from '@/router'
import '@/design/authentication.css'
import '@/plugins/axiosInterceptor'//automaticlly registers, no need for adding anything else

const pinia: Pinia = createPinia()

createApp(App)
    .use(pinia)
    .use(router)
    .mount('#app')
