<template>
  <div>
    <Post v-for="post in sortedPosts" :key="post.id" :post="post" :user="post.user"></Post>
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
        return b.date - a.date
      })
    }
  },
  components: {
    Post
  }
}
</script>