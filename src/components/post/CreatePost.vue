<template>
  <div class="ui segment secondary">
   <form ref="form" class="ui fluid action input">
      <div class="photo-container">
        <img :src="user.photo" class="ui image circular mini">
      </div>
      <input ref="message" class="ui input" type="text" placeholder="What do you thinking?">
      <button class="ui button primary" type="submit">Post</button>
    </form>
  </div>
</template>

<script>
import PostAPI from './../../api/post.js'

export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  mounted () {
    $(this.$refs.form).submit((e) => {
      this.sendMessage()
      return e.preventDefault()
    })
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