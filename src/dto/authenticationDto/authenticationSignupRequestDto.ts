import type {Immutable} from '@/types/immutable'

export type AuthenticationSignupRequestDto=Immutable<{
    nickname: string
    phone:string
    email: string
    rawPassword:string
}>