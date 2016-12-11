import firebase from 'firebase'

firebase.initializeApp({
  apiKey: 'AIzaSyA7deC1Etp4mU6QFKuxCCmZ_vfYpgkCogc',
  authDomain: 'tvitty-b69b1.firebaseapp.com',
  databaseURL: 'https://tvitty-b69b1.firebaseio.com',
  storageBucket: 'tvitty-b69b1.appspot.com',
  messagingSenderId: '79608916460'
})

firebase.auth().onAuthStateChanged(user => {
  console.log(user)
  if (user) {
    // // save the user's profile into the database so we can list users,
    // // use them in Security and Firebase Rules, and show profiles
    // firebase.child("users").child(authData.uid).set({
    //   provider: authData.provider,
    //   name: getName(authData)
    // })
  }
})
// find a suitable name based on the meta info given by each provider
// function getName(authData) {
//   switch(authData.provider) {
//      case 'password':
//        return authData.password.email.replace(/@.*/, '')
//      case 'twitter':
//        return authData.twitter.displayName
//      case 'facebook':
//        return authData.facebook.displayName
//   }
// }
