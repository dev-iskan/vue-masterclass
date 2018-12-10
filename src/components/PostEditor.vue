<template lang="pug">
  form(@submit.prevent="save")
        div.form-group
          textarea.form-input(v-model="newPostText")
        div.form-actions
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
      newPostText: ''
    }
  },
  methods: {
    save () {
      const post = {
        text: this.newPostText,
        publishedAt: Math.floor(new Date() / 1000),
        threadId: this.threadId,
        userId: '7uVPJS9GHoftN58Z2MXCYDqmNAh2'
      }
      this.newPostText = ''
      this.$emit('save', { post })
      this.$store.dispatch('createPost', post)
    }
  }
}
</script>

<style scoped>

</style>
