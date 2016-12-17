<template>
  <div>
    <ProfileDetail v-if="user" :profile="user.profile"></ProfileDetail>
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

export default {
  data: () => ({
    title: AppConfig.name
  }),
  computed: {
    user () {
      return this.$store.state.currentUser
    }
  },
  components: {
    ProfileDetail
  }
}
</script>
