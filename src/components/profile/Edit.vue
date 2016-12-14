<template>
  <div>
    <div class="ui segment">
      <ProfileForm v-model="profile" @save="save"></ProfileForm>
    </div>
  </div>
</template>

<script>
import { MeService } from './../../services'
import ProfileForm from './ProfileForm'

export default {
  data: () => ({
    profile: {
      name: '',
      description: '',
      photo: ''
    }
  }),
  created () {
    MeService.get((profile) => {
      this.profile = profile
    })
  },
  methods: {
    save () {
      MeService.set(this.profile).then(() => {
        this.back()
      })
    },
    back () {
      this.$router.push('/profile')
    }
  },
  components: {
    ProfileForm
  }
}
</script>