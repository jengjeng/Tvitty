<template>
  <div>
    {{ timeago }}
  </div>
</template>

<script>
  import moment from 'moment'

  export default {
    props: {
      date: {
        type: [String, Number, Date],
        required: true
      }
    },
    data () {
      return {
        _int: 0,
        now: new Date()
      }
    },
    created () {
      this._int = setInterval(() => {
        this.now = new Date()
      }, 1000)
    },
    computed: {
      timeago () {
        this.now
        return moment(this.date).fromNow()
      }
    },
    beforeDestroy () {
      clearInterval(this._int)
    }
  }
</script>