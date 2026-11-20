<script setup lang="ts">
import {ref} from 'vue'
import type {AuthenticationSignupRequestDto} from "@/dto/authenticationDto/authenticationSignupRequestDto";
import {useAuthStore} from "@/stores/auth";
import {router} from '@/router'

const errorMessage=ref('')

const auth=useAuthStore()

const user=ref({
  nickname:'',
  email:'',
  password:'',
  phoneNumber:'',
})

const confirmPassword=ref('')
const passwordRequirements=ref('')

async function submit(){
  try{
    const requirements: string=ArePasswordRequirementsMet(user.value.password,confirmPassword.value)
    if (requirements!=''){
      passwordRequirements.value= requirements
      return
    }

    const request : AuthenticationSignupRequestDto = {
     nickname:user.value.nickname,
      email:user.value.email,
      rawPassword:user.value.password,
      phone:user.value.phone
    }

    await auth.signup(request)
    await router.push('/')
  }
  catch (error){
    console.error("error ocurred",error.message)
    if(error.response?.status == 401 || error.response?.status == 403)
      errorMessage.value=error.response.data
    if(error.response?.status>= 500 && error.response?.status< 600)
      errorMessage.value="Server error: " + error.response.data + ' please try again latter.'
    errorMessage.value=error.response.data
  }
}

function ArePasswordRequirementsMet(password: string,confirmPassword: string): string{
  let string:string=''
  let digit=new RegExp('\\d')
  let lower=new RegExp('.*[a-z].*')
  let upper=new RegExp('.*[A-Z].*')

  if (password!==confirmPassword){
    string=string.concat("Password and Confirm password must match ")
    return string
  }

  if(password.length < 8)
    string=string.concat("Password must have more than 7 characters, ")

  if(!digit.test(password))
    string=string.concat("Password must have at least one digit, ")

  if(!lower.test(password))
    string=string.concat("Password must have at least one lowercase letter ")

  if(!upper.test(password))
    string=string.concat("Password must have at least one uppercase letter ")

  return string
}

</script>

<template>

  <div id="outer-box">
    <form @submit.prevent="submit" autocomplete="off">
      <h1 class="heading">Sign in here</h1>

      <div v-if="errorMessage" class="error-message">
        <span>{{errorMessage}}</span>
      </div>

      <!--M.G: password requirements display in case of weak password-->
      <div v-if="passwordRequirements" class="password-requirements">
        <strong>Password Requirements:</strong><br/>
        <span> {{passwordRequirements}}</span>
      </div>

      <label>Nickname</label>
      <input type="text" v-model="user.nickname" placeholder="First Name" class="input-controll">

      <label>Email</label>
      <input type="email" v-model="user.email" placeholder="Email" class="input-controll">

      <label>Password</label>
      <input type="password" v-model="user.password" placeholder="Password" class="input-controll">

      <label>Confirm password</label>
      <input type="password" v-model="confirmPassword" placeholder="Password" class="input-controll">

      <label>Phone Number (Optional)</label>
      <input type="text" v-model="user.phoneNumber" placeholder="PhoneNumber" class="input-controll">

      <button type="submit" class="button" value="signup">Sign In</button>
    </form>
    <hr>

    <div class="noAcc">
      <p> Already have an account?<router-link to ="/login"> Login here</router-link>></p>
    </div>
  </div>


</template>