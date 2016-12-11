import firebase from 'firebase'
import Vue from 'vue'
import VueRouter from 'vue-router'
import Feed from './components/Feed'
import Profile from './components/profile/Profile'
import ProfileEdit from './components/profile/Edit.vue'
import SignIn from './components/SignIn.vue'
import User from './components/User.vue'
import componentData from './baseComponentData'

const componentTemplate = '<x :title="AppSetting.name" :user="user"></x>'

Vue.use(VueRouter)

const router = new VueRouter({
  /* mode: 'history', */
  routes: [
    { path: '/', navbar: null, title: 'Home', component: componentInit(componentTemplate, Feed), meta: { requiredAuth: true } },
    { path: '/profile', navbar: 'UserProfileDropdown', title: 'Profile', component: componentInit(componentTemplate, Profile), meta: { requiredAuth: true } },
    { path: '/profile/edit', navbar: null, title: 'Profile', component: componentInit(componentTemplate, ProfileEdit) },

    { path: '/signin', navbar: null, component: componentInit(componentTemplate, SignIn), beforeEnter: beforeEnter },
    { path: '/user/:id', navbar: 'MainMenu', title: 'User', component: componentInit(componentTemplate, User), meta: { requiredAuth: true } },

    { path: '*', redirect: '/' }
  ]
})

router.beforeEach((to, from, next) => {
  const unsubscribe = firebase.auth().onAuthStateChanged(user => {
    unsubscribe()
    if (!user) {
      if (to.matched.some(x => x.meta.requiredAuth)) {
        next({ path: '/signin', query: { redirect: to.fullPath } })
        return
      }
    }
    next()
  })
})

export default router

/* Functions */
function componentInit (template, component) {
  return {
    template: template,
    components: { 'x': component },
    data: () => componentData
  }
}

function beforeEnter (to, from, next) {
  const unsubscribe = firebase.auth().onAuthStateChanged(user => {
    unsubscribe()
    if (user) {
      next(to.query.redirect || '/')
      return
    }
    next()
  })
}
