import Vue from 'vue'
import Vuex from 'vuex'
import users from './modules/users'
import histories from './modules/histories'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  modules: {
    users,
    histories,
  },
})
