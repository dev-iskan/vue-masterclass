<template lang="pug">
  .post(v-if="post && user")
    .user-info
      a.user-name(href="#") {{user.name}}
      a(href="#")
        img.avatar-large(:src="user.avatar" alt="")
      p.desktop-only.text-small {{userThreadsCount}} threads
      p.desktop-only.text-small {{userPostsCount}} posts
    .post-content
      template(v-if="!editing")
        div(style="padding: 0 10px;") {{post.text}}
        a.link-unstyled(@click.prevent="editing = true" href="#" style="margin-left: auto;" title="Make a change")
          i.fa.fa-pencil
      div(v-else)
        post-editor(:post="post" @save="editing = false" @cancel="editing = false")
    .post-date.text-faded
      .edition-info(v-if="post.edited") edited
      AppDate(:timestamp="post.publishedAt")
</template>

<script>
import PostEditor from './PostEditor'
export default {
  props: {
    post: {
      required: true,
      type: Object
    }
  },
  components: {
    PostEditor
  },
  data () {
    return {
      editing: false
    }
  },
  computed: {
    user () {
      return this.$store.state.users[this.post.userId]
    },
    userPostsCount () {
      return this.$store.getters.userPostsCount(this.post.userId)
    },
    userThreadsCount () {
      return this.$store.getters.userThreadsCount(this.post.userId)
    }
  }
}
</script>

<style scoped>

</style>
