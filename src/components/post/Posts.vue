<template>
  <div>
    Post List
    <ul>
      <template v-for="post in posts">
        <Post :post="post"></Post>
      </template>
    </ul>
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
  components: {
    Post
  }
}
</script>