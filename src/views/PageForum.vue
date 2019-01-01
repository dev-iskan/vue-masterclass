<template lang="pug">
  .forum-wrapper(v-if="asyncDataStatus_ready")
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
import asyncDataStatus from '@/mixins/asyncDataStatus'
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
  mixins: [asyncDataStatus],
  computed: {
    forum () {
      return this.$store.state.forums.items[this.id]
    },
    threads () {
      return Object.values(this.$store.state.threads.items)
        .filter(thread => thread.forumId === this.id)
    }
  },
  methods: {
    ...mapActions('forums', ['fetchForum']),
    ...mapActions('threads', ['fetchThreads']),
    ...mapActions('users', ['fetchUser'])
  },
  created () {
    this.fetchForum({ id: this.id })
      .then(forum => this.fetchThreads({ ids: forum.threads }))
      .then(threads => Promise.all(threads.map(thread => this.fetchUser({ id: thread.userId }))))
      .then(() => { this.asyncDataStatus_fetched() })
  }
}
</script>

<style scoped>
  .forum-wrapper {
    width: 100%
  }
</style>
