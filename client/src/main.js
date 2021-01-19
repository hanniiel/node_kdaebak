import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import firebase from 'firebase/app'
import 'firebase/auth'
import store from './store'

firebase.initializeApp({
  apiKey: 'AIzaSyDgE2RkSGGaL7m8D552AMahF8oqUUmqfE8',
  authDomain: 'kdaebakapp.firebaseapp.com',
  databaseURL: 'https://kdaebakapp.firebaseio.com',
  projectId: 'kdaebakapp',
  storageBucket: 'kdaebakapp.appspot.com',
  messagingSenderId: '511153755020',
  appId: '1:511153755020:web:76aa7f594c1bc75a2d7ca9',
  measurementId: 'G-DHW6L0MNXD'
})
firebase.analytics()
createApp(App).use(store).use(router).mount('#app')
