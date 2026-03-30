<script setup lang="ts">
import {ref} from 'vue'
import {router} from '@/router'
import type {AuthenticationLoginRequestDto} from '@/dto/authenticationDto/authenticationLoginRequestDto'
import {useAuthStore} from '@/stores/auth'

const auth=useAuthStore()

const user=ref<AuthenticationLoginRequestDto>({//M.G: ref is needed because types don't exist in runtime only compile time. so ref creates object that exist in runtime
  email:'',
  password:''
})

const errorMessage=ref('')

async function handleSubmit(){
  try{
    await auth.login(user.value)
    await router.push('/')
  }
    catch (error){
      console.error('Error occurred: ',error.message);
      if(error.response?.status==403 || error.response?.status==401)
        errorMessage.value="Incorrect email or password!"
      else if(error.response?.status>= 500 && error.response?.status< 600)
        errorMessage.value="Server error: "+error.response.data+ " please try again latter."
  }
}

</script>

<template>
  <p>This is a work in progress</p>
  <p>For now only login and signup is available, which will redirect you on blank home page</p>
  <p>if you want to test this app you don't have to use your real email, you can use any. we don't test your email for now</p>
  <div id="outer-box">

    <form @submit.prevent="handleSubmit" autocomplete="off">
      <h1 class="heading">Login here</h1>

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
