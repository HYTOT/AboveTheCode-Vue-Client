import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Component from 'vue-class-component'
import { loadScript } from './util/vConsole'
import 'mint-ui/lib/style.css'

Vue.config.productionTip = false

Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate'
])

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

loadScript(() => new VConsole())