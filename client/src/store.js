import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  loadingIndicator: 'hidden'
}

const mutations = {
  setLoading(state) {
    state.loadingIndicator = 'loading'
  },
  setSuccess(state) {
    state.loadingIndicator = 'success'
  },
  setFailure(state) {
    state.loadingIndicator = 'failure'
  },
  setHidden(state) {
    state.loadingIndicator = 'hidden'
  }
}

const actions = {
  setLoading: ({ commit }) => commit('setLoading'),
  setSuccess: ({ commit }) => commit('setSuccess'),
  setFailure: ({ commit }) => commit('setFailure'),
  setHidden: ({ commit }) => commit('setHidden')
}

const getters = {
  loadingIndicator: state => state.loadingIndicator
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
