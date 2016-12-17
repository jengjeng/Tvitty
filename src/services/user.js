import firebase from 'firebase'
import { Observable } from 'rxjs/Observable'

const db = firebase.database()

const getProfile = (method, id, callback) => {
  return db
    .ref(`users/${id}/profile`)[method]('value', snapshot => {
      let profile = snapshot.val()
      callback && callback(profile)
      return profile
    })
}

export default {
  observable: {
    get: (id, callback) => {
      return Observable.create(o => {
        let firebaseSubscription = getProfile('on', id, (profile) => {
          o.next(profile)
        })
        return () => firebaseSubscription.off('value')
      })
    }
  },
  get: (id, callback) => getProfile('once', id, callback),
  subscribe: (id, callback) => getProfile('on', id, callback),
  set (id, profile) {
    return db.ref(`users/${id}/profile`).set(profile)
  },
  list () {
    return db
      .ref(`users`)
      .once('value', snapshots => snapshots.map(snapshot => snapshot.val()))
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
