import UserAPI from './user'
const user = UserAPI.currentUser
let posts = []

export default {
  getPosts () {
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
              user
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
      user
    })
    return id
  }
}
