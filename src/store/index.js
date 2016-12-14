import Vue from 'vue'

let store = new Vue({
  data: () => ({
    currentUser: null
  })
})

export default {
  currentUser: store.currentUser
}
