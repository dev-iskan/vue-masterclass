
<template lang="pug">
  .col-3.push-top
    .profile-card
      p.text-center
        img.avatar-xlarge.img-update(:src="user.avatar")
      .form-group
        input.form-input.text-lead.text-bold(
          v-model.lazy="activeUser.username"
          @blur="$v.activeUser.username.$touch()"
          type="text" placeholder="Username")
        template(v-if="$v.activeUser.username.$error")
          span.form-error(v-if="!$v.activeUser.username.required") This field is required
          span.form-error(v-if="!$v.activeUser.username.unique") Sorry! This username is taken
      .form-group
        input.form-input.text-lead(
          v-model="activeUser.name"
          @blur="$v.activeUser.name.$touch()"
          type="text" placeholder="Full Name")
        template(v-if="$v.activeUser.name.$error")
          span.form-error(v-if="!$v.activeUser.name.required") The name field is required
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
        input.form-input(
          v-model.lazy="activeUser.email"
          @blur="$v.activeUser.email.$touch()"
          autocomplete="off" id="user_email")
        template(v-if="$v.activeUser.email.$error")
          span.form-error(v-if="!$v.activeUser.email.required") This field is required
          span.form-error(v-if="!$v.activeUser.email.email") This in not a valid email address
          span.form-error(v-if="!$v.activeUser.email.unique") Sorry! This email is taken
      .form-group
        label.form-label(for="user_location") Location
        input.form-input(v-model="activeUser.location" autocomplete="off" id="user_location")

      .btn-group.space-between
        button.btn-ghost(@click.prevent="cancel") Cancel
        button.btn-blue(@click.prevent="save" type="submit") Save

      p.text-xsmall.text-faded.text-center Member since june 2003, last visited 4 hours ago

</template>
<script>
import { required, email } from 'vuelidate/lib/validators'
import { uniqueUsername, uniqueEmail } from '@/utils/validators'
export default {
  props: {
    user: {
      required: true,
      type: Object
    }
  },
  computed: {
    userThreadsCount () {
      return this.$store.getters['users/userThreadsCount'](this.user['.key'])
    },
    userPostsCount () {
      return this.$store.getters['users/userPostsCount'](this.user['.key'])
    }
  },
  validations: {
    activeUser: {
      name: {
        required
      },
      username: {
        required,
        unique (value) {
          if (value.toLowerCase() === this.user.usernameLower) {
            return true
          }
          return uniqueUsername(value)
        }
      },
      email: {
        required,
        email,
        unique (value) {
          if (value.toLowerCase() === this.user.email) {
            return true
          }
          return uniqueEmail(value)
        }
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
      this.$v.activeUser.$touch()
      if (!this.$v.activeUser.$invalid) {
        this.$store.dispatch('users/updateUser', { ...this.activeUser })
        this.$router.push({ name: 'profile' })
      }
    },
    cancel () {
      this.$router.push({ name: 'profile' })
    }
  }
}
</script>
 <style scoped>
 </style>
