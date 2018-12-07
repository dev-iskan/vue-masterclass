<template lang="pug">
  div(class="col-full")
    h1 Welcome to the forum
    ThreadList(:threads="threads")
  </template>

<script>
import sourceData from '@/data.json'
import ThreadList from '@/components/ThreadList'
export default {
  data () {
    return {
      threads: Object.values(sourceData.threads),
      posts: sourceData.posts,
      users: sourceData.users
    }
  },
  components: {
    ThreadList
  }
}
</script>

<style>
@import "../assets/css/style.css";
</style>
