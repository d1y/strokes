import Vue from 'vue'
import Click from 'vue-spark'
import App from './App.vue'
import router from './router'
import './plugins/vant.js'

import { isPost } from '@/config'
import store from './store'

if (isPost) Vue.use(Click())

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
