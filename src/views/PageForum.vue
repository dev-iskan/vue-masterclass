<template lang="pug">
  .forum-wrapper(v-if="forum")
    .col-full.push-top
      .forum-header
        .forum-details
          h1 {{forum.name}}
          p.text-lead {{forum.description}}
        router-link.btn-green.btn-small(:to="{name: 'threadcreate', params: {forumId: this.forum['.key']}}") Start a thread
    .col-full.push-top
      ThreadList(:threads="threads")
</template>

<script>
import { mapActions } from 'vuex'
import ThreadList from '@/components/ThreadList'
export default {
  components: {
    ThreadList
  },
  props: {
    id: {
      required: true,
      type: String
    }
  },
  computed: {
    forum () {
      return this.$store.state.forums[this.id]
    },
    threads () {
      return Object.values(this.$store.state.threads)
        .filter(thread => thread.forumId === this.id)
    }
  },
  methods: {
    ...mapActions(['fetchForum', 'fetchThreads', 'fetchUser'])
  },
  created () {
    this.fetchForum({ id: this.id })
      .then(forum => {
        this.fetchThreads({ ids: forum.threads })
          .then(threads => {
            threads.forEach(thread => this.fetchUser({ id: thread.userId }))
          })
      })
  }
}
</script>

<style scoped>
  .forum-wrapper {
    width: 100%
  }
</style>
