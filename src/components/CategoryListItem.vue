<template lang="pug">
  div(class="forum-list")
    h2(class="list-title")
      router-link(:to="{name: 'category', params: {id: category['.key']}}") {{ category.name }}
    ForumList(:forums="categoryForums")
</template>
<script>
import ForumList from './ForumList'
import sourceData from '@/data'
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
      return Object.values(sourceData.forums)
        .filter(forum => forum.categoryId === this.category['.key'])
    }
  }
}
</script>
 <style scoped>
 </style>
