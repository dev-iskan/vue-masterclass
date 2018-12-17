<template lang="pug">
  .col-large.push-top
    h1 {{thread.title}}
      router-link.btn-green.btn-small(:to="{name: 'threadedit', id: this.id}" tag="button" style="margin-left: 10px;") Edit Thread
    p By
      a.link-unstyled(href="#") {{user.name}},
      AppDate(:timestamp="thread.publishedAt")
      span.hide-mobile.text-faded.text-small(style="float:right; margin-top: 2px;") {{repliesCount}} replies by {{contributorsCount}} contributors
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
    user () {
      return this.$store.state.users[this.thread.userId]
    },
    thread () {
      return this.$store.state.threads[this.id]
    },
    repliesCount () {
      return this.$store.getters.threadRepliesCount(this.thread['.key'])
    },
    contributorsCount () {
      // find the replies
      const replies = Object.keys(this.thread.posts)
        .filter(postId => postId !== this.thread.firstPostId)
        .map(postId => this.$store.state.posts[postId])
        // get the user ids
      const userIds = replies.map(post => post.userId)
      // count the unique ids
      return userIds.filter((item, index) => index === userIds.indexOf(item)).length
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
