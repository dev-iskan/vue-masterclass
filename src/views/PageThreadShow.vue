<template lang="pug">
  .col-large.push-top(v-if="asyncDataStatus_ready")
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
import { mapActions } from 'vuex'
import PostList from '@/components/PostList'
import PostEditor from '@/components/PostEditor'
import { countObjectProperties } from '@/utils'
import asyncDataStatus from '@/mixins/asyncDataStatus'

export default {
  components: {
    PostList,
    PostEditor
  },
  props: {
    id: {
      required: true,
      type: String
    }
  },
  mixins: [asyncDataStatus],
  computed: {
    thread () {
      return this.$store.state.threads[this.id]
    },
    repliesCount () {
      return this.$store.getters.threadRepliesCount(this.thread['.key'])
    },
    user () {
      return this.$store.state.users[this.thread.userId]
    },
    contributorsCount () {
      return countObjectProperties(this.thread.contributors)
    },
    posts () {
      const postIds = Object.values(this.thread.posts)
      return Object.values(this.$store.state.posts)
        .filter(post => postIds.includes(post['.key']))
    }
  },
  methods: {
    ...mapActions(['fetchThread', 'fetchUser', 'fetchPosts'])
  },
  created () {
    // fetch thread
    this.fetchThread({ id: this.id })
      .then(thread => {
        // fetch user
        this.fetchUser({ id: thread.userId })
        this.fetchPosts({ ids: Object.keys(thread.posts) })
        return this.fetchPosts({ ids: Object.keys(thread.posts) })
      })
      .then(posts => {
        return Promise.all(posts.map(post => {
          this.fetchUser({ id: post.userId })
        }))
      })
      .then(() => { this.asyncDataStatus_fetched() })
  }
}
</script>

<style scoped>

</style>
