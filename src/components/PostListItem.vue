<template lang="pug">
  .post
    .user-info
      a.user-name(href="#") {{user.name}}
      a(href="#")
        img.avatar-large(:src="user.avatar" alt="")
      p.desktop-only.text-small {{userPostsCount}} posts
    .post-content
      div {{post.text}}
    .post-date.text-faded
      AppDate(:timestamp="post.publishedAt")
</template>

<script>

export default {
  props: {
    post: {
      required: true,
      type: Object
    }
  },
  computed: {
    user () {
      return this.$store.state.users[this.post.userId]
    },
    userPostsCount () {
      return Object.keys(this.user.posts).length
    }
  }
}
</script>

<style scoped>

</style>
