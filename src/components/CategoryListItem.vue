<template lang="pug">
  .forum-list
    h2.list-title
      router-link(:to="{name: 'category', params: {id: category['.key']}}") {{ category.name }}
    ForumList(:forums="categoryForums")
</template>
<script>
import ForumList from './ForumList'

export default {
  components: {
    ForumList
  },
  props: {
    category: {
      required: true,
      type: Object
    }
  },
  computed: {
    categoryForums () {
      return Object.values(this.$store.state.forums)
        .filter(forum => forum.categoryId === this.category['.key'])
    }
  }
}
</script>
 <style scoped>
 </style>
