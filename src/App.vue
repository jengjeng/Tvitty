<template>
  <div id="app" :class="'ui basic segment ' + stateClass">
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
      user: UserAPI.currentUser,
      appState: {
        loading: true
      }
    }
  },
  mounted () {
    this.appState.loading = false
  },
  components: {
    Sidebar
  },
  computed: {
    stateClass () {
      return this.appState.loading ? 'loading' : ''
    }
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