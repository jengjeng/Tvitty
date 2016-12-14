<template>
  <div class="right menu">
    <router-link v-if="!isFetch" to="/signin" class="item">Sign In</router-link>
    <a v-else ref="dropdown" class="ui dropdown item">
      <div>
        <img :src="profile.photo" class="ui circular image mini"/>
        &nbsp;
        <span class="ui sub header grey">@</span>
        {{ profile.name }}
      </div>
      <i class="dropdown icon"></i>
      <div class="menu">
        <template v-for="route in routes">
          <router-link v-if="route.navbar === 'UserProfileDropdown'" :to="route.path" class="item" active-class="header">{{ route.title || route.name || route.path }}</router-link>
        </template>
        <div @click="signOut" class="item">Sign Out</div>
      </div>
    </a>
  </div>
</template>

<script>
import { AuthService, MeService } from './../../services'

export default {
  data () {
    return {
      isFetch: false,
      profile: {
        name: '',
        photo: ''
      },
      routes: this.$router.options.routes
    }
  },
  created () {
    AuthService.subscribeUser((user) => {
      if (user) {
        this.isFetch = true
        MeService.subscribe(profile => {
          this.profile = profile
        })
      }
    })
  },
  mounted () {
    this.$nextTick(this.initUI)
  },
  updated () {
    this.initUI()
  },
  methods: {
    initUI () {
      if (this.profile) {
        $(this.$refs.dropdown).dropdown()
      }
    },
    signOut () {
      this.isFetch = false
      AuthService.signOut()
      $(this.$refs.dropdown).dropdown('destroy')
      this.$router.push('/')
    }
  }
}
</script>

<style scoped lang="scss">
  .right.menu img {
    display: inline-block;
  }
</style>