import type {Immutable} from '@/types/immutable'

export type AuthenticationSignupRequestDto=Immutable<{
    name: string
    surname: string
    email: string
    password:string
    confirmPassword:string
}>