const state = {
  loadingIndicator: 'hidden'
}

const getters = {
  loadingIndicator: state => state.loadingIndicator
}

const actions = {
  setLoading: ({ commit }) => commit('setLoading'),
  setSuccess: ({ commit }) => commit('setSuccess'),
  setFailure: ({ commit }) => commit('setFailure'),
  setHidden: ({ commit }) => commit('setHidden')
}

const mutations = {
  setLoading (state) {
    state.loadingIndicator = 'loading'
  },
  setSuccess (state) {
    state.loadingIndicator = 'success'
  },
  setFailure (state) {
    state.loadingIndicator = 'failure'
  },
  setHidden (state) {
    state.loadingIndicator = 'hidden'
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
