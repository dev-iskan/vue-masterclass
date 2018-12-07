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
      const postId = 'greatPost' + Math.random()
      const post = {
        text: this.newPostText,
        publishedAt: Math.floor(new Date() / 1000),
        threadId: this.id,
        userId: '7uVPJS9GHoftN58Z2MXCYDqmNAh2',
        '.key': postId
      }
      this.newPostText = ''

      this.$emit('save', { post })
    }
  }
}
</script>

<style scoped>

</style>
