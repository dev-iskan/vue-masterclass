import Vue from 'vue'
import firebase from 'firebase'

import App from './App.vue'
import router from './router'
import store from './store/index'
import AppDate from './components/AppDate'
Vue.config.productionTip = false
Vue.component('AppDate', AppDate)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyD-DmGgVqb_luisz-uMsRMhbIpt2aZGWKM',
  authDomain: 'vue-masterclass.firebaseapp.com',
  databaseURL: 'https://vue-masterclass.firebaseio.com',
  projectId: 'vue-masterclass',
  storageBucket: 'vue-masterclass.appspot.com',
  messagingSenderId: '1089776601886'
}
firebase.initializeApp(config)
