import Vue from 'vue'
import './assets/semantic/dist/semantic.min.css'
import '!script!jquery'
import './assets/semantic/dist/semantic.min.js'
import router from './router'
import firebase from 'firebase'
import App from './App'

firebase.initializeApp({
  apiKey: 'AIzaSyA7deC1Etp4mU6QFKuxCCmZ_vfYpgkCogc',
  authDomain: 'tvitty-b69b1.firebaseapp.com',
  databaseURL: 'https://tvitty-b69b1.firebaseio.com',
  storageBucket: 'tvitty-b69b1.appspot.com',
  messagingSenderId: '79608916460'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  mounted () {
    $('body').css('opacity', '')
  },
  render: (h) => h(App)
})
