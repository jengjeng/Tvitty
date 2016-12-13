<template>
  <div>
    <div class="ui segment">
      <ProfileForm v-model="profile" @save="save"></ProfileForm>
    </div>
  </div>
</template>

<script>
import { UserService } from './../../services'
import ProfileForm from './ProfileForm'

export default {
  data: () => ({
    profile: UserService.currentUser.profile
  }),
  methods: {
    save () {
      UserService.save(this.profile).then(() => {
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