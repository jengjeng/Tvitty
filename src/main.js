import Vue from 'vue'
import VueRouter from 'vue-router'
import './assets/semantic/dist/semantic.min.css'
import '!script!jquery'
import './assets/semantic/dist/semantic.min.js'
import AppSetting from './config/app.js'
import UserAPI from './api/user.js'
import App from './App'
import Feed from './components/Feed'

Vue.use(VueRouter)

const componentTemplate = '<x :title="AppSetting.name" :user="user"></x>'

const router = new VueRouter({
  mode: 'history',
  routes: [
    { container: 'MainMenu', title: 'Home', path: '/', component: componentInit(componentTemplate, Feed) },
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
