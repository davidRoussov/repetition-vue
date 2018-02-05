import Vue from 'vue'
import Vuex from 'vuex'

import { SERVER_URL } from '@/config'

Vue.use(Vuex)

const state = {
  loadingIndicator: 'hidden',
  topics: []
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
  },
  setTopics(state, topics) {
    state.topics = topics
  }
}

const actions = {
  setLoading: ({ commit }) => commit('setLoading'),
  setSuccess: ({ commit }) => commit('setSuccess'),
  setFailure: ({ commit }) => commit('setFailure'),
  setHidden: ({ commit }) => commit('setHidden'),

  getTopics: ({ commit }) => {
    fetch(`${SERVER_URL}/api/topics`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(response => {
      commit('setTopics', response)

      commit('setSuccess')
      setTimeout(() => {
        commit('setHidden')
      }, 3000)
    })
    .catch(error => {
      console.log('ERROR!')
      console.log(error)

      commit('setFailure')
      setTimeout(() => {
        commit('setHidden')
      }, 3000)
    })
  }
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
