import Vue from 'vue'
import firebase from 'firebase'
import vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router'
import store from './store/index'
import AppDate from './components/AppDate'
Vue.config.productionTip = false
Vue.component('AppDate', AppDate)
Vue.use(vuelidate)
// Initialize Firebase
const config = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID
}
firebase.initializeApp(config)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
