import AuthService from './user'
let posts = []

export default {
  getPosts () {
    posts = []
    return new Promise((resolve, reject) => {
      if (posts.length === 0) {
        $.getJSON('https://api.icndb.com/jokes/random/3').then((response) => {
          response.value.map((item, index) => {
            return {
              id: item.id,
              message: item.joke,
              isLike: index % 3 === 0,
              likes: Math.round(Math.random() * 110) + 1,
              date: Math.round(new Date() - (Math.random() * 3600000)),
              user: AuthService.currentUser
            }
          }).forEach((v) => {
            posts.push(v)
          })
        })
      }
      resolve(posts)
    })
  },
  createPost (message) {
    const id = +new Date()
    posts.unshift({
      id,
      message,
      isLike: false,
      likes: 0,
      date: +new Date(),
      user: AuthService.currentUser
    })
    return id
  }
}
