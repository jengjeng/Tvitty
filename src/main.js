import './config/firebase'
import Vue from 'vue'
import './assets/semantic/dist/semantic.min.css'
import '!script!jquery'
import './assets/semantic/dist/semantic.min.js'
import router from './router'
import App from './App'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  mounted () {
    $('body').css('opacity', '')
  },
  render: h => h(App)
})
