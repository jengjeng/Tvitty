import { Store } from 'vuex'

export default new Store({
  state: {
    currentUser: null
  },
  getters: { },
  mutations: {
    setUser: (state, user) => { state.currentUser = user }
  },
  actions: {
    setUser: (ctx, user) => ctx.commit('setUser', user)
  }
})
