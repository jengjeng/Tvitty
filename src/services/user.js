import firebase from 'firebase'

export default {
  get currentUser () {
    return this.get()
  },
  get () {
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
