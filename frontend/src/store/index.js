import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate"

export default createStore({
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
    })
  ],
  state: {
    userData: {},
    token: '',
    sidebarVisible: '',
    sidebarUnfoldable: false,
    theme: 'light',
  },
  getters: {
    userData: (state) => {
      return state.userData
    },
    token: (state) => {
      return state.token
    },
  },
  mutations: {
    userData(state, userData) {
      state.userData = userData
    },
    token(state, token) {
      state.token = token
    },
    toggleSidebar(state) {
      state.sidebarVisible = !state.sidebarVisible
    },
    toggleUnfoldable(state) {
      state.sidebarUnfoldable = !state.sidebarUnfoldable
    },
    updateSidebarVisible(state, payload) {
      state.sidebarVisible = payload.value
    },
  },
  actions: {
    userData(context, userData) {
      context.commit('userData', userData)
    },
    token(context, token) {
      context.commit('token', token)
    },
  },
  modules: {},
})
