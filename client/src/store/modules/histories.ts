import { MutationTree, ActionTree } from 'vuex'
import axios from 'axios'
import { RootState, HistoryState, History } from '@/store/types'

const defaultState: HistoryState = {
  histories: [],
  error: null,
}

const mutations: MutationTree<HistoryState> = {
  set: (state, { histories, error }: HistoryState) => {
    if (histories) {
      state.histories = histories
      state.error
    }
    if (error) {
      state.error = error
    }
  },
}

const actions: ActionTree<HistoryState, RootState> = {
  async getHistories({ commit }) {
    axios
      .get<History[]>(`${process.env.VUE_APP_API_SERVER}/api/histories`)
      .then(res => commit('set', { histories: res.data }))
      .catch(error => commit('set', { error }))
  },

  async getUserHistories({ commit }, userId: number) {
    axios
      .get<History[]>(`${process.env.VUE_APP_API_SERVER}/api/users/${userId}/histories`)
      .then(res => commit('set', { histories: res.data }))
      .catch(error => commit('set', { error }))
  },
}

export default {
  namespaced: false,

  state: { ...defaultState },

  mutations,

  actions,
}
