<template lang="pug">
  form(@submit.prevent="save")
    .form-group
      textarea.form-input(v-model="text")
    .form-actions
      button.btn-blue Submit post
</template>

<script>
export default {
  props: {
    threadId: {
      required: true
    }
  },
  data () {
    return {
      text: ''
    }
  },
  methods: {
    save () {
      const post = {
        text: this.text,
        threadId: this.threadId
      }
      this.text = ''
      this.$emit('save', { post })
      this.$store.dispatch('createPost', post)
    }
  }
}
</script>

<style scoped>

</style>
