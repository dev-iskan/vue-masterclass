<template lang="pug">
  div(class="thread-list")
    h2(class="list-title") Threads
    ThreadListItem(
      v-for="thread in threads"
      :thread="thread"
      :key="thread['.key']"
    )
</template>

<script>
import ThreadListItem from '@/components/ThreadListItem'
export default {
  components: {
    ThreadListItem
  },
  props: {
    threads: {
      required: true,
      type: Array
    }
  }

}
</script>

<style scoped>

</style>
