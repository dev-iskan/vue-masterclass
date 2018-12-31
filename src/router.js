import Vue from 'vue'
import Router from 'vue-router'
import PageHome from './views/PageHome.vue'
import store from '@/store'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'pagehome',
      component: PageHome
    },
    {
      path: '/thread/create/:forumId',
      props: true,
      name: 'threadcreate',
      component: () => import('./views/PageThreadCreate.vue'),
      meta: { requiresAuth: true }

    },
    {
      path: '/thread/:id',
      props: true,
      name: 'pagethreadshow',
      component: () => import('./views/PageThreadShow.vue')
    },
    {
      path: '/thread/:id/edit',
      props: true,
      name: 'threadedit',
      component: () => import('./views/PageThreadEdit.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/me',
      name: 'profile',
      component: () => import('./views/PageProfile.vue'),
      props: true,
      meta: { requiresAuth: true }
    },
    {
      path: '/me/edit',
      name: 'profileedit',
      component: () => import('./views/PageProfile.vue'),
      props: { edit: true },
      meta: { requiresAuth: true }
    },
    {
      path: '/forum/:id',
      props: true,
      name: 'forum',
      component: () => import('./views/PageForum.vue')
    },
    {
      path: '/category/:id',
      props: true,
      name: 'category',
      component: () => import('./views/PageCategory.vue')
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('./views/PageRegister.vue'),
      meta: { requiresGuest: true }
    },
    {
      path: '/signin',
      name: 'SignIn',
      component: () => import('./views/PageSignIn.vue'),
      meta: { requiresGuest: true }
    },
    {
      path: '/logout',
      name: 'SignOut',
      meta: { requiresAuth: true },
      beforeEnter (to, from, next) {
        store.dispatch('signOut')
          .then(() => next({ name: 'pagehome' }))
      }
    },
    // Handling not found pages
    {
      path: '*',
      name: 'notfound',
      // redirect: { name: 'pagehome' }
      component: () => import('./views/PageNotFound.vue')
    }
  ],
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  console.log(`🚦 navigating to ${to.name} from ${from.name}`)

  store.dispatch('initAuthentication')
    .then(user => {
      if (to.matched.some(route => route.meta.requiresAuth)) {
        // protected route
        if (user) {
          next()
        } else {
          next({ name: 'SignIn', query: { redirectTo: to.path } })
        }
      } else if (to.matched.some(route => route.meta.requiresGuest)) {
        // protected route
        if (!user) {
          next()
        } else {
          next({ name: 'pagehome' })
        }
      } else {
        next()
      }
    })
})

export default router
