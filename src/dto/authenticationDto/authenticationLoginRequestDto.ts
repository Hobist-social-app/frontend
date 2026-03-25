import type {Immutable} from '@/types/immutable'

export type AuthenticationLoginRequestDto=Immutable<{
 email: string
 password: string
}>