import {URL} from '@/api/config'
import {authenticationLoginRequestDto} from '@/dto/authenticationDto/AuthenticationLoginRequestDto'
import {authenticationLoginResponseDto} from '@/dto/authenticationDto/authenticationResponseDto'

export const authenticationApi ={
    login: async(payload: authenticationLoginRequestDto): Promise<authenticationLoginResponseDto> => {
        const response = await fetch(`${URL}/authentication/login`,{
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

