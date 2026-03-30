import {defineStore} from 'pinia'
import {jwtDecode} from 'jwt-decode'
import axios from 'axios'
import type {AuthenticationLoginResponseDto as Response} from "@/dto/authenticationDto/AuthenticationResponseDto "
import type {AuthenticationLoginRequestDto as LoginRequest} from "@/dto/authenticationDto/authenticationLoginRequestDto";
import type {AuthenticationSignupRequestDto as SignupRequest} from "@/dto/authenticationDto/authenticationSignupRequestDto";
import {URL} from '@/api/config'
import {router} from '@/router'


interface authState{
    userId:string
    token: string
}

interface JwtPayload{
    exp:number
}


export const useAuthStore = defineStore('auth',{
    state: () : authState=> ({
       token: localStorage.getItem('token') ,
        userId: localStorage.getItem('userId')
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
            const {data} = await axios.post<Response>(`${URL}/authentication/login`,credentials)
            this.token=data.token
            this.userId=data.id
            localStorage.setItem('token',data.token)
            localStorage.setItem('userid',data.id)
        },
        async signup(credentials: SignupRequest): promise<void>{
            const {data} = await axios.post<Response>(`${URL}/authentication/users`,credentials)
            this.token=data.token
            this.userId=data.id
            localStorage.setItem('token',data.token)
            localStorage.setItem('userid',data.id)
        },
        logout():void {
            this.token = null
            this.userId = null
            localStorage.removeItem('token')
            localStorage.removeItem('userId')
            router.push('/login')
        },
    },
})