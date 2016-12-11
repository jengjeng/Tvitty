<template>
  <div class="right menu">
    <router-link v-if="!user" to="/signin" class="item">Sign In</router-link>
    <a v-else ref="dropdown" class="ui dropdown item">
      <div>
        <img :src="user.photo" class="ui circular image mini"/>
        &nbsp;
        <span class="ui sub header grey">@</span>
        {{ user.name }}
      </div>
      <i class="dropdown icon"></i>
      <div class="menu">
        <template v-for="route in routes">
          <router-link v-if="route.navbar === 'UserProfileDropdown'" :to="route.path" class="item" active-class="header">{{ route.title || route.name || route.path }}</router-link>
        </template>
        <div class="item">Sign Out</div>
      </div>
    </a>
  </div>
</template>

<script>
import UserService from './../../services/user.js'

export default {
  props: {
    user: {
      type: Object
    }
  },
  data () {
    return {
      routes: this.$router.options.routes
    }
  },
  mounted () {
    this.$nextTick(() => {
      $(this.$refs.dropdown).dropdown()
    })
  },
  methods: {
    signOut () {
      UserService.signOut()
    }
  }
}
</script>

<style scoped lang="scss">
  .right.menu img {
    display: inline-block;
  }
</style>