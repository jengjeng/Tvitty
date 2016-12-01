<template>
  <div>
    <h3>NavbarMenu</h3>
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