<template  lang="pug">
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
        router-link.btn-green.btn-small(:to="{name: 'profileedit'}") Edit Profile
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
    userThreadsCount () {
      return this.$store.getters['users/userThreadsCount'](this.user['.key'])
    },
    userPostsCount () {
      return this.$store.getters['users/userPostsCount'](this.user['.key'])
    }
  }
}
</script>

<style scoped>

</style>
