import { MutationTree, ActionTree } from 'vuex'
import axios, { AxiosError } from 'axios'
import { RootState, UserState, User } from '@/store/types'

const defaultState: UserState = {
  users: [],
  error: null,
}

const mutations: MutationTree<UserState> = {
  setList: (state, users: User[]) => {
    state.users = users
    state.error = null
  },
  set: (state, user: User) => {
    const found = state.users.find(u => u.id === user.id)
    if (!found) {
      return
    }
    found.presence = user.presence
    found.atOffice = user.atOffice
  },
  setError: (state, error: AxiosError) => {
    state.error = error
  },
}

type UserPresenceParams = {
  id: number
  presence: string
}
type UserLocationParams = {
  id: number
  atOffice: boolean
}
const actions: ActionTree<UserState, RootState> = {
  getUsers({ commit }) {
    axios
      .get<User[]>(`${process.env.VUE_APP_API_SERVER}/api/users`)
      .then(res => commit('setList', res.data))
      .catch(error => commit('setError', error))
  },

  addUser({ commit }, name: string) {
    return new Promise(resolve =>
      axios
        .post<User[]>(`${process.env.VUE_APP_API_SERVER}/api/users`, {
          name,
        })
        .then(resolve)
        .catch(error => commit('setError', error))
    )
  },

  setUserPresence({ commit }, params: UserPresenceParams) {
    axios
      .put<User[]>(`${process.env.VUE_APP_API_SERVER}/api/users/${params.id}`, {
        presence: params.presence,
      })
      .then(res => commit('set', res.data))
      .catch(error => commit('setError', error))
  },

  setUserLocation({ commit }, params: UserLocationParams) {
    axios
      .put<User[]>(`${process.env.VUE_APP_API_SERVER}/api/users/${params.id}`, {
        atOffice: params.atOffice,
      })
      .then(res => commit('set', res.data))
      .catch(error => commit('setError', error))
  },

  deleteUser({ commit }, userId: number) {
    return new Promise(resolve =>
      axios
        .delete<User[]>(`${process.env.VUE_APP_API_SERVER}/api/users/${userId}`)
        .then(resolve)
        .catch(error => commit('setError', error))
    )
  },
}

export default {
  namespaced: false,

  state: { ...defaultState },

  mutations,

  actions,
}
