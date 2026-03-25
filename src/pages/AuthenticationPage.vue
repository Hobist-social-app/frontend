<script setup lang="ts">
import {ref} from 'vue'
import {router} from '@/router'
import type {AuthenticationLoginRequestDto} from '@/dto/authenticationDto/authenticationLoginRequestDto'
import type {AuthenticationLoginResponseDto} from '@/dto/authenticationDto/authenticationLoginResponseDto'
import {authenticationApi} from '@/api/authenticationApi'
import {useAuthStore} from '@/stores/auth'

const auth=useAuthStore()

const user=ref<AuthenticationLoginRequestDto>({
  email:'',
  password:''
})

async function handleSubmit(){
  try{
    await auth.login(user.value)
    await router.push('/')
  }
    catch (error){
      console.error('Error occurred: ',error.message);
      const errorMessage=ref(error.message);
  }
}

</script>

<template>
  <div id="outer-box">

    <form @submit.prevent="handleSubmit" autocomplete="off">
      <h1 class="heading">Login here</h1>

      <!-- Error message display -->
      <div v-if="errorMessage" class="error-message">
        <span> {{errorMessage}}</span>
      </div>

      <label>Email</label>
      <input type="email" v-model="user.email" class="input-controll" placeholder="Your email address" required/>

      <label>Password</label>
      <input type="password" v-model="user.password" class="input-controll" placeholder="Your password" required/>


      <input type="submit" class="button" value="LOGIN">

    </form>
    <hr/>

    <div class="noAcc">
      <p> Dont have an account?<router-link to="/signup"> Register here</router-link></p>
      <router-link to="/forgot-password">Forgot password?</router-link>
    </div>
  </div>
</template>
