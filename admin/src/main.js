import Vue from 'vue'

// import 'normalize.css/normalize.css' // A modern alternative to CSS resets

// import ElementUI from 'element-ui' // 使用CDN
// import 'element-ui/lib/theme-chalk/index.css' // 使用CDN
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

/**
 * This project originally used easy-mock to simulate data,
 * but its official service is very unstable,
 * and you can build your own service if you need it.
 * So here I use Mock.js for local emulation,
 * it will intercept your request, so you won't see the request in the network.
 * If you remove `../mock` it will automatically request easy-mock data.
 */
// import '../mock' // simulation data

// Vue.use(ElementUI, { locale })
// Vue.use(ElementUI) // 使用CDN

Vue.config.productionTip = false

// 用户默认头像
Vue.filter('getColor', function(name) {
  let str = ''
  for (let i = 0; i < name.length; i++) {
    str += parseInt(name[i].charCodeAt(0), 10).toString(16)
  }
  return `margin:0 auto;text-align:center;font-size:20px;color:white;line-height:50px;width: 50px; height: 50px;background:#${str.slice(1, 5)}`
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
