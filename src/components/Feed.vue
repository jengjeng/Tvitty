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
        <a>See more on Github</a>
      </h5>
    </a>
    <br/>
    <!--<CreatePost v-if="profile" :profile="profile"></CreatePost>-->
    <Posts :posts="posts"></Posts>
  </div>
</template>

<script>
import AppConfig from './../config/app.js'
import Posts from './post/Posts'
import CreatePost from './post/CreatePost'
import { PostService } from './../services'

export default {
  data () {
    return {
      title: AppConfig.name,
      profile: null,
      posts: []
    }
  },
  created () {
    PostService.list().then(posts => {
      this.posts = posts
    })
  },
  components: {
    Posts,
    CreatePost
  }
}
</script>