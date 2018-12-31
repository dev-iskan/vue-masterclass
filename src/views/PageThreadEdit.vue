<template lang="pug">
  .col-full.push-top(v-if="asyncDataStatus_ready")
    h1 Editing
      i {{thread.title}}
    thread-editor(
      ref="editor"
      :title="thread.title"
      :text="text"
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
    id: {
      type: String,
      required: true
    }
  },
  mixins: [asyncDataStatus],
  computed: {
    thread () {
      return this.$store.state.threads[this.id]
    },
    text () {
      const post = this.$store.state.posts[this.thread.firstPostId]
      return post ? post.text : null
    },
    hasUnsavedChanges () {
      // this.saved is not required in this implementation because `this.thread.title` and `this.text` are reactive
      // Thus `hasUnsavedChanges` will automatically become false when the thread is updated
      return this.$refs.editor.form.title !== this.thread.title || this.$refs.editor.form.text !== this.text
    }
  },
  methods: {
    ...mapActions(['updateThread', 'fetchThread', 'fetchPost']),
    save ({ title, text }) {
      this.updateThread({
        id: this.id,
        title,
        text
      }).then(thread => {
        this.$router.push({ name: 'pagethreadshow', params: { id: this.id } })
      })
    },
    cancel () {
      this.$router.push({ name: 'pagethreadshow', params: { id: this.id } })
    }
  },
  created () {
    this.fetchThread({ id: this.id })
      .then(thread => this.fetchPost({ id: thread.firstPostId }))
      .then(() => { this.asyncDataStatus_fetched() })
  },
  beforeRouteLeave (to, from, next) {
    if (this.hasUnsavedChanges) {
      const confirmed = window.confirm('Are you sure you want to leave? Any unsaved changes will be lost!')
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
