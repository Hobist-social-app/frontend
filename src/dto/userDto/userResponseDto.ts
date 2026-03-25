import type {Immutable} from '@/types/immutable'
import type {CountryCityDto} from "@/dto/countryCityDto";

export type UserResponseDto=Immutable<{
    id: string,
    name: string,
    surname: string,
    email: string,
    profilePicture: string,
    country: CountryCityDto,
    city: CountryCityDto,
    numberOfPosts: number,
    numberOfFriends: number
}>
