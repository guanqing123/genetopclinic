import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import state from './state/state'

export default () => {
  const store = new Vuex.Store({
    state: state
  })
  return store
}
