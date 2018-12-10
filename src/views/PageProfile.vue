<template lang="pug">
  .flex-grid
    .col-3.push-top
      .profile-card
        p.text-center
          img.avatar-xlarge(:src="user.avatar")
        h1.title {{user.username}}
        p.text-lead {{user.name}}
        p.text-justify
          span(v-if="user.bio") {{user.bio}}
          span(v-else) No bio specified.
        span.online {{user.username}} is online
        .stats
          span {{userPostsCount}} posts
          span {{userThreadsCount}} threads
        hr
        p.text-large.text-center(v-if="user.website")
          i.fa.fa-globe
          a(:href="user.website") {{user.website}}
      p.text-xsmall.text-faded.text-center Member since june 2003, last visited 4 hours ago
      div.text-center
        hr
        a.btn-green.btn-small(href="edit-profile.html") Edit Profile
    .col-7.push-top
      .profile-header
        span.text-lead Joker's recent activity
        a(href="#") See only started threads?
      hr
      PostList(:posts="userPosts")
</template>

<script>
import PostList from '@/components/PostList'
import { mapGetters } from 'vuex'
export default {
  components: {
    PostList
  },
  computed: {
    ...mapGetters({
      user: 'authUser'
    }),
    userThreadsCount () {
      return this.user.threads
        ? Object.keys(this.user.threads).length
        : 0
    },
    userPostsCount () {
      return this.user.posts
        ? Object.keys(this.user.posts).length
        : 0
    },
    userPosts () {
      if (this.user.posts) {
        return Object.values(this.$store.state.posts)
          .filter(post => post.userId === this.user['.key'])
      }
      return []
    }
  }
}
</script>

 <style scoped>
 </style>
