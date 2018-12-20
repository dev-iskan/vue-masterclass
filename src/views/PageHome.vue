<template lang="pug">
  .col-full.push-top(v-if="asyncDataStatus_ready")
    h1 Welcome to the forum
    CategoryList(:categories="categories")
  </template>

<script>
import { mapActions } from 'vuex'
import CategoryList from '@/components/CategoryList'
import asyncDataStatus from '@/mixins/asyncDataStatus'
export default {
  components: {
    CategoryList
  },
  computed: {
    categories () {
      return Object.values(this.$store.state.categories)
    }
  },
  mixins: [asyncDataStatus],
  methods: {
    ...mapActions(['fetchAllCategories', 'fetchForums'])
  },
  created () {
    this.fetchAllCategories()
      .then(categories => Promise.all(categories.map(category => this.fetchForums({ ids: Object.keys(category.forums) }))))
      .then(() => {
        this.asyncDataStatus_fetched()
      })
  }
}
</script>

<style>
@import "../assets/css/style.css";
</style>
