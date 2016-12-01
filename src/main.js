import Vue from 'vue'
import VueRouter from 'vue-router'
import './assets/semantic/dist/semantic.min.css'
import '!script!jquery'
import './assets/semantic/dist/semantic.min.js'
import AppSetting from './config/app.js'
import UserAPI from './api/user.js'
import App from './App'
import Feed from './components/Feed'
import Profile from './components/profile/Profile'
import ProfileEdit from './components/profile/Edit.vue'

Vue.use(VueRouter)

const componentTemplate = '<x :title="AppSetting.name" :user="user"></x>'

const router = new VueRouter({
  mode: 'history',
  routes: [
    { navbar: 'MainMenu', title: 'Home', path: '/', component: componentInit(componentTemplate, Feed) },
    { navbar: 'UserProfileDropdown', title: 'Profile', path: '/profile', component: componentInit(componentTemplate, Profile) },
    { navbar: '', title: 'Profile', path: '/profile/edit', component: componentInit(componentTemplate, ProfileEdit) },
    { path: '*', redirect: '/' }
  ]
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render (h) {
    return h(App /* , {
      props: {
        appState: _appState
      }
    } */)
  }
})

/* Functions */
function componentInit (template, component) {
  return { template: template, components: { 'x': component }, data () { return { AppSetting, user: UserAPI.currentUser } } }
}
