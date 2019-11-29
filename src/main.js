require('es6-promise').polyfill();
require('es6-promise/auto');
import '@/assets/font/iconfont.css';
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'


import createRouter from './router/router'
import createStore from './store/store'

Vue.use(Vuex)
Vue.use(VueRouter)

const router = createRouter()
const store = createStore()


import App from './App'
import common from './plugins/common'

//下拉刷新
import PullUpDown from './components/common/PullUpDown'
Vue.component('pull-up-down', PullUpDown)
//loading
import  { LoadingPlugin,ToastPlugin,ConfirmPlugin } from 'vux'
Vue.use(LoadingPlugin)
Vue.use(ToastPlugin)
Vue.use(ConfirmPlugin)
import Installer from './plugins/installer'
Vue.use(Installer)

// Axios
import Axios from 'axios'
// Axios.defaults.baseURL = 'http://wxdev.genetopclinic.com/gene'
Axios.defaults.baseURL = 'http://wxdev.hongyancloud.com/gene'
Axios.interceptors.request.use(config => {
  let openId = common.cookie.get('open_id')
  if (openId) {
    config.headers.openId = `${openId}`
  }
  return config
}, error => {
  return Promise.reject(error)
});
Vue.prototype.$axios = Axios

import FastClick from 'fastclick'
FastClick.attach(document.body)

Vue.config.productionTip = false

// 全局导航守卫
router.beforeEach((to, from, next) => {
  if (common.isNull(common.cookie.get('open_id'))) {
    var getOpenIdUrl = 'http://wxdev.hongyancloud.com/gene/getWxOpenId'
    getOpenIdUrl += '?toUrl='+encodeURIComponent(window.location.href);
    var url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxb8b315d4406ae131&redirect_uri=' + encodeURIComponent(getOpenIdUrl) + '&response_type=code&scope=snsapi_base&state=123&connect_redirect=1#wechat_redirect';
    //授权请求,并跳转http://m.water.ui-tech.cn/auth路由页面
    window.location.href = url
    return false
  }
  if (!store.getters.openId) {
    var user = {openId: common.cookie.get('open_id'), headerUrl: common.cookie.get('head_url'), nickName: common.cookie.get('nick_name')}
    store.commit('updateUser', user)
  }
  /* 路由发生变化修改页面title */
  if (to.meta.title){
    document.title = to.meta.title;
  }
  next();
})

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
