import firebase from 'firebase'

const db = firebase.database()

export default {
  get currentUser () {
    return this.get()
  },
  get () {
    return setUserData(firebase.auth().currentUser)
  },
  save (obj) {
    for (let prop in obj) {
      this.currentUser[prop] = obj[prop]
    }
    return this.currentUser
  },
  signInWithGoogle () {
    let _user
    return new Promise((resolve, reject) => {
      firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((user) => {
        _user = user
        return db.ref(`/users/${_user.uid}`).once('value')
      }).then((snapshot) => {
        if (snapshot.exists()) {
          resolve()
        } else {
          db.ref(`/users/${_user.uid}`).set({
            description: ''
          }).then(() => {
            resolve()
          })
        }
      })
    })
  },
  signOut () {
    return firebase.auth().signOut()
  }
}

/* Functions */
function setUserData (user, userVal) {
  user = user || {}
  for (let key in userVal) {
    console.log(key, userVal[key])
    user[key] = userVal[key]
  }
}
