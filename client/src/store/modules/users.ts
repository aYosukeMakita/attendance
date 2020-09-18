import { MutationTree, ActionTree } from 'vuex'
import axios, { AxiosError } from 'axios'
import { RootState, UserState, User, Presence, Location } from '@/store/types'

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
    const found = state.users.find(u => u.userId === user.userId)
    if (!found) {
      return
    }
    found.nickname = user.nickname
    found.presence = user.presence
    found.location = user.location
  },
  setError: (state, error: AxiosError) => {
    state.error = error
  },
}

type UserNicknameParams = {
  userId: number
  nickname: string
}
type UserPresenceParams = {
  userId: number
  presence: Presence
}
type UserLocationParams = {
  userId: number
  location: Location
}
const actions: ActionTree<UserState, RootState> = {
  getUsers({ commit }) {
    axios
      .get<User[]>(`${process.env.VUE_APP_API_SERVER}/api/users`)
      .then(res => commit('setList', res.data))
      .catch(error => commit('setError', error))
  },

  setUserNickname({ commit }, params: UserNicknameParams) {
    axios
      .put<User[]>(`${process.env.VUE_APP_API_SERVER}/api/users/${params.userId}`, {
        nickname: params.nickname,
      })
      .then(res => commit('set', res.data))
      .catch(error => commit('setError', error))
  },

  setUserPresence({ commit }, params: UserPresenceParams) {
    axios
      .put<User[]>(`${process.env.VUE_APP_API_SERVER}/api/users/${params.userId}`, {
        presence: params.presence,
      })
      .then(res => commit('set', res.data))
      .catch(error => commit('setError', error))
  },

  setUserLocation({ commit }, params: UserLocationParams) {
    axios
      .put<User[]>(`${process.env.VUE_APP_API_SERVER}/api/users/${params.userId}`, {
        location: params.location,
      })
      .then(res => commit('set', res.data))
      .catch(error => commit('setError', error))
  },
}

export default {
  namespaced: false,

  state: { ...defaultState },

  mutations,

  actions,
}
