<template lang="pug">
  header(class="header" id="header" v-click-outside="closeMobileNavbar" v-handle-scroll="closeMobileNavbar")
    router-link(:to="{name: 'pagehome'}" class="logo")
      img(src="../assets/img/vueschool-logo.svg")
    div(class="btn-hamburger" @click="mobileNavOpen = !mobileNavOpen")
      //- <!-- use .btn-humburger-active to open the menu -->
      div(class="top bar")
      div(class="middle bar")
      div(class="bottom bar")
    //-  <!-- use .navbar-open to open nav -->
    nav(class="navbar" :class="{'navbar-open': mobileNavOpen}")
      ul(v-if="user")
        li(class="navbar-user" v-click-outside="closeUserDropdown")
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
                a(@click.prevent="$store.dispatch('auth/signOut')") Sign Out
        li.navbar-mobile-item
          router-link(:to="{name: 'profile'}") View Profile
        li.navbar-mobile-item
          a(@click.prevent="$store.dispatch('auth/signOut')") Sign Out
      ul(v-else)
        li(class="navbar-item")
          router-link(:to="{name: 'SignIn'}") Sign In
          router-link(:to="{name: 'Register'}") Register
</template>

<script>
import { mapGetters } from 'vuex'
import clickOutside from '@/directives/click-outside'
import handleScroll from '@/directives/handle-scroll'
export default {
  data () {
    return {
      userDropdownOpen: false,
      mobileNavOpen: false
    }
  },
  directives: {
    clickOutside,
    handleScroll
  },
  computed: {
    ...mapGetters({
      user: 'auth/authUser'
    })
  },
  methods: {
    closeUserDropdown () {
      this.userDropdownOpen = false
    },
    closeMobileNavbar () {
      this.mobileNavOpen = false
    }
  }
}
</script>

 <style scoped>
 </style>
