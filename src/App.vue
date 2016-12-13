<template>
  <div id="app">
    <Navbar></Navbar>
    <router-view class="ui main text container"></router-view>
    <PageFooter></PageFooter>
  </div>
</template>

<script>
import Navbar from './components/navbar/Navbar'
import PageFooter from './components/PageFooter'

export default {
  name: 'app',
  components: {
    Navbar,
    PageFooter
  }
}
</script>

<style lang="scss">
  .logo-text {
    color: rgb(144, 154, 52);

    span {
      color: rgb(0, 169, 223);
    }
  }
</style>

<style scoped>
  #app {
    position: relative;
    min-height: 100%;
  }
  .ui.main.container {
    padding-top: 6.5em;
    padding-bottom: 3em;
  }
</style>