import Vue from 'vue'
import App from './App.vue'


Vue.mixin({
  data(){
    return {
      msg: '全局的混合',
      user: {
        firstName: 'wade',
        lastName: 'xxx'
      },
      aaa: 123123
    }
  },
  methods: {
    _chunk2(target, size){
      if(!Array.isArray(target) || size <=0 || !target.length){
        return target
      }
      let arr = [...target]
      let result = []
      while (arr.length > size){
        result.push(arr.splice(0, size))
      }
      result.push(arr)
      return result
    }
  }
})

new Vue({
  render: h => h(App),
}).$mount('#app')
