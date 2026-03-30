import axios,{AxiosResponse,InternalAxiosRequestConfig} from 'axios'
import {useAuthStore} from '@/stores/auth'
import {router} from "@/router"

//M.G: parts of claude code!!

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
        if (error.response?.status== 401 || error.response?.status== 403){
            const auth = useAuthStore()
            auth.logout()
        }
        return Promise.reject(error)
    }
)