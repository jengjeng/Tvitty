<template>
  <div class="ui fixed menu">
    <div class="ui container">
      <router-link to="/" class="header item">
        <img class="logo" :src="user.photo">
        {{ title }}
      </router-link>
      <template v-for="route in routes">
        <router-link v-if="route.container === 'MainMenu'" :to="route.path" class="item">{{ route.title || route.name || route.path }}</router-link>
      </template>
      <div class="ui simple dropdown item">
        @{{ user.name }} <i class="dropdown icon"></i>
        <div class="menu">
          <!--<a class="item" href="#">Link Item</a>
          <a class="item" href="#">Link Item</a>
          <div class="divider"></div>
          <div class="header">Header Item</div>
          <div class="item">
            <i class="dropdown icon"></i>
            Sub Menu
            <div class="menu">
              <a class="item" href="#">Link Item</a>
              <a class="item" href="#">Link Item</a>
            </div>
          </div>
          <a class="item" href="#">Link Item</a>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SidebarMenu from './SidebarMenu'

export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    user: {
      type: Object
    }
  },
  components: {
    SidebarMenu
  },
  data () {
    return {
      routes: this.$router.options.routes
    }
  }
}
</script>