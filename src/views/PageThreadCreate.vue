<template lang="pug">
  .col-full.push-top
    h1 Create new thread in
      i {{forum.name}}
    thread-editor(
      @save="save"
      @cancel="cancel"
    )
</template>
<script>
import ThreadEditor from '@/components/ThreadEditor'
export default {
  props: {
    forumId: {
      type: String,
      required: true
    }
  },
  components: {
    ThreadEditor
  },
  computed: {
    forum () {
      return this.$store.state.forums[this.forumId]
    }
  },
  methods: {
    save ({ title, text }) {
      this.$store.dispatch('createThread', {
        forumId: this.forum['.key'],
        title,
        text
      })
        .then(thread => {
          this.$router.push({ name: 'pagethreadshow', params: { id: thread['.key'] } })
        })
    },
    cancel () {
      this.$router.push({ name: 'forum', params: { id: this.forum['.key'] } })
    }
  }
}
</script>
 <style scoped>
 </style>
