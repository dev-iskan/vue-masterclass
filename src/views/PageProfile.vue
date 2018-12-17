<template lang="pug">
  .flex-grid
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
      if (this.user.posts) {
        return Object.values(this.$store.state.posts)
          .filter(post => post.userId === this.user['.key'])
      }
      return []
    }
  },
  props: {
    edit: {
      type: Boolean,
      default: false
    }
  }
}
</script>

 <style scoped>
 </style>
