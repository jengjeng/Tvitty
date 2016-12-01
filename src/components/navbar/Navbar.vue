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
        <router-link v-if="route.navbar === 'MainMenu'" :to="route.path" class="item">{{ route.title || route.name || route.path }}</router-link>
      </template>-->
      <div class="right menu">
        <a ref="dropdown" class="ui dropdown item">
          <div>
            <img :src="user.photo" class="ui circular image mini"/>
            &nbsp;
            <span class="ui sub header grey">@</span>
            {{ user.name }}
          </div>
          <i class="dropdown icon"></i>
          <div class="menu">
            <template v-for="route in routes">
              <router-link v-if="route.navbar === 'UserProfileDropdown'" :to="route.path" class="item">{{ route.title || route.name || route.path }}</router-link>
            </template>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import NavbarMenu from './NavbarMenu'

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
    NavbarMenu
  },
  data () {
    return {
      routes: this.$router.options.routes
    }
  },
  mounted () {
    this.$nextTick(() => {
      $(this.$refs.dropdown).dropdown()
    })
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