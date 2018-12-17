
<template lang="pug">
  .col-3.push-top
    .profile-card
      p.text-center
        img.avatar-xlarge.img-update(:src="user.avatar")
      .form-group
        input.form-input.text-lead.text-bold(v-model="activeUser.username" type="text" placeholder="Username")

      .form-group
        input.form-input.text-lead(v-model="activeUser.name" type="text" placeholder="Full Name")

      .form-group
        label(for="user_bio") Bio
        textarea.form-input(v-model="activeUser.bio" id="user_bio" placeholder="Write a few words about yourself.")

      .stats
        span {{userPostsCount}} posts
        span {{userThreadsCount}} threads
      hr
      .form-group
        label.form-label(for="user_website") Website
        input.form-input(v-model="activeUser.website" autocomplete="off" id="user_website")

      .form-group
        label.form-label(for="user_email") Email
        input.form-input(v-model="activeUser.email" autocomplete="off" id="user_email")

      .form-group
        label.form-label(for="user_location") Location
        input.form-input(v-model="activeUser.location" autocomplete="off" id="user_location")

      .btn-group.space-between
        button.btn-ghost(@click.prevent="cancel") Cancel
        button.btn-blue(@click.prevent="save" type="submit") Save

      p.text-xsmall.text-faded.text-center Member since june 2003, last visited 4 hours ago

</template>
<script>
export default {
  props: {
    user: {
      required: true,
      type: Object
    }
  },
  computed: {
    computed: {
      userThreadsCount () {
        return this.$store.getters.userThreadsCount(this.user['.key'])
      },
      userPostsCount () {
        return this.$store.getters.userPostsCount(this.user['.key'])
      }
    }
  },
  data () {
    return {
      activeUser: { ...this.user }
    }
  },
  methods: {
    save () {
      this.$store.dispatch('updateUser', { ...this.activeUser })
      this.$router.push({ name: 'profile' })
    },
    cancel () {
      this.$router.push({ name: 'profile' })
    }
  }
}
</script>
 <style scoped>
 </style>
