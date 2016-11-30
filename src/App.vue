<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <Sidebar :title="AppSetting.name" :user="user" ></Sidebar>
    <router-view></router-view>
  </div>
</template>

<script>
import AppSetting from './config/app.js'
import UserAPI from './api/user.js'
import Sidebar from './components/Sidebar'

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
  },
  created () {
    console.log(this)
  }
}
</script>
