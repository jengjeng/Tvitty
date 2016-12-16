<template>
  <transition :css="false" @enter="enter" @leave="leave">
    <div class="ui segment transition hidden">
      <div class="ui feed">
        <div class="event">
          <div class="label photo-container">
            <img :src="profile.photo">
          </div>
          <div class="content">
            <div class="summary">
              <router-link :to="`/user/${post.owner}`" class="user">
                {{ profile.name }}
              </router-link>
              <div class="date">{{ post.timestamp | fromNow }}</div>
            </div>
            <div class="summary" v-html="post.content">
            </div>
            <div class="meta">
              <a class="like" ref="likeBtn" @click="like">
                <i class="like icon"></i> {{ likeCount }} Likes
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { PostService, AuthService } from './../../services'

export default {
  props: ['post', 'profile'],
  methods: {
    enter (el, done) {
      $(el).transition('fade down')
      done()
    },
    leave (el, done) {
      $(el).transition('fade down')
      done()
    },
    like () {
      if (!AuthService.currentUser) {
        this.$router.push({ path: '/signin', query: { redirect: this.$route.fullPath } })
        return
      }
      PostService.like(this.post)
    },
    updateState () {
      if (this.post.isLike) {
        $(this.$refs.likeBtn).addClass('active')
        $('.icon', this.$refs.likeBtn).transition('jiggle')
      } else {
        $(this.$refs.likeBtn).removeClass('active')
        $('.icon', this.$refs.likeBtn).transition('pulse')
      }
    }
  },
  computed: {
    likeCount () {
      !this.$refs.likeBtn ? this.$nextTick(this.updateState) : this.updateState()
      return this.post.likes
    }
  }
}
</script>

<style scoped lang="scss">
  .ui.feed > .event > .label {
    width: 3.5em;
    display: flex;
    justify-content: center;
    align-items: center;

    > img {
      flex: none;
    }
  }
</style>