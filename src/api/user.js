export default {
  get currentUser () {
    return this.get()
  },
  get () {
    return {
      name: 'jengjeng',
      photo: './assets/logo.png'
    }
  }
}
