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
      path: '/thread/:id',
      props: true,
      name: 'pagethreadshow',
      component: () => import('./views/PageThreadShow.vue')
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
