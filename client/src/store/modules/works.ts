import { MutationTree, ActionTree } from 'vuex'
import axios from 'axios'
import { RootState, WorkState, Work } from '@/store/types'

const defaultState: WorkState = {
  works: [],
  error: null,
}

const mutations: MutationTree<WorkState> = {
  set: (state, { works, error }: WorkState) => {
    if (works) {
      state.works = works
      state.error
    }
    if (error) {
      state.error = error
    }
  },
}

const actions: ActionTree<WorkState, RootState> = {
  async getWorks({ commit }) {
    axios
      .get<Work[]>(`${process.env.VUE_APP_API_SERVER}/api/works/latest`)
      .then(res => commit('set', { works: res.data }))
      .catch(error => commit('set', { error }))
  },
}

export default {
  namespaced: false,

  state: { ...defaultState },

  mutations,

  actions,
}
