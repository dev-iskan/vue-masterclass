<template lang="pug">
  .col-full(v-if="asyncDataStatus_ready")
    h1 {{ category.name }}
    CategoryListItem(:category="category")
</template>

<script>
import { mapActions } from 'vuex'
import CategoryListItem from '@/components/CategoryListItem'
import asyncDataStatus from '@/mixins/asyncDataStatus'
export default {
  components: {
    CategoryListItem
  },
  props: {
    id: {
      required: true,
      type: String
    }
  },
  mixins: [asyncDataStatus],
  computed: {
    category () {
      return this.$store.state.categories.items[this.id]
    }
  },
  methods: {
    ...mapActions({
      fetchCategory: 'categories/fetchCategory',
      fetchForums: 'forums/fetchForums'
    })
  },
  created () {
    this.fetchCategory({ id: this.id })
      .then(category => this.fetchForums({ ids: category.forums }))
      .then(() => { this.asyncDataStatus_fetched() })
  }
}
</script>

 <style scoped>
 </style>
