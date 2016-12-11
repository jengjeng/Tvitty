import firebase from 'firebase'

const db = firebase.database()

firebase.auth().onAuthStateChanged(user => {
  let defaultProfile = {
    description: ''
  }
  if (user) {
    let ref = `/users/${user.uid}`
    user.profile = defaultProfile
    db.ref(ref)
      .once('value')
      .then(snapshot => {
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
    return firebase.auth().currentUser
  },
  save (obj) {
    for (let prop in obj) {
      this.currentUser[prop] = obj[prop]
    }
    return this.currentUser
  },
  signInWithGoogle () {
    return firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
  },
  signOut () {
    return firebase.auth().signOut()
  }
}
