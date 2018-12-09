<template lang="pug">
  div(class="col-full")
    h1 Welcome to the forum
    CategoryList(:categories="categories")
  </template>

<script>
import sourceData from '@/data.json'
import CategoryList from '@/components/CategoryList'
export default {
  data () {
    return {
      categories: Object.values(sourceData.categories)
    }
  },
  components: {
    CategoryList
  }
}
</script>

<style>
@import "../assets/css/style.css";
</style>
