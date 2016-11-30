export default {
  get currentUser () {
    return this.get()
  },
  get () {
    return {
      username: 'Jeng',
      name: 'jengjeng',
      photo: '/static/avatar.jpg'
    }
  }
}
