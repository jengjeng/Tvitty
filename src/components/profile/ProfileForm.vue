<template>
  <form ref="form" class="ui form" @submit.prevent="submitForm">
    <div class="field">
      <label>Photo</label>
      <a @click="photoPicker" src="javascript:void(0)" class="photo-picker">
        <img ref="photoPreview" :src="profile.photo" :class="`ui image circular ${uploading ? 'disabled' : ''}`" alt="User Photo" />
      </a>
      <input ref="photoSelected" @change="previewPhoto" type="file" style="display:none" :disabled="uploading">
    </div>
    <div class="field">
      <div ref="progress" v-show="upload" class="ui progress">
        <div class="bar">
          <div class="progress"></div>
        </div>
        <div class="label">
          Uploading...
        </div>
      </div>
    </div>
    <div class="field">
      <label>Name</label>
      <input v-model="profile.name" type="text" placeholder="Name" required>
    </div>
    <div class="field">
      <label>Description</label>
      <input v-model="profile.description" type="text" placeholder="Description">
    </div>
    <button :class="`ui button primary ${uploading ? 'disabled' : ''}`" type="submit">Submit</button>
    <router-link to="/profile" class="ui button negative">Cancel</router-link>
  </form>
</template>

<script>
import { MeService } from './../../services'

export default {
  props: ['value'],
  data: () => ({
    uploading: false,
    profile: {
      name: '',
      description: '',
      photo: ''
    }
  }),
  computed: {
    upload () {
      $(this.$refs.progress).transition('fade scale down')
      return this.uploading
    }
  },
  created () {
    this.profile.name = this.value.name
    this.profile.description = this.value.description
    this.profile.photo = this.value.photo
  },
  methods: {
    photoPicker () {
      $(this.$refs.photoSelected).click()
    },
    uploadPhoto () {
      return new Promise((resolve) => {
        const file = this.$refs.photoSelected.files[0]
        if (!file) {
          resolve()
          return
        }
        this.uploading = true
        this.previewPhoto(file)
        MeService.uploadPhoto(file, percent => {
          $(this.$refs.progress).progress({ percent: percent })
        }).then(url => {
          this.profile.photo = url
          setTimeout(resolve, 500)
        })
      })
    },
    previewPhoto () {
      const file = this.$refs.photoSelected.files[0]
      if (!file) return
      const photoPreview = this.$refs.photoPreview
      var reader = new window.FileReader()
      reader.onload = (e) => {
        const imgBase64 = e.target.result
        $(photoPreview).attr('src', imgBase64)
        this.profile.photo = imgBase64
      }
      reader.readAsDataURL(file)
    },
    submitForm () {
      this.uploadPhoto().then(() => {
        this.$emit('input', {
          name: this.profile.name,
          description: this.profile.description,
          photo: this.profile.photo
        })
        this.$emit('save')
      })
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