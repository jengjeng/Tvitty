<template>
  <div>
    <router-link v-if="!user" to="/signin" class="item">Sign In</router-link>
    <a v-else ref="dropdown" class="ui dropdown item">
      <div>
        <img :src="user.profile.photo" class="ui circular image mini"/>
        &nbsp;
        <span class="ui sub header grey">@</span>
        {{ user.profile.name }}
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
import { AuthService } from './../../services'

export default {
  props: ['user'],
  data () {
    return {
      routes: this.$router.options.routes
    }
  },
  mounted () {
    this.$nextTick(this.initUI)
  },
  updated () {
    this.initUI()
  },
  methods: {
    initUI () {
      if (this.user) {
        $(this.$refs.dropdown).dropdown()
      }
    },
    signOut () {
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