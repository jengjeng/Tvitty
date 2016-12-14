<template>
  <div class="ui segment secondary">
   <form ref="form" class="ui fluid action input" @submit.prevent="sendMessage">
      <div class="photo-container">
        <img :src="profile.photo" class="ui image circular mini">
      </div>
      <input ref="message" class="ui input" type="text" placeholder="What are you thinking?">
      <button class="ui button primary" type="submit">Post</button>
    </form>
  </div>
</template>

<script>
import { PostService } from './../../services'

export default {
  props: ['profile'],
  mounted () {
    $(this.$refs.message).focus()
  },
  methods: {
    sendMessage () {
      PostService.add(this.$refs.message.value)
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