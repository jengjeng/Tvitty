import firebase from 'firebase'
import { Observable } from 'rxjs/Observable'

const db = firebase.database()

const getProfile = (method, id, callback, error) => {
  return db
    .ref(`users/${id}/profile`)[method]('value', snapshot => {
      callback && callback(snapshot.val())
    }, (err) => { error && error(err) })
}

export default {
  observable: {
    get: (id) => {
      return Observable.create(o => {
        const ref = db.ref(`users/${id}/profile`)
        const fn = ref.on('value', snapshot => {
          o.next(snapshot.val())
        }, (err) => { o.error(err) })
        return () => ref.off('value', fn)
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
