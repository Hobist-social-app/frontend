import type {Immutable} from '@/types/immutable'

export type PostResponseDto=Immutable<{
    id: string,
    userId: string,
    message: string,
    rawImage: string,
    likeNumber: number,
    createdAt: Date
}>


