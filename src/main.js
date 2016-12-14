import './config/firebase'
import Vue from 'vue'
import Vuex from 'vuex'

import './assets/semantic/dist/semantic.min.css'
import '!script!jquery'
import './assets/semantic/dist/semantic.min.js'

import './filters'
import router from './router'
import App from './App'

Vue.use(Vuex)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
