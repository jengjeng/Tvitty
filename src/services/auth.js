import firebase from 'firebase'
import Store from './../store'
import UserService from './user'

const db = firebase.database()

const requireUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      unsubscribe()
      if (user) {
        resolve(user)
      } else {
        reject(user)
      }
    })
  })
}

const subscribeUser = (cb) => {
  firebase.auth().onAuthStateChanged(user => {
    cb && cb(user)
  })
}

firebase.auth().onAuthStateChanged(user => {
  let defaultProfile = {
    name: '',
    description: '',
    photo: ''
  }
  Store.currentUser = user
  if (user) {
    let ref = `users/${user.uid}/profile`
    defaultProfile = Object.assign(defaultProfile, {
      name: user.displayName,
      photo: user.photoURL
    })
    user.profile = defaultProfile
    db.ref(ref)
      .on('value', snapshot => {
        var userVal = snapshot.val()
        if (userVal) {
          user.profile = userVal
        } else {
          db.ref(ref).set(defaultProfile)
        }
      })
  }
})

export default {
  get currentUser () {
    return Store.currentUser
  },
  signInWithGoogle () {
    return new Promise((resolve, reject) => {
      firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((response) => {
        const user = response.user
        UserService.get(user.uid, (profile) => {
          if (profile) {
            resolve(profile)
          } else {
            profile = {
              name: user.displayName,
              description: user.description,
              photo: user.photoURL
            }
            UserService.set(user.uid, profile).then(() => resolve(profile))
          }
        })
      }, reject)
    })
  },
  signOut () {
    return firebase.auth().signOut()
  },
  requireUser,
  subscribeUser
}
