import './config'
import Vue from 'vue'

import './assets/semantic/dist/semantic.min.css'
import '!script!jquery'
import './assets/semantic/dist/semantic.min.js'

import './filters'
import router from './router'
import store from './store'
import App from './App'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
