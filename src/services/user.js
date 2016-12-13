import firebase from 'firebase'
import Store from './../store'

const db = firebase.database()

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
  save (obj) {
    const user = this.currentUser
    return db.ref(`users/${user.uid}/profile`).set(obj)
  },
  signInWithGoogle () {
    return firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
  },
  signOut () {
    return firebase.auth().signOut()
  }
}
