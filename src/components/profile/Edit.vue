<template>
  <div>
    <div class="ui segment">
      <form ref="form" class="ui form" @submit.prevent="submitForm">
        <div class="field">
          <label>Photo</label>
          <a @click="photoPicker" src="javascript:void(0)" class="photo-picker">
            <img ref="photoPreview" :src="curUser.photo" class="ui image circular" alt="User Photo"/>
          </a>
          <input ref="photoSelected" type="file" style="display:none">
        </div>
        <div class="field">
          <label>Name</label>
          <input v-model="curUser.name" type="text" placeholder="Name" required>
        </div>
        <div class="field">
          <label>Description</label>
          <input v-model="curUser.description" type="text" placeholder="Description">
        </div>
        <button class="ui button primary" type="submit">Submit</button>
        <router-link to="/profile" class="ui button negative">Cancel</router-link>
      </form>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import UserAPI from './../../services/user.js'

export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data () {
    const curUser = Vue.util.extend({}, this.user)
    return {
      curUser,
      userPhoto: curUser.photo
    }
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
          this.curUser.photo = imgBase64
        }
        reader.readAsDataURL(input.files[0])
      }
    },
    submitForm () {
      UserAPI.save(this.curUser)
      this.$router.push('/profile')
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