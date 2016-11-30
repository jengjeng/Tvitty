<template>
  <div class="ui borderless top fixed menu huge">
    <div class="ui container">
      <router-link to="/" class="header item">
        <img class="logo" src="./../../assets/logo.png">
        <span class="logo-text">
          <span>{{ title }}</span>
        </span>
      </router-link>
      <!--<template v-for="route in routes">
        <router-link v-if="route.container === 'MainMenu'" :to="route.path" class="item">{{ route.title || route.name || route.path }}</router-link>
      </template>-->
      <div class="right menu">
        <div class="ui dropdown item">
          <div>
            <img :src="user.photo" class="ui circular image mini"/>
            &nbsp;
            <span class="ui sub header grey">@</span>
            {{ user.name }}
          </div>
          <i class="dropdown icon"></i>
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

<style scoped lang="scss">
  .ui.menu .item img.logo {
    margin-right: 1.5em;
  }
  .right.menu img {
    display: inline-block;
  }
</style>