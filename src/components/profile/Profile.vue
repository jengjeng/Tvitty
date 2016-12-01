<template>
  <div>
    <div class="ui center aligned grid">
      <div class="row" style="padding-bottom: 0px;">
        <img :src="user.photo" class="ui circular image">
      </div>
      <div class="row" style="padding-bottom: 0px;">
        <h1>{{ user.name }}</h1>
      </div>
      <div class="row">
        <h3>{{ user.description }}</h3>
      </div>
      <div class="row">
        <router-link to="/profile/edit" class="ui primary button">Edit</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
  .ui.image.circular {
    max-width: 300px;
    max-height: 300px;
  }
</style>