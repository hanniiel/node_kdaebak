import Vue from 'vue'
import App from './App.vue'
import IdolTable from './components/IdolTable.vue'

new Vue({
    el:"#app2",
    render:h=>h(App),
}).$mount("#app2")

new Vue({
    el:"#idols",
    render:h=>h(IdolTable),
}).$mount("#idols")
