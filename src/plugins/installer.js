//引入Moment
import Moment from 'moment'

// vue插件必须具备Installer函数
function Installer() {
  // 自定义初始化行为
}

Installer.install = function (Vue) {
  // 接收Vue的构造函数,给原型挂载属性或注册全局组件

  /*let res = {};
  let judgecode = function (res) {
    if (res.data.code !== '00000'){
      alert('失败了')
    } else {
      return 1
    }
  }

  // 给原型定义属性的获取和设置, 设置:见鬼去吧, 获取就给你
  Object.defineProperty(Vue.prototype, '$judgecode', {
    // 设置 $log属性时的行为 || 不给,不能设置
    set: function (newV) {
      res = newV
    },
    get: function () {
      return judgecode
    }
  })*/

  /*function bindEvent(elem, type, selector, fn) {
    if (fn == null) {
      fn = selector
      selector = null
    }
    elem.addEventListener(type, function(e){
      var target
      if (selector) {
        target = e.target
        if (target.matches(selector)){
          fn.call(target, e)
        }
      } else {
        fn(e)
      }
    })
  }*/

  Object.defineProperty(Object.prototype, 'bindEvent', {
    value: function(type, selector, fn) {
      var el = this;
      if (fn == null) {
        fn = selector;
        selector = null
      }
      el.addEventListener(type, function(e){
        var target
        if (selector) {
          target = e.target
          if (target.matches(selector)) {
            fn.call(target, e)
          }
        } else {
          fn(e)
        }
      })
    }
  })

  Object.defineProperty(Object.prototype, 'fadeIn', {
    value: function(time, callback) {
      var el = this;
      el.style.display = 'block';
      el.style.opacity = 0;
      var st = setInterval(function() {
        el.style.opacity = parseFloat(el.style.opacity) + 0.01;
        if (el.style.opacity >= 1) {
          clearInterval(st);
          if (callback !== undefined) {
            callback();
          }
        }
      }, time);
      return this;
    }
  })

  Object.defineProperty(Object.prototype, 'fadeOut', {
    value: function(time, callback) {
      var el = this;
      el.style.opacity = 1;
      var st = setInterval(function() {
        el.style.opacity = parseFloat(el.style.opacity) - 0.01;
        if (el.style.opacity <= 0) {
          el.style.display = 'none';
          clearInterval(st);
          if (callback !== undefined) {
            callback();
          }
        }
      }, time);
      return this;
    }
  })

  Vue.prototype.$show = function (msg) {
    this.$vux.toast.show({
      text: msg,
      type: 'text',
      position: 'top',
      width: '15em'
    })
  }

  Vue.prototype.$judgecode = function (res) {
    if (res.data.code != 200) {
      this.$show(res.data.message);
    } else {
      return 1;
    }
  }

  Vue.prototype.$noop = function () {}

  // 定义过滤器
  Moment.locale('zh-cn')
  Vue.filter('convertTime', function (date, formatStr) {
    return Moment(date).format(formatStr)
  })

}

export default Installer
