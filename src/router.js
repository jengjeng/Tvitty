import Vue from 'vue'
import VueRouter from 'vue-router'
import Feed from './components/Feed'
import Profile from './components/profile/Profile'
import ProfileEdit from './components/profile/Edit.vue'
import SignIn from './components/SignIn.vue'
import User from './components/User.vue'
import { AuthService, MeService } from './services'

Vue.use(VueRouter)

const router = new VueRouter({
  /* mode: 'history', */
  routes: [
    { path: '/', navbar: null, title: 'Home', component: Feed },
    { path: '/profile', navbar: 'UserProfileDropdown', title: 'Profile', component: Profile, meta: { requiredAuth: true } },
    { path: '/profile/edit', navbar: null, title: 'Profile', component: ProfileEdit, meta: { requiredAuth: true } },

    { path: '/signin', navbar: null, component: SignIn, beforeEnter: preventDuplicateSignIn },
    { path: '/user/:id', title: 'User', component: User, meta: { requiredAuth: true } },

    { path: '*', redirect: '/' }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(x => x.meta.requiredAuth)) {
    const promises = [
      new Promise((resolve, reject) => {
        MeService.get().then(resolve, reject)
      }),
      new Promise((resolve, reject) => {
        AuthService.requireUser().then(resolve, reject)
      })
    ]
    Promise.all(promises).then(() => {
      next()
    }, () => {
      next({ path: '/signin', query: { redirect: to.fullPath } })
    })
    return
  }
  next()
})

export default router

/* Functions */

function preventDuplicateSignIn (to, from, next) {
  AuthService.requireUser().then(() => {
    next(to.query.redirect || '/')
  }, () => {
    next()
  })
}
