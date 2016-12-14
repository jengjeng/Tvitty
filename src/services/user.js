import firebase from 'firebase'

const db = firebase.database()

export default {
  get (id, callback) {
    return db
      .ref(`users/${id}/profile`)
      .once('value', (snapshot) => {
        let profile = snapshot.val()
        callback && callback(profile)
        return profile
      })
  },
  set (id, profile) {
    return db.ref(`users/${id}/profile`).set(profile)
  },
  subscribe (id, callback) {
    return db
      .ref(`users/${id}/profile`)
      .on('value', (snapshot) => {
        let profile = snapshot.val()
        callback && callback(profile)
        return profile
      })
  }
}
