import Vue from 'vue'
import Vuex from 'vuex'
import users from './modules/users'
import works from './modules/works'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  modules: {
    users,
    works,
  },
})
