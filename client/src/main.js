import Vue from 'vue'
import App from './App.vue'
import router from './router'
var infiniteScroll = require('vue-infinite-scroll')

Vue.use(infiniteScroll)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
