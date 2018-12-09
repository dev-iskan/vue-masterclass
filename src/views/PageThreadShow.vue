<template lang="pug">
  div
    div(class="col-large push-top")
      h1 {{thread.title}}
      p By
        a(href="#" class="link-unstyled") Robin,
        AppDate(:timestamp="thread.publishedAt")
      post-list(:posts="posts")
      post-editor(@save="addPost" :threadId="id")
</template>

<script>
import PostList from '@/components/PostList'
import sourceData from '@/data.json'
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
      thread: sourceData.threads[this.id]

    }
  },
  computed: {
    posts () {
      const postIds = Object.values(this.thread.posts)
      return Object.values(sourceData.posts)
        .filter(post => postIds.includes(post['.key']))
    }
  },
  components: {
    PostList,
    PostEditor
  },
  methods: {
    addPost ({ post }) {
      const postId = post['.key']
      this.$set(sourceData.posts, postId, post)
      this.$set(this.thread.posts, postId, postId)
      this.$set(sourceData.users[post.userId].posts, postId, postId)
    }
  }
}
</script>

<style scoped>

</style>
