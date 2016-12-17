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
  get: () => AuthService.observable.currentUser.flatMap((user) => {
    return Observable.combineLatest(UserService.observable.get(user.uid))
  }, (user, [profile]) => {
    return {id: user.uid, user$: user, ...profile}
  })
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
