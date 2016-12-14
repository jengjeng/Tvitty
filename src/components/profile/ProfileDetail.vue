<template>
  <div class="ui center aligned grid">
    <div class="row" style="padding-bottom: 0px;">
      <img :src="profile.photo" class="ui circular image">
    </div>
    <div class="row" style="padding-bottom: 0px;">
      <h1>{{ profile.name }}</h1>
    </div>
    <div class="row">
      <h3>{{ profile.description }}</h3>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['profile']
  }
</script>

<style scoped>
  .ui.image.circular {
    max-width: 300px;
    max-height: 300px;
  }
</style>
