<template lang="pug">
  .forum-wrapper
    .col-full.push-top
      .forum-header
        .forum-details
          h1 {{forum.name}}
          p.text-lead {{forum.description}}
        a.btn-green.btn-small(href="new-thread.html") Start a thread
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
