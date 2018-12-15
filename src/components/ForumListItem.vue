<template lang="pug">
  .forum-listing
    .forum-details
      router-link.text-xlarge(:to="{name: 'forum', params: {id: forum['.key']}}") {{forum.name}}
      p {{forum.description}}
    .threads-count
      p.count {{threadsCount}}
      | {{threadsCount === 1 ? 'thread' : 'threads'}}
    .last-thread
      <!-- TODO: implement later -->
</template>
<script>
import { countObjectProperties } from '@/utils'
export default {
  props: {
    forum: {
      required: true,
      type: Object
    }
  },
  computed: {
    threadsCount () {
      return countObjectProperties(this.forum.threads)
    }
  }
}
</script>
 <style scoped>
 </style>
