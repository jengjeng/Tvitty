import UserService from './user'
import AuthService from './auth'
import { Observable } from 'rxjs/Observable'

const get = (callback) => UserService.get(AuthService.currentUser.uid, (profile) => {
  if (!profile) {
    profile = getUserProfileFromUserObject(AuthService.currentUser)
  }
  callback && callback(profile)
  return profile
})

const observable = {
  get: () => {
    const observable = AuthService.observable.currentUser
    const observableNoUser = observable.filter(user => !user)
    const observableWithUser = observable
      .filter(user => user)
      .flatMap(user => {
        return Observable.combineLatest(UserService.observable.get(user.uid))
      }, (user, [profile]) => {
        return {id: user.uid, user$: user, ...profile}
      })
    return observableNoUser.merge(observableWithUser)
  }
}

const set = (callback) => UserService.set(AuthService.currentUser.uid, callback)

const subscribe = (callback) => UserService.subscribe(AuthService.currentUser.uid, callback)

const uploadPhoto = (file, progress) => UserService.uploadPhoto(AuthService.currentUser.uid, file, progress)

export default {
  observable,
  get,
  set,
  subscribe,
  uploadPhoto
}

/* Functions */
function getUserProfileFromUserObject (user) {
  return {
    name: user.displayName,
    description: '',
    photo: user.photoURL
  }
}
