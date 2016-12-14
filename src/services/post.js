import firebase from 'firebase'
import AuthService from './auth'
import UserService from './user'

let posts = []
let randomPosts = []
const ref = 'tweets'

export default {
  list () {
    let posts = []
    const promises = [
      new Promise((resolve, reject) => {
        if (randomPosts.length > 0) {
          resolve(randomPosts)
          return
        }
        $.getJSON('https://api.icndb.com/jokes/random/3').then((response) => {
          randomPosts = response.value.map((item, index) => {
            return {
              id: item.id,
              content: item.joke,
              isLike: index % 3 === 0,
              likes: Math.round(Math.random() * 110) + 1,
              timestamp: Math.round(new Date() - (Math.random() * 3600000)),
              owner: 'q6oSPqt6guRGGaM3ZZQrbRbbiDD3'
            }
          })
          resolve(randomPosts)
        }, () => resolve(randomPosts))
      }),
      new Promise((resolve, reject) => {
        firebase.database().ref(ref).on('value', snapshot => {
          const items = snapshot.val() || []
          resolve(items)
        })
      })
    ]
    return Promise.all(promises).then(values => {
      const itemPromises = []

      const randomPosts = values[0]
      randomPosts.forEach((v) => {
        posts.push(v)
      })
      const items = values[1]
      items.forEach((v) => {
        posts.push(v)
      })

      posts.forEach(post => {
        const postPromise = new Promise((resolve, reject) => {
          UserService.get(post.owner, profile => {
            post.$profile = profile
            resolve()
          })
        })
        itemPromises.push(postPromise)
      })
      return Promise.all(itemPromises)
    }).then(() => {
      return posts
    })
  },
  add (content) {
    const item = {
      content,
      isLike: false,
      likes: 0,
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      owner: AuthService.currentUser.uid
    }
    posts.unshift(item)
    firebase.database().ref(ref).push(item).then(() => {
      console.log(arguments)
      posts.push(item)
    })
  }
}
