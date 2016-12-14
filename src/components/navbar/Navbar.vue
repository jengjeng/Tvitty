<template>
  <div class="ui borderless top fixed menu huge">
    <div class="ui container">
      <router-link to="/" class="header item">
        <img class="logo" src="./../../assets/logo.png">
        <span class="logo-text">
          <span>{{ title }}</span>
        </span>
      </router-link>
      <router-link v-if="store.currentUser" :to="`/user/${store.currentUser.uid}`" class="item" active-class="actve">User</router-link>
      <TopMenu :user="store.currentUser" class="right menu"></TopMenu>
    </div>
  </div>
</template>

<script>
import AppConfig from './../../config/app.js'
import Store from './../../store'
import TopMenu from './TopMenu'

export default {
  components: {
    TopMenu
  },
  data: () => ({
    title: AppConfig.name,
    store: Store
  })
}
</script>
<style scoped lang="scss">
  .ui.menu .item img.logo {
    margin-right: 1.5em;
  }
</style>