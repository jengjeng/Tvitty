<template>
  <div>
    <div class="ui center aligned grid">
      <div class="row" style="padding-bottom: 0px;">
        <img :src="profile.photo" class="ui circular image">
      </div>
      <div class="row" style="padding-bottom: 0px;">
        <h1>{{ profile.name }}</h1>
      </div>
      <div class="row">
        <h3>{{ profile.description }}</h3>
      </div>
      <div class="row">
        <router-link to="/profile/edit" class="ui primary button">Edit</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import AppConfig from './../../config/app.js'
import { UserService } from './../../services'

export default {
  data: () => ({
    title: AppConfig.name
  }),
  computed: {
    profile: () => UserService.currentUser.profile
  }
}
</script>

<style scoped>
  .ui.image.circular {
    max-width: 300px;
    max-height: 300px;
  }
</style>