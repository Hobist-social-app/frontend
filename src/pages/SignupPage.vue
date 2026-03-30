<script setup lang="ts">
import {ref} from 'vue'
import type {AuthenticationSignupRequestDto} from "@/dto/authenticationDto/authenticationSignupRequestDto";
import {useAuthStore} from "@/stores/auth";
import {router} from '@/router'

const errorMessage=ref('')

const auth=useAuthStore()

const user=ref<AuthenticationSignupRequestDto>({
  name:'',
  surname:'',
  email:'',
  password:'',
  confirmPassword:'',
})

const passwordRequirements=ref('')

async function submit(){
  try{
    const requirements: string=ArePasswordRequirementsMet(user.value.password)
    if (requirements!=''){
      passwordRequirements.value= requirements
      return
    }

    await auth.signup(user.value)
    await router.push('/')
  }
  catch (error){
    console.error("error ocurred",error.message)
    if(error.response?.status == 401)
      errorMessage.value=error.response.data
    if(error.response?.status>= 500 && error.response?.status< 600)
      errorMessage.value="Server error: " + error.response.data + ' please try again latter.'
  }
}

function ArePasswordRequirementsMet(password: string): string{
  let string:string=''
  let digit=new RegExp('\\d')
  let lower=new RegExp('.*[a-z].*')
  let upper=new RegExp('.*[A-Z].*')

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

      <label>First name</label>
      <input type="text" v-model="user.name" placeholder="First Name" class="input-controll">

      <label>Last name</label>
      <input type="text" v-model="user.surname" placeholder="Last Name" class="input-controll">


      <label>Email</label>
      <input type="email" v-model="user.email" placeholder="Email" class="input-controll">

      <label>Password</label>
      <input type="password" v-model="user.password" placeholder="Password" class="input-controll">

      <label>Confirm Password</label>
      <input type="password" v-model="user.confirmPassword" placeholder="Confirm Password" class="input-controll">

      <button type="submit" class="button" value="signup">Sign In</button>
    </form>
    <hr>

    <div class="noAcc">
      <p> Already have an account?<router-link to ="/login"> Login here</router-link>></p>
    </div>
  </div>


</template>