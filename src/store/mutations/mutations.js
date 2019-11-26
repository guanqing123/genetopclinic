export default {
  updateUser : function(state, user) {
    state.user = user
  },
  updateHeaderUrl: function(state, headerUrl) {
    state.user.headerUrl = headerUrl
  }
}
