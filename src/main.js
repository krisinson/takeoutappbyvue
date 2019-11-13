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
//全局注册组件的语法
Vue.component('GshopHeader',GshopHeader)
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
  store
})