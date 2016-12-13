import Vue from 'vue'
import moment from 'moment'

const time = new Vue({
  data () {
    return {
      now: null
    }
  },
  created () {
    setInterval(() => {
      this.now = Date.now()
    }, 30000)
  }
})

Vue.filter('date', (value, input) => {
  time.now
  if (!value) return ''
  return moment(value).format(input)
})

Vue.filter('fromNow', (value) => {
  time.now
  if (!value) return ''
  return moment(value).fromNow()
})
