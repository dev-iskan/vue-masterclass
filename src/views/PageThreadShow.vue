<template lang="pug">
  div
    .col-large.push-top
      h1 {{thread.title}}
      p By
        a.link-unstyled(href="#") Robin,
        AppDate(:timestamp="thread.publishedAt")
      post-list(:posts="posts")
      post-editor(:threadId="id")
</template>

<script>
import PostList from '@/components/PostList'
import PostEditor from '@/components/PostEditor'
export default {
  props: {
    id: {
      required: true,
      type: String
    }
  },
  computed: {
    thread () {
      return this.$store.state.threads[this.id]
    },
    posts () {
      const postIds = Object.values(this.thread.posts)
      return Object.values(this.$store.state.posts)
        .filter(post => postIds.includes(post['.key']))
    }
  },
  components: {
    PostList,
    PostEditor
  }
}
</script>

<style scoped>

</style>
