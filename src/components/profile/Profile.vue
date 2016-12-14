<template>
  <div>
    <ProfileDetail v-if="store.currentUser" :profile="store.currentUser.profile"></ProfileDetail>
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
import Store from './../../store'

export default {
  data: () => ({
    title: AppConfig.name,
    store: Store
  }),
  components: {
    ProfileDetail
  }
}
</script>
