import Vue from 'vue'
import Router from 'vue-router'
import PageHome from './views/PageHome.vue'

Vue.use(Router)

export default new Router({
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
      component: () => import('./views/PageThreadCreate.vue')
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
      component: () => import('./views/PageThreadEdit.vue')
    },
    {
      path: '/me',
      name: 'profile',
      component: () => import('./views/PageProfile.vue'),
      props: true
    },
    {
      path: '/me/edit',
      name: 'profileedit',
      component: () => import('./views/PageProfile.vue'),
      props: { edit: true }
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
