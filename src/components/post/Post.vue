<template>
  <transition :css="false" @enter="enter" @leave="leave">
    <div class="ui segment transition hidden">
      <div class="ui feed">
        <div class="event">
          <div class="label">
            <img :src="user.photo">
          </div>
          <div class="content">
            <div class="summary">
              <a class="user">
                {{ user.username }}
              </a>
              <a class="date">
                @{{ user.name }}
              </a>
              <MomentDate :date="new Date(post.date)" class="date"></MomentDate>
            </div>
            <div class="summary" v-html="post.message">
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
import MomentDate from './../MomentDate'

export default {
  props: {
    post: {
      type: Object,
      required: true
    },
    user: {
      type: Object,
      required: true
    }
  },
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
      this.post.isLike = !this.post.isLike
      this.post.likes += this.post.isLike ? 1 : -1
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
  },
  components: {
    MomentDate
  }
}
</script>

<style scoped lang="scss">
  .ui.feed > .event > .label {
    width: 3.5em;
  }
</style>