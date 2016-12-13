<template>
  <div class="ui borderless top fixed menu huge">
    <div class="ui container">
      <router-link to="/" class="header item">
        <img class="logo" src="./../../assets/logo.png">
        <span class="logo-text">
          <span>{{ title }}</span>
        </span>
      </router-link>
      <template v-for="route in routes">
        <router-link v-if="route.navbar === 'MainMenu'" :to="route.path" class="item" active-class="actve">{{ route.title || route.name || route.path }}</router-link>
      </template>
      <TopMenu :user="user"></TopMenu>
    </div>
  </div>
</template>

<script>
import AppConfig from './../../config/app.js'
import { UserService } from './../../services'
import TopMenu from './TopMenu'

export default {
  components: {
    TopMenu
  },
  data () {
    return {
      title: AppConfig.name,
      user: UserService.currentUser,
      routes: this.$router.options.routes
    }
  }
}
</script>
<style scoped lang="scss">
  .ui.menu .item img.logo {
    margin-right: 1.5em;
  }
</style>