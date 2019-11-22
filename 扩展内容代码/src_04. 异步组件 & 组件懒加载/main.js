import Vue from 'vue'
import App from './App.vue'

// Vue.component('AsyncComponentTest', async function (resolve, reject) {
//   // setTimeout(function () {
//   //   // 向 `resolve` 回调传递组件定义
//   //
//   //   resolve({
//   //     template: '<div>I am async!</div>'
//   //   })
//   // }, 1000)
//
//
//   await new Promise(resolve => {
//     setTimeout(() => {
//       resolve()
//     }, 2000)
//   })
//
//   resolve({
//     template: '<div>I am async!</div>'
//   })
// })


// 异步组件 + 代码切割
// Vue.component('AsyncComponentTest', function (resolve) {
//   // 这个特殊的 `require` 语法将会告诉 webpack
//   // 自动将你的构建代码切割成多个包，这些包
//   // 会通过 Ajax 请求加载
//   require(['./components/AsyncComponentTest'], resolve)
// })


// Vue.component(
//   'AsyncComponentTest',
//   // 这个 `import` 函数会返回一个 `Promise` 对象。
//   () => import('./components/AsyncComponentTest')
// )


new Vue({
  render: h => h(App),
}).$mount('#app')
