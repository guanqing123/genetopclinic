// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import App from './App'

// Axios
import Axios from 'axios'
Axios.defaults.baseURL = 'https://wx.hongyancloud.com/wxDev'
Vue.prototype.$axios = Axios

import FastClick from 'fastclick'
FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
