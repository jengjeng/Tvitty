let user = {
  name: 'JengJeng',
  description: 'Front-End & Full-Stack Developer',
  photo: '/static/avatar.jpg'
}

export default {
  get currentUser () {
    return this.get()
  },
  get () {
    return user
  },
  update (obj) {
    for (let prop in obj) {
      user[prop] = obj[prop]
    }
    return user
  }
}
