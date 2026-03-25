import {defineStore} from 'pinia'
import {jwtDecode} from 'jwt-decode'
import axios from 'axios'
import type {AuthenticationLoginResponseDto as LoginResponse} from "@/dto/authenticationDto/AuthenticationLoginResponseDto "
import {URL} from '@/api/config'
import router from '@/router'

//M.G: parts of code are from claude!

interface authState{
    token: string | null
}

interface LoginCredentials {
    email: string
    password: string
}

interface JwtPayload{
    exp:number
}


export const useAuthStore = defineStore('auth',{
    state: () : authState=> ({
       token: localStorage.getItem('token') || null,
    }),

    getters: {
        isAuthenticated: (state): boolean => !!state.token,
        isTokenExpired: (state): boolean => {
            if  (!state.token) return true;
            const {exp} = jwtDecode<JwtPayload>(state.token)
            return Date.now() >= exp * 1000
        },
    },

    actions: {
        async login(credentials: LoginCredentials): Promise<void> {
            const {data} = await axios.post<LoginResponse>(`${URL}/authentication/login`,credentials)
            this.token=data.token
            localStorage.setItem('token',data.token)
        },
        logout():void {
            this.token = null
            localStorage.removeItem('token')
        },
    },
})