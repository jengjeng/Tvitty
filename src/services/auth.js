import firebase from 'firebase'
import Store from './../store'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

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

const requireProfile = user => {
  return new Promise((resolve, reject) => {
    let defaultProfile = {
      name: '',
      description: '',
      photo: ''
    }
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
          Store.currentUser = user
          resolve(user.profile)
        })
    } else {
      Store.currentUser = user
    }
  })
}

const subscribeUser = (cb) => {
  firebase.auth().onAuthStateChanged(user => {
    cb && cb(user)
  })
}

const _user = new BehaviorSubject(undefined)

firebase.auth().onAuthStateChanged(user => {
  requireProfile(user)
  _user.next(user)
})

export default {
  observable: {
    get currentUser () {
      return _user.filter(x => x !== undefined)
    }
  },
  get currentUser () {
    return Store.currentUser
  },
  signInWithGoogle () {
    return new Promise((resolve, reject) => {
      firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((response) => {
        const user = response.user
        resolve(user)
      }, reject)
    })
  },
  signOut () {
    return firebase.auth().signOut()
  },
  requireUser,
  subscribeUser
}
