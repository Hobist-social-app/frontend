import axios,{type AxiosResponse, type InternalAxiosRequestConfig} from 'axios'
import {useAuthStore} from '@/stores/auth'

axios.interceptors.request.use((config: InternalAxiosRequestConfig) =>{
    const auth=useAuthStore()
    if(auth.token){
        config.headers.Authorization= `Bearer ${auth.token}`
    }
    return config
})

axios.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error) => {
        if (error.response?.status== 401){
            const auth = useAuthStore()
            auth.logout()
        }
        return Promise.reject(error)
    }
)