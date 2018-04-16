import { SERVER_URL } from '@/config'
import { handleErrors } from '@/lib/util'

const state = {
  topics: [],
  selectedTopic: null
}

const getters = {

}

const actions = {
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

  selectTopic: ({ commit, dispatch }, topicID) => {
    commit('selectTopic', topicID)
    dispatch('resetCurrentItem', topicID)
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

const mutations = {
  setTopics (state, topics) {
    state.topics = topics
  },
  selectTopic (state, topicID) {
    state.selectedTopic = topicID
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
