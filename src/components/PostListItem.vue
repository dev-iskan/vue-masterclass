<template lang="pug">
  div(class="post")
    div(class="user-info")
      a(href="#" class="user-name") {{user.name}}
      a(href="#")
        img(class="avatar-large" :src="user.avatar" alt="")
      p(class="desktop-only text-small") {{userPostsCount}} posts
    div(class="post-content")
      div {{post.text}}
    div(class="post-date text-faded" :title="this.post.publishedAt | humanFriendlyDate") {{post.publishedAt | diffForHumans}}
</template>

<script>
import sourceData from '@/data'
import moment from 'moment'
export default {
  props: {
    post: {
      required: true,
      type: Object
    }
  },
  filters: {
    humanFriendlyDate (date) {
      return moment.unix(date).format('MMMM Do YYYY, h:mm:ss a')
    },
    diffForHumans (date) {
      return moment.unix(date).fromNow()
    }
  },
  computed: {
    user () {
      return sourceData.users[this.post.userId]
    },
    userPostsCount () {
      return Object.keys(this.user.posts).length
    }
  }
}
</script>

<style scoped>

</style>
