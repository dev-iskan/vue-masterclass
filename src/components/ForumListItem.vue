<template lang="pug">
  div(class="forum-listing")
    div(class="forum-details")
      router-link(class="text-xlarge" :to="{name: 'forum', params: {id: forum['.key']}}") {{forum.name}}
      p {{forum.description}}
    div(class="threads-count")
      p(class="count") {{threadsCount}}
      | {{threadsCount === 1 ? 'thread' : 'threads'}}
    div(class="last-thread")
      <!-- TODO: implement later -->
</template>
<script>
export default {
  props: {
    forum: {
      required: true,
      type: Object
    }
  },
  computed: {
    threadsCount () {
      return this.forum.threads
        ? Object.values(this.forum.threads).length
        : 0
    }
  }
}
</script>
 <style scoped>
 </style>
