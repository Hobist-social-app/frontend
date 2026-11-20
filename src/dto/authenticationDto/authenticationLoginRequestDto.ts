import type {Immutable} from '@/types/immutable'

export type AuthenticationLoginRequestDto=Immutable<{
 identifier: string
 password: string
}>