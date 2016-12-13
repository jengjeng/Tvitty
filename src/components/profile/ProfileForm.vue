<template>
  <form ref="form" class="ui form" @submit.prevent="submitForm">
    <div class="field">
      <label>Photo</label>
      <a @click="photoPicker" src="javascript:void(0)" class="photo-picker">
        <img ref="photoPreview" :src="photo" class="ui image circular" alt="User Photo" />
      </a>
      <input ref="photoSelected" type="file" style="display:none">
    </div>
    <div class="field">
      <label>Name</label>
      <input v-model="name" type="text" placeholder="Name" required>
    </div>
    <div class="field">
      <label>Description</label>
      <input v-model="description" type="text" placeholder="Description">
    </div>
    <button class="ui button primary" type="submit">Submit</button>
    <router-link to="/profile" class="ui button negative">Cancel</router-link>
  </form>
</template>

<script>
export default {
  props: ['value'],
  data: () => ({
    name: '',
    description: '',
    photo: ''
  }),
  created () {
    this.name = this.value.name
    this.description = this.value.description
    this.photo = this.value.photo
  },
  mounted () {
    this.$nextTick(() => {
      $(this.$refs.photoSelected).change(this.previewPhoto)
    })
  },
  methods: {
    photoPicker () {
      $(this.$refs.photoSelected).click()
    },
    previewPhoto () {
      const input = this.$refs.photoSelected
      const photoPreview = this.$refs.photoPreview
      if (input.files && input.files[0]) {
        var reader = new window.FileReader()
        reader.onload = (e) => {
          const imgBase64 = e.target.result
          $(photoPreview).attr('src', imgBase64)
          this.photo = imgBase64
        }
        reader.readAsDataURL(input.files[0])
      }
    },
    submitForm () {
      this.$emit('input', {
        name: this.name,
        description: this.description,
        photo: this.photo
      })
      this.$emit('save')
    }
  }
}
</script>

<style scoped>
  .ui.image.circular {
    max-width: 300px;
    max-height: 300px;
  }
  .photo-picker {
    cursor: pointer;
  }
</style>