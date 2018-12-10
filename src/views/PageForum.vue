<template lang="pug">
  div(class="forum-wrapper")
    div(class="col-full push-top")
      div(class="forum-header")
        div(class="forum-details")
          h1 {{forum.name}}
          p(class="text-lead") {{forum.description}}
        a(href="new-thread.html" class="btn-green btn-small") Start a thread
    div(class="col-full push-top")
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
