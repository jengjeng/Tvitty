<template>
  <div>
    <Post v-for="post in sortedPosts" :key="post.id" :post="post" :profile="post.$profile"></Post>
  </div>
</template>

<script>
import Post from './Post'

export default {
  props: {
    posts: {
      type: Array,
      required: true
    }
  },
  computed: {
    sortedPosts () {
      return this.posts.sort((a, b) => {
        return b.timestamp - a.timestamp
      })
    }
  },
  components: {
    Post
  }
}
</script>