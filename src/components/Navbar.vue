<script setup lang="ts">
import '@/design/style2.css'
import {useAuthStore} from "@/stores/auth";

const auth=useAuthStore()
</script>

<template>
  <nav id="navbar">
    <ul class="navTable">
      <li class="navElement">
        <a href="/forYou">
          <i class="fa-solid fa-house fa-3x"></i>
          <span>For you page</span>
        </a>
      </li>
      <li class="navElement">
        <a href="/searchPage">
          <i class="fa-solid fa-magnifying-glass fa-3x"></i>
          <span>Search</span>
        </a>
      </li>
      <li class="navElement">
        <a href="/chat/friendList">
          <i class="fa-solid fa-inbox fa-3x"></i>
          <span>Chat</span>
        </a>
      </li>
      <li class="navElement">
        <a href="/notifications">
          <i class="fa-solid fa-bell fa-3x"></i>
          <span>Notifications</span>
        </a>
      </li>
      <li class="navElementImg">
        <a href="/home">
          <img  :src="'/media/${userId}/${user.profilePicture}'" class="profileNavImg" alt="">
          <span class="imgSpan">Home</span>
        </a>
      </li>
      <li >
        <a v-on:click="auth.logout()">Logout</a>

      </li>
      <li >
        <a href="/settings">profile Settings</a>

      </li>
      <li>
        <a href="/post/newPost">new post</a>
      </li>
    </ul>
  </nav>
</template>
