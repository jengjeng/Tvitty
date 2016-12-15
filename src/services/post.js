import firebase from 'firebase'
import AuthService from './auth'
import UserService from './user'

const ref = 'tweets'

const list = (callback) => {
  firebase.database().ref(ref).orderByChild('timestamp').on('value', snapshots => {
    const promises = []
    snapshots.forEach(snapshot => {
      const post = snapshot.val()
      post.id = snapshot.key
      promises.push(new Promise((resolve, reject) => {
        get(post.id, post.owner, $post => {
          resolve($post)
        })
      }))
    })
    Promise.all(promises).then(posts => {
      callback && callback(posts)
    })
  })
}

const get = (id, userId, callback) => {
  const promises = [
    new Promise((resolve, reject) => {
      firebase.database().ref(`${ref}/${id}`).once('value').then(snapshot => {
        const post = snapshot.val()
        post.id = snapshot.key
        resolve(post)
      })
    })
  ]
  if (typeof (userId) !== 'undefined') {
    promises.push(new Promise((resolve, reject) => {
      UserService.get(userId, profile => {
        resolve(profile)
      })
    }))
  }

  return Promise.all(promises).then(result => {
    const post = result[0]
    const profile = result[1]
    post.$profile = profile
    callback && callback(post)
    return post
  })
}

const add = (content, callback) => {
  const item = {
    content,
    isLike: false,
    likes: 0,
    timestamp: firebase.database.ServerValue.TIMESTAMP,
    owner: AuthService.currentUser.uid
  }
  const result = firebase.database().ref(ref).push(item)
  result.then(snapshot => {
    const key = snapshot.key
    get(key, item.owner, callback)
  })
}

const like = (post, callback) => {
  if (!post.id) return
  firebase.database().ref(`${ref}/${post.id}`).transaction(post => {
    if (post) {
      post.isLike = post.isLike || false
      post.likes = post.likes || 0
      post.isLike = !post.isLike
      post.likes += post.isLike ? 1 : -1
    }
    return post
  }).then(result => {
    callback && callback(result)
  })
}

export default {
  list,
  get,
  add,
  like
}
