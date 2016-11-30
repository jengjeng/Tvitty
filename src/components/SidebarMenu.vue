<template>
  <div>
    <h3>SidebarMenu</h3>
    <p>
     {{ user.name }}
    </p>
    <p>
     {{ user.photo }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object
    }
  }
}
</script>