<script setup lang="ts">
import {ref} from 'vue'
import {router} from '@/router'
import type {AuthenticationLoginRequestDto} from '@/dto/authenticationDto/authenticationLoginRequestDto'
import {useAuthStore} from '@/stores/auth'

const auth=useAuthStore()

const user=ref({//M.G: ref is needed because types don't exist in runtime only compile time. so ref creates object that exist in runtime
  identifier:'',
  password:''
})

const errorMessage=ref('')

async function handleSubmit(){
  try{
    const request: AuthenticationLoginRequestDto={
      identifier:user.value.identifier,
      password:user.value.password,
    }

    await auth.login(request)
    await router.push('/')
  }
    catch (error){
      console.error('Error occurred: ',error.message);
      if(error.response?.status==403 || error.response?.status==401)
        errorMessage.value="Incorrect email or password!"
      else if(error.response?.status>= 500 && error.response?.status< 600)
        errorMessage.value="Server error: "+error.response.data+ " please try again latter."
      errorMessage.value=error.response?.data
  }
}

</script>
<template>
  <main class="auth-shell">
    <header class="auth-brand">Hobist <span class="brand-caption">A place for your passions</span></header>
    <section class="auth-intro">
      <span class="auth-eyebrow">...</span>
      <h1>Good to have you back.</h1>
      <p>Find your people. Make time for what you love.</p>
    </section>

    <section id="outer-box" aria-labelledby="login-title">
      <div class="form-heading"><span class="section-number" aria-hidden="true">01</span><div><h2 id="login-title">Log in to Hobist</h2><p>Your hobbies, conversations, and community await.</p></div></div>

      <form @submit.prevent="handleSubmit">
        <div v-if="errorMessage" class="error-message" role="alert">{{ errorMessage }}</div>
        <label for="login-email">Email address or Nickname</label>

        <input id="login-email" type="email" v-model="user.identifier" class="input-controll" placeholder="you@example.com" autocomplete="email" required />

        <div class="password-label"><label for="login-password">Password</label><router-link to="/password-recovery">Forgot password?</router-link></div>

        <input id="login-password" type="password" v-model="user.password" class="input-controll" placeholder="Enter your password" autocomplete="current-password" required />
        <button type="submit" class="button">Log in <span aria-hidden="true">↗</span></button>
      </form>

      <div class="noAcc"><p>New around here? <router-link to="/signup">Create an account <span aria-hidden="true">→</span></router-link></p></div>
    </section>

    <footer class="auth-footer">A little curiosity. A whole lot of possibility.</footer>

  </main>
</template>
