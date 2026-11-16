import {URL} from '@/api/config'
import {AuthenticationLoginRequestDto} from '@/dto/authenticationDto/authenticationLoginRequestDto'
import {AuthenticationResponseDto} from '@/dto/authenticationDto/authenticationResponseDto'

export const authenticationApi ={
    login: async(payload: AuthenticationLoginRequestDto): Promise<AuthenticationResponseDto> => {
        const response = await fetch(`${URL}/login`,{
            method: 'POST',
           headers: {'Content-Type':'application/json'} ,
           body: JSON.stringify(payload)
        })

        if(!response.ok){
            const error=await response.json()
            throw new Error(error.message || 'Login failed.')
        }

        return response.json()
    }
}

