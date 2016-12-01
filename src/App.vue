<template>
  <div id="app">
    <Sidebar :title="AppSetting.name" :user="user" ></Sidebar>
    <router-view class="ui main text container"></router-view>
  </div>
</template>

<script>
import AppSetting from './config/app.js'
import UserAPI from './api/user.js'
import Sidebar from './components/sidebar/Sidebar'

export default {
  name: 'app',
  data () {
    return {
      AppSetting,
      user: UserAPI.currentUser
    }
  },
  components: {
    Sidebar
  }
}
</script>

<style lang="scss">
  .ui.main.container {
    margin-top: 6.5em;
  }

  .logo-text {
    color: rgb(144, 154, 52);

    span {
      color: rgb(0, 169, 223);
    }
  }
</style>