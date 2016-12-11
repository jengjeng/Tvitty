import Vue from 'vue'
import VueRouter from 'vue-router'
import AppSetting from './config/app.js'
import UserAPI from './api/user.js'
import Feed from './components/Feed'
import Profile from './components/profile/Profile'
import ProfileEdit from './components/profile/Edit.vue'

const componentTemplate = '<x :title="AppSetting.name" :user="user"></x>'

Vue.use(VueRouter)

const router = new VueRouter({
  /* mode: 'history', */
  routes: [
    { navbar: 'MainMenu', title: 'Home', path: '/', component: componentInit(componentTemplate, Feed) },
    { navbar: 'UserProfileDropdown', title: 'Profile', path: '/profile', component: componentInit(componentTemplate, Profile), meta: { requiredAuth: true } },
    { navbar: '', title: 'Profile', path: '/profile/edit', component: componentInit(componentTemplate, ProfileEdit) },
    { path: '*', redirect: '/' }
  ]
})

export default router

/* Functions */
function componentInit (template, component) {
  return { template: template, components: { 'x': component }, data () { return { AppSetting, user: UserAPI.currentUser } } }
}
