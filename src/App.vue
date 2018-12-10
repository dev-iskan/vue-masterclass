<template lang="pug">
  div#app
    TheNavbar
    div.container
      router-view
</template>

<script>
import TheNavbar from '@/components/TheNavbar'
export default {
  components: {
    TheNavbar
  }
}
</script>

<style lang="scss">

</style>
