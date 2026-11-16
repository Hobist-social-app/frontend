import type {Immutable} from '@/types/immutable'

export type AuthenticationSignupRequestDto=Immutable<{
    nickname: string
    email: string
    password:string
    confirmPassword:string
}>