<template lang="pug">
  .col-full.push-top(v-if="asyncDataStatus_ready")
    h1 Create new thread in
      i {{forum.name}}
    thread-editor(
      ref="editor"
      @save="save"
      @cancel="cancel"
    )
</template>

<script>
import { mapActions } from 'vuex'
import ThreadEditor from '@/components/ThreadEditor'
import asyncDataStatus from '@/mixins/asyncDataStatus'
export default {
  components: {
    ThreadEditor
  },
  props: {
    forumId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      saved: false
    }
  },
  mixins: [asyncDataStatus],
  computed: {
    forum () {
      return this.$store.state.forums[this.forumId]
    },
    hasUnsavedChanges () {
      return (this.$refs.editor.form.title || this.$refs.editor.form.text) && !this.saved
    }
  },
  methods: {
    ...mapActions(['createThread', 'fetchForum']),
    save ({ title, text }) {
      this.createThread({
        forumId: this.forum['.key'],
        title,
        text
      }).then(thread => {
        this.saved = true
        this.$router.push({ name: 'pagethreadshow', params: { id: thread['.key'] } })
      })
    },
    cancel () {
      this.$router.push({ name: 'forum', params: { id: this.forum['.key'] } })
    }
  },
  created () {
    this.fetchForum({ id: this.forumId })
      .then(() => { this.asyncDataStatus_fetched() })
  },
  beforeRouteLeave (to, from, next) {
    if (this.hasUnsavedChanges) {
      const confirmed = window.confirm('Are you sure you want to leave? Unsaved changes will be lost.')
      if (confirmed) {
        next()
      } else {
        next(false)
      }
    } else {
      next()
    }
  }
}
</script>

 <style scoped>
 </style>
