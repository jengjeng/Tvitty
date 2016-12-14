<template>
  <div class="ui segment">
    <ProfileDetail v-if="profile" :profile="profile" class="ui center aligned grid"></ProfileDetail>
  </div>
</template>

<script>
import { UserService, AuthService } from './../services'
import ProfileDetail from './../components/profile/ProfileDetail'

export default {
  data: () => ({
    profile: null
  }),
  created () {
    this.refresh()
  },
  watch: {
    $route: 'reload'
  },
  methods: {
    refresh () {
      UserService.get(this.$route.params.id || AuthService.currentUser.uid, (profile) => {
        this.profile = profile
      })
    }
  },
  components: {
    ProfileDetail
  }
}
</script>