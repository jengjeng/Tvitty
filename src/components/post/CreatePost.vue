<template>
  <div class="ui segment secondary">
   <form ref="form" class="ui fluid action input" @submit.prevent="sendMessage">
      <div class="photo-container">
        <img :src="user.photoURL" class="ui image circular mini">
      </div>
      <input ref="message" class="ui input" type="text" placeholder="What are you thinking?">
      <button class="ui button primary" type="submit">Post</button>
    </form>
  </div>
</template>

<script>
import PostAPI from './../../services/post.js'

export default {
  props: ['user'],
  mounted () {
    $(this.$refs.message).focus()
  },
  methods: {
    sendMessage () {
      PostAPI.createPost(this.$refs.message.value)
      this.$refs.form.reset()
    }
  }
}
</script>

<style scoped>
  .photo-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .ui.image {
    margin-right: 1.25em;
    flex: none;
  }
</style>