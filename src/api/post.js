import UserAPI from './user'
const user = UserAPI.currentUser
let posts = []

export default {
  getPosts () {
    return new Promise((resolve, reject) => {
      posts.length > 0 ? resolve(posts) : $.getJSON('http://api.icndb.com/jokes/random/3').then((response) => {
        posts = posts.concat(response.value.map((item, index) => {
          return {
            id: item.id,
            message: item.joke,
            isLike: index % 3 === 0,
            likes: Math.round(Math.random() * 110) + 1,
            date: Math.round(new Date() - (Math.random() * 3600000)),
            user
          }
        }))
        resolve(posts)
      })
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
