import { MutationTree, ActionTree } from 'vuex'
import axios from 'axios'
import { RootState, HistoryState, History } from '@/store/types'

const defaultState: HistoryState = {
  userId: 0,
  username: '',
  nickname: null,
  histories: [],
  error: null,
}

const mutations: MutationTree<HistoryState> = {
  set: (state, params: HistoryState) => {
    if (params.histories) {
      state.userId = params.userId
      state.username = params.username
      state.nickname = params.nickname
      state.histories = params.histories
      state.error = null
    }
    if (params.error) {
      state.error = params.error
    }
  },
}

const actions: ActionTree<HistoryState, RootState> = {
  async getUserHistories({ commit }, userId: number) {
    axios
      .get<History[]>(`${process.env.VUE_APP_API_SERVER}/api/users/${userId}/histories`)
      .then(res => commit('set', { ...res.data }))
      .catch(error => commit('set', { error }))
  },
}

export default {
  namespaced: false,

  state: { ...defaultState },

  mutations,

  actions,
}
