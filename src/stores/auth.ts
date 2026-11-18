import {defineStore} from 'pinia'
import {jwtDecode} from 'jwt-decode'
import axios from 'axios'
import type {AuthenticationResponseDto as Response} from "@/dto/authenticationDto/authenticationResponseDto";
import type {AuthenticationLoginRequestDto as LoginRequest} from "@/dto/authenticationDto/authenticationLoginRequestDto";
import type {AuthenticationSignupRequestDto as SignupRequest} from "@/dto/authenticationDto/authenticationSignupRequestDto";
import {URL} from '@/api/config'
import {router} from '@/router'


interface authState{
    token: string | null
}

interface JwtPayload{
    exp:number
}


export const useAuthStore = defineStore('auth',{
    state: () : authState=> ({
       token: localStorage.getItem('token')
    }),

    getters: {
        isNotAuthenticated: (state): boolean => !!state.token,
        isTokenExpired: (state): boolean => {
            if  (!state.token) return true;
            const {exp} = jwtDecode<JwtPayload>(state.token)
            return Date.now() >= exp * 1000
        },
    },

    actions: {
        async login(credentials: LoginRequest): Promise<void> {
            const {data} = await axios.post<Response>(`${URL}/login`,credentials)
            this.token=data.token
            localStorage.setItem('token',data.token)
        },
        async signup(credentials: SignupRequest): Promise<void>{
            const {data} = await axios.post<Response>(`${URL}/signup`,credentials)
            this.token=data.token
            localStorage.setItem('token',data.token)
        },
        logout():void {
            this.token = null
            localStorage.removeItem('token')
            router.push('/login')
        },
    },
})