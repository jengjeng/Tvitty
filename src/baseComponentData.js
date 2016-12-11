import firebase from 'firebase'
import AppSetting from './config/app.js'
import UserService from './services/user.js'

let componentData = {
  AppSetting,
  user: UserService.currentUser
}

firebase.auth().onAuthStateChanged(user => {
  componentData.user = user
})

export default componentData
