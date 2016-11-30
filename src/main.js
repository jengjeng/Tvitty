import Vue from 'vue'
import VueRouter from 'vue-router'
import '!style!css!semantic-ui-css/semantic.css'
import '!script!jquery'
import '!script!semantic-ui-css/semantic.js'
import AppSetting from './config/app.js'
import UserAPI from './api/user.js'
import App from './App'
import NewFeed from './components/NewFeed'

window.console.clear && window.console.clear()

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    { container: 'MainMenu', title: 'Home', path: '/', component: componentInit('<x :title="AppSetting.name" :user="user"></x>', NewFeed) },
    { path: '*', redirect: '/' }
  ]
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render (h) {
    return h(App)
  }
})

/* Functions */
function componentInit (template, component) {
  return { template: template, components: { 'x': component }, data () { return { AppSetting, user: UserAPI.currentUser } } }
}
