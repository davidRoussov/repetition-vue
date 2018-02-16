import Vue from 'vue'
import Vuex from 'vuex'

import { SERVER_URL } from '@/config'

Vue.use(Vuex)

const state = {
  loadingIndicator: 'hidden',
  topics: [],
  selectedTopic: null,
  currentItem: {}
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
  },
  setTopics (state, topics) {
    state.topics = topics
  },
  selectTopic (state, topicID) {
    state.selectedTopic = topicID
  },
  setCurrentItem (state, item) {
    state.currentItem = item
  }
}

const actions = {
  setLoading: ({ commit }) => commit('setLoading'),
  setSuccess: ({ commit }) => commit('setSuccess'),
  setFailure: ({ commit }) => commit('setFailure'),
  setHidden: ({ commit }) => commit('setHidden'),

  deleteTopic: ({ commit, dispatch }, topicID) => {
    console.log(topicID)

    commit('setLoading')

    fetch(`${SERVER_URL}/api/topics?id=${topicID}`, {
      method: 'DELETE',
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

  updateItemRank: ({ commit, dispatch }, type) => {
    if (state.currentItem.id) {
      const itemID = state.currentItem.id
      const newRank = calculateNewRank(state.topics, state.selectedTopic, type)
      const newTopics = state.topics.map(topic => {
        if (topic.id === state.selectedTopic) {
          return {
            ...topic,
            Items: topic.Items.map(item => {
              if (item.id === itemID) {
                return {
                  ...item,
                  Rank: newRank
                }
              } else {
                return item
              }
            })
          }
        } else {
          return topic
        }
      })
      commit('setTopics', newTopics)
      dispatch('resetCurrentItem', state.selectedTopic)
      dispatch('updateTopic')
    }
  },

  updateTopic: ({ commit }) => {
    commit('setLoading')

    const topic = state.topics.filter(topic => topic.id === state.selectedTopic)[0]

    fetch(SERVER_URL + '/api/topics', {
      method: 'PUT',
      body: JSON.stringify(topic),
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

  resetCurrentItem: ({ commit }, topicID) => {
    const currentItem = state.topics
      .filter(topic => topic.id === topicID)[0].Items
      .sort((a, b) => {
        if (a.Rank < b.Rank) return -1
        else if (a.Rank > b.Rank) return 1

        return 0
      })[0]

    commit('setCurrentItem', currentItem)
  },

  selectTopic: ({ commit, dispatch }, topicID) => {
    commit('selectTopic', topicID)
    dispatch('resetCurrentItem', topicID)
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

function calculateNewRank (topics, selectedTopic, type) {
  const maxRank = getMaximumRank(topics, selectedTopic)
  switch (type) {
    case 'good':
      return maxRank + 1
    case 'pass':
      return Math.ceil(maxRank / 2)
    case 'bad':
      return Math.ceil(maxRank / 4)
    default:
      return 0
  }
}

function getMaximumRank (topics, topicID) {
  return topics
    .filter(topic => topic.id === topicID)[0]
    .Items
    .sort((a, b) => {
      if (a.Rank < b.Rank) return 1
      else if (a.Rank > b.Rank) return -1

      return 0
    })[0]
    .Rank
}

function handleErrors (response) {
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

