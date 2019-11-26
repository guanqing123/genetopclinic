export default {
  openId : function (state) {
    return `${state.user.openId}`
  },
  nickName : function (state) {
    if(state.user.nickName == null)
      return '';
    return decodeURIComponent(`${state.user.nickName}`)
  },
  headerUrl : function (state) {
    return decodeURIComponent(`${state.user.headerUrl}`)
  }
}
