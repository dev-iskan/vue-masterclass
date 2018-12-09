<template lang="pug">
  div(class="post")
    div(class="user-info")
      a(href="#" class="user-name") {{user.name}}
      a(href="#")
        img(class="avatar-large" :src="user.avatar" alt="")
      p(class="desktop-only text-small") {{userPostsCount}} posts
    div(class="post-content")
      div {{post.text}}
    div(class="post-date text-faded")
      AppDate(:timestamp="post.publishedAt")
</template>

<script>
import sourceData from '@/data'
export default {
  props: {
    post: {
      required: true,
      type: Object
    }
  },
  computed: {
    user () {
      return sourceData.users[this.post.userId]
    },
    userPostsCount () {
      return Object.keys(this.user.posts).length
    }
  }
}
</script>

<style scoped>

</style>
