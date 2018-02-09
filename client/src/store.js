import Vue from 'vue'
import Vuex from 'vuex'

import { SERVER_URL } from '@/config'

Vue.use(Vuex)

const state = {
  loadingIndicator: 'hidden',
  topics: [],
  selectedTopic: null,
  selectedTopicItems: null
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
  },
  selectTopic(state, topicID) {
    state.selectedTopic = topicID
  }
}

const actions = {
  setLoading: ({ commit }) => commit('setLoading'),
  setSuccess: ({ commit }) => commit('setSuccess'),
  setFailure: ({ commit }) => commit('setFailure'),
  setHidden: ({ commit }) => commit('setHidden'),

  selectTopic: ({ commit, dispatch }, topicID) => {
    commit('selectTopic', topicID)

    const currentItem = state.topics
      .filter(topic => topic.id === topicID)
      .sort((a, b) => {
        if (a.rank < b.rank) return -1
        else if (a.rank > b.rank) return 1

        return 0
      })[0]
    commit('setCurrentItem', currentItem)
  },

  createItem: ({ commit, dispatch }, item) => {
    commit('setLoading')

    fetch(SERVER_URL + '/api/items', {
      method: 'POST',
      body: JSON.stringify({ item, topic: state.selectedTopic }),
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })
    .then(handleErrors)
    .then(response => response.json())
    .then(response => {
      commit('setSuccess')
      setTimeout(() => {
        commit('setHidden')
      }, 3000)
    })
    .catch(error => {
      console.error(error)

      commit('setFailure')
      setTimeout(() => {
        commit('setHidden')
      }, 3000)
    })
  },

  createTopic: ({ commit, dispatch }, newTopicName) => {
    commit('setLoading')

    fetch(SERVER_URL + '/api/topics', {
      method: 'POST',
      body: JSON.stringify({
        newTopicName
      }),
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })
    .then(response => response.json())
    .then(response => {
      dispatch('getTopics')

      commit('setSuccess')
      setTimeout(() => {
        commit('setHidden')
      }, 3000)
    })
    .catch(error => {
      console.error(error)

      commit('setFailure')
      setTimeout(() => {
        commit('setHidden')
      }, 3000)
    })
  },

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

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText)
  }
  return response
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})

