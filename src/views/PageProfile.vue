<template lang="pug">
  .flex-grid
    h1  Profile Page
    user-profile-card(
       v-if="!edit"
      :user="user"
    )
    user-profile-card-editor(
      v-else
      :user="user"
    )
    .col-7.push-top
      .profile-header
        span.text-lead {{user.username}}'s recent activity
        a(href="#") See only started threads?
      hr
      PostList(:posts="userPosts")
</template>

<script>
import PostList from '@/components/PostList'
import UserProfileCard from '@/components/UserProfileCard'
import UserProfileCardEditor from '@/components/UserProfileCardEditor'
import { mapGetters } from 'vuex'
import asyncDataStatus from '@/mixins/asyncDataStatus'

export default {
  components: {
    PostList,
    UserProfileCard,
    UserProfileCardEditor
  },
  computed: {
    ...mapGetters({
      user: 'authUser'
    }),
    userPosts () {
      return this.$store.getters.userPosts(this.user['.key'])
    }
  },
  mixins: [asyncDataStatus],
  props: {
    edit: {
      type: Boolean,
      default: false
    }
  },

  created () {
    this.$store.dispatch('fetchPosts', { ids: this.user.posts })
      .then(() => this.asyncDataStatus_fetched())
  }
}
</script>

 <style scoped>
 </style>
