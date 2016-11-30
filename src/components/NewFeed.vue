<template>
  <div>
    New feed - {{ title }}
    <Posts :posts="posts"></Posts>
    <CreatePost :user="user"></CreatePost>
  </div>
</template>

<script>
import Posts from './post/Posts'
import CreatePost from './post/CreatePost'

export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    user: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      posts: [
        { title: 'Test Post', user: this.user }
      ]
    }
  },
  components: {
    Posts,
    CreatePost
  }
}
</script>