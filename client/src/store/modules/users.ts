import { MutationTree, ActionTree } from 'vuex'
import axios from 'axios'
import { RootState, UserState, User } from '@/store/types'

const defaultState: UserState = {
  users: [],
  error: null,
}

const mutations: MutationTree<UserState> = {
  set: (state, { users, error }: UserState) => {
    if (users) {
      state.users = users
      state.error
    }
    if (error) {
      state.error = error
    }
  },
}

const actions: ActionTree<UserState, RootState> = {
  async getUsers({ commit }) {
    axios
      .get<User[]>(`${process.env.VUE_APP_API_SERVER}/api/users`)
      .then(res => commit('set', { users: res.data }))
      .catch(error => commit('set', { error }))
  },
}

export default {
  namespaced: false,

  state: { ...defaultState },

  mutations,

  actions,
}
