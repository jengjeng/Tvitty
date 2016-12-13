import Vue from 'vue'

let store = new Vue({
  created () {
    store = this
  },
  data: () => ({
    $user: {}
  }),
  computed: {
    user: () => {
      return store.$user
    }
  }
})

export default {
  currentUser: store.user
}
