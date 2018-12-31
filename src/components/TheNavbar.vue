<template lang="pug">
  header(class="header" id="header")
    router-link(:to="{name: 'pagehome'}" class="logo")
      img(src="../assets/img/vueschool-logo.svg")
    div(class="btn-hamburger")
      //- <!-- use .btn-humburger-active to open the menu -->
      div(class="top bar")
      div(class="middle bar")
      div(class="bottom bar")
    //-  <!-- use .navbar-open to open nav -->
    nav(class="navbar")
      ul(v-if="user")
        li(class="navbar-user")
          a(@click.prevent="userDropdownOpen = !userDropdownOpen")
            img(class="avatar-small" :src="user.avatar" alt="")
            span
              | {{user.name}}
              img(class="icon-profile" src="../assets/img/arrow-profile.svg" alt="")
          //-  <!-- dropdown menu -->
          //- <!-- add class "active-drop" to show the dropdown -->
          div(id="user-dropdown" :class="{'active-drop': userDropdownOpen}")
            div(class="triangle-drop")
            ul(class="dropdown-menu")
              li(class="dropdown-menu-item")
                router-link(:to="{name: 'profile'}") View profile
              li(class="dropdown-menu-item")
                a(@click.prevent="$store.dispatch('signOut')") Sign Out
      ul(v-else)
        li(class="navbar-item")
          router-link(:to="{name: 'SignIn'}") Sign In
          router-link(:to="{name: 'Register'}") Register
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      userDropdownOpen: false
    }
  },
  computed: {
    ...mapGetters({
      'user': 'authUser'
    })
  }
}
</script>

 <style scoped>
 </style>
