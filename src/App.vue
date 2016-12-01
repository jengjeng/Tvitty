<template>
  <div id="app">
    <Navbar :title="AppSetting.name" :user="user" ></Navbar>
    <router-view class="ui main text container"></router-view>
    <PageFooter></PageFooter>
  </div>
</template>

<script>
import AppSetting from './config/app.js'
import UserAPI from './api/user.js'
import Navbar from './components/navbar/Navbar'
import PageFooter from './components/PageFooter'

export default {
  name: 'app',
  data () {
    return {
      AppSetting,
      user: UserAPI.currentUser
    }
  },
  components: {
    Navbar,
    PageFooter
  }
}
</script>

<style lang="scss">
  .logo-text {
    color: rgb(144, 154, 52);

    span {
      color: rgb(0, 169, 223);
    }
  }
</style>

<style scoped>
  #app {
    position: relative;
    min-height: 100%;
  }
  .ui.main.container {
    padding-top: 6.5em;
    padding-bottom: 3em;
  }
</style>