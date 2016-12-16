<template>
  <div>
    <div class="ui segment">
      <ProfileForm v-if="user && user.profile" v-model="user.profile" @save="save"></ProfileForm>
    </div>
  </div>
</template>

<script>
import { MeService } from './../../services'
import ProfileForm from './ProfileForm'
import Store from './../../store'

export default {
  computed: {
    user: () => Store.currentUser
  },
  methods: {
    save () {
      MeService.set(this.user.profile).then(() => {
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