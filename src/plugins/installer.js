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

  Vue.prototype.$judgecode = function (res) {
    if (res.data.code != '00000') {
      this.$vux.toast.show({
        text: res.data.msg,
        type: 'text',
        position: 'top'
      })
    } else {
      return 1
    }
  }

}

export default Installer
