import firebase from 'firebase'

const db = firebase.database()

export default {
  get (id, callback) {
    return db
      .ref(`users/${id}/profile`)
      .once('value', snapshot => {
        let profile = snapshot.val()
        callback && callback(profile)
        return profile
      })
  },
  set (id, profile) {
    return db.ref(`users/${id}/profile`).set(profile)
  },
  list () {
    return db
      .ref(`users`)
      .once('value', snapshots => snapshots.map(snapshot => snapshot.val()))
  },
  subscribe (id, callback) {
    return db
      .ref(`users/${id}/profile`)
      .on('value', (snapshot) => {
        let profile = snapshot.val()
        callback && callback(profile)
        return profile
      })
  },
  uploadPhoto (id, file, progress) {
    const task = firebase.storage().ref(`users/${id}/photo`).put(file)
    task.on(firebase.storage.TaskEvent.STATE_CHANGED, ({ bytesTransferred, totalBytes }) => {
      const percent = 100 * bytesTransferred / totalBytes
      progress && progress(percent)
    })
    return task.then((snapshot) => {
      return snapshot.downloadURL
    })
  }
}
