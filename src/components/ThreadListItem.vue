<template lang="pug">
  .thread(v-if="thread && user")
    div
      p
        router-link(:to="{name: 'pagethreadshow', params: {id: thread['.key']}}") {{thread.title}}
      p.text-faded.text-xsmall
        | By
        a(href="#")  {{user.name}} ,
        AppDate(:timestamp="thread.publishedAt")
    .activity
      p.replies-count {{repliesCount}} replies
      //-  <!--<img class="avatar-medium" src="http://i0.kym-cdn.com/photos/images/facebook/000/010/934/46623-batman_pikachu_super.png" alt="">-->
      //-  <!--<div>-->
      //-   <!--<p class="text-xsmall">-->
      //-     <!--<a href="#">Bruce Wayne</a>-->
      //-   <!--</p>-->
      //-   <!--<p class="text-xsmall text-faded">2 hours ago</p>-->
      //- <!--</div>-->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    thread: {
      required: true,
      type: Object
    }
  },
  computed: {
    repliesCount () {
      return this.$store.getters.threadRepliesCount(this.thread['.key'])
    },
    user () {
      return this.$store.state.users[this.thread.userId]
    }
  }
}
</script>

<style scoped>

</style>
