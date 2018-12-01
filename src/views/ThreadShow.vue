<template lang="pug">
  div
    div(class="col-large push-top")
      h1 {{thread.title}}
      div(class="post-list")
        div(v-for="postId in thread.posts" :key="postId['.key']" class="post")
          div(class="user-info")
            a(href="#" class="user-name") {{users[posts[postId].userId].name}}
            a(href="#")
              img(class="avatar-large" :src="users[posts[postId].userId].avatar" alt="")
            p(class="desktop-only text-small") 107 posts
          div(class="post-content")
            div {{posts[postId].text}}
          div(class="post-date text-faded") {{posts[postId].publishedAt}}
</template>

<script>
import sourceData from '@/data.json'
export default {
  props: {
    id: {
      required: true,
      type: String
    }
  },
  data  () {
    return {
      thread: sourceData.threads[this.id],
      posts: sourceData.posts,
      users: sourceData.users
    }
  }
}
</script>

<style scoped>

</style>
