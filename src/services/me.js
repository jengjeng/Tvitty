import UserService from './user'
import AuthService from './auth'

const get = (callback) => UserService.get(AuthService.currentUser.uid, (profile) => {
  if (!profile) {
    profile = getUserProfileFromUserObject(AuthService.currentUser)
  }
  callback && callback(profile)
  return profile
})

const set = (callback) => UserService.set(AuthService.currentUser.uid, callback)

const uploadPhoto = (file, progress) => UserService.uploadPhoto(AuthService.currentUser.uid, file, progress)

export default {
  get,
  set,
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
