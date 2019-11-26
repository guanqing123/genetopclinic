export default {
  cookie: {
    set: function(name, value) {
      // 缓存过期时间
      let Days = 30
      let exp = new Date()
      exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000)
      document.cookie = name + '=' + encodeURI(value) + ';expires=' + exp.toUTCString() + ';path=/'
    },
    get: function(name) {
      let arr = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
      let reg = arr
      arr = document.cookie.match(reg)
      if (arr) {
        return decodeURI(arr[2])
      }else{
        return null
      }
    },
    del: function(name) {
      let exp = new Date()
      exp.setTime(exp.getTime() - 1)
      let cval = this.get(name)
      if (cval != null) {
        document.cookie = name + '=' + cval + ';expires=' + exp.toUTCString() + ';path=/'
      }
    }
  },
  isNull : function(str) {
    if (str == undefined || str == null || str == "undefined" || str == "null" || str == "") {
      return true;
    }else{
      return false;
    }
  }
}
