<template lang="pug">
  .col-full(:class="$style.centered")
    h1(:class="$style.headingLarge") Not Found
    p(:class="$style.textLarge") Ooops, we couldn't find what you are looking for. Why don't you
      router-link(:to="{name: 'pagehome'}")  go home instead?
</template>

<script>
export default {

}
</script>

<style module>
  .headingLarge {
    font-size: 100px
  }
  .textLarge {
    font-size: 50px;
    font-weight: 100;
  }
  .centered {
    text-align: center;
  }
</style>
