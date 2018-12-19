<template lang="pug">
  div(class="col-full push-top")
    h1 Welcome to the forum
    CategoryList(:categories="categories")
  </template>

<script>
import { mapActions } from 'vuex'
import CategoryList from '@/components/CategoryList'
export default {
  components: {
    CategoryList
  },
  computed: {
    categories () {
      return Object.values(this.$store.state.categories)
    }
  },
  methods: {
    ...mapActions(['fetchAllCategories', 'fetchForums'])
  },
  created () {
    this.fetchAllCategories()
      .then(categories => {
        categories.forEach(category => this.fetchForums({ ids: Object.keys(category.forums) }))
      })
  }
}
</script>

<style>
@import "../assets/css/style.css";
</style>
