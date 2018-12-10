<template lang="pug">
  div
    div(class="col-large push-top")
      h1 {{thread.title}}
      p By
        a(href="#" class="link-unstyled") Robin,
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
  data  () {
    return {
      thread: this.$store.state.threads[this.id]

    }
  },
  computed: {
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
