<template>
  <div>
    User {{ id }}<br>
    <router-link :to="`/user/${id - 1}`">Prev</router-link><br>
    <router-link :to="`/user/${id + 1}`">Next</router-link>
  </div>
</template>

<script>
export default {
  data () {
    return {
      id: 0
    }
  },
  created () {
    this.refresh()
  },
  watch: {
    $route: 'reload'
  },
  methods: {
    refresh () {
      this.id = +this.$route.params.id
    }
  }
}
</script>