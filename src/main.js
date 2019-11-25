require('es6-promise').polyfill();
require('es6-promise/auto');
import '@/assets/font/iconfont.css';
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
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
// Axios.defaults.baseURL = 'http://192.168.0.108:8080/gene'
// Axios.defaults.baseURL = 'http://118.190.55.164/gene'
// Axios.defaults.baseURL = 'http://172.30.8.95:8080/gene'
Axios.defaults.baseURL = 'http://wxdev.hongyancloud.com/gene'
Vue.prototype.$axios = Axios

import FastClick from 'fastclick'
FastClick.attach(document.body)

Vue.config.productionTip = false

// store
import createStore from './store/store'
const store = createStore()

// 全局导航守卫
router.beforeEach((to, from, next) => {
  alert(common.cookie.get('open_id'));
  if (common.isNull(common.cookie.get('open_id'))) {
    var getOpenIdUrl = 'http://wxdev.hongyancloud.com/gene/getWxOpenId'
    getOpenIdUrl += '?toUrl='+encodeURIComponent(window.location.href);
    var url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxb8b315d4406ae131&redirect_uri=' + encodeURIComponent(getOpenIdUrl) + '&response_type=code&scope=snsapi_base&state=123&connect_redirect=1#wechat_redirect';
    //授权请求,并跳转http://m.water.ui-tech.cn/auth路由页面
    window.location.href = url
    return false
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
