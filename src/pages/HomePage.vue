<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
import type {UserResponseDto as user} from "@/dto/userDto/userResponseDto";
import type {PostResponseDto as post} from "@/dto/postDto/postResponseDto";

const formatDate=(date:string)=> new Date(date).toLocaleDateString('hr-HR')

const mediaUrl=(userId: string,img: string) =>
    `/media/${userId}/${img}`
</script>

<template>

  <Navbar/>

  <div class="feed">
    <div class="post-card">
      <div class="post-card__header">

        <img v-if="user" :src="mediaUrl(user.id,user.profilePicture)" class="profile-photo"/>

        <span> {{user?.name}}</span>
        <span v-if="post" class="date">  {{formatDate(post.createdAt)}}</span>
      </div>

      <router-link v-if="post" :to="`/post/${post.id}`">

        <div class="post-card__body">
          <img v-if="post.rawImage" :src="mediaUrl(post.userId,post.rawImage)" style="width:50%; height: 50%" class="post-image">
          <p> {{post.message}}</p>
          <span> {{post.likeNumber}} </span> likes
        </div>
      </router-link>
      <div class="post-footer">
      </div>
    </div>


  </div>

</template>