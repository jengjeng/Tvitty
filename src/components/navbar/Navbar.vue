<template>
  <div class="ui borderless top fixed menu huge">
    <div class="ui container">
      <router-link to="/" class="header item">
        <img class="logo" src="./../../assets/logo.png">
        <span class="logo-text">
          <span>{{ title }}</span>
        </span>
      </router-link>
      <router-link v-if="user" :to="`/user/${user.id}`" class="item" active-class="actve">User</router-link>
      <TopMenu :user="user" class="right menu"></TopMenu>
    </div>
  </div>
</template>

<script>
import AppConfig from './../../config/app.js'
import TopMenu from './TopMenu'
import { MeService } from './../../services'

export default {
  components: {
    TopMenu
  },
  data: () => ({
    title: AppConfig.name
  }),
  subscriptions: () => ({
    user: MeService.observable.get()
  })
}
</script>
<style scoped lang="scss">
  .ui.menu .item img.logo {
    margin-right: 1.5em;
  }
</style>