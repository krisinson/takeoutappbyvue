import Vue from 'vue'
import App from './App.vue'
import 'lib-flexible/flexible'
import './veeValidate'
import { Button } from 'mint-ui'

import './common/stylus/mixins.styl'
import * as API from './api'
import './mock/mockServer'

import router from './router'
import store from './store'
import GshopHeader from './components/GshopHeader/GshopHeader'
import CartControl from './components/CartControl/CartControl'
import i18n from './i18n'
//全局注册组件的语法
Vue.component('GshopHeader',GshopHeader)
Vue.component('CartControl',CartControl)
Vue.component(Button.name,Button)

Vue.prototype.$API=API
Vue.config.productionTip = false

// new Vue({
//   render: h => h(App),
// }).$mount('#app')

new Vue({
  el:"#app",

  components:{
    App,
  },

  template:'<App/>',
  router,
  i18n,
  store
})