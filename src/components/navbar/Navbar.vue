<template>
  <div class="ui borderless top fixed menu huge">
    <div class="ui container">
      <router-link to="/" class="header item">
        <img class="logo" src="./../../assets/logo.png">
        <span class="logo-text">
          <span>{{ title }}</span>
        </span>
      </router-link>
      <router-link v-if="user" :to="`/user/${user.uid}`" class="item" active-class="actve">User</router-link>
      <TopMenu></TopMenu>
    </div>
  </div>
</template>

<script>
import AppConfig from './../../config/app.js'
import { AuthService } from './../../services'
import TopMenu from './TopMenu'

export default {
  components: {
    TopMenu
  },
  data: () => ({
    title: AppConfig.name,
    user: null
  }),
  created () {
    AuthService.subscribeUser((user) => {
      this.user = user
    })
  }
}
</script>
<style scoped lang="scss">
  .ui.menu .item img.logo {
    margin-right: 1.5em;
  }
</style>