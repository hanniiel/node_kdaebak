import Vue from 'vue'
import App from './App.vue'
import IdolTable from './components/IdolTable.vue'

var infiniteScroll =  require('vue-infinite-scroll');
Vue.use(infiniteScroll);

new Vue({
    el:"#app2",
    render:h=>h(App),
}).$mount("#app2")

new Vue({
    el:"#idols",
    render:h=>h(IdolTable),
}).$mount("#idols")
