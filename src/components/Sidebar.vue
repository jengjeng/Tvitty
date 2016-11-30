<template>
  <div>
    <h3>Sidebar {{ title }}</h3>
    <p>
     {{ user.name }}
    </p>
    <p>
     {{ user.photo }}
    </p>
    <SidebarMenu :user="user"></SidebarMenu>
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
  }
}
</script>