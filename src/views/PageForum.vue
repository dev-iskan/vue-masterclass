<template lang="pug">
  .forum-wrapper
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
import ThreadList from '@/components/ThreadList'
export default {
  props: {
    id: {
      required: true,
      type: String
    }
  },
  components: {
    ThreadList
  },
  computed: {
    forum () {
      return this.$store.state.forums[this.id]
    },
    threads () {
      return Object.values(this.$store.state.threads)
        .filter(thread => thread.forumId === this.id)
    }
  }
}
</script>

<style scoped>
  .forum-wrapper {
    width: 100%
  }
</style>
