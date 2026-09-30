<script setup lang="ts">
import {ref} from 'vue'
import {router} from '@/router'
import {useAuthStore} from '@/stores/auth'
import {AuthenticationLoginRequestDto} from "@/dto/authenticationDto/authenticationLoginRequestDto";

const auth= useAuthStore()

const user = ref<AuthenticationLoginRequestDto>({
  email: '',
})

const errorMessage = ref('')

async function handleSubmit(){
  try{}
  catch(error){
   console.error('error occurred: ',error.message);
    if(error.response?.status>= 500 && error.response?.status< 600)
      errorMessage.value="Server error: "+error.response.data+ " please try again latter."
  }
}

</script>

<template>
  <div id="outer-box">

    <form @submit.prevent="handleSubmit" autocomplete="off">
      <h2 class="heading">We will send recovery link to your mail</h2>

      <div v-if="errorMessage" class="error-message">
        <span> {{errorMessage}}</span>
      </div>

      <label>Email</label>
      <input type="email" v-model="user.email" class="input-controll" placeholder="Your email address" required/>

      <input type="submit" class="button" value="SEND">

    </form>

  </div>
</template>
<style scoped>

</style>