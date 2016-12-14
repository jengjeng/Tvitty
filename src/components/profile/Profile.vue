<template>
  <div>
    <ProfileDetail v-if="profile" :profile="profile"></ProfileDetail>
    <div class="ui center aligned grid">
      <div class="row">
        <router-link to="/profile/edit" class="ui primary button">Edit</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import AppConfig from './../../config/app.js'
import ProfileDetail from './ProfileDetail'
import { MeService } from './../../services'

export default {
  data: () => ({
    title: AppConfig.name,
    profile: {
      name: '',
      description: '',
      photo: ''
    }
  }),
  created () {
    MeService.get((profile) => {
      this.profile = profile
    })
  },
  components: {
    ProfileDetail
  }
}
</script>
