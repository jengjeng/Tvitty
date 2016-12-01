<template>
  <div>
    <a class="ui header center aligned" href="https://github.com/jengjeng/Tvitty" target="_blank">
      <h1 class="ui header">
        <img class="logo" src="../assets/logo.png">
        <div class="logo-text">
          Tv<span>itty</span>
        </div>
      </h1>
      <h5 class="ui header mini">
        <a>https://github.com/jengjeng/Tvitty</a>
      </h5>
    </a>
    <br/>
    <CreatePost :user="user"></CreatePost>
    <Posts :posts="posts"></Posts>
  </div>
</template>

<script>
import PostAPI from './../api/post.js'
import Posts from './post/Posts'
import CreatePost from './post/CreatePost'

export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      posts: []
    }
  },
  created () {
    PostAPI.getPosts().then((posts) => {
      this.posts = posts
    })
  },
  components: {
    Posts,
    CreatePost
  }
}
</script>