<template>
  <div class="column">
    <h2 class="ui blue image header">
      <img src="../assets/logo.png" class="image">
      <div class="content">
        Log-in to your account
      </div>
    </h2>
    <div class="ui segment">
      <button @click="signIn" class="ui google plus button">
        <i class="google plus icon"></i>
        Sign In With Google
      </button>
    </div>
  </div>
</template>

<script>
import { AuthService } from './../services'

export default {
  methods: {
    signIn () {
      AuthService.signInWithGoogle().then(() => {
        this.$router.replace(this.$route.query.redirect || '/')
      })
    }
  }
}
</script>
